import { render, screen } from "@testing-library/react";
import OrderSuccessPage from "@/app/order-success/page";

describe("OrderSuccessPage", () => {
  it("renders the main success message", () => {
    render(<OrderSuccessPage />);
    expect(screen.getByText(/Order Placed Successfully!/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your order has been confirmed and will be shipped soon/i
      )
    ).toBeInTheDocument();
  });

  it("renders the 'What's Next?' section correctly", () => {
    render(<OrderSuccessPage />);

    expect(screen.getByText(/What's Next\?/i)).toBeInTheDocument();

    expect(screen.getByText(/Check Your Email/i)).toBeInTheDocument();
    expect(
      screen.getByText(/confirmation email with your order details/i)
    ).toBeInTheDocument();

    const trackTexts = screen.getAllByText(/Track Your Order/i);
    expect(trackTexts.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/track your order status anytime/i)
    ).toBeInTheDocument();
  });

  it("renders both call-to-action links", () => {
    render(<OrderSuccessPage />);

    const continueShopping = screen.getByRole("link", {
      name: /Continue Shopping/i,
    });
    const backToHome = screen.getByRole("link", { name: /Back to Home/i });

    expect(continueShopping).toBeInTheDocument();
    expect(continueShopping).toHaveAttribute("href", "/products");
    expect(backToHome).toBeInTheDocument();
    expect(backToHome).toHaveAttribute("href", "/");
  });

  it("displays all key icons sections (CheckCircle, Mail, Package)", () => {
    render(<OrderSuccessPage />);
    expect(screen.getByText(/Order Placed Successfully!/i)).toBeInTheDocument();
    expect(screen.getByText(/Check Your Email/i)).toBeInTheDocument();

    const trackSections = screen.getAllByText(/Track Your Order/i);
    expect(trackSections.length).toBeGreaterThan(0);
  });
});
