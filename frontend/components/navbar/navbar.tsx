"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push("/login");
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white shadow-md px-24 flex flex-row items-center gap-8 h-24">
      <div className="flex flex-row w-full gap-8">
        <Link className="whitespace-nowrap" href="/">
          <h1 className="text-3xl font-black">TREND AURA</h1>
        </Link>
        <div className="flex justify-between w-full items-center">
          <Link href="/shop">Shop</Link>
          <Link href="/about">On Sale</Link>
          <Link href="/contact">New arrivals</Link>
          <Link href="/login">Brands</Link>
        </div>
      </div>
      <div className="flex flex-row w-full gap-8">
        <div className="w-full">
          <input
            className="border bg-(--brand-bg) rounded-2xl w-full h-10 px-4 text-gray-500"
            type="text"
            placeholder="Search for products..."
          />
        </div>
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-purple-600">
                  {getInitials(user?.fullName)}
                </div>
                <span className="hidden sm:inline text-sm">{user?.fullName?.split(" ")[0]}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
            >
              Login
            </Link>
          )}

          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            Cart
          </button>
        </div>
      </div>
    </nav>
  );
}
