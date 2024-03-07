"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import DropDownSelector from "./dropDownSelector";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HomeLink {
  href: string;
  label: string;
  ariaLabel: string;
}

export const genericLinks: HomeLink[] = [
  { href: "/", label: "Search", ariaLabel: "Search for spirits" },
  { href: "/about", label: "About", ariaLabel: "About this site" },
];

export const loggedInLinks: HomeLink[] = [
  { href: "/user", label: "Profile", ariaLabel: "User profile" },
  { href: "/favorites", label: "Favorites", ariaLabel: "Favorite spirits" },
];

export const activeLinkStyle =
  "bg-white rounded px-2 py-1 transition-background-color duration-200 ease-in-out text-[#333]";
export const linkStyle =
  "bg-transparent hover:bg-white rounded px-2 py-1 transition-background-color duration-200 ease-in-out";

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname();

  const loggedIn = user ? true : false;

  const userDisplay = loggedIn && (
    <Link href={`/user`} aria-label="User portrait">
      <Image
        src={user?.picture || ""}
        alt={user?.nickname || "User"}
        width={50}
        height={50}
        className="rounded-full shadow-md"
      />
    </Link>
  );

  const loggedInDisplay = loggedIn ? (
    <Link href="/api/auth/logout">Logout</Link>
  ) : (
    <Link href="/api/auth/login">Login</Link>
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
    <header className="p-4 w-full">
      <div className="wrapper flex items-center justify-between">
        {/* Screens less than 640px wide */}
        <nav className="sm:hidden">
          <DropDownSelector icon="☰">
            {genericLinkDisplay}
            {userLinkDisplay}
          </DropDownSelector>
        </nav>

        <nav className="flex flex-col">
          <Link href="/">
            <h1 className="text-3xl font-medium tracking-tight">
              Spirit Search
            </h1>
          </Link>

          {/* Screens 640px and wider */}
          <div className="hidden sm:flex gap-4 mt-2 font-medium">
            {genericLinkDisplay}
            {userLinkDisplay}
          </div>
        </nav>
        <div className="flex flex-col justify-center">
          {userDisplay}
          {loggedInDisplay}
        </div>
      </div>
    </header>
  );
}
