'use client'
import React from 'react'
import { Post } from '../../types'
import { Embed, extractEmbedsFromText } from '@/lib/embed'
import EmbedPreview from '../ui/EmbedPreview'
interface Props {
    data: Omit<Post, 'id' | 'date'>
}

export const Step4Review: React.FC<Props> = ({ data }) => {
    const embeds: Embed[] = []
    const embedsFromContent = extractEmbedsFromText(data.content)
    embeds.push(...embedsFromContent)

    if (data.youtubeUrl?.trim()) {
        const found = extractEmbedsFromText(data.youtubeUrl)
        embeds.push(...found)
    }
    if (data.imageUrl?.trim()) {
        const found = extractEmbedsFromText(data.imageUrl)
        if (found.length) {
            embeds.push(...found)
        } else {
            embeds.push({ type: 'image', url: data.imageUrl })
        }
    }

    const uniqueEmbeds = embeds.filter((em, i, arr) =>
        em.type === 'youtube'
            ? arr.findIndex(e => e.type === 'youtube' && e.id === em.id) === i
            : arr.findIndex(e => e.type === 'image' && e.url === em.url) === i
    )
    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">Review</h2>
            <div className="space-y-2">
                <div><strong>Title:</strong> {data.title}</div>
                <div><strong>Author:</strong> {data.author}</div>
                <div><strong>Summary:</strong> {data.summary}</div>
                <div><strong>Category:</strong> {data.category}</div>
                <div className="pt-2"><strong>Content:</strong>
                    <div className="mt-1 border rounded p-3 whitespace-prewrap">{data.content}</div>
                </div>
                {uniqueEmbeds.map((em, i) => (
                    <EmbedPreview key={i} embed={em} />
                ))}
            </div>
        </div>
    )
}
export default Step4Review
