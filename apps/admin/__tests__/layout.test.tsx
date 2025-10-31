import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";
import React from "react";

// Mock the Analytics component to avoid rendering the real one
jest.mock("@vercel/analytics/next", () => ({
  Analytics: () => <div data-testid="analytics-component" />,
}));

describe("RootLayout", () => {
  it("renders children correctly", () => {
    render(
      <RootLayout>
        <div data-testid="child-element">Test Child</div>
      </RootLayout>
    );

    const child = screen.getByTestId("child-element");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Test Child");
  });

  it("has html element with lang='en' and class='dark'", () => {
    const { container } = render(
      <RootLayout>
        <div />
      </RootLayout>
    );

    const htmlElement = container.querySelector("html");
    expect(htmlElement).toHaveAttribute("lang", "en");
    expect(htmlElement).toHaveClass("dark");
  });

  it("applies correct body classes", () => {
    const { container } = render(
      <RootLayout>
        <div />
      </RootLayout>
    );

    const bodyElement = container.querySelector("body");
    expect(bodyElement).toHaveClass("font-sans", "antialiased");
  });

  it("renders the Analytics component", () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );

    const analytics = screen.getByTestId("analytics-component");
    expect(analytics).toBeInTheDocument();
  });

  it("exports correct metadata", () => {
    expect(metadata).toEqual({
      title: "Admin Dashboard - E-Commerce",
      description: "Manage your e-commerce platform",
    });
  });
});
