"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Zap,
    BarChart3,
    Calendar,
    CreditCard,
    Target,
    Menu,
    X,
    Bell,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMockStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItem {
    title: string;
    href: string;
    icon: React.ElementType;
}

interface DashboardShellProps {
    children: React.ReactNode;
    items: SidebarItem[];
    role: "Corporate" | "Partner";
}

import { useRouter } from "next/navigation";

export function DashboardShell({ children, items, role }: DashboardShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useMockStore();
    const [isOpen, setIsOpen] = React.useState(true);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <div className="flex min-h-screen bg-background text-foreground text-sm selection:bg-primary/30 selection:text-white">
            {/* Sidebar Desktop */}
            <motion.aside
                initial={false}
                animate={{ width: isOpen ? 260 : 76 }}
                className={cn(
                    "hidden md:flex flex-col fixed inset-y-0 z-50 glass border-r border-white/5 bg-black/40 backdrop-blur-xl",
                    !isOpen && "items-center"
                )}
            >
                <div className="h-20 flex items-center px-6 justify-between border-b border-white/5">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="logo-full"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-8 h-8 silver-gradient rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(197,199,201,0.2)] border-glow-silver">
                                    <Zap className="text-black w-4 h-4 fill-current" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-black tracking-tighter text-glow-silver leading-none">FlexPass</span>
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/40 mt-0.5">{role} PORTAL</span>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="logo-short"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="w-10 h-10 silver-gradient rounded-xl flex items-center justify-center border-glow-silver"
                            >
                                <Zap className="text-black w-5 h-5 fill-current" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
                    {items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className="block group">
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                                        isActive
                                            ? "text-black border-glow-silver shadow-lg"
                                            : "text-muted-foreground hover:text-white"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-link-bg"
                                            className="absolute inset-0 silver-gradient z-0"
                                        />
                                    )}
                                    <item.icon className={cn("w-4 h-4 relative z-10 transition-transform", isActive ? "scale-110" : "opacity-40 group-hover:opacity-100")} />
                                    {isOpen && (
                                        <span className={cn(
                                            "font-black text-[12px] uppercase tracking-widest relative z-10",
                                            isActive ? "" : "opacity-60"
                                        )}>{item.title}</span>
                                    )}
                                    {isActive && isOpen && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="ml-auto w-1 h-1 rounded-full bg-black/40 relative z-10"
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-4">
                    <div className={cn("flex items-center gap-3 p-3 bg-black/40 border border-white/10 rounded-2xl satin-card", !isOpen && "p-1 justify-center")}>
                        <Avatar className="h-8 w-8 border border-white/10 ring-2 ring-black/20">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback className="text-[10px] font-black">{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {isOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-black uppercase tracking-tight truncate group-hover:text-primary transition-colors">{user?.name}</p>
                                <p className="text-[9px] text-muted-foreground truncate opacity-40 font-bold">{user?.email}</p>
                            </div>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start rounded-xl h-10 gap-3 text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10 font-black text-[10px] uppercase tracking-widest transition-all", !isOpen && "px-0 justify-center")}
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4" />
                        {isOpen && <span className="">Signed Out</span>}
                    </Button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 transition-all duration-300",
                isOpen ? "md:pl-[260px]" : "md:pl-[76px]"
            )}>
                {/* Header */}
                <header className="h-20 glass border-b border-white/5 sticky top-0 z-40 px-8 flex items-center justify-between bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="hidden md:flex h-9 w-9 rounded-xl border border-white/5 hover:bg-white/5">
                            <Menu className="w-4 h-4 text-secondary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)} className="md:hidden h-9 w-9 rounded-xl border border-white/5">
                            <Menu className="w-4 h-4" />
                        </Button>
                        <div className="relative hidden lg:block group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all" />
                            <input
                                placeholder="Search everything..."
                                className="bg-black/40 border border-white/10 rounded-xl pl-12 pr-6 py-2.5 text-[11px] font-bold focus:outline-none focus:border-white/20 focus:bg-black/60 transition-all w-72"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-glow-silver">12 MAR 2026</span>
                            <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest opacity-40">Thursday</span>
                        </div>
                        <div className="h-8 w-px bg-white/5" />
                        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl border border-white/10 glass-dark group">
                            <Bell className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                            <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-primary rounded-full border-2 border-black" />
                        </Button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 md:p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60"
                        />
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            className="fixed inset-y-0 left-0 w-[300px] bg-black border-r border-white/10 z-70 p-8 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 silver-gradient rounded-xl flex items-center justify-center">
                                        <Zap className="text-black w-5 h-5 fill-current" />
                                    </div>
                                    <span className="text-2xl font-black tracking-tighter text-glow-silver">FlexPass</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)} className="h-10 w-10 rounded-xl glass">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <nav className="flex-col flex gap-3">
                                {items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)} className="block">
                                            <div className={cn(
                                                "flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all relative overflow-hidden",
                                                isActive
                                                    ? "text-black border-glow-silver shadow-xl"
                                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                            )}>
                                                {isActive && <div className="absolute inset-0 silver-gradient z-0" />}
                                                <item.icon className="w-5 h-5 relative z-10" />
                                                <span className="relative z-10">{item.title}</span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start rounded-2xl h-14 gap-4 text-rose-500 font-black text-xs uppercase tracking-widest"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </Button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
