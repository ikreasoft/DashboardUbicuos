import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { PropsWithChildren } from "react";

interface MainLayoutProps extends PropsWithChildren {
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className={cn("flex-1 p-4 md:p-6 overflow-auto", className)}>
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}