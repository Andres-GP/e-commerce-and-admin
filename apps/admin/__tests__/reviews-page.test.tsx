import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ReviewsPage } from "@/components/reviews-page";

global.fetch = jest.fn();

describe("ReviewsPage Component", () => {
  const mockReviews = [
    {
      _id: "r1",
      productId: 101,
      name: "Alice Johnson",
      rating: 5,
      date: "2025-10-10",
      comment: "Fantastic product! Highly recommend.",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      _id: "r2",
      productId: 202,
      name: "Bob Smith",
      rating: 3,
      date: "2025-10-08",
      comment: "It’s okay, but could be better.",
      avatar: "https://example.com/avatar2.jpg",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading placeholders initially", () => {
    (fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise(() => {
          /* never resolves */
        })
    );

    render(<ReviewsPage />);

    const placeholders = screen.getAllByRole("generic", { hidden: true });
    expect(placeholders.length).toBeGreaterThanOrEqual(3);
  });

  it("renders empty state when there are no reviews", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: [] }),
    });

    render(<ReviewsPage />);

    await waitFor(() =>
      expect(screen.getByText("No reviews found")).toBeInTheDocument()
    );
    expect(screen.getByText("Reviews")).toBeInTheDocument();
  });

  it("renders reviews correctly after fetching data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockReviews }),
    });

    render(<ReviewsPage />);

    await waitFor(() => screen.getByText("Alice Johnson"));

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(
      screen.getByText("Fantastic product! Highly recommend.")
    ).toBeInTheDocument();
    expect(screen.getByText("Product ID: 101")).toBeInTheDocument();
  });

  it("filters reviews by search term (name and comment)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockReviews }),
    });

    render(<ReviewsPage />);
    await waitFor(() => screen.getByText("Alice Johnson"));

    const searchInput = screen.getByPlaceholderText("Search reviews...");
    fireEvent.change(searchInput, { target: { value: "bob" } });

    await waitFor(() => {
      expect(screen.getByText("Bob Smith")).toBeInTheDocument();
      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    });

    // Now test filtering by comment
    fireEvent.change(searchInput, { target: { value: "fantastic" } });

    await waitFor(() => {
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
    });
  });

  it("shows correct number of review cards", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockReviews }),
    });

    render(<ReviewsPage />);
    await waitFor(() => screen.getByText("Alice Johnson"));

    const reviewCards = screen.getAllByText(/Product ID:/i);
    expect(reviewCards.length).toBe(2);
  });
});
