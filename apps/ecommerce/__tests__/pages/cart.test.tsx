import { render, screen } from "@testing-library/react";
import CartPage from "@/app/cart/page";

jest.mock("@/lib/cart-context", () => ({
  useCart: jest.fn(),
}));

const { useCart } = require("@/lib/cart-context");

describe("CartPage", () => {
  it("renders the empty cart message when there are no items", () => {
    useCart.mockReturnValue({
      cart: [],
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      getTotalPrice: jest.fn().mockReturnValue(0),
      getTotalItems: jest.fn().mockReturnValue(0),
    });

    render(<CartPage />);

    expect(screen.getByText("Your Cart is Empty")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Looks like you haven't added anything to your cart yet."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Start Shopping/i })
    ).toBeInTheDocument();
  });

  it("renders cart items and order summary correctly", () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          productId: 101,
          name: "Test Product",
          price: 50,
          quantity: 2,
          image: "/test.jpg",
        },
      ],
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      getTotalPrice: jest.fn().mockReturnValue(100),
      getTotalItems: jest.fn().mockReturnValue(2),
    });

    render(<CartPage />);

    // Header
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("2 items in your cart")).toBeInTheDocument();

    // Product info
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    // Summary section
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getAllByText("$100.00")[0]).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Tax")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("$110.00")).toBeInTheDocument();

    // Buttons
    expect(
      screen.getByRole("link", { name: /Proceed to Checkout/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Continue Shopping/i })
    ).toBeInTheDocument();
  });
});
