"use client";
import Link from "next/link";

export default function Navbar() {
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
      <input className="border bg-(--brand-bg) rounded-2xl w-full h-10 px-4 text-gray-500" type="text" placeholder="Search for products..."/>
      </div>
      <div className="flex gap-4">
        <button>
      profile
        </button>
        <button>
          Cart
        </button>
      </div>
     </div>
    </nav>
  );
}
