"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./Icons";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/bridal", label: "Bridal" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-gradient-to-r from-primary to-[#1B4D40] text-white w-full top-0 sticky border-b border-primary/20 shadow-lg transition-all duration-700 ease-out z-50">
      <div className="flex justify-between items-center w-full px-6 md:px-16 py-5 z-50">
        <Link href="/" className="text-2xl font-serif tracking-[0.2em] uppercase text-secondary-container hover:text-secondary-fixed transition-colors">
          L'ÉLÉGANCE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-serif tracking-tight text-sm uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`pb-1 transition-all duration-500 ${
                isActive(link.href)
                  ? "text-secondary-fixed border-b-2 border-secondary-fixed font-semibold"
                  : "text-white/80 hover:text-secondary-fixed border-b-2 border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/booking" className="hidden md:block font-button text-button uppercase text-primary bg-secondary-fixed px-6 py-3 hover:bg-secondary-container hover:scale-105 transition-all duration-300 rounded-sm font-bold shadow-md">
            Book Appointment
          </Link>
          <a href="https://wa.me/918920784349" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center justify-center border border-white/20 rounded-sm px-3 py-2 text-[#25D366] bg-white/5 hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all duration-300">
            <WhatsAppIcon className="w-5 h-5" />
          </a>

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white hover:text-secondary-fixed transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              {mobileOpen ? (
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              ) : (
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary/20 px-6 py-6 shadow-xl animate-in slide-in-from-top">
          <nav className="flex flex-col gap-4 font-serif text-sm uppercase">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-2 text-lg transition-colors ${
                  isActive(link.href)
                    ? "text-secondary-fixed font-bold border-l-4 border-secondary-fixed pl-3"
                    : "text-white/80 hover:text-secondary-fixed hover:pl-3"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/booking" onClick={() => setMobileOpen(false)} className="mt-6 text-center font-button text-button uppercase text-primary bg-secondary-fixed px-6 py-4 hover:bg-secondary-container transition-all duration-300 rounded-sm shadow-md font-bold">
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
