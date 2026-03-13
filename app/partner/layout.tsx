"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { LayoutDashboard, Users, Zap, BarChart3, Settings, Megaphone, CheckCircle } from "lucide-react";

const PARTNER_ITEMS = [
    { title: "Dashboard", href: "/partner/dashboard", icon: LayoutDashboard },
    { title: "Check-ins", href: "/partner/check-ins", icon: CheckCircle },
    { title: "Visitors", href: "/partner/visitors", icon: Users },
    { title: "Ads & Promo", href: "/partner/marketing", icon: Megaphone },
    { title: "Analytics", href: "/partner/analytics", icon: BarChart3 },
    { title: "Settings", href: "/partner/settings", icon: Settings },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardShell items={PARTNER_ITEMS} role="Partner">
            {children}
        </DashboardShell>
    );
}
