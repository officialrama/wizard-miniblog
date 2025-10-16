'use client'
import React from 'react'
import { Post, Category } from '../types'
import Button from './ui/Button'
import { useRouter } from 'next/navigation'
import { useBlog } from '@/context/BlogProvider'

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
    const router = useRouter()
    const { removePost } = useBlog()
    const readButton = () => {
        router.push(`/posts/${post.id}`)
    }
    const handleDelete = () => {
        if (confirm(`Delete post "${post.title}"?`)) {
            removePost(post.id)
        }
    }
    const getCategoryClasses = (category: Category | string) => {
        const key = String(category).toLowerCase()
        switch (key) {
            case 'lifestyle':
                return {
                    badge: 'bg-rose-50 text-black border-rose-200',
                    accent: 'border-l-4 border-rose-300',
                }
            case 'tech':
                return {
                    badge: 'bg-indigo-50 text-black border-indigo-200',
                    accent: 'border-l-4 border-indigo-300',
                }
            case 'business':
                return {
                    badge: 'bg-emerald-50 text-black border-emerald-200',
                    accent: 'border-l-4 border-emerald-300',
                }
            default:
                return {
                    badge: 'bg-gray-100 text-black border-gray-200',
                    accent: 'border-l-4 border-gray-300',
                }
        }
    }
    const styles = getCategoryClasses(post.category)

    return (
        <article className="relative border rounded p-4">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">by {post.author} • {new Date(post.date).toLocaleString()}</p>
            <p className="mt-2">{post.summary}</p>
            <div className="mt-3 flex items-center justify-between">
                <span
                    className={`text-xs px-2 py-1 rounded-full border ${styles.badge} font-medium`}
                    title={`Category: ${post.category}`}
                    aria-label={`Category ${post.category}`}
                >
                    {/* optional emoji for extra affordance */}
                    {post.category === 'Tech' ? '💻 ' : post.category === 'Lifestyle' ? '✨ ' : post.category === 'Business' ? '💼 ' : ''}
                    {post.category}
                </span>
                <div className='flex space-x-1'>
                    <Button onClick={readButton}>Read</Button>
                    <Button
                        variant="ghost"
                        onClick={handleDelete}
                        aria-label="Delete post"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </article>
    )
}
export default PostCard