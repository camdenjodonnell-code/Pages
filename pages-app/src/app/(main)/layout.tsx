import type { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-8 sm:px-8 md:px-12">
        {children}
      </main>
    </div>
  );
}
