import { render, screen } from "@testing-library/react"
import Navbar from "@/components/navbar"
import { CartProvider } from "@/lib/cart-context"
import jest from "jest"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("Navbar Component", () => {
  it("renders the logo", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>,
    )
    expect(screen.getByText("ShopLux")).toBeInTheDocument()
  })

  it("renders navigation links", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>,
    )
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Products")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })

  it("renders cart icon", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>,
    )
    const cartButton = screen.getByRole("button", { name: /cart/i })
    expect(cartButton).toBeInTheDocument()
  })
})
