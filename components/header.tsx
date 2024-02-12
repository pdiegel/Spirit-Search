"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import DropDownSelector from "./dropDownSelector";
import Link from "next/link";
import { usePathname } from "next/navigation";

const genericLinks = [
  { href: "/", label: "Search" },
  { href: "/about", label: "About" },
];

const loggedInLinks = [
  { href: "/user", label: "Profile" },
  { href: "/favorites", label: "Favorites" },
];

export default function Header() {
  const { user, error, isLoading } = useUser();
  const pathname = usePathname();

  const loggedIn = user ? true : false;

  const userDisplay = loggedIn && (
    <Link href={`/user`}>
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

  const currentLinkStyle =
    "bg-white rounded px-2 py-1 transition-background-color duration-200 ease-in-out text-[#333]";
  const linkStyle =
    "bg-transparent hover:bg-white rounded px-2 py-1 transition-background-color duration-200 ease-in-out";

  const userLinkDisplay =
    loggedIn &&
    loggedInLinks.map((link) => {
      return (
        <Link
          key={link.href}
          href={link.href}
          className={`${
            pathname === link.href ? currentLinkStyle : linkStyle
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
      className={`${
        pathname === link.href ? currentLinkStyle : linkStyle
      } hover:text-[#333]`}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="p-4 bg-primary text-text w-full">
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
