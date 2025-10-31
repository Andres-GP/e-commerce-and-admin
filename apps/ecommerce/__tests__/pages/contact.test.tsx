import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

describe("ContactPage", () => {
  it("renders the main title and subtitle", () => {
    render(<ContactPage />);
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Have a question or need assistance/i)
    ).toBeInTheDocument();
  });

  it("displays all contact info cards", () => {
    render(<ContactPage />);
    const titles = ["Email Us", "Call Us", "Visit Us", "Business Hours"];
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
    expect(screen.getByText("support@luxestore.com")).toBeInTheDocument();
    expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
    expect(
      screen.getByText("123 Commerce Street, NY 10001")
    ).toBeInTheDocument();
    expect(screen.getByText("Mon-Fri: 8am - 6pm")).toBeInTheDocument();
  });

  it("renders the contact form with all fields", () => {
    render(<ContactPage />);
    const fields = ["Your Name", "Email Address", "Subject", "Message"];
    fields.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", { name: /Send Message/i })
    ).toBeInTheDocument();
  });

  it("renders the FAQ section correctly", () => {
    render(<ContactPage />);
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Looking for quick answers\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /View FAQ/i })
    ).toBeInTheDocument();
  });
});
