'use client'

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Settings, 
  Bell,
  ClipboardList
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3
  },
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
    title: "Questionários",
    href: "/questionarios",
    icon: ClipboardList
  },
  {
    title: "Alertas",
    href: "/alertas",
    icon: Bell
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings
  }
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Menu</h2>
          <ScrollArea className="px-1">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
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
    </div>
  )
} 