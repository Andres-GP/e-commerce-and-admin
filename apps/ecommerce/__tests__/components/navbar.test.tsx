import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("next/link", () => {
  return ({ href, children }: any) => <a href={href}>{children}</a>;
});

jest.mock("@/lib/cart-context", () => ({
  useCart: () => ({
    getTotalItems: () => 3,
  }),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it("muestra el nombre de la tienda", () => {
    expect(screen.getByText("LuxeStore")).toBeInTheDocument();
  });

  it("muestra los elementos de navegación principales", () => {
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("muestra el ícono del carrito con el número correcto", () => {
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("tiene un botón para abrir el menú móvil", () => {
    const menuButton = screen
      .getAllByRole("button")
      .find((btn) => btn.querySelector("svg"));
    expect(menuButton).toBeTruthy();
  });
});
