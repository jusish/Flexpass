
"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Users,
    Activity,
    CreditCard,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Download,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig
} from "@/components/ui/chart";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AddEmployeeModal } from "@/components/corporate/add-employee-modal";
import { ExportReportModal } from "@/components/corporate/export-report-modal";

const weeklyData = [
    { day: 'Mon', active: 45 },
    { day: 'Tue', active: 52 },
    { day: 'Wed', active: 48 },
    { day: 'Thu', active: 61 },
    { day: 'Fri', active: 55 },
    { day: 'Sat', active: 32 },
    { day: 'Sun', active: 28 },
];

const tierDistribution = [
    { tier: 'Platinum', count: 120, fill: "#6366f1" },
    { tier: 'Gold', count: 80, fill: "#10b981" },
    { tier: 'Silver', count: 45, fill: "#f59e0b" },
];

const chartConfig = {
    active: {
        label: "Active Users",
        color: "#6366f1",
    },
    platinum: {
        label: "Platinum",
        color: "#6366f1",
    },
    gold: {
        label: "Gold",
        color: "#10b981",
    },
    silver: {
        label: "Silver",
        color: "#f59e0b",
    },
} satisfies ChartConfig;

export default function CorporateDashboard() {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow-silver">Corporate Overview</h1>
                    <p className="text-muted-foreground text-xs font-medium tracking-tight">Welcome back, Bank of Kigali HR Team</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsExportModalOpen(true)}
                        className="glass border-white/5 h-10 rounded-xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100"
                    >
                        <Download className="w-3.5 h-3.5 mr-2" />
                        Export Report
                    </Button>
                    <Button
                        onClick={() => setIsEnrollModalOpen(true)}
                        size="sm"
                        className="h-10 rounded-xl px-5 font-black text-[10px] tracking-widest border-glow-silver silver-gradient text-black"
                    >
                        Enroll Employee
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Active Users", value: "342", icon: Users, change: "+12%", up: true, trend: "vs last month" },
                    { label: "Gym Visits", value: "1,204", icon: Activity, change: "+8.4%", up: true, trend: "this week" },
                    { label: "Wellness Spend", value: "RWF 4.2M", icon: CreditCard, change: "-2.1%", up: false, trend: "vs last month" },
                    { label: "Engagement", value: "76%", icon: TrendingUp, change: "+5.3%", up: true, trend: "avg rate" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Card className="glass-dark p-6 border-white/5 rounded-2xl group hover:border-white/10 transition-all satin-card">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors border border-white/5">
                                    <item.icon className="w-5 h-5 text-secondary" />
                                </div>
                                <span className={cn(
                                    "px-2 py-1 rounded-lg text-[9px] font-bold border",
                                    item.up ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10" : "bg-rose-500/5 text-rose-500 border-rose-500/10"
                                )}>
                                    {item.change}
                                </span>
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 opacity-60">{item.label}</p>
                            <h3 className="text-2xl font-bold tracking-tight">{item.value}</h3>
                            <p className="text-[9px] text-muted-foreground mt-2 font-medium opacity-40">{item.trend}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="glass-dark lg:col-span-2 p-6 border-white/5 rounded-2xl relative flex flex-col satin-card">
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-1">Weekly Activity</h3>
                        <p className="text-muted-foreground text-[10px] font-medium opacity-60">Employee attendance metrics across all venues</p>
                    </div>
                    <div className="flex-1 min-h-[300px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <AreaChart
                                data={weeklyData}
                                margin={{ left: -20, right: 10, top: 10, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 600 }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="active"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorActive)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </Card>

                <Card className="glass-dark p-6 border-white/5 rounded-2xl flex flex-col satin-card">
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-1 text-glow-silver">Subscriptions</h3>
                        <p className="text-muted-foreground text-[10px] font-medium opacity-60">Membership distribution scale</p>
                    </div>
                    <div className="flex-1 min-h-[240px] w-full mb-8">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <BarChart
                                data={tierDistribution}
                                layout="vertical"
                                margin={{ left: -20, right: 10 }}
                            >
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="tier"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#C5C7C9', fontSize: 10, fontWeight: 700 }}
                                />
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <Bar
                                    dataKey="count"
                                    radius={[0, 6, 6, 0]}
                                    barSize={16}
                                >
                                    {tierDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </div>
                    <div className="space-y-2 mt-auto">
                        {[
                            { name: 'Platinum', value: 120, key: 'platinum' },
                            { name: 'Gold', value: 80, key: 'gold' },
                            { name: 'Silver', value: 45, key: 'silver' },
                        ].map((tier, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/2 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: chartConfig[tier.key as keyof typeof chartConfig].color }} />
                                    <span className="text-[11px] font-bold tracking-tight">{tier.name}</span>
                                </div>
                                <span className="text-glow-silver font-bold text-xs">{tier.value}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Quick Activity Table */}
            <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Recent Enrollments</h3>
                        <p className="text-muted-foreground text-xs font-medium">Latest team additions</p>
                    </div>
                    <Button variant="link" size="sm" className="text-xs text-primary font-medium hover:opacity-80 p-0 h-auto">View Directory</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead>
                            <tr className="border-b border-white/5 text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">Employee</th>
                                <th className="px-6 py-4">Tier</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { name: "Sonia Gakwaya", email: "sonia@bk.rw", tier: "Platinum", date: "10 Mar", status: "Active" },
                                { name: "Alaric Nshuti", email: "alaric@bk.rw", tier: "Gold", date: "08 Mar", status: "Active" },
                                { name: "Brenda Umutoni", email: "brenda@bk.rw", tier: "Platinum", date: "07 Mar", status: "Pending" },
                                { name: "Kevin Kalisa", email: "kevin@bk.rw", tier: "Silver", date: "05 Mar", status: "Active" },
                            ].map((row, i) => (
                                <tr key={i} className="group hover:bg-white/5 transition-colors text-xs font-medium">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center font-semibold text-primary text-[10px]">
                                                {row.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{row.name}</p>
                                                <p className="text-[10px] text-muted-foreground opacity-70">{row.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-md text-[9px] font-semibold border",
                                            row.tier === "Platinum" ? "border-primary/30 text-primary bg-primary/5" : "border-white/10 text-muted-foreground bg-white/5"
                                        )}>
                                            {row.tier}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{row.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className={cn("w-1 h-1 rounded-full", row.status === "Active" ? "bg-emerald-500/70" : "bg-amber-500/70")} />
                                            <span className="text-muted-foreground opacity-80">{row.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg group-hover:bg-primary/10">
                                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modals */}
            <AddEmployeeModal
                isOpen={isEnrollModalOpen}
                onClose={() => setIsEnrollModalOpen(false)}
            />
            <ExportReportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
            />
        </div>
    );
}
