import type { Metadata } from "next";
import Providers from "@/app/providers";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = { title: "FitLog — Workout Library", description: "Train with intent. Log every set." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers><SiteHeader /><main>{children}</main><SiteFooter /></Providers></body></html>;
}
