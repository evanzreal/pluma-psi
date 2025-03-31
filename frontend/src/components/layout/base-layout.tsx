'use client'

import { Sidebar } from "./sidebar"

interface BaseLayoutProps {
  children: React.ReactNode
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 border-r" />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
} 