import type React from "react"
import { renderHook, act } from "@testing-library/react"
import { CartProvider, useCart } from "@/lib/cart-context"

describe("Cart Context", () => {
  it("adds items to cart", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 1,
        name: "Test Product",
        price: 99,
        image: "/test.jpg",
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].name).toBe("Test Product")
    expect(result.current.totalItems).toBe(1)
  })

  it("removes items from cart", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 1,
        name: "Test Product",
        price: 99,
        image: "/test.jpg",
      })
    })

    act(() => {
      result.current.removeFromCart(1)
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })

  it("calculates total price correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 1,
        name: "Product 1",
        price: 100,
        image: "/test1.jpg",
      })
      result.current.addToCart({
        id: 2,
        name: "Product 2",
        price: 50,
        image: "/test2.jpg",
      })
    })

    expect(result.current.totalPrice).toBe(150)
  })

  it("updates item quantity", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 1,
        name: "Test Product",
        price: 99,
        image: "/test.jpg",
      })
    })

    act(() => {
      result.current.updateQuantity(1, 3)
    })

    expect(result.current.items[0].quantity).toBe(3)
    expect(result.current.totalItems).toBe(3)
  })

  it("clears cart", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 1,
        name: "Test Product",
        price: 99,
        image: "/test.jpg",
      })
    })

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })
})
