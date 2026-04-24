"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.totalItems);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setMobileMenuOpen(false);
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

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "On Sale" },
    { href: "/shop?category=new", label: "New Arrivals" },
    { href: "/shop?category=brands", label: "Brands" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={22} className="text-gray-700" />
              </button>

              <Link href="/" className="flex items-center gap-2 group" id="logo-link">
                <div className="relative">
                  <span className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    TREND
                  </span>
                  <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
                    AURA
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300" />
                </div>
              </Link>
            </div>

            {/* Center: Nav Links (desktop) */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>

            {/* Right: Search, Cart, User */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search bar — desktop */}
              <div className="hidden md:flex items-center relative">
                <div
                  className={`flex items-center transition-all duration-300 overflow-hidden rounded-xl border ${
                    searchOpen
                      ? "w-64 border-gray-200 bg-gray-50/80"
                      : "w-10 border-transparent"
                  }`}
                >
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-2.5 flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Search"
                    id="search-toggle"
                  >
                    <Search size={18} />
                  </button>
                  {searchOpen && (
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pr-3 py-2 bg-transparent text-sm outline-none placeholder:text-gray-400"
                      autoFocus
                    />
                  )}
                </div>
              </div>

              {/* Search icon — mobile */}
              <button
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 md:p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                id="cart-link"
              >
                <ShoppingCart size={20} />
                {cartItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full px-1 animate-in zoom-in duration-200">
                    {cartItems > 99 ? "99+" : cartItems}
                  </span>
                )}
              </Link>

              {/* User */}
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    id="user-menu-toggle"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-pink-200/50 transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white">
                      {getInitials(user?.fullName)}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">
                      {user?.fullName?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`hidden sm:block text-gray-500 transition-transform duration-200 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute right-0 mt-2 w-52 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right ${
                      showDropdown
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User size={16} className="text-gray-400" />
                        View Profile
                      </Link>
                      <Link
                        href="/cart"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <ShoppingCart size={16} className="text-gray-400" />
                        My Cart
                        {cartItems > 0 && (
                          <span className="ml-auto text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium">
                            {cartItems}
                          </span>
                        )}
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 hover:-translate-y-0.5 transition-all duration-200"
                    id="login-link"
                  >
                    Login
                  </Link>
                  <Link
                    href="/login"
                    className="sm:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Login"
                  >
                    <User size={20} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <span className="text-xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                TREND
              </span>
              <span className="text-xl font-black text-gray-900">AURA</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Search (mobile) */}
          <div className="p-4">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-200">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Nav Links */}
          <div className="px-3 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 mx-4 my-2" />

          {/* Cart link */}
          <div className="px-3">
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart size={18} className="text-gray-500" />
                Cart
              </div>
              {cartItems > 0 && (
                <span className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2.5 py-0.5 rounded-full font-bold">
                  {cartItems}
                </span>
              )}
            </Link>
          </div>

          {/* Bottom Auth Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50/50">
            {isLoggedIn ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                    {getInitials(user?.fullName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:shadow-lg transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
}
