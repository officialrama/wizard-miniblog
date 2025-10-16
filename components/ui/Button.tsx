'use client'
import React from 'react'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost'
}

export const Button: React.FC<Props> = ({ children, variant =
    'primary', ...rest }) => {
    const base = 'px-4 py-2 rounded-lg font-bold cursor-pointer'
    const cls = variant === 'primary'
        ? `${base} bg-blue-500 text-white hover:bg-blue-700`
        : `${base} bg-transparent border border-gray-300 hover:bg-gray-100`
    return (
        <button className={cls} {...rest}>{children}</button>
    )
}

export default Button
