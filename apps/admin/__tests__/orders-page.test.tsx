import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { OrdersPage } from "@/components/orders-page";

// Mock fetch globally
global.fetch = jest.fn();

describe("OrdersPage Component", () => {
  const mockOrders = [
    {
      _id: "order12345678",
      userId: "user1",
      items: [
        { name: "Product A", quantity: 2, price: 10 },
        { name: "Product B", quantity: 1, price: 5 },
      ],
      shippingAddress: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        address: "123 Street",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
      paymentMethod: "Credit Card",
      total: 25,
      status: "Delivered",
      createdAt: "2024-12-01T00:00:00.000Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading placeholders initially", async () => {
    (fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise(() => {
          /* never resolves */
        })
    );

    render(<OrdersPage />);

    const skeletons = screen.getAllByRole("generic", { hidden: true });
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders 'No orders found' when API returns empty list", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: [] }),
    });

    render(<OrdersPage />);

    await waitFor(() =>
      expect(screen.getByText("No orders found")).toBeInTheDocument()
    );
  });

  it("renders orders correctly after fetching", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockOrders }),
    });

    render(<OrdersPage />);

    await waitFor(() =>
      expect(screen.getByText(/Order #12345678/i)).toBeInTheDocument()
    );

    expect(screen.getByText("$25.00")).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });

  it("filters orders by email and order ID", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockOrders }),
    });

    render(<OrdersPage />);

    await waitFor(() =>
      expect(screen.getByText(/Order #12345678/i)).toBeInTheDocument()
    );

    const input = screen.getByPlaceholderText(/Search by email or order ID/i);
    fireEvent.change(input, { target: { value: "wrongemail@test.com" } });

    expect(screen.getByText("No orders found")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "john@example.com" } });
    expect(await screen.findByText(/Order #12345678/i)).toBeInTheDocument();
  });

  it("expands and collapses order details when clicked", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockOrders }),
    });

    render(<OrdersPage />);

    const orderCard = await screen.findByText(/Order #12345678/i);
    fireEvent.click(orderCard);

    await waitFor(() =>
      expect(screen.getByText(/Shipping Address/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Credit Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Product A/i)).toBeInTheDocument();

    fireEvent.click(orderCard);
    await waitFor(() =>
      expect(screen.queryByText(/Shipping Address/i)).not.toBeInTheDocument()
    );
  });
});
