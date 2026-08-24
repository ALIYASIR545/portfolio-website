export function getEmbedVideoUrl(url: string): string {
  if (!url) return ''
  // Handle YouTube Watch links (youtube.com/watch?v=ID)
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  // Handle YouTube Short links (youtu.be/ID)
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  return url
}