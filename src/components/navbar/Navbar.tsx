"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavbar from "./MobileNavbar";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const pathname = usePathname();

  if (status === "loading") {
    <p>...</p>;
  }

  return (
    <div className="max-width w-full py-3">
      <nav className="hidden w-full items-center justify-between sm:flex">
        <div className="flex flex-1 items-center gap-5">
          <Link href="/">
            <Image
              src="/logo.png"
              width={70}
              height={70}
              priority
              alt="logo"
              className="aspect-auto h-6 w-6 rounded-full"
            />
          </Link>
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "rounded-full bg-black px-5 py-2 text-white"
                : null
            }`}
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              href="/create"
              className={`${
                pathname === "/create"
                  ? "rounded-full bg-black px-5 py-2 text-white"
                  : null
              }`}
            >
              Create
            </Link>
          )}
        </div>

        <div className="flex w-full flex-1 items-center gap-3 rounded-full bg-light-gray p-3">
          <label htmlFor="search">
            <Search />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="peer w-full bg-light-gray text-black focus:outline-none"
          />
        </div>

        <div className="flex flex-1 items-center justify-end gap-5">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className={`${
                  pathname === "/login"
                    ? "rounded-full bg-black px-5 py-2 text-white"
                    : null
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`${
                  pathname === "/register"
                    ? "rounded-full bg-black px-5 py-2 text-white"
                    : null
                }`}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link href="/ridlo">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-light-gray">
                  R
                </div>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* NAVBAR MOBILE HERE */}
      <MobileNavbar />
    </div>
  );
}
