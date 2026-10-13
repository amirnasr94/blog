import { render, screen } from "@testing-library/react";
import { getBlogsAction } from "../../actions";
import { BlogsList } from "../BlogsList";
import { blogsMock } from "./mock-data";

jest.mock("../../actions", () => ({
  getBlogsAction: jest.fn(),
}));

jest.mock("../BlogCard", () => ({
  BlogCard: ({ blog }: { blog: BlogType }) => {
    return <div data-testid="blog-card">{blog.title}</div>;
  },
}));

const mockGetBlogsAction = jest.mocked(getBlogsAction);

describe("BlogsList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render BlogsList", async () => {
    mockGetBlogsAction.mockResolvedValue({
      success: true,
      data: blogsMock,
    });
    const jsx = await BlogsList();
    render(jsx);

    expect(mockGetBlogsAction).toHaveBeenCalledTimes(1);

    expect(screen.getAllByTestId("blog-card")).toHaveLength(2);

    expect(screen.getByText("Introduction to Next.js")).toBeInTheDocument();

    expect(
      screen.getByText("Understanding React Server Components"),
    ).toBeInTheDocument();
  });

  it("if data is empty", async () => {
    mockGetBlogsAction.mockResolvedValue({
      success: false,
      data: [],
      error: "",
    });

    const jsx = await BlogsList();
    render(jsx);

    expect(mockGetBlogsAction).toHaveBeenCalledTimes(1);

    expect(screen.getByText("Failed to load blogs.")).toBeInTheDocument();
  });
  it("if status is true but data is empty", async () => {
    mockGetBlogsAction.mockResolvedValue({
      success: true,
      data: [],
    });

    const jsx = await BlogsList();
    render(jsx);

    expect(mockGetBlogsAction).toHaveBeenCalledTimes(1);

    expect(screen.getByText("Empty data!")).toBeInTheDocument();
  });
});
