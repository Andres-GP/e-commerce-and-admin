/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Dashboard } from "@/components/dashboard";

global.fetch = jest.fn();

describe("Dashboard Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders welcome message and shows loading skeletons initially", () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<Dashboard onNavigate={mockNavigate} />);

    expect(screen.getByText("Welcome back, Admin")).toBeInTheDocument();
    expect(
      screen.getByText("Here's what's happening with your store today.")
    ).toBeInTheDocument();

    // look for skeleton placeholders by class or style
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("calls onNavigate when clicking stat cards", async () => {
    const mockProducts = { total: 1 };
    const mockOrders = { total: 1, data: [{ total: 10 }] };
    const mockReviews = { total: 1 };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ json: async () => mockProducts })
      .mockResolvedValueOnce({ json: async () => mockOrders })
      .mockResolvedValueOnce({ json: async () => mockReviews });

    render(<Dashboard onNavigate={mockNavigate} />);

    await waitFor(() => screen.getByText("Total Products"));

    fireEvent.click(screen.getByText("Total Products"));
    expect(mockNavigate).toHaveBeenCalledWith("products");
  });

  it("calls onNavigate from quick actions", async () => {
    const mockProducts = { total: 1 };
    const mockOrders = { total: 1, data: [{ total: 10 }] };
    const mockReviews = { total: 1 };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ json: async () => mockProducts })
      .mockResolvedValueOnce({ json: async () => mockOrders })
      .mockResolvedValueOnce({ json: async () => mockReviews });

    render(<Dashboard onNavigate={mockNavigate} />);

    await waitFor(() => screen.getByText("Quick Actions"));

    fireEvent.click(screen.getByText("Manage Products"));
    expect(mockNavigate).toHaveBeenCalledWith("products");

    fireEvent.click(screen.getByText("View Orders"));
    expect(mockNavigate).toHaveBeenCalledWith("orders");

    fireEvent.click(screen.getByText("Moderate Reviews"));
    expect(mockNavigate).toHaveBeenCalledWith("reviews");
  });

  it("handles fetch errors gracefully", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    render(<Dashboard onNavigate={mockNavigate} />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "Failed to fetch stats:",
        expect.any(Error)
      );
    });

    consoleError.mockRestore();
  });
});
