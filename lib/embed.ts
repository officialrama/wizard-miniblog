export type Embed =
  | { type: 'youtube'; id: string; url: string }
  | { type: 'image'; url: string }

const YT_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/i
const URL_REGEX = /(https?:\/\/[^\s]+)/g
const IMAGE_EXT = /\.(jpe?g|png|gif|webp)(\?.*)?$/i

export const extractEmbedsFromText = (text: string): Embed[] => {
  if (!text) return []
  const matches = text.match(URL_REGEX) || []
  const embeds: Embed[] = []

  for (const m of matches) {
    const yt = m.match(YT_REGEX)
    if (yt && yt[1]) {
      embeds.push({ type: 'youtube', id: yt[1], url: m })
      continue
    }
    if (IMAGE_EXT.test(m)) {
      embeds.push({ type: 'image', url: m })
      continue
    }
  }

  return embeds
}
