"use client";

import Image from "next/image";
import Link from "next/link";
import { Dumbbell, ListChecks, Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/components/fitlog-context";

export function SiteHeader() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  return <header className="site-header">
    <Link href="/" className="brand"><Image src="/assets/logo.png" alt="FitLog logo" width={28} height={28} /><span>FIT<span>LOG</span></span></Link>
    <nav className="main-nav" aria-label="Primary navigation">
      <Link className={pathname === "/" ? "active" : ""} href="/">Workout</Link>
      <Link className={pathname === "/my-plan" ? "active" : ""} href="/my-plan">My Plan</Link>
    </nav>
    <div className="header-badges">
      <Link href="/my-plan" className="counter counter-plan"><ListChecks size={14} /><span>Plan</span><strong>{plan.length}</strong></Link>
      <Link href="/my-plan?tab=saved" className="counter counter-saved"><Bookmark size={14} /><span>Saved</span><strong>{saved.length}</strong></Link>
    </div>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="brand"><Image src="/assets/logo.png" alt="" width={25} height={25} /><span>FIT<span>LOG</span></span></div><p>© 2026 FitLog — Workout Library. Train hard, log honest.</p></footer>;
}
