'use client'
import React from 'react'
import TextArea from '../ui/TextArea'
import Select from '../ui/Select'
import { Category } from '../../types'
import FieldError from '../ui/FieldError'
interface Props {
    summary: string
    category: Category
    onChange: (k: 'summary' | 'category', v: string) => void
    errors?: { summary?: string }
}

export const Summary: React.FC<Props> = ({ summary, category, onChange, errors }) => {
    return (
        <div>
            <label className="block mb-2">Blog Summary</label>
            <TextArea value={summary} onChange={(e) => onChange('summary', e.target.value)} />
            <FieldError value={summary} name='Summary' min={5} parentError={errors?.summary} id="summary-error" />
            <label className="block mt-4 mb-2">Category</label>
            <Select value={category} onChange={(e) => onChange('category', e.target.value)}>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
            </Select>
        </div >
    )
}
export default Summary
