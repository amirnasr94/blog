import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Login } from "../components";
import { loginAction } from "../actions";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

jest.mock("../actions", () => ({
  loginAction: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockLoginAction = jest.mocked(loginAction);
const mockUseRouter = jest.mocked(useRouter);
const mockReplace = jest.fn();

const mockRouter: AppRouterInstance = {
  push: jest.fn(),
  replace: mockReplace,
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  bfcacheId: "",
};

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoginAction.mockReset();
    mockUseRouter.mockReturnValue(mockRouter);
  });

  it("render Login correctly", () => {
    render(<Login />);

    expect(
      screen.getByText("Login to get started right away."),
    ).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("display an error when email is invalid", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("amir@gmail.com"), {
      target: {
        value: "invalid",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("Invalid email address"),
    ).toBeInTheDocument();

    expect(mockLoginAction).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("display an error when password is invalid", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("••••••"), {
      target: {
        value: "",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(mockLoginAction).not.toHaveBeenCalled();
    expect(
      await screen.findByText("Be at least 8 characters long"),
    ).toBeInTheDocument();

    expect(mockLoginAction).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("submit login form if user will be find", async () => {
    render(<Login />);
    mockLoginAction.mockResolvedValue({
      success: true,
    });

    fireEvent.change(screen.getByPlaceholderText("amir@gmail.com"), {
      target: {
        value: "x@gmail.com",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••"), {
      target: {
        value: "X123456#",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    await waitFor(() => {
      expect(mockLoginAction).toHaveBeenCalledWith({
        email: "x@gmail.com",
        password: "X123456#",
      });
    });

    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("submit login form if user will not be find", async () => {
    render(<Login />);
    mockLoginAction.mockResolvedValue({
      success: false,
      error: "",
    });

    fireEvent.change(screen.getByPlaceholderText("amir@gmail.com"), {
      target: {
        value: "x@gmail.com",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••"), {
      target: {
        value: "X123456#",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockLoginAction).toHaveBeenCalledWith({
        email: "x@gmail.com",
        password: "X123456#",
      });
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });
});
