import { render, screen } from "@testing-library/react";
import Header from "@/components/header"; // Adjust the import path accordingly
import { useUser as realUseUser } from "@auth0/nextjs-auth0/client";

const useUser = realUseUser as jest.Mock;

// Correctly mock useUser hook
jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}));

describe("Header Component", () => {
  it("renders correctly for logged-in users", async () => {
    // Provide the mock implementation for this test case
    useUser.mockReturnValue({
      user: { nickname: "testUser", picture: "/test.jpg" },
      error: null,
      isLoading: false,
    });

    // Directly render Header without UserProvider
    render(<Header />);

    // Assert that the user image is rendered
    // Log the output of screen.debug() to see the rendered output

    expect(screen.getByAltText("testUser")).toBeInTheDocument();
  });

  // Additional tests...
});
