"use client";

import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

export function Toast({ message, onClose }: { message: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onClose, 2800);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);
  if (!message) return null;
  return <div className="toast" role="status"><CheckCircle2 size={18} /><span>{message}</span><button aria-label="Close notification" onClick={onClose}><X size={15} /></button></div>;
}
