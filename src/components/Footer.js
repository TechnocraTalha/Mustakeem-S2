"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background w-full py-24 px-8 md:px-24 flex flex-col md:flex-row justify-between items-start gap-12 border-t border-white/5 ease-in-out duration-500">
      <div className="text-xl font-serif tracking-[0.1em] text-secondary text-center md:text-left flex flex-col items-start">
        <span className="text-sm tracking-widest text-secondary/80 mb-1">THE</span>
        MUSTAKEEM'S HANDSOME
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 font-sans text-[10px] tracking-[0.3em] uppercase">
        <Link className="text-white/50 hover:text-secondary hover:tracking-[0.4em] transition-all duration-500" href="/privacy">Privacy Policy</Link>
        <Link className="text-white/50 hover:text-secondary hover:tracking-[0.4em] transition-all duration-500" href="/terms">Terms of Service</Link>
        <Link className="text-white/50 hover:text-secondary hover:tracking-[0.4em] transition-all duration-500" href="/contact">Operational Hours</Link>
      </div>
      <div className="text-white/50 font-sans text-[10px] tracking-[0.3em] uppercase">
        © {new Date().getFullYear()} MUSTAKEEM HANDSOME SALON. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
