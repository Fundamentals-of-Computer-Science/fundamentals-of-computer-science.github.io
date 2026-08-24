import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Custom sort function for Explorer to order chapter sections correctly
function customSort(a: any, b: any) {
  // Define the order for chapter sections
  const orderMap: Record<string, number> = {
    "index": 0,
    "ch0": 1,
    "ch1": 2,
    "ch1-1": 3,
    "ch1-2": 4,
    "ch1-3": 5,
    "ch1-4": 6,
    "ch1-5": 7,
  }

  // Get the base name (file slug without path)
  const aName = a.name || ""
  const bName = b.name || ""

  // Check if both items have defined order
  const aOrder = orderMap[aName]
  const bOrder = orderMap[bName]

  // If both have custom order, use that
  if (aOrder !== undefined && bOrder !== undefined) {
    return aOrder - bOrder
  }

  // If only one has custom order, it comes first
  if (aOrder !== undefined) return -1
  if (bOrder !== undefined) return 1

  // Default: folders first, then alphabetical
  if ((!a.file && !b.file) || (a.file && b.file)) {
    return aName.localeCompare(bName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }

  return a.file ? 1 : -1
}

// Keep the stable book explorer focused on the five published chapter trees.
function publishedChapterFilter(node: any) {
  return node.depth !== 1 || /^ch[0-4]$/.test(node.name)
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Fundamentals-of-Computer-Science/FunCS",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.EditionNavigation(),
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.BetaLessonLink(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      folderClickBehavior: "link",
      folderDefaultState: "collapsed",
      filterFn: publishedChapterFilter,
      sortFn: customSort,
    })),
  ],
  right: [
    // Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.EditionNavigation(),
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.BetaLessonLink(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      folderClickBehavior: "link",
      folderDefaultState: "collapsed",
      filterFn: publishedChapterFilter,
      sortFn: customSort,
    })),
  ],
  right: [],
}
