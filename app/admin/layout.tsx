"use client";

import {
    LayoutDashboard,
    Building2,
    Users,
    CreditCard,
    TrendingUp,
    Settings,
    ShieldCheck,
    Globe
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

const adminNavItems = [
    {
        title: "Overview",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Partners",
        href: "/admin/partners",
        icon: Building2,
    },
    {
        title: "Corporates",
        href: "/admin/corporates",
        icon: Users,
    },
    {
        title: "Financials",
        href: "/admin/financials",
        icon: CreditCard,
    },
    {
        title: "Market Insights",
        href: "/admin/analytics",
        icon: TrendingUp,
    },
    {
        title: "Platform Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardShell items={adminNavItems} role="Admin">
            {children}
        </DashboardShell>
    );
}
