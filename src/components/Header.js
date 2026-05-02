"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md w-full top-0 sticky border-b border-zinc-100 dark:border-zinc-900 transition-all duration-700 ease-out z-50">
      <div className="flex justify-between items-center w-full px-8 md:px-16 py-6 z-50">
        <Link href="/" className="text-2xl font-serif tracking-[0.2em] uppercase text-zinc-900 dark:text-zinc-100">
          L'ÉLÉGANCE
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-serif tracking-tight text-sm uppercase">
          <Link className="text-zinc-900 dark:text-zinc-100 border-b border-zinc-900 dark:border-zinc-100 pb-1 hover:opacity-70 transition-opacity duration-500" href="/">Home</Link>
          <Link className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors pb-1 hover:opacity-70 duration-500" href="/services">Services</Link>
          <Link className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors pb-1 hover:opacity-70 duration-500" href="/bridal">Bridal</Link>
          <Link className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors pb-1 hover:opacity-70 duration-500" href="/portfolio">Portfolio</Link>
          <Link className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors pb-1 hover:opacity-70 duration-500" href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-6">
          <Link href="/contact#inquiry" className="hidden md:block font-button text-button uppercase text-primary border border-primary px-6 py-3 hover:bg-primary hover:text-on-primary transition-colors duration-300 rounded-none">
            Book Appointment
          </Link>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="chat" className="text-zinc-900 dark:text-zinc-100 hover:opacity-70 transition-opacity duration-500">
            <span className="material-symbols-outlined text-2xl">chat</span>
          </a>
        </div>
      </div>
    </header>
  );
}
