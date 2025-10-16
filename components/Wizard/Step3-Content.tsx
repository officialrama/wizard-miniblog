'use client'
import React from 'react'
import TextArea from '../ui/TextArea'
import FieldError from '../ui/FieldError'
import { Embed, extractEmbedsFromText } from '@/lib/embed'
import EmbedPreview from '../ui/EmbedPreview'
interface Props {
    content: string
    youtubeUrl?: string
    imageUrl?: string
    onChange: (key: 'content' | 'youtubeUrl' | 'imageUrl' | string, value?: string) => void
    errors?: { content?: string }
}

export const Content: React.FC<Props> = ({ content, youtubeUrl = '', imageUrl = '', onChange, errors }) => {
    const getTextFromHtml = (html: string) => {
        if (typeof document === 'undefined') return ''
        const d = document.createElement('div')
        d.innerHTML = html || ''
        return d.innerText || ''
    }
    const embeds: Embed[] = []
    if (youtubeUrl.trim()) {
        const ytEmbeds = extractEmbedsFromText(youtubeUrl)
        if (ytEmbeds.length > 0) {
            embeds.push(ytEmbeds[0])
        }
    }
    if (imageUrl.trim()) {
        embeds.push({ type: 'image', url: imageUrl })
    }
    return (
        <div>
            <label className="block mb-2">Blog Content</label>
            <TextArea value={content} onChange={(e) => onChange(e.target.value)} />
            <FieldError value={content} name='Content' min={10} parentError={errors?.content} id="content-error" />
            <div className="mt-4">
                <label className="block mb-1">YouTube URL (optional)</label>
                <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => onChange('youtubeUrl', e.target.value)}
                    placeholder="https://youtu.be/VIDEO_ID or https://www.youtube.com/watch?v=ID"
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div className="mt-3">
                <label className="block mb-1">Image URL (optional)</label>
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => onChange('imageUrl', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            {embeds.length > 0 && (
                <div className="mt-4">
                    {embeds.map((em, i) => (
                        <EmbedPreview key={i} embed={em} className="my-3" />
                    ))}
                </div>
            )}

            <p className="mt-3 text-xs text-gray-500">
                Tip: You can optionally paste a YouTube or image link in the fields above — they are not required. Previews will appear if links are valid.
            </p>
        </div>
    )
}
export default Content