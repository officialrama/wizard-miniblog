'use client'
import React from 'react'
import { useBlog } from '../context/BlogProvider'
import PostCard from '../components/PostCard'

export default function HomePage() {
  const { state } = useBlog()
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All Posts</h2>
      </div>
      {state.posts.length === 0 ? (
        <div className="text-center py-10">No posts yet. Click <a href="/create" className="underline font-bold">Create</a> to add one.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {state.posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      )}
    </div>
  )
}
