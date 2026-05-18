import crypto from "crypto"
import fs from "fs"
import path from "path"
import sharp from "sharp"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import DepGraph from "../../depgraph"

const cachePrefix = "funcs-offline"
const iconSource = joinSegments("quartz", "static", "icon.png")
const katexSource = joinSegments("node_modules", "katex", "dist")
const katexRuntimeFiles = [["katex.min.css"], ["contrib", "copy-tex.min.js"]]
const mermaidSource = joinSegments("node_modules", "mermaid", "dist", "mermaid.min.js")

async function fileExists(fp: string) {
  try {
    await fs.promises.access(fp)
    return true
  } catch {
    return false
  }
}

async function walkFiles(dir: string): Promise<string[]> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fp = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return walkFiles(fp)
      }
      return entry.isFile() ? [fp] : []
    }),
  )
  return files.flat()
}

function toCacheUrl(output: string, fp: string) {
  const rel = path.relative(output, fp).split(path.sep).join("/")
  return encodeURI(`/${rel}`)
}

async function contentHash(files: string[]) {
  const hash = crypto.createHash("sha256")
  for (const fp of files) {
    hash.update(fp)
    hash.update(await fs.promises.readFile(fp))
  }
  return hash.digest("hex").slice(0, 16)
}

function serviceWorker(cacheName: string, urls: string[]) {
  return `
const CACHE_NAME = ${JSON.stringify(cacheName)}
const CACHE_PREFIX = ${JSON.stringify(cachePrefix)}
const PRECACHE_URLS = ${JSON.stringify(urls, null, 2)}

async function openOfflineCache() {
  return caches.open(CACHE_NAME)
}

function pageCandidates(pathname) {
  const candidates = []
  const add = (path) => {
    if (!candidates.includes(path)) candidates.push(path)
  }

  if (pathname === "/") {
    add("/index.html")
    add("/")
  } else {
    add(pathname)
    if (pathname.endsWith("/")) {
      add(pathname + "index.html")
    } else {
      add(pathname + "/index.html")
      if (!pathname.endsWith(".html")) add(pathname + ".html")
    }
  }

  add("/404.html")
  add("/index.html")
  return candidates
}

async function matchOfflinePage(pathname) {
  const cache = await openOfflineCache()
  for (const candidate of pageCandidates(pathname)) {
    const response = await cache.match(candidate)
    if (response) return response
  }
  return Response.error()
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    openOfflineCache()
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX + "-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response.ok) return matchOfflinePage(url.pathname)
          const copy = response.clone()
          if (response.ok) openOfflineCache().then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => matchOfflinePage(url.pathname)),
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((response) => {
        const copy = response.clone()
        if (response.ok) openOfflineCache().then((cache) => cache.put(request, copy))
        return response
      })
    }),
  )
})
`.trimStart()
}

export const OfflinePWA: QuartzEmitterPlugin = () => ({
  name: "OfflinePWA",
  getQuartzComponents() {
    return []
  },
  async getDependencyGraph(_ctx, _content, _resources) {
    return new DepGraph<FilePath>()
  },
  async emit(ctx, _content, _resources): Promise<FilePath[]> {
    const output = ctx.argv.output
    const emitted: FilePath[] = []

    const katexOutput = joinSegments(output, "static", "vendor", "katex")
    await fs.promises.mkdir(katexOutput, { recursive: true })
    for (const filePath of katexRuntimeFiles) {
      const source = joinSegments(katexSource, ...filePath)
      const target = joinSegments(katexOutput, ...filePath)
      await fs.promises.mkdir(path.dirname(target), { recursive: true })
      await fs.promises.copyFile(source, target)
      emitted.push(target as FilePath)
    }
    await fs.promises.cp(joinSegments(katexSource, "fonts"), joinSegments(katexOutput, "fonts"), {
      recursive: true,
      dereference: true,
    })

    await fs.promises.mkdir(joinSegments(output, "static", "vendor", "mermaid"), {
      recursive: true,
    })
    await fs.promises.copyFile(
      mermaidSource,
      joinSegments(output, "static", "vendor", "mermaid", "mermaid.min.js"),
    )
    emitted.push(joinSegments(output, "static", "vendor", "mermaid", "mermaid.min.js") as FilePath)

    if (await fileExists(iconSource)) {
      for (const size of [192, 512]) {
        const iconPath = joinSegments(output, "static", `icon-${size}.png`)
        await sharp(iconSource).resize(size, size).png().toFile(iconPath)
        emitted.push(iconPath as FilePath)
      }
    }

    const manifest = {
      name: ctx.cfg.configuration.pageTitle,
      short_name: "FunCS",
      description: "Offline Fundamentals of Computer Science course book.",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: ctx.cfg.configuration.theme.colors.lightMode.light,
      theme_color: ctx.cfg.configuration.theme.colors.lightMode.secondary,
      icons: [
        {
          src: "/static/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/static/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    }

    emitted.push(
      await write({
        ctx,
        slug: "manifest" as FullSlug,
        ext: ".webmanifest",
        content: JSON.stringify(manifest, null, 2),
      }),
    )

    const files = (await walkFiles(output)).filter((fp) => path.basename(fp) !== "sw.js").sort()
    const hash = await contentHash(files)
    const urls = files.map((fp) => toCacheUrl(output, fp))

    emitted.push(
      await write({
        ctx,
        slug: "sw" as FullSlug,
        ext: ".js",
        content: serviceWorker(`${cachePrefix}-${hash}`, urls),
      }),
    )

    return emitted
  },
})
