import { render, screen } from "@testing-library/react"
import Footer from "@/components/footer"

describe("Footer Component", () => {
  it("renders the brand name", () => {
    render(<Footer />)
    expect(screen.getByText("ShopLux")).toBeInTheDocument()
  })

  it("renders shop categories", () => {
    render(<Footer />)
    expect(screen.getByText("Electronics")).toBeInTheDocument()
    expect(screen.getByText("Fashion")).toBeInTheDocument()
    expect(screen.getByText("Sports")).toBeInTheDocument()
  })

  it("renders support links", () => {
    render(<Footer />)
    expect(screen.getByText("Help Center")).toBeInTheDocument()
    expect(screen.getByText("Shipping Info")).toBeInTheDocument()
  })

  it("renders social media links", () => {
    render(<Footer />)
    const socialLinks = screen.getAllByRole("link")
    expect(socialLinks.length).toBeGreaterThan(0)
  })
})
