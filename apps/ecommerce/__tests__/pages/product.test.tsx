import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import ProductDetailPage from "@/app/products/[id]/page";
import { useParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { getProductById } from "@/lib/product-data";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/lib/cart-context", () => ({
  useCart: jest.fn(),
}));

jest.mock("@/lib/product-data", () => ({
  getProductById: jest.fn(),
}));

describe("ProductDetailPage", () => {
  const mockAddToCart = jest.fn();
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 99.99,
    rating: 4.5,
    reviews: 12,
    description: "This is a test product.",
    category: { name: "Electronics" },
    features: ["Feature A", "Feature B"],
    specifications: { Color: "Black", Weight: "1kg" },
    images: ["/img1.jpg", "/img2.jpg"],
    inStock: true,
    image: "/img1.jpg",
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useCart as jest.Mock).mockReturnValue({ addToCart: mockAddToCart });
    (getProductById as jest.Mock).mockReturnValue(mockProduct);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            data: [
              {
                id: 1,
                name: "Alice",
                date: "2025-01-01",
                rating: 5,
                comment: "Excellent product!",
              },
            ],
          }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("increments and decrements quantity correctly", async () => {
    await act(async () => {
      render(<ProductDetailPage />);
    });

    const minus = screen.getByText("-");
    const plus = screen.getByText("+");

    fireEvent.click(plus);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(minus);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calls addToCart when clicking 'Add to Cart'", async () => {
    await act(async () => {
      render(<ProductDetailPage />);
    });

    const addButton = screen.getByRole("button", { name: /Add to Cart/i });
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  it("switches between tabs correctly", async () => {
    await act(async () => {
      render(<ProductDetailPage />);
    });

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);

    fireEvent.click(tabs[1]);
    expect(
      await screen.findByText(/Technical Specifications/i)
    ).toBeInTheDocument();

    fireEvent.click(tabs[2]);
    await waitFor(() =>
      expect(screen.getByText(/Customer Reviews/i)).toBeInTheDocument()
    );
  });

  it("fetches and displays reviews properly", async () => {
    await act(async () => {
      render(<ProductDetailPage />);
    });

    fireEvent.click(screen.getAllByRole("tab")[2]);
    await waitFor(() => expect(screen.getByText(/Alice/i)).toBeInTheDocument());
    expect(screen.getByText(/Excellent product!/i)).toBeInTheDocument();
  });
});
