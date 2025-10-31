import { render, screen, fireEvent } from "@testing-library/react";
import AdminPage from "@/app/page";

// Mock all child components
jest.mock("@/components/sidebar", () => ({
  Sidebar: ({ currentPage, onPageChange }: any) => (
    <nav data-testid="sidebar">
      <p>Sidebar - {currentPage}</p>
      <button onClick={() => onPageChange("products")}>Go Products</button>
      <button onClick={() => onPageChange("orders")}>Go Orders</button>
      <button onClick={() => onPageChange("reviews")}>Go Reviews</button>
      <button onClick={() => onPageChange("carts")}>Go Carts</button>
      <button onClick={() => onPageChange("dashboard")}>Go Dashboard</button>
    </nav>
  ),
}));

jest.mock("@/components/dashboard", () => ({
  Dashboard: ({ onNavigate }: any) => (
    <div data-testid="dashboard">
      Dashboard Page
      <button onClick={() => onNavigate("products")}>Go to Products</button>
    </div>
  ),
}));

jest.mock("@/components/products-page", () => ({
  ProductsPage: () => <div data-testid="products-page">Products Page</div>,
}));
jest.mock("@/components/orders-page", () => ({
  OrdersPage: () => <div data-testid="orders-page">Orders Page</div>,
}));
jest.mock("@/components/reviews-page", () => ({
  ReviewsPage: () => <div data-testid="reviews-page">Reviews Page</div>,
}));
jest.mock("@/components/carts-page", () => ({
  CartsPage: () => <div data-testid="carts-page">Carts Page</div>,
}));

describe("AdminPage", () => {
  it("renders the sidebar and the default dashboard page", () => {
    render(<AdminPage />);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard")).toBeInTheDocument();
    expect(screen.getByText("Sidebar - dashboard")).toBeInTheDocument();
  });

  it("navigates to the Products page when the sidebar triggers it", () => {
    render(<AdminPage />);

    fireEvent.click(screen.getByText("Go Products"));
    expect(screen.getByTestId("products-page")).toBeInTheDocument();
  });

  it("navigates to the Orders page when the sidebar triggers it", () => {
    render(<AdminPage />);

    fireEvent.click(screen.getByText("Go Orders"));
    expect(screen.getByTestId("orders-page")).toBeInTheDocument();
  });

  it("navigates to the Reviews page when the sidebar triggers it", () => {
    render(<AdminPage />);

    fireEvent.click(screen.getByText("Go Reviews"));
    expect(screen.getByTestId("reviews-page")).toBeInTheDocument();
  });

  it("navigates to the Carts page when the sidebar triggers it", () => {
    render(<AdminPage />);

    fireEvent.click(screen.getByText("Go Carts"));
    expect(screen.getByTestId("carts-page")).toBeInTheDocument();
  });

  it("returns to the Dashboard page when navigating back", () => {
    render(<AdminPage />);

    fireEvent.click(screen.getByText("Go Products"));
    expect(screen.getByTestId("products-page")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Go Dashboard"));
    expect(screen.getByTestId("dashboard")).toBeInTheDocument();
  });

  it("allows Dashboard to navigate to Products via its own button", () => {
    render(<AdminPage />);

    fireEvent.click(screen.getByText("Go to Products"));
    expect(screen.getByTestId("products-page")).toBeInTheDocument();
  });
});
