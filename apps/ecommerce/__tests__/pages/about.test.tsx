import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

describe("AboutPage", () => {
  beforeEach(() => {
    render(<AboutPage />);
  });

  it("renders main title", () => {
    expect(screen.getByText("About LuxeStore")).toBeInTheDocument();
  });

  it("shows 'Our story'", () => {
    expect(screen.getByText("Our Story")).toBeInTheDocument();
    expect(
      screen.getByText(/Founded in 2020, LuxeStore began with a simple vision/i)
    ).toBeInTheDocument();
  });

  it("shows 'Our Values'", () => {
    expect(screen.getByText("Our Values")).toBeInTheDocument();
    expect(
      screen.getByText("The principles that guide everything we do")
    ).toBeInTheDocument();
  });

  it("renders 4 main values", () => {
    const values = [
      "Our Mission",
      "Customer First",
      "Quality Assured",
      "Innovation",
    ];
    values.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("shows 'Meet Our Team'", () => {
    expect(screen.getByText("Meet Our Team")).toBeInTheDocument();
    expect(
      screen.getByText("The talented people behind LuxeStore")
    ).toBeInTheDocument();
  });

  it("shows 4 team members", () => {
    const team = [
      { name: "Sarah Johnson", role: "CEO & Founder" },
      { name: "Michael Chen", role: "Head of Operations" },
      { name: "Emma Davis", role: "Creative Director" },
      { name: "James Wilson", role: "Tech Lead" },
    ];
    team.forEach(({ name, role }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it("shows 'Join Our Journey'", () => {
    expect(screen.getByText("Join Our Journey")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Be part of our growing community of satisfied customers/i
      )
    ).toBeInTheDocument();
  });
});
