import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signupAction } from "../actions";
import { SignUp } from "../components";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

jest.mock("../actions", () => ({
  signupAction: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockSignupAction = jest.mocked(signupAction);
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

describe("Sign In Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSignupAction.mockReset();
    mockUseRouter.mockReturnValue(mockRouter);
  });

  it("render sign in component correctly", () => {
    render(<SignUp />);

    expect(
      screen.getByText("Create an account to get started."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("fullName-inp")).toBeInTheDocument();
    expect(screen.getByTestId("email-inp")).toBeInTheDocument();
    expect(screen.getByTestId("password-inp")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Sign Up" }));
  });

  it("display error when Full Name has a wrong value", async () => {
    render(<SignUp />);
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();

    expect(mockSignupAction).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("display error when Email has a wrong value", async () => {
    render(<SignUp />);

    const emailInput = screen.getByTestId("email-inp");

    fireEvent.change(emailInput, {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(
      await screen.findByText("Invalid email address"),
    ).toBeInTheDocument();

    expect(mockSignupAction).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("display error when Password has a wrong value", async () => {
    render(<SignUp />);

    const mostCases = {
      "": "Be at least 8 characters long",
      asdfghjk: "Contain at least one number.",
      "11111111": "Contain at least one letter.",
      "1a2a3a4a": "Contain at least one special character.",
    };

    const passwordInput = screen.getByTestId("password-inp");

    for (const key in mostCases) {
      fireEvent.change(passwordInput, {
        target: { value: key },
      });
      fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
      expect(
        await screen.findByText(mostCases[key as keyof typeof mostCases]),
      ).toBeInTheDocument();
    }

    expect(mockSignupAction).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("submit sign-up form successfuly", async () => {
    render(<SignUp />);
    mockSignupAction.mockResolvedValue({
      success: true,
    });

    const fullName_Inp = screen.getByTestId("fullName-inp");
    const email_Inp = screen.getByTestId("email-inp");
    const password_Inp = screen.getByTestId("password-inp");

    fireEvent.change(fullName_Inp, {
      target: {
        value: "test name",
      },
    });
    fireEvent.change(email_Inp, {
      target: {
        value: "x@gmail.com",
      },
    });
    fireEvent.change(password_Inp, {
      target: {
        value: "X123456#",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockSignupAction).toHaveBeenCalledWith({
        name: "test name",
        email: "x@gmail.com",
        password: "X123456#",
      });
    });

    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("submit sign-up form not successfuly", async () => {
    render(<SignUp />);
    mockSignupAction.mockResolvedValue({
      success: false,
      error: "",
    });

    const fullName_Inp = screen.getByTestId("fullName-inp");
    const email_Inp = screen.getByTestId("email-inp");
    const password_Inp = screen.getByTestId("password-inp");

    fireEvent.change(fullName_Inp, {
      target: {
        value: "test name",
      },
    });
    fireEvent.change(email_Inp, {
      target: {
        value: "x@gmail.com",
      },
    });
    fireEvent.change(password_Inp, {
      target: {
        value: "X123456#",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockSignupAction).toHaveBeenCalledWith({
        name: "test name",
        email: "x@gmail.com",
        password: "X123456#",
      });
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });
});
