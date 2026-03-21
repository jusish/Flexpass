
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
import Link from "next/link";
import { useRouter } from "next/navigation";
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
            {/* Hero & Financial Highlight */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-8 rounded-[2rem] relative overflow-hidden flex flex-col justify-center border border-white/5 bg-[#0A0A0B] shadow-2xl satin-card">
                    <div className="absolute inset-0 gunmetal-gradient opacity-40" />
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-black text-[8px] text-primary tracking-[0.2em] w-fit">
                                SYSTEM NODE: BANK OF KIGALI
                            </div>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter mb-2 text-glow-silver text-white">Corporate Overview</h1>
                        <p className="text-muted-foreground text-[10px] font-black tracking-widest mb-10 opacity-40 uppercase">
                            Welcome back, Executive HR Console • Real-time Workforce Metrics
                        </p>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => setIsEnrollModalOpen(true)}
                                size="lg"
                                className="h-14 px-10 rounded-2xl text-[10px] font-black tracking-[0.2em] border-glow-silver silver-gradient text-black transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(197,199,201,0.15)] group"
                            >
                                <Users className="mr-3 w-5 h-5 group-hover:rotate-6 transition-transform" /> ENROLL NEW PERSONNEL
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsExportModalOpen(true)}
                                className="h-14 px-8 rounded-2xl glass border-white/10 text-[9px] font-black tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
                            >
                                <Download className="mr-2 w-4 h-4" /> GENERATE AUDIT
                            </Button>
                        </div>
                    </div>
                    <Activity className="absolute -right-12 -bottom-12 w-80 h-80 text-white/2 pointer-events-none" />
                </Card>

                <Card className="glass-dark p-8 border-white/5 rounded-[2rem] flex flex-col justify-center text-center satin-card relative overflow-hidden group hover:border-white/10 transition-all">
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10">
                        <div className="inline-flex p-4 bg-black/40 rounded-2xl mb-6 border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                            <CreditCard className="w-6 h-6 text-primary border-glow-silver" />
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground tracking-widest mb-2 opacity-40 uppercase">Total Wellness Accrual</p>
                        <p className="text-4xl font-black mb-1 text-glow-silver text-white tracking-tighter">RWF 4.2M</p>
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <span className="text-[9px] font-extrabold text-rose-500 bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/10">-2.1%</span>
                            <span className="text-[10px] text-muted-foreground opacity-30 font-bold">VS LAST PERIOD</span>
                        </div>
                        <Button variant="outline" className="w-full h-12 rounded-xl glass border-white/10 text-[9px] font-black tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">
                            FINANCIAL LEDGER
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Personnel", value: "342", icon: Users, change: "+12%", up: true, trend: "VS LAST MONTH", color: "text-indigo-400" },
                    { label: "Usage Velocity", value: "1,204", icon: Activity, change: "+8.4%", up: true, trend: "TOTAL VISITS", color: "text-emerald-400" },
                    { label: "Engagement Hub", value: "76%", icon: TrendingUp, change: "+5.3%", up: true, trend: "AVG PARTICIPATION", color: "text-sky-400" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Card className="glass-dark p-7 border-white/5 rounded-2xl group hover:border-white/10 transition-all satin-card flex items-center gap-6">
                            <div className={cn("p-4 bg-black/40 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform shadow-inner", item.color)}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-muted-foreground tracking-widest mb-1 opacity-40 uppercase">{item.label}</p>
                                <div className="flex items-baseline gap-3">
                                    <h3 className="text-3xl font-black tracking-tighter text-white">{item.value}</h3>
                                    <span className={cn(
                                        "text-[9px] font-black px-2 py-0.5 rounded-md",
                                        item.up ? "text-emerald-500 bg-emerald-500/5" : "text-rose-500 bg-rose-500/5"
                                    )}>
                                        {item.change}
                                    </span>
                                </div>
                                <p className="text-[9px] text-muted-foreground mt-1 font-bold opacity-30 tracking-wider uppercase">{item.trend}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="glass-dark lg:col-span-2 p-6 border-white/5 rounded-2xl relative flex flex-col satin-card">
                    <div className="mb-8">
                        <h3 className="text-sm font-bold  tracking-wider mb-1">Company Activity</h3>
                        <p className="text-muted-foreground text-[10px] font-medium opacity-60">Total visits recorded across all wellness centers</p>
                    </div>
                    <div className="flex-1 min-h-[300px] w-full">
                        <ChartContainer id="corporate-activity-chart" config={chartConfig} className="h-full w-full">
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
                        <h3 className="text-sm font-bold  tracking-wider mb-1 text-glow-silver">Plan Distribution</h3>
                        <p className="text-muted-foreground text-[10px] font-medium opacity-60">Number of employees in each subscription tier</p>
                    </div>
                    <div className="flex-1 min-h-[240px] w-full mb-8">
                        <ChartContainer id="corporate-plan-distribution-chart" config={chartConfig} className="h-full w-full">
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
                        <h3 className="text-lg font-semibold mb-1">Newest Members</h3>
                        <p className="text-muted-foreground text-xs font-medium">Latest team additions to the platform</p>
                    </div>
                    <Link href="/corporate/employees">
                        <Button variant="link" size="sm" className="text-xs text-primary font-medium hover:opacity-80 p-0 h-auto">View Directory</Button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead>
                            <tr className="border-b border-white/5 text-muted-foreground text-[10px] font-semibold  tracking-wider">
                                <th className="px-6 py-4">Employee</th>
                                <th className="px-6 py-4">Tier</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { name: "Sonia Gakwaya", email: "sonia@bk.rw", tier: "Platinum", date: "10 Mar", status: "Active", id: "e1" },
                                { name: "Alaric Nshuti", email: "alaric@bk.rw", tier: "Gold", date: "08 Mar", status: "Active", id: "e2" },
                                { name: "Brenda Umutoni", email: "brenda@bk.rw", tier: "Platinum", date: "07 Mar", status: "Pending", id: "e3" },
                                { name: "Kevin Kalisa", email: "kevin@bk.rw", tier: "Silver", date: "05 Mar", status: "Active", id: "e4" },
                            ].map((row, i) => (
                                <tr key={i} className="group hover:bg-white/5 transition-colors text-xs font-medium">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center font-semibold text-primary text-[10px]">
                                                {row.name.charAt(0)}
                                            </div>
                                            <div>
                                                <Link href={`/corporate/employees/${row.id}`}>
                                                    <p className="font-semibold hover:text-primary transition-colors cursor-pointer">{row.name}</p>
                                                </Link>
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
                                        <Link href={`/corporate/employees/${row.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg group-hover:bg-primary/10">
                                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                            </Button>
                                        </Link>
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
