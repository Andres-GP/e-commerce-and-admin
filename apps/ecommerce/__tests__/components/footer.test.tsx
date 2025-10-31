import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer";

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("muestra el nombre de la tienda", () => {
    expect(screen.getByText("LuxeStore")).toBeInTheDocument();
  });

  it("muestra las secciones principales", () => {
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Newsletter")).toBeInTheDocument();
  });

  it("muestra algunos enlaces clave", () => {
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("muestra el campo de newsletter y el botón de suscripción", () => {
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("muestra el texto de derechos reservados", () => {
    expect(screen.getByText(/© 2025 LuxeStore/i)).toBeInTheDocument();
  });

  it("muestra los enlaces de políticas", () => {
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Cookie Policy")).toBeInTheDocument();
  });
});
