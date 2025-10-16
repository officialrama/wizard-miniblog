'use client'
import React from 'react'

interface Props {
  value?: string
  name?: string         
  min?: number            
  parentError?: string     
  id?: string              
  messages?: {             
    required?: string
    min?: (min: number) => string
  }
}

export const FieldError: React.FC<Props> = ({ value = '', name, min = 3, parentError, id, messages }) => {
  const trimmed = value.trim()
  const minMsg = messages?.min ? messages.min(min) : `${name} Must be at least ${min} characters`
  const localError = trimmed.length > 0 && trimmed.length < min ? minMsg : undefined
  const error = parentError ?? localError
  if (!error) return null

  return (
    <p id={id} className="text-red-600 text-sm mt-1">
      {error}
    </p>
  )
}

export default FieldError
