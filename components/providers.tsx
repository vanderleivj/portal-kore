"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      {children}
    </div>
  );
}
