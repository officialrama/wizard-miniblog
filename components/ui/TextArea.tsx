'use client'
import React from 'react'
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className = '', ...rest }, ref) => {
        return (
            <textarea
                ref={ref}
                className={`${className} w-full border rounded px-3 py-2 min-h-[160px]`}
                {...rest}
            />
        )
    }
)

TextArea.displayName = 'TextArea'
export default TextArea
