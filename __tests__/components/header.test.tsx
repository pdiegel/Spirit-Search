import { render, screen } from "@testing-library/react";
import Header, {
  genericLinks,
  loggedInLinks,
  linkStyle,
  activeLinkStyle,
} from "@/components/header"; // Adjust the import path accordingly
import { useUser as realUseUser } from "@auth0/nextjs-auth0/client";

const useUser = realUseUser as jest.Mock;
const mockUsePathname = jest.fn();
const testingBasePath = "http://localhost/";

// Correctly mock useUser hook
jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

beforeEach(() => {
  // Reset the mock before each test
  useUser.mockReset();
  mockUsePathname.mockReset();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("Header Component", () => {
  it("renders correctly for logged-in users", async () => {
    // Provide the mock implementation for this test case
    useUser.mockReturnValue({
      user: { nickname: "testUser", picture: "/test.jpg" },
    });
    render(<Header />);

    // Assert that the user image is rendered
    expect(screen.getByAltText(useUser().user.nickname)).toBeInTheDocument();
    // Assert that the logout link is rendered
    expect(screen.getByText("Logout")).toBeInTheDocument();
    // Assert that the login link is not rendered
    expect(screen.queryByText("Login")).not.toBeInTheDocument();

    // Assert the generic links are rendered
    genericLinks.forEach((link) => {
      expect(screen.getAllByText(link.label)[0]).toBeInTheDocument();
    });

    // Assert the logged-in links are rendered
    loggedInLinks.forEach((link) => {
      expect(screen.getAllByText(link.label)[0]).toBeInTheDocument();
    });

    const image = screen.getByRole("img", {
      name: useUser().user.nickname,
    }) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    // Assert the user picture is rendered. Image component changes the src
    // attribute, so we need to remove the '/' from the user picture path
    expect(image.src).toContain(useUser().user.picture.split("/").pop());
    expect(image).toHaveAttribute("alt", useUser().user.nickname);

    // Assert the user picture is a link to the user profile
  });

  it("renders correctly for loggen-in users with no nickname", async () => {
    // Provide the mock implementation for this test case
    useUser.mockReturnValue({
      user: { picture: "/test.jpg" },
    });
    render(<Header />);

    // Assert that the user image is rendered
    const image = screen.getByRole("img", {
      name: "User",
    }) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    // Assert the user picture is rendered. Image component changes the src
    // attribute, so we need to remove the '/' from the user picture path
    expect(image.src).toContain(useUser().user.picture.split("/").pop());
    expect(image).toHaveAttribute("alt", useUser().user.nickname);
  });

  it("renders correctly for loggen-in users with no picture", async () => {
    // Provide the mock implementation for this test case
    useUser.mockReturnValue({
      user: { nickname: "testUser" },
    });
    render(<Header />);

    // Assert that the user image is rendered
    const image = screen.getByRole("img", {
      name: useUser().user.nickname,
    }) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    // Assert the user picture is rendered. Image component changes the src
    // attribute, so we need to remove the '/' from the user picture path
    expect(image.src).toEqual(testingBasePath);
    expect(image).toHaveAttribute("alt", useUser().user.nickname);
  });

  it("renders correctly for logged-out users", async () => {
    // Provide the mock implementation for this test case
    useUser.mockReturnValue({
      user: null,
    });
    render(<Header />);

    // Assert that the login link is rendered
    expect(screen.getByText("Login")).toBeInTheDocument();
    // Assert that the user image is not rendered
    expect(screen.queryByText("User")).not.toBeInTheDocument();
    // Assert that the logout link is not rendered
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();

    // Assert the generic links are rendered
    genericLinks.forEach((link) => {
      expect(screen.getAllByText(link.label)[0]).toBeInTheDocument();
    });

    // Assert the logged-in links are not rendered
    loggedInLinks.forEach((link) => {
      expect(screen.queryAllByText(link.label)[0]) === undefined;
    });
  });

  test('with the pathname of "/"', () => {
    useUser.mockReturnValue({
      user: null,
    });
    mockUsePathname.mockImplementation(() => "/");
    expect(mockUsePathname()).toBe("/");

    render(<Header />);
    // Assert that the home link is active
    const ariaLabel = genericLinks[0].ariaLabel;
    expect(screen.getAllByLabelText(ariaLabel)[0]).toHaveClass(
      `${activeLinkStyle} hover:text-[#333]`
    );

    // Assert that the about link is not active
    const aboutAriaLabel = genericLinks[1].ariaLabel;
    expect(screen.getAllByLabelText(aboutAriaLabel)[0]).toHaveClass(
      `${linkStyle} hover:text-[#333]`
    );
  });

  test('with the pathname of "/user"', () => {
    useUser.mockReturnValue({
      user: { nickname: "testUser", picture: "/test.jpg" },
    });
    mockUsePathname.mockImplementation(() => "/user");
    expect(mockUsePathname()).toBe("/user");

    render(<Header />);
    // Assert that the user link is active
    const ariaLabel = loggedInLinks[0].ariaLabel;
    expect(screen.getAllByLabelText(ariaLabel)[0]).toHaveClass(
      `${activeLinkStyle} hover:text-[#333]`
    );

    // Assert that the about link is not active
    const aboutAriaLabel = genericLinks[1].ariaLabel;
    expect(screen.getAllByLabelText(aboutAriaLabel)[0]).toHaveClass(
      `${linkStyle} hover:text-[#333]`
    );
  });
});
