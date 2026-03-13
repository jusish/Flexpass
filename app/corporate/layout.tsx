"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { LayoutDashboard, Users, BarChart3, CreditCard, Settings, Target } from "lucide-react";

const CORPORATE_ITEMS = [
    { title: "Dashboard", href: "/corporate/dashboard", icon: LayoutDashboard },
    { title: "Employees", href: "/corporate/employees", icon: Users },
    { title: "Utilization", href: "/corporate/utilization", icon: BarChart3 },
    { title: "Billing", href: "/corporate/billing", icon: CreditCard },
    { title: "Settings", href: "/corporate/settings", icon: Settings },
];

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardShell items={CORPORATE_ITEMS} role="Corporate">
            {children}
        </DashboardShell>
    );
}
