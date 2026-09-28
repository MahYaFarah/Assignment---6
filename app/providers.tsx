"use client";
import { FitLogProvider } from "@/components/fitlog-context";
export default function Providers({ children }: { children: React.ReactNode }) { return <FitLogProvider>{children}</FitLogProvider>; }
