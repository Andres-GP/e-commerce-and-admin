/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import { CartsPage } from "@/components/carts-page";
import React from "react";

global.fetch = jest.fn();

describe("CartsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders skeletons while loading", async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // stays loading
    );

    render(<CartsPage />);
    expect(screen.getByText("Active Carts")).toBeInTheDocument();
    expect(
      screen.getByText("Monitor customer shopping carts")
    ).toBeInTheDocument();
  });

  it("renders 'No active carts' when the response is empty", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: [] }),
    });

    render(<CartsPage />);

    await waitFor(() => {
      expect(screen.getByText("No active carts")).toBeInTheDocument();
    });
  });

  it("handles fetch errors gracefully", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    render(<CartsPage />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "Failed to fetch carts:",
        expect.any(Error)
      );
    });

    consoleError.mockRestore();
  });
});
