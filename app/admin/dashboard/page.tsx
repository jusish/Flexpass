"use client";

import React from "react";
import { 
    Users, 
    Building2, 
    CreditCard, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight, 
    ShieldCheck, 
    Activity, 
    Globe,
    Zap,
    Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    Cell,
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const platformGrowth = [
    { month: "Oct", revenue: 15400000, volume: 2400 },
    { month: "Nov", revenue: 22800000, volume: 3800 },
    { month: "Dec", revenue: 19500000, volume: 3200 },
    { month: "Jan", revenue: 34200000, volume: 5600 },
    { month: "Feb", revenue: 42100000, volume: 6800 },
    { month: "Mar", revenue: 48900000, volume: 7420 },
];

const categoryDistribution = [
    { name: 'Fitness & Gym', value: 45, fill: "#6366f1" },
    { name: 'Yoga & Pilates', value: 25, fill: "#10b981" },
    { name: 'Sports Clubs', value: 20, fill: "#f59e0b" },
    { name: 'Wellness & Spa', value: 10, fill: "#8b5cf6" },
];

const chartConfig = {
    revenue: { label: "Platform Revenue", color: "#6366f1" },
    volume: { label: "Total Visits", color: "#10b981" },
} satisfies ChartConfig;

export default function AdminDashboard() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-2 py-0 text-[9px] font-black tracking-widest">Master Terminal</Badge>
                        <span className="text-[9px] font-bold text-muted-foreground opacity-40 tracking-widest uppercase">System Operational</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">Ecosystem Oversight</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Central command for OneFit platform operations & cross-entity financial flow</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100 transition-all">
                        <Download className="w-4 h-4 mr-2" /> Global Audit
                    </Button>
                    <Button size="sm" className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5">
                        <ShieldCheck className="w-4 h-4 mr-2" /> Compliance
                    </Button>
                </div>
            </div>

            {/* Platform Core Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Gross Platform Volume", value: "RWF 48.9M", trend: "+24.5%", sub: "Last 30 days", icon: Globe, color: "text-indigo-500" },
                    { label: "Total Facility Visits", value: "7,420", trend: "+12.1%", sub: "Across all partners", icon: Activity, color: "text-emerald-500" },
                    { label: "Partner Settlements", value: "RWF 32.4M", trend: "Pending", sub: "Monthly cycle", icon: CreditCard, color: "text-amber-500" },
                    { label: "Sponsor Corporates", value: "42", trend: "Active", sub: "8 onboarding", icon: Building2, color: "text-rose-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-8 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-6">
                            <div className={cn("p-3 bg-white/5 rounded-2xl border border-white/5 shadow-inner transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className={cn(
                                "text-[10px] font-black tracking-widest px-2.5 py-1 rounded-lg border",
                                stat.trend === "Pending" ? "text-amber-500 border-amber-500/20 bg-amber-500/10" : "text-emerald-500 border-emerald-500/20 bg-emerald-500/10"
                            )}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-widest opacity-40 mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-30 mt-4 font-semibold">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Financial Momentum & Sector Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-dark p-10 border-white/5 rounded-2xl satin-card space-y-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black tracking-widest text-white flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-indigo-500" /> Revenue vs. Participation Index
                            </h3>
                            <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1">Platform growth trajectories & economic velocity</p>
                        </div>
                        <div className="flex gap-1 bg-black/40 border border-white/5 p-1 rounded-xl">
                            <Button variant="ghost" className="h-8 px-4 text-[9px] font-black tracking-widest opacity-40">6M</Button>
                            <Button variant="ghost" className="h-8 px-4 text-[9px] font-black tracking-widest silver-gradient text-black">12M</Button>
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <AreaChart data={platformGrowth} margin={{ left: -20, right: 10, top: 20 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6E6E73', fontSize: 11, fontWeight: 700 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }}
                                    tickFormatter={(val: number) => `RWF ${(val / 1000000).toFixed(0)}M`}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#6366f1"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="volume"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    fillOpacity={1}
                                    fill="url(#colorVol)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </Card>

                <Card className="glass-dark p-10 border-white/5 rounded-2xl satin-card flex flex-col items-center justify-between text-center">
                    <div className="w-full">
                        <h3 className="text-sm font-black tracking-widest text-white">Sector Allocation</h3>
                        <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1">Partner facility diversity index</p>
                    </div>

                    <div className="h-[280px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryDistribution}
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {categoryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.5)" strokeWidth={4} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <h4 className="text-3xl font-black tracking-tighter text-white">100%</h4>
                            <p className="text-[8px] font-black tracking-widest text-muted-foreground opacity-40">Coverage</p>
                        </div>
                    </div>

                    <div className="w-full space-y-4">
                        {categoryDistribution.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                                    <span className="text-[10px] font-bold text-white tracking-widest">{item.name}</span>
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground opacity-60 tracking-widest">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Critical Alerts & System Status */}
            <Card className="glass-dark p-2 border-white/5 rounded-2xl overflow-hidden satin-card">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                    {[
                        { label: "Partner Settlements", value: "3 Pending", status: "Requires Action", color: "text-amber-500", icon: Zap },
                        { label: "Global Retention", value: "94.2%", status: "System Healthy", color: "text-emerald-500", icon: Activity },
                        { label: "Active Nodes", value: "112 Venues", status: "Online", color: "text-indigo-500", icon: Globe },
                    ].map((item, i) => (
                        <div key={i} className="p-8 flex items-center justify-between group">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black tracking-widest text-muted-foreground opacity-40">{item.label}</p>
                                <h4 className="text-xl font-black tracking-tight text-white">{item.value}</h4>
                                <p className={cn("text-[9px] font-black tracking-widest opacity-60", item.color)}>{item.status}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                                <item.icon className={cn("w-5 h-5", item.color)} />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
