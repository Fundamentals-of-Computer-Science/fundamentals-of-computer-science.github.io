import assert from "node:assert"
import test, { describe } from "node:test"
import { requiresFullDocumentNavigation } from "./spa"

describe("requiresFullDocumentNavigation", () => {
  test("matches the standalone beta application route and its descendants", () => {
    const standaloneRoutes = [
      "/beta/Funcs",
      "/beta/Funcs/",
      "/beta/Funcs/Ch1-1-Boolean-Values-State-Visible-Results.html",
      "/beta/Funcs/lesson-kit/FLOW_AUTHORING.html?mode=review#questions",
    ]

    for (const route of standaloneRoutes) {
      assert.strictEqual(
        requiresFullDocumentNavigation(new URL(route, "https://example.com")),
        true,
        `${route} should load as a complete document`,
      )
    }
  })

  test("does not match ordinary Quartz routes or similar path names", () => {
    const quartzRoutes = [
      "/",
      "/beta/",
      "/beta/Funcs-archive/lesson.html",
      "/beta/Functions/lesson.html",
      "/beta/funcs/lesson.html",
      "/ch1/ch1-1.html",
    ]

    for (const route of quartzRoutes) {
      assert.strictEqual(
        requiresFullDocumentNavigation(new URL(route, "https://example.com")),
        false,
        `${route} should remain eligible for Quartz SPA navigation`,
      )
    }
  })
})
