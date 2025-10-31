import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductsPage from "@/app/products/page";
import { useCart } from "@/lib/cart-context";

jest.mock("@/lib/cart-context", () => ({
  useCart: jest.fn(),
}));

global.fetch = jest.fn();

const mockAddToCart = jest.fn();

describe("ProductsPage", () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({ addToCart: mockAddToCart });
    jest.clearAllMocks();
  });

  it("renders the page title and description", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true, data: [] }),
    });

    render(<ProductsPage />);
    expect(await screen.findByText(/Our Products/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Discover our curated collection of premium products/i)
    ).toBeInTheDocument();
  });

  it("fetches and displays products", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [
          {
            id: 1,
            name: "Test Product",
            price: 99,
            rating: 4.5,
            image: "/test.jpg",
            description: "A test product",
            category: { name: "Electronics" },
          },
        ],
      }),
    });

    render(<ProductsPage />);
    const names = await screen.findAllByText(/Test Product/i);
    expect(names.length).toBeGreaterThan(0);
    expect(screen.getByText(/\$99/i)).toBeInTheDocument();
  });

  it("calls addToCart when Add to Cart button is clicked", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [
          {
            id: 1,
            name: "Headphones",
            price: 79,
            rating: 4.3,
            image: "/headphones.jpg",
            description: "Noise cancelling",
            category: { name: "Audio" },
          },
        ],
      }),
    });

    render(<ProductsPage />);
    const addButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });
    fireEvent.click(addButton);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      name: "Headphones",
      price: 79,
      image: "/headphones.jpg",
    });
  });

  it("opens and closes the filter drawer on mobile", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true, data: [] }),
    });

    render(<ProductsPage />);
    const filterButton = screen.getByRole("button", { name: /filters/i });
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Filters/i)[0]).toBeInTheDocument();
    });

    const closeButtons = screen.getAllByRole("button");
    fireEvent.click(closeButtons[0]);
  });
});
