'use client'
import React from 'react'

export const WizardLayout: React.FC<{
    title?: string; children:
    React.ReactNode
}> = ({ title, children }) => {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">{title ?? 'Create Blog Post'}</h1>
            <div className="bg-white border rounded p-6 shadow-sm">{children}</div>
        </div>
    )
}
export default WizardLayout