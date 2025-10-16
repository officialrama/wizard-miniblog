'use client'
import React from 'react'
interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> { }

export const Select: React.FC<Props> = ({ children, ...rest }) => (
    <select className="w-full border rounded px-3 py-2" {...rest}>{children}</select>
)
export default Select
