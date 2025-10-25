"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold">TrendAura</h1>
      </Link>
      <div className="space-x-4">
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
