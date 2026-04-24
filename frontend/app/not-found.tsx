import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="text-center relative z-10 max-w-lg">
        {/* 404 Number */}
        <div className="relative mb-6">
          <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="absolute inset-0 text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 bg-clip-text blur-xl select-none">
            404
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-10 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            id="back-home-btn"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            id="browse-shop-btn"
          >
            <Search size={18} />
            Browse Shop
          </Link>
        </div>

        {/* Back link */}
        <button
          onClick={() => typeof window !== "undefined" && window.history.back()}
          className="inline-flex items-center gap-1.5 mt-8 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Go back to previous page
        </button>
      </div>
    </div>
  );
}
