import { render, screen } from "@testing-library/react";
import { RecentlyAdded } from "../RecentlyAdded";
import { getRecentlyAddedAction } from "../../actions";
import { blogsMock } from "./mock-data";

jest.mock("../../actions", () => ({
  getRecentlyAddedAction: jest.fn(),
}));

jest.mock("../BlogCard", () => ({
  BlogCard: ({ blog }: { blog: BlogType }) => (
    <div data-testid="blog-card">{blog.title}</div>
  ),
}));

const mockGetRecentlyAddedAction = jest.mocked(getRecentlyAddedAction);

describe("RecentlyAdded component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders recently added blogs", async () => {
    mockGetRecentlyAddedAction.mockResolvedValue({
      success: true,
      data: blogsMock,
    });

    const jsx = await RecentlyAdded();
    render(jsx);

    expect(
      screen.getByRole("heading", {
        name: "Most recently",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Introduction to Next.js")).toBeInTheDocument();

    expect(
      screen.getByText("Understanding React Server Components"),
    ).toBeInTheDocument();

    expect(screen.getAllByTestId("blog-card")).toHaveLength(2);

    expect(mockGetRecentlyAddedAction).toHaveBeenCalledTimes(1);
  });

  it("if data is empty", async () => {
    mockGetRecentlyAddedAction.mockResolvedValue({
      success: false,
      data: [],
      error: "",
    });

    const jsx = await RecentlyAdded();
    render(jsx);

    expect(mockGetRecentlyAddedAction).toHaveBeenCalledTimes(1);

    expect(screen.getByText("Failed to load blogs.")).toBeInTheDocument();
  });
  it("if status is true but data is empty", async () => {
    mockGetRecentlyAddedAction.mockResolvedValue({
      success: true,
      data: [],
    });

    const jsx = await RecentlyAdded();
    render(jsx);

    expect(mockGetRecentlyAddedAction).toHaveBeenCalledTimes(1);

    expect(screen.getByText("Empty data!")).toBeInTheDocument();
  });
});
