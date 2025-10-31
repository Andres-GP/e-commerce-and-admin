import { render, screen } from "@testing-library/react";
import CheckoutPage from "@/app/checkout/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/lib/cart-context", () => ({
  useCart: () => ({
    cart: [
      { id: 1, name: "Test Product", quantity: 2, price: 50 },
      { id: 2, name: "Another Item", quantity: 1, price: 100 },
    ],
    getTotalPrice: () => 200,
    clearCart: jest.fn(),
  }),
}));

// Silence irrelevant MUI migration warnings
beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation((msg) => {
    if (msg.includes("MUI Grid")) return;
    console.warn(msg);
  });
});

describe("CheckoutPage", () => {
  it("renders the checkout title and description", () => {
    render(<CheckoutPage />);
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Complete your purchase securely/i)
    ).toBeInTheDocument();
  });

  it("shows all shipping address fields", () => {
    render(<CheckoutPage />);
    const fields = [
      "First Name",
      "Last Name",
      "Email Address",
      "Phone Number",
      "Address",
      "City",
      "State",
      "ZIP Code",
    ];
    fields.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("displays the payment methods", () => {
    render(<CheckoutPage />);
    expect(screen.getByText(/Credit\/Debit Card/i)).toBeInTheDocument();
    expect(screen.getByText(/PayPal/i)).toBeInTheDocument();
    expect(screen.getByText(/Apple Pay/i)).toBeInTheDocument();
  });

  it("renders the order summary with product names and total", () => {
    render(<CheckoutPage />);
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Another Item/i)).toBeInTheDocument();
    expect(screen.getByText(/\$220\.00/i)).toBeInTheDocument(); // total with 10% tax
  });

  it("renders the Place Order button", () => {
    render(<CheckoutPage />);
    expect(
      screen.getByRole("button", { name: /Place Order/i })
    ).toBeInTheDocument();
  });
});
