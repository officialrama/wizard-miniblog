'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useBlog } from '../../../context/BlogProvider'
import Button from '@/components/ui/Button'
import { Embed, extractEmbedsFromText } from '@/lib/embed'
import EmbedPreview from '@/components/ui/EmbedPreview'

export default function PostDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string
    const { state } = useBlog()
    const post = state.posts.find(p => p.id === id)
    const goBack = () => {
        try {
            router.back()
        } catch {
            router.push('/')
        }
    }
    if (!post) return <div className="max-w-3xl mx-auto p-6">Post not found</div>

    const embedsFromContent: Embed[] = extractEmbedsFromText(post.content)
    const explicitEmbeds: Embed[] = []
    if (post.youtubeUrl?.trim()) {
        const found = extractEmbedsFromText(post.youtubeUrl)
        const yt = found.find(e => e.type === 'youtube')
        if (yt) explicitEmbeds.push(yt)
    }
    if (post.imageUrl?.trim()) {
        const foundImg = extractEmbedsFromText(post.imageUrl).find(e => e.type === 'image')
        if (foundImg) explicitEmbeds.push(foundImg)
        else explicitEmbeds.push({ type: 'image', url: post.imageUrl })
    }
    const all: Embed[] = [...explicitEmbeds, ...embedsFromContent]
    const unique: Embed[] = all.filter((em, idx, arr) => {
        if (em.type === 'youtube') {
            return arr.findIndex(e => e.type === 'youtube' && e.id === em.id) === idx
        }
        return arr.findIndex(e => e.type === 'image' && e.url === em.url) === idx
    })
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-end mb-3">
                <Button variant="ghost" onClick={goBack} aria-label="Go back">
                    Back
                </Button>
            </div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-600">by {post.author} • {new
                Date(post.date).toLocaleString()}</p>
            <div className="mt-4 text-gray-800">{post.summary}</div>
            <hr className="my-4" />
            <div className="prose max-w-none whitespace-pre-wrap">{post.content}</div>
            {unique.length > 0 && (
                <div className="mt-6 space-y-4">
                    {unique.map((em, i) => (
                        <div key={i}>
                            <EmbedPreview embed={em} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}