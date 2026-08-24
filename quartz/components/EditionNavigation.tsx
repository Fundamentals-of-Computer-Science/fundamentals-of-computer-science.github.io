import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import styles from "./styles/editionNavigation.scss"

function betaUrlFor(fileData: QuartzComponentProps["fileData"]): string | undefined {
  const betaUrl = fileData.frontmatter?.betaUrl
  return typeof betaUrl === "string" && betaUrl.trim().length > 0 ? betaUrl : undefined
}

function isBetaPage(fileData: QuartzComponentProps["fileData"]): boolean {
  const slug = fileData.slug
  return typeof slug === "string" && (slug === "beta" || slug.startsWith("beta/"))
}

const EditionNavigation: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const betaUrl = betaUrlFor(fileData)
  const readingBeta = isBetaPage(fileData)
  const edition = readingBeta ? "Beta" : "Primary"
  const switchLabel = readingBeta ? "Switch to Primary" : "Switch to Beta"
  const switchUrl = readingBeta ? "/" : (betaUrl ?? "/beta/")

  return (
    <nav class="edition-navigation" aria-label="Book edition">
      <span class="edition-navigation__status">
        Reading: <strong>{edition}</strong>
      </span>
      <span class="edition-navigation__divider" aria-hidden="true" />
      <a class="edition-navigation__switch" href={switchUrl}>
        {switchLabel}
      </a>
    </nav>
  )
}

EditionNavigation.css = styles

const BetaLessonLinkComponent: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const betaUrl = betaUrlFor(fileData)
  if (!betaUrl) return null

  return (
    <aside class="beta-lesson-link" aria-label="Interactive beta lesson">
      <span>Interactive version available</span>
      <span class="beta-lesson-link__divider" aria-hidden="true">
        —
      </span>
      <a href={betaUrl}>Open beta lesson</a>
    </aside>
  )
}

export const BetaLessonLink = (() => BetaLessonLinkComponent) satisfies QuartzComponentConstructor

export default (() => EditionNavigation) satisfies QuartzComponentConstructor
