import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, CheckSquare, Calendar, BarChart3, Bell, Settings, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [userName, setUserName] = useState("Alex");

  useEffect(() => {
    const storedUser = localStorage.getItem("taskly_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.name.split(" ")[0]);
    }
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Scheduler", href: "/scheduler", icon: Calendar },
    { name: "Reports", href: "/reports", icon: BarChart3 },
  ];

  const isActive = (href: string) => {
    if (href === "/") return router.pathname === href;
    return router.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Taskly</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? "bg-teal-50 text-teal-700 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900">{userName}</div>
                <div className="text-xs text-slate-500">Student</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-slate-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-900">
                  {navigation.find((item) => isActive(item.href))?.name || "Taskly"}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="ghost" size="icon">
                    <Settings className="w-5 h-5 text-slate-600" />
                  </Button>
                </Link>
                <Link href="/profile">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
