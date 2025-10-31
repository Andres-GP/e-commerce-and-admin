import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ProductsPage } from "@/components/products-page";

// Mock global fetch
global.fetch = jest.fn();

describe("ProductsPage Component", () => {
  const mockProducts = [
    {
      _id: "p1",
      id: 1,
      name: "iPhone 15",
      price: 999,
      category: { name: "Smartphones" },
      image: "https://example.com/iphone.jpg",
      inStock: true,
      rating: 5,
      description: "The latest iPhone",
    },
    {
      _id: "p2",
      id: 2,
      name: "MacBook Pro",
      price: 1999,
      category: { name: "Laptops" },
      image: "https://example.com/macbook.jpg",
      inStock: false,
      rating: 4.8,
      description: "A powerful laptop",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading placeholders initially", async () => {
    (fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise(() => {
          /* pending fetch */
        })
    );

    render(<ProductsPage />);
    const placeholders = screen.getAllByRole("generic", { hidden: true });
    expect(placeholders.length).toBeGreaterThanOrEqual(3);
  });

  it("renders 'No products found' when API returns empty", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: [] }),
    });

    render(<ProductsPage />);
    await waitFor(() =>
      expect(screen.getByText("No products found")).toBeInTheDocument()
    );
  });

  it("renders products correctly after fetching", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockProducts }),
    });

    render(<ProductsPage />);

    await waitFor(() => screen.getByText("iPhone 15"));

    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    expect(screen.getByText(/Smartphones/i)).toBeInTheDocument();
    expect(screen.getByText(/MacBook Pro/i)).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });

  it("filters products by search term", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockProducts }),
    });

    render(<ProductsPage />);
    await waitFor(() => screen.getByText("iPhone 15"));

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "macbook" } });

    await waitFor(() => {
      expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
      expect(screen.queryByText("iPhone 15")).not.toBeInTheDocument();
    });
  });

  it("does not delete product if user cancels", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockProducts }),
    });
    global.confirm = jest.fn(() => false);

    render(<ProductsPage />);
    await waitFor(() => screen.getByText("iPhone 15"));

    const deleteButtons = screen.getAllByRole("button");
    const deleteButton = deleteButtons.find((b) =>
      b.className.includes("text-destructive")
    );
    fireEvent.click(deleteButton!);

    expect(fetch).toHaveBeenCalledTimes(1); // only initial fetch
  });
});
