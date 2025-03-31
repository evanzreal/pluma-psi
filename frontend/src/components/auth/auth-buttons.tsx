'use client'

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"

export function AuthButtons() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost">Entrar</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Cadastrar</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  )
} 