export type Category = 'Tech' | 'Lifestyle' | 'Business'
export interface Post {
    id: string
    title: string
    author: string
    summary: string
    category: Category
    content: string
    date: string 
    youtubeUrl?: string
    imageUrl?: string
}
