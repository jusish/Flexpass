"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    TrendingUp, 
    Settings, 
    Apple,
    MapPin,
    HeartPulse
} from "lucide-react";

const NUTRITIONIST_ITEMS = [
    { title: "Dashboard", href: "/nutritionist", icon: LayoutDashboard },
    { title: "Clients", href: "/nutritionist/users", icon: Users },
    { title: "Programs", href: "/nutritionist/programs", icon: Apple },
    { title: "Schedule", href: "/nutritionist/schedule", icon: Calendar },
    { title: "Partners", href: "/nutritionist/partners", icon: MapPin },
    { title: "Analytics", href: "/nutritionist/analytics", icon: TrendingUp },
    { title: "Settings", href: "/nutritionist/settings", icon: Settings },
];

export default function NutritionistLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardShell items={NUTRITIONIST_ITEMS} role="Nutritionist">
            {children}
        </DashboardShell>
    );
}
