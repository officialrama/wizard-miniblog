'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function HeaderNav() {
    const router = useRouter()
    const pathname = usePathname() ?? '/'
    const isHome = pathname === '/'
    const isCreate = pathname.startsWith('/create')

    const btnBase = 'px-3 py-1 rounded-md text-sm cursor-pointer'

    return (
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="text-xl font-bold">Mini Blog</div>

            <nav className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    aria-current={isHome ? 'page' : undefined}
                    className={`${btnBase} ${isHome
                            ? 'text-blue-600 font-semibold underline'
                            : 'text-gray-600 hover:text-gray-800 dark:text-gray-350'
                        }`}
                >
                    Home
                </button>

                <button
                    type="button"
                    onClick={() => router.push('/create')}
                    aria-current={isCreate ? 'page' : undefined}
                    className={`${btnBase} ${isCreate
                            ? 'text-blue-600 font-semibold underline'
                            : 'text-gray-600 hover:text-gray-800 dark:text-gray-350'
                        }`}
                >
                    Create
                </button>
            </nav>
        </div>
    )
}
