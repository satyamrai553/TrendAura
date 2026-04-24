import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Press", href: "/about" },
  ],
  Help: [
    { label: "Customer Support", href: "/about" },
    { label: "Delivery Details", href: "/about" },
    { label: "Returns & Exchanges", href: "/about" },
    { label: "Terms & Conditions", href: "/about" },
  ],
  Shop: [
    { label: "New Arrivals", href: "/shop?category=new" },
    { label: "On Sale", href: "/shop" },
    { label: "Men", href: "/shop?category=men" },
    { label: "Women", href: "/shop?category=women" },
  ],
};

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Strip */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                STAY UP TO DATE ABOUT OUR LATEST OFFERS
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-[300px] pl-10 pr-4 py-3 rounded-xl bg-white text-gray-800 text-sm outline-none placeholder:text-gray-400"
                />
              </div>
              <button className="px-6 py-3 bg-white text-gray-900 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  TREND
                </span>
                <span className="text-white">AURA</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              We bring you the latest trends in fashion. Discover your unique
              style with our curated collection of premium clothing and
              accessories.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 text-gray-400 hover:text-white transition-all duration-200"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>support@trendaura.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>New York, NY 10001</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} TrendAura. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600 bg-gray-800 px-3 py-1 rounded-full">
              Visa
            </span>
            <span className="text-xs text-gray-600 bg-gray-800 px-3 py-1 rounded-full">
              Mastercard
            </span>
            <span className="text-xs text-gray-600 bg-gray-800 px-3 py-1 rounded-full">
              PayPal
            </span>
            <span className="text-xs text-gray-600 bg-gray-800 px-3 py-1 rounded-full">
              GPay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
