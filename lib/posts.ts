export type Post = { title: string; date: string; excerpt: string; url: string }

// Published by the blog at build time. Override to test against a local copy.
const POSTS_URL = process.env.BLOG_POSTS_URL ?? "https://blog.metateic.ca/posts.json"

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

function isPost(value: unknown): value is Post {
  if (typeof value !== "object" || value === null) return false
  const post = value as Record<string, unknown>
  return (
    typeof post.title === "string" &&
    typeof post.url === "string" &&
    typeof post.excerpt === "string" &&
    typeof post.date === "string" &&
    !Number.isNaN(Date.parse(post.date))
  )
}

/**
 * The newest posts from the blog, fetched when the site is built.
 * If the blog can't be reached or returns something unexpected, the posts
 * listed in content/strings.yml are used so a build never fails on this.
 */
export async function latestPosts(fallback: Post[], limit = 3): Promise<Post[]> {
  try {
    const response = await fetch(POSTS_URL, { signal: AbortSignal.timeout(8000) })
    if (!response.ok) throw new Error(`${POSTS_URL} answered ${response.status}`)
    const data: unknown = await response.json()
    const posts = Array.isArray(data) ? data.filter(isPost) : []
    if (posts.length === 0) throw new Error(`${POSTS_URL} returned no posts`)
    return posts
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .slice(0, limit)
      .map((post) => ({ ...post, date: dateFormat.format(new Date(post.date)) }))
  } catch (error) {
    console.warn(`Blog posts unavailable, using content/strings.yml instead: ${error}`)
    return fallback.slice(0, limit)
  }
}
