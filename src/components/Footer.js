"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 w-full py-24 px-8 md:px-24 flex flex-col md:flex-row justify-between items-start gap-12 border-t border-zinc-100 dark:border-zinc-900 ease-in-out duration-500">
      <div className="text-xl font-serif tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
        L'ÉLÉGANCE
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 font-sans text-[10px] tracking-[0.3em] uppercase">
        <Link className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-200 hover:tracking-[0.4em] transition-all duration-500" href="/privacy">Privacy Policy</Link>
        <Link className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-200 hover:tracking-[0.4em] transition-all duration-500" href="/terms">Terms of Service</Link>
        <Link className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-200 hover:tracking-[0.4em] transition-all duration-500" href="/contact">Operational Hours</Link>
      </div>
      <div className="text-zinc-400 dark:text-zinc-600 font-sans text-[10px] tracking-[0.3em] uppercase">
        © {new Date().getFullYear()} MUSTAKEEM HANDSOME SALON. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
