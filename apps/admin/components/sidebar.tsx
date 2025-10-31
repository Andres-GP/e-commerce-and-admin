"use client"

import { LayoutDashboard, Package, ShoppingCart, Star, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: "dashboard" | "products" | "orders" | "reviews" | "carts") => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "carts", label: "Carts", icon: ShoppingCart },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col animate-slide-in-left">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <p className="text-sm text-muted-foreground mt-1">E-Commerce Management</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-accent hover:scale-[1.02] active:scale-[0.98]",
                isActive && "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-primary-foreground font-bold">
            A
          </div>
          <div>
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@store.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
