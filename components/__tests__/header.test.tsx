import { render, screen } from "@testing-library/react";
import Header from "../Header";
import Navbar from "../Navbar";
import { navLinks } from "../nav-links";

jest.mock("@/features/auth/actions", () => ({
  getUser: jest.fn(),
}));

jest.mock("@/features/auth/components/AuthSection", () => ({
  __esModule: true,
  AuthSection: () => <div data-testid="auth-section" />,
}));

describe("Header component", () => {
  it("renders a BLOG link", () => {
    render(<Header />);
    const blogLink = screen.getByRole("link", {
      name: "BLOG",
    });
    expect(blogLink).toBeInTheDocument();
  });

  it("renders all expected navbar links", () => {
    render(<Navbar />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(navLinks.length);

    for (const link of navLinks) {
      expect(
        screen.getByRole("link", { name: link.label }),
      ).toBeInTheDocument();
    }
  });
});
