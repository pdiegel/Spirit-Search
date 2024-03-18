"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import DropDownSelector from "./dropDownSelector";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface HomeLink {
  href: string;
  label: string;
  ariaLabel: string;
}

export const genericLinks: HomeLink[] = [
  { href: "/", label: "Home", ariaLabel: "Home page" },
  { href: "/explore", label: "Explore", ariaLabel: "Explore our spirits" },
  { href: "/about", label: "About", ariaLabel: "About this site" },
];

export const loggedInLinks: HomeLink[] = [
  { href: "/user", label: "Profile", ariaLabel: "User profile" },
  { href: "/favorites", label: "Favorites", ariaLabel: "Favorite spirits" },
];

export const activeLinkStyle =
  "bg-white transition-background-color duration-200 ease-in-out text-[#333]";
export const linkStyle =
  "bg-transparent hover:bg-white transition-background-color duration-200 ease-in-out";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const { user } = useUser();
  const pathname = usePathname();

  const controlHeaderVisibility = () => {
    if (typeof window !== "undefined") {
      // Check the current scroll position
      const currentScrollPos = window.scrollY;

      // Determine whether to show or hide the header
      setIsVisible(lastScrollPos > currentScrollPos || currentScrollPos < 10);
      // Update the last scroll position
      setLastScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeaderVisibility);

      return () => {
        window.removeEventListener("scroll", controlHeaderVisibility);
      };
    }
  }, [lastScrollPos]);

  const loggedIn = user ? true : false;

  const loggedInDisplay = loggedIn ? (
    <Link href="/api/auth/logout" className="button-secondary">
      Logout
    </Link>
  ) : (
    <Link href="/api/auth/login" className="button-primary">
      Login
    </Link>
  );

  const userLinkDisplay =
    loggedIn &&
    loggedInLinks.map((link) => {
      return (
        <Link
          key={link.href}
          href={link.href}
          aria-label={link.ariaLabel}
          className={`${
            pathname === link.href ? activeLinkStyle : linkStyle
          } hover:text-[#333]`}
        >
          {link.label}
        </Link>
      );
    });

  const genericLinkDisplay = genericLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      aria-label={link.ariaLabel}
      className={`${
        pathname === link.href ? activeLinkStyle : linkStyle
      } hover:text-[#333]`}
    >
      {link.label}
    </Link>
  ));

  return (
    <header
      className="md:py-[20px] md:px-[50px] lg:px-[100px] w-full"
      style={isVisible ? { top: "0" } : { top: "-150px" }}
    >
      <nav className="flex items-center justify-between">
        {/* Screens less than 640px wide */}
        <div className={`${loggedIn ? "lg:hidden" : "sm:hidden"}`}>
          <DropDownSelector icon="☰">
            {genericLinkDisplay}
            {userLinkDisplay}
          </DropDownSelector>
        </div>
        <Link href="/">
          <h1 className="text-3xl font-medium tracking-tight">Spirit Search</h1>
        </Link>

        {/* Screens 640px and wider */}
        <div
          className={`hidden ${
            loggedIn ? "lg:flex" : "sm:flex"
          } gap-[10px] font-medium`}
        >
          {genericLinkDisplay}
          {userLinkDisplay}
        </div>

        <div className="flex flex-col justify-center">{loggedInDisplay}</div>
      </nav>
    </header>
  );
}
