'use client'
import React, { createContext, useContext, useEffect, useReducer } from
'react'
import { Post } from '../types'
import { loadFromLocal, saveToLocal } from '../lib/storage'
type State = {
    posts: Post[]
}
type Action =
    | { type: 'hydrate'; payload: Post[] }
    | { type: 'add'; payload: Post }
    | { type: 'remove'; payload: string }
const initial: State = { posts: [] }
const KEY = 'blog_posts_v1'
const reducer = (s: State, a: Action): State => {
    switch (a.type) {
        case 'hydrate':
            return { ...s, posts: a.payload }
        case 'add':
            return { ...s, posts: [a.payload, ...s.posts] }
        case 'remove':
            return { ...s, posts: s.posts.filter(p => p.id !== a.payload) }
        default:
            return s
    }
}
const BlogContext = createContext<{
    state: State
    addPost: (p: Post) => void
    removePost: (id: string) => void
} | null>(null)

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
    children }) => {
    const [state, dispatch] = useReducer(reducer, initial)
    5
    useEffect(() => {
        const stored = loadFromLocal<Post[]>(KEY, [])
        dispatch({ type: 'hydrate', payload: stored })
    }, [])
    useEffect(() => {
        saveToLocal(KEY, state.posts)
    }, [state.posts])
    const addPost = (p: Post) => dispatch({ type: 'add', payload: p })
    const removePost = (id: string) => dispatch({
        type: 'remove', payload:
            id
    })
    return (
        <BlogContext.Provider value={{ state, addPost, removePost }}>
            {children}
        </BlogContext.Provider>
    )
}

export const useBlog = () => {
    const ctx = useContext(BlogContext)
    if (!ctx) throw new Error('useBlog must be used within BlogProvider')
    return ctx
}
