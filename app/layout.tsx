import './globals.css';
import { BlogProvider } from '../context/BlogProvider'
import HeaderNav from '../components/HeaderNav'

export const metadata = {
  title: 'Blog Wizard',
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <BlogProvider>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b dark:border-neutral-700 p-4">
              <HeaderNav />
            </header>
            <main className="py-8">{children}</main>
          </div>
        </BlogProvider>
      </body>
    </html>
  )
}
