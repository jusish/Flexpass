"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    TrendingUp, 
    Settings, 
    MapPin,
    Dumbbell
} from "lucide-react";

const COACH_ITEMS = [
    { title: "Dashboard", href: "/coach", icon: LayoutDashboard },
    { title: "Members", href: "/coach/users", icon: Users },
    { title: "Classes", href: "/coach/classes", icon: Dumbbell },
    { title: "Schedule", href: "/coach/schedule", icon: Calendar },
    { title: "Partners", href: "/coach/partners", icon: MapPin },
    { title: "Analytics", href: "/coach/analytics", icon: TrendingUp },
    { title: "Settings", href: "/coach/settings", icon: Settings },
];

export default function CoachLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardShell items={COACH_ITEMS} role="Coach">
            {children}
        </DashboardShell>
    );
}
