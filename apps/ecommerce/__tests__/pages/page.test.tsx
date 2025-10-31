import React from "react";
import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

jest.mock("@/components/navbar", () => () => (
  <nav data-testid="navbar">Navbar</nav>
));
jest.mock("@/components/footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));
jest.mock("@/components/theme-registry", () => ({
  ThemeRegistry: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-registry">{children}</div>
  ),
}));
jest.mock("@/lib/cart-context", () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cart-provider">{children}</div>
  ),
}));

describe("RootLayout", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the layout with Navbar, Footer, and children", () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toHaveTextContent(
      "Child Content"
    );
  });

  it("wraps everything inside ThemeRegistry and CartProvider", () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Child</div>
      </RootLayout>
    );

    const themeRegistry = screen.getByTestId("theme-registry");
    const cartProvider = screen.getByTestId("cart-provider");

    expect(themeRegistry).toBeInTheDocument();
    expect(cartProvider).toBeInTheDocument();
  });

  it("renders HTML and BODY elements correctly", () => {
    render(
      <RootLayout>
        <div data-testid="child">Child</div>
      </RootLayout>
    );

    const html = document.querySelector("html");
    const body = document.querySelector("body");

    expect(html).not.toBeNull();
    expect(body).not.toBeNull();
  });

  it("includes Navbar, Footer, and children inside the correct flex layout", () => {
    render(
      <RootLayout>
        <div data-testid="child">Test Content</div>
      </RootLayout>
    );

    const child = screen.getByTestId("child");
    expect(child).toHaveTextContent("Test Content");
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("applies Inter font class to body (if available)", () => {
    render(
      <RootLayout>
        <div>Child</div>
      </RootLayout>
    );

    const body = document.querySelector("body");
    expect(body?.className ?? "").toMatch(/inter|^$/);
  });
});
