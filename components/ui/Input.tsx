'use client'
import React from 'react'
interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<Props> = ({ ...rest }) => (
    <input className="w-full border rounded px-3 py-2" {...rest} />
)
export default Input
