import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/components/header";
import { UserProvider } from "@auth0/nextjs-auth0/client";

describe("Header", () => {
  it("renders the header", () => {
    render(
      <UserProvider>
        <Header />
      </UserProvider>
    );

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });
});
