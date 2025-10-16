'use client'
import React from 'react'
import { Embed } from '@/lib/embed'

interface EmbedPreviewProps {
    embed: Embed
    className?: string
}

export const EmbedPreview: React.FC<EmbedPreviewProps> = ({ embed, className }) => {
    if (embed.type === 'youtube') {
        const src = `https://www.youtube-nocookie.com/embed/${embed.id}`
        return (
            <div className={`w-full ${className || ''}`} style={{ aspectRatio: '16/9' }}>
                <iframe
                    title="YouTube video preview"
                    src={src}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded"
                />
            </div>
        )
    }

    if (embed.type === 'image') {
        return (
            <div className={`w-full ${className || ''}`}>
                <img
                    src={embed.url}
                    alt="Embedded preview"
                    className="w-full rounded object-contain border"
                    loading="lazy"
                />
            </div>
        )
    }

    return null
}

export default EmbedPreview
