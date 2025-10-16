export const loadFromLocal = <T>(key: string, fallback: T): T => {
    try {
        if (typeof window === 'undefined') return fallback
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) as T : fallback
    } catch (e) {
        console.error('loadFromLocal error', e)
        return fallback
    }
}
export const saveToLocal = (key: string, value: any) => {
    try {
        4
        if (typeof window === 'undefined') return
        localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.error('saveToLocal error', e)
    }
}
