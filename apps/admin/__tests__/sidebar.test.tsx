import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "@/components/sidebar";

describe("Sidebar Component", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header and user info", () => {
    render(<Sidebar currentPage="dashboard" onPageChange={mockOnPageChange} />);

    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
    expect(screen.getByText("E-Commerce Management")).toBeInTheDocument();
    expect(screen.getByText("Admin User")).toBeInTheDocument();
    expect(screen.getByText("admin@store.com")).toBeInTheDocument();
  });

  it("renders all menu items correctly", () => {
    render(<Sidebar currentPage="dashboard" onPageChange={mockOnPageChange} />);

    const menuItems = ["Dashboard", "Products", "Orders", "Reviews", "Carts"];
    menuItems.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("highlights the active menu item", () => {
    render(<Sidebar currentPage="products" onPageChange={mockOnPageChange} />);

    const activeButton = screen.getByText("Products").closest("button");
    expect(activeButton).toHaveClass("bg-primary");
    expect(activeButton).toHaveClass("text-primary-foreground");
  });

  it("calls onPageChange when a menu item is clicked", () => {
    render(<Sidebar currentPage="dashboard" onPageChange={mockOnPageChange} />);

    const productsButton = screen.getByText("Products").closest("button");
    fireEvent.click(productsButton!);

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith("products");
  });

  it("applies animation class to the active icon", () => {
    render(<Sidebar currentPage="reviews" onPageChange={mockOnPageChange} />);

    const activeIcon = screen.getByText("Reviews")
      .previousSibling as HTMLElement;
    expect(activeIcon).toHaveClass("animate-pulse");
  });

  it("does not apply animation class to inactive icons", () => {
    render(<Sidebar currentPage="orders" onPageChange={mockOnPageChange} />);

    const inactiveIcon = screen.getByText("Dashboard")
      .previousSibling as HTMLElement;
    expect(inactiveIcon).not.toHaveClass("animate-pulse");
  });

  it("renders the sidebar layout structure properly", () => {
    const { container } = render(
      <Sidebar currentPage="dashboard" onPageChange={mockOnPageChange} />
    );

    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("flex", "flex-col");
    expect(aside).toBeInTheDocument();

    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
    expect(nav?.querySelectorAll("button")).toHaveLength(5);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Sidebar currentPage="dashboard" onPageChange={mockOnPageChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
