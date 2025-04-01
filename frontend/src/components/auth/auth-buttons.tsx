'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AuthButtons() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <Link href="/sign-in">
        <Button variant="ghost">Entrar</Button>
      </Link>
      <Link href="/sign-up">
        <Button>Cadastrar</Button>
      </Link>
    </header>
  )
} 