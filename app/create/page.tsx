'use client'
import React, { useState } from 'react'
import { WizardLayout } from '../../components/Wizard/WizardLayout'
import MetaData from '../../components/Wizard/Step1-MetaData'
import Summary from '../../components/Wizard/Step2-Summary'
import Content from '../../components/Wizard/Step3-Content'
import Review from '../../components/Wizard/Step4-Review'
import { Button } from '../../components/ui/Button'
import { useBlog } from '../../context/BlogProvider'
import { Post } from '../../types'
import { useRouter } from 'next/navigation'
type FormState = Omit<Post, 'id' | 'date'>
const initial: FormState = {
    title: '',
    author: '',
    summary: '',
    category: 'Tech',
    content: '',
    youtubeUrl: '',
    imageUrl: '', 
}

export default function CreatePage() {
    const [step, setStep] = useState(1)
    const [form, setForm] = useState<FormState>(initial)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const { addPost } = useBlog()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const onChange = (key: any, value: any) => {
        setForm(prev => ({ ...prev, [key]: value }))
        setErrors(prev => {
            const next = { ...prev }
            if ((key === 'title' || key === 'author') && String(value).trim().length >= 3) {
                delete next[key]
            }
            if ((key === 'summary') && String(value).trim().length >= 5) {
                delete next[key]
            }
            if ((key === 'content') && String(value).trim().length >= 10) {
                delete next[key]
            }
            return next
        })
    }
    const validateStep = (step: number) => {
        const e: Record<string, string> = {}
        if (step === 1) {
            if (form.title.trim().length < 3) e.title = 'Title Must be at least 3 characters'
            if (form.author.trim().length < 3) e.author = 'Author Must be at least 3 characters'
        }
        if (step === 2) {
           if (form.summary.trim().length < 3) e.summary = 'Summary Must be at least 5 characters'
        }
        if (step === 3) {
            if (form.content.trim().length < 3) e.content = 'Content Must be at least 10 characters'
        }
        setErrors(e)
        return Object.keys(e).length === 0
    }
    const next = async () => {
        if (!validateStep(step)) return
        setStep(s => Math.min(4, s + 1))
    }
    const back = () => setStep(s => Math.max(1, s - 1))
    const submit = async () => {
        const allValid = validateStep(1) && validateStep(2) && validateStep(3)
        if (!allValid) return setStep(1)
        setSubmitting(true)
        const newPost: Post = {
            ...form,
            id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
            date: new Date().toISOString(),
        }
        addPost(newPost)
        setSubmitting(false)
        router.push('/')
    }
    return (
        <WizardLayout title="Create Blog Post">
            <div className="mb-4">
                <div className="flex gap-2 items-center text-sm text-gray-500">
                    <div className={`px-2 py-1 ${step === 1 ? 'bg-blue-100 rounded font-bold' : ''}`}>1</div>
                    <div className={`px-2 py-1 ${step === 2 ? 'bg-blue-100 rounded font-bold' : ''}`}>2</div>
                    <div className={`px-2 py-1 ${step === 3 ? 'bg-blue-100 rounded font-bold' : ''}`}>3</div>
                    <div className={`px-2 py-1 ${step === 4 ? 'bg-blue-100 rounded font-bold' : ''}`}>4</div>
                </div>
            </div>
            <div>
                {step === 1 && (
                    <MetaData title={form.title} author={form.author} onChange={(key, value) => onChange(key, value)} errors={{ title: errors.title, author: errors.author }} />
                )}
                {step === 2 && (
                    <Summary summary={form.summary} category={form.category as any} onChange={(key, value) => onChange(key, value)} errors={{ summary: errors.summary }} />
                )}
                {step === 3 && (
                    <Content
                        content={form.content}
                        youtubeUrl={form.youtubeUrl}
                        imageUrl={form.imageUrl}
                        onChange={(keyOrValue: any, maybeValue?: any) => {
                            // Content will call onChange('content', val) or onChange('youtubeUrl', val)
                            if (typeof keyOrValue === 'string' && typeof maybeValue !== 'undefined') {
                                onChange(keyOrValue, maybeValue)
                            } else {
                                onChange('content', keyOrValue)
                            }
                        }}
                        errors={{ content: errors.content }}
                    />
                )}
                {step === 4 && (
                    <Review data={form} />
                )}
            </div>
            <div className="mt-6 flex gap-2 justify-end">
                {step > 1 && <Button variant="ghost" onClick={back}>Back</Button>}
                {step < 4 && <Button onClick={next}>Next</Button>}
                {step === 4 && <Button onClick={submit} disabled={submitting}
                >{submitting ? 'Saving...' : 'Submit'}</Button>}
            </div>
        </WizardLayout>
    )
}
