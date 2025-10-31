"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { ProductsPage } from "@/components/products-page"
import { OrdersPage } from "@/components/orders-page"
import { ReviewsPage } from "@/components/reviews-page"
import { CartsPage } from "@/components/carts-page"

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "products" | "orders" | "reviews" | "carts">("dashboard")

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}
        {currentPage === "products" && <ProductsPage />}
        {currentPage === "orders" && <OrdersPage />}
        {currentPage === "reviews" && <ReviewsPage />}
        {currentPage === "carts" && <CartsPage />}
      </main>
    </div>
  )
}
