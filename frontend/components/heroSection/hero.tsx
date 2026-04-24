import { Button } from "../ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <>
      <div className="w-full bg-(--brand-bg) px-4 md:px-12 lg:px-24 pt-12 md:pt-24 pb-12 md:pb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[calc(100vh-5rem)] md:min-h-0 md:h-[calc(100vh-5rem)]">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="mb-6 md:my-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                FIND CLOTHES THAT MATCHES{" "}
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  YOUR STYLE
                </span>
              </h1>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm md:text-base md:pr-16 leading-relaxed">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </span>
              <Link href="/shop">
                <Button className="my-6 md:my-8 w-full sm:w-auto px-12" size="sm">
                  Shop Now
                </Button>
              </Link>

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-6 md:gap-0 md:justify-between flex-wrap">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-2xl md:text-4xl font-bold">200+</span>
                  <span className="text-xs md:text-sm text-gray-500">
                    International Brands
                  </span>
                </div>
                <div className="hidden md:block w-px bg-gray-300" />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-2xl md:text-4xl font-bold">2,000+</span>
                  <span className="text-xs md:text-sm text-gray-500">
                    High-Quality Products
                  </span>
                </div>
                <div className="hidden md:block w-px bg-gray-300" />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-2xl md:text-4xl font-bold">30,000+</span>
                  <span className="text-xs md:text-sm text-gray-500">
                    Happy Customers
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md md:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=700&fit=crop"
                alt="Fashion models shopping"
                className="w-full h-auto md:h-[calc(100vh-12rem)] object-cover rounded-2xl md:rounded-none"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 hidden md:block">
                <svg viewBox="0 0 64 64" fill="none">
                  <path
                    d="M32 0L37 27L64 32L37 37L32 64L27 37L0 32L27 27L32 0Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="absolute bottom-12 -left-4 w-10 h-10 hidden md:block">
                <svg viewBox="0 0 64 64" fill="none">
                  <path
                    d="M32 0L37 27L64 32L37 37L32 64L27 37L0 32L27 27L32 0Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand strip */}
      <div className="bg-black w-full py-6 md:py-8 overflow-hidden">
        <div className="flex items-center justify-center gap-8 md:gap-16 text-white text-lg md:text-2xl font-bold opacity-60 flex-wrap px-4">
          <span>VERSACE</span>
          <span>ZARA</span>
          <span>GUCCI</span>
          <span>PRADA</span>
          <span className="hidden sm:inline">CALVIN KLEIN</span>
        </div>
      </div>
    </>
  );
}