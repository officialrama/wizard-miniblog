'use client'
import React from 'react'
import Input from '../ui/Input'
import FieldError from '../ui/FieldError'
interface Props {
    title: string
    author: string
    onChange: (k: 'title' | 'author', v: string) => void
    errors?: { title?: string; author?: string }
}

export const MetaData: React.FC<Props> = ({ title, author, onChange, errors }) => {
    return (
        <div>
            <label className="block mb-2">Blog Title</label>
            <Input value={title} onChange={(e) => onChange('title', e.target.value)} />
            <FieldError value={title} name='Title' min={3} parentError={errors?.title} id="title-error" />
            <label className="block mt-4 mb-2">Author Name</label>
            <Input value={author} onChange={(e) => onChange('author', e.target.value)} />
            <FieldError value={author} name='Author' min={3} parentError={errors?.author} id="author-error" />
        </div>
    )
}
export default MetaData
