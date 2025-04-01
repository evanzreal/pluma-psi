'use client'

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Users, 
  Calendar, 
  Settings, 
  Bell,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton, useUser, useClerk } from "@clerk/nextjs"
import { useState } from "react"

const mainMenuItems = [
  {
    title: "Pacientes",
    href: "/pacientes",
    icon: Users
  },
  {
    title: "Agenda",
    href: "/agenda",
    icon: Calendar
  },
  {
    title: "Alertas",
    href: "/alertas",
    icon: Bell
  }
]

const profileMenuItems = [
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings
  }
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // Props específicas para Sidebar, se houver
}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true)
      console.log("Iniciando logout...")
      
      // Usando a URL completa para garantir redirecionamento correto
      await signOut();
      console.log("Logout bem-sucedido, redirecionando...")
      
      // Redirecionamento manual para a página inicial
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setIsLoggingOut(false);
    }
  }

  return (
    <div className={cn("pb-12 min-h-screen flex flex-col", className)} {...props}>
      <div className="space-y-4 py-4 flex-1">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Menu</h2>
          <ScrollArea className="px-1">
            <div className="space-y-1">
              {mainMenuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href 
                        ? "bg-secondary text-secondary-foreground" 
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      {/* Área do Psicólogo na parte inferior */}
      <div className="mt-auto border-t pt-4">
        <div className="px-4 mb-2">
          <div className="flex items-center mb-4">
            <UserButton afterSignOutUrl="/" />
            <div className="ml-3">
              <div className="font-medium">{user?.firstName} {user?.lastName || ''}</div>
              <div className="text-xs text-muted-foreground">CRP 06/12345</div>
            </div>
          </div>
          
          <div className="px-2 py-1.5 bg-blue-50 text-blue-700 rounded-md mb-4 text-xs">
            <div className="font-semibold">Plano Premium</div>
            <div className="text-blue-600">Expira em 15/06/2024</div>
          </div>
        </div>
        
        <div className="px-3">
          <div className="space-y-1">
            {profileMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href 
                      ? "bg-secondary text-secondary-foreground" 
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
            
            <button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isLoggingOut 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? "Saindo..." : "Sair"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 