"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import DropDownSelector from "./dropDownSelector";

export default function Header() {
  const { user, error, isLoading } = useUser();
  {
    user && console.log("logged in");
  }

  const loggedIn = user ? true : false;

  const loggedInDisplay = loggedIn ? (
    <a href="/api/auth/logout">Logout</a>
  ) : (
    <a href="/api/auth/login">Login</a>
  );

  const userDisplay = loggedIn && (
    <>
      <Image
        src={user?.picture || ""}
        alt={user?.nickname || "User"}
        width={50}
        height={50}
        className="rounded-full shadow-md"
      />
    </>
  );

  const userLinks = loggedIn && (
    <>
      <a href="/profile">Profile</a>
      <a href="/favorites">Favorites</a>
    </>
  );

  return (
    <header className="flex-col items-center justify-between p-8 bg-primary text-text">
      <div className="wrapper">
        <h1 className="text-3xl font-bold">Spirit Search</h1>
        <div className="flex items-center">
          <nav>{loggedInDisplay}</nav>

          {userDisplay}
        </div>
        <div className="sm:hidden">
          <DropDownSelector icon="☰">
            <a href="/">Search</a>
            <a href="/about">About</a>
            {userLinks}
          </DropDownSelector>
        </div>
      </div>
    </header>
  );
}
