"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardProps {
  onNavigate: (
    page: "dashboard" | "products" | "orders" | "reviews" | "carts"
  ) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    reviews: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, reviewsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/orders"),
          fetch("/api/reviews"),
        ]);

        const [products, orders, reviews] = await Promise.all([
          productsRes.json(),
          ordersRes.json(),
          reviewsRes.json(),
        ]);

        const revenue =
          orders.data?.reduce(
            (sum: number, order: any) => sum + (order.total || 0),
            0
          ) || 0;

        setStats({
          products: products.total || 0,
          orders: orders.total || 0,
          reviews: reviews.total || 0,
          revenue,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "from-chart-1 to-chart-2",
      page: "products" as const,
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingBag,
      color: "from-chart-2 to-chart-3",
      page: "orders" as const,
    },
    {
      title: "Total Reviews",
      value: stats.reviews,
      icon: Star,
      color: "from-chart-4 to-chart-5",
      page: "reviews" as const,
    },
    {
      title: "Total Revenue",
      value: `$${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
      color: "from-chart-5 to-chart-1",
      page: "orders" as const,
    },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in-up">
      <div>
        <h2 className="text-3xl font-bold text-balance">Welcome back, Admin</h2>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              onClick={() => onNavigate(stat.page)}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl",
                "animate-fade-in-up border-border/50 backdrop-blur-sm",
                "group relative overflow-hidden"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
                  stat.color
                )}
              />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "p-3 rounded-lg bg-gradient-to-br",
                      stat.color,
                      "shadow-lg"
                    )}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-chart-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold">
                  {loading ? (
                    <span className="inline-block w-20 h-8 bg-muted animate-pulse rounded" />
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          className="p-6 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("products")}
              className="w-full p-4 text-left rounded-lg bg-accent hover:bg-accent/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">
                Manage Products
              </p>
              <p className="text-sm text-muted-foreground text-white">
                Add, edit, or remove products
              </p>
            </button>
            <button
              onClick={() => onNavigate("orders")}
              className="w-full p-4 text-left rounded-lg bg-accent hover:bg-accent/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">
                View Orders
              </p>
              <p className="text-sm text-muted-foreground text-white">
                Check order status and details
              </p>
            </button>
            <button
              onClick={() => onNavigate("reviews")}
              className="w-full p-4 text-left rounded-lg bg-accent hover:bg-accent/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">
                Moderate Reviews
              </p>
              <p className="text-sm text-muted-foreground text-white">
                Manage customer feedback
              </p>
            </button>
          </div>
        </Card>

        <Card
          className="p-6 animate-fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
              <div className="w-2 h-2 rounded-full bg-chart-3 mt-2" />
              <div>
                <p className="text-sm font-medium">New order received</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
              <div className="w-2 h-2 rounded-full bg-chart-1 mt-2" />
              <div>
                <p className="text-sm font-medium">Product updated</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
              <div className="w-2 h-2 rounded-full bg-chart-5 mt-2" />
              <div>
                <p className="text-sm font-medium">New review posted</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
