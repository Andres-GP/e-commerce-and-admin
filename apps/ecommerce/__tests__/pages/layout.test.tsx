import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";
jest.mock("@/components/theme-registry", () => ({
  ThemeRegistry: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-registry">{children}</div>
  ),
}));

jest.mock("@/components/footer", () => ({
  Footer: () => <footer data-testid="footer">Footer Component</footer>,
}));

jest.mock("@/components/navbar", () => ({
  __esModule: true,
  default: () => <nav data-testid="navbar">Navbar Component</nav>,
}));

jest.mock("@/lib/cart-context", () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cart-provider">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("renders the layout with Navbar, Footer, and children", () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByTestId("cart-provider")).toBeInTheDocument();
    expect(screen.getByTestId("theme-registry")).toBeInTheDocument();
  });

  it("contains a Box layout wrapper", () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    // Check if the layout container exists
    const layoutBoxes = document.querySelectorAll("[class*='MuiBox']");
    expect(layoutBoxes.length).toBeGreaterThan(0);
  });

  it("includes children content inside the layout", () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    const child = screen.getByTestId("child-content");
    expect(child.textContent).toBe("Child Content");
  });
});
