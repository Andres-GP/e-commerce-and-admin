"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartItem {
  _id: string;
  userId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  addedAt: string;
}

export function CartsPage() {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(carts, "carts");
  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      console.log(data, "data");
      setCarts(data.data || []);
    } catch (error) {
      console.error("Failed to fetch carts:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupedCarts = carts.reduce(
    (acc, item) => {
      if (!acc[item.userId]) {
        acc[item.userId] = [];
      }
      acc[item.userId].push(item);
      return acc;
    },
    {} as Record<string, CartItem[]>
  );

  return (
    <div className="p-8 space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-3xl font-bold text-balance">Active Carts</h2>
        <p className="text-muted-foreground mt-1">
          Monitor customer shopping carts
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="h-24 bg-muted animate-pulse rounded-lg" />
            </Card>
          ))}
        </div>
      ) : Object.keys(groupedCarts).length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No active carts</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedCarts).map(([userId, items], index) => {
            const total = items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <Card
                key={userId}
                className={cn(
                  "p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]",
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">User: {userId}</h4>
                    <p className="text-sm text-muted-foreground">
                      {items.length} items in cart
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ${total.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">Cart Total</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-accent/50"
                    >
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
