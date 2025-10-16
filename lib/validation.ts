export const minLengthError = (value?: string, min = 3): string | undefined => {
  const v = (value ?? '').trim()
  if (v.length === 0) return undefined
  if (v.length < min) return `Must be at least ${min} characters`
  return undefined
}