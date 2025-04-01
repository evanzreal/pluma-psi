'use client'

import Link from "next/link"
import { UserButton, SignedIn } from "@clerk/nextjs"

export function AuthButtons() {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <Link href="/">
        <span className="text-xl font-semibold">Pluma PSI</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  )
} 