const TRANSPARENT_GIF_BASE64 = "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="

export function transparentGifResponse(): Response {
  const bytes = Buffer.from(TRANSPARENT_GIF_BASE64, "base64")
  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Content-Length": String(bytes.length),
    },
  })
}
