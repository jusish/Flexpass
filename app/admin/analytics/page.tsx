"use client";

import React from "react";
import { 
    Users, 
    Building2, 
    CreditCard, 
    TrendingUp, 
    Activity, 
    ShieldCheck, 
    Globe,
    Zap,
    Download,
    PieChart,
    BarChart3,
    Calendar,
    Target,
    ZapOff,
    HeartPulse
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    Tooltip,
    Pie as RePie,
    PieChart as RePieChart
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const retentionData = [
    { month: "Oct", rate: 88 },
    { month: "Nov", rate: 90 },
    { month: "Dec", rate: 89 },
    { month: "Jan", rate: 92 },
    { month: "Feb", rate: 93 },
    { month: "Mar", rate: 94.2 },
];

const categoryEngagement = [
    { sector: "Premium Gyms", growth: 24, fill: "#6366f1" },
    { sector: "Yoga Studios", growth: 18, fill: "#10b981" },
    { sector: "Sports Clubs", growth: 12, fill: "#f59e0b" },
    { sector: "Wellness Centers", growth: 8, fill: "#8b5cf6" },
];

const chartConfig = {
    rate: { label: "Retention Rate", color: "#6366f1" },
    growth: { label: "Sector Growth", color: "#10b981" },
} satisfies ChartConfig;

export default function MarketInsights() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Market Intelligence</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Macro platform trends, user retention matrices, and sector growth benchmarks</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100 transition-all">
                        <Download className="w-4 h-4 mr-2" /> Strategic Audit
                    </Button>
                </div>
            </div>

            {/* Platform Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Global Retention", value: "94.2%", trend: "+2.1%", icon: HeartPulse, color: "text-rose-500" },
                    { label: "Market Penetration", value: "18.5%", trend: "+1.2%", icon: Globe, color: "text-indigo-500" },
                    { label: "Sector Velocity", value: "3.2x", trend: "High Growth", icon: Zap, color: "text-amber-500" },
                    { label: "Platform Health", value: "Optimal", trend: "0.2ms latency", icon: ShieldCheck, color: "text-emerald-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-8 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-6">
                            <div className={cn("p-3 bg-white/5 rounded-2xl border border-white/5 shadow-inner transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black tracking-widest text-emerald-500">{stat.trend}</span>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-widest opacity-40 mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-dark p-10 border-white/5 rounded-2xl satin-card space-y-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black tracking-widest text-white flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-indigo-500" /> Retention Curve (L6M)
                            </h3>
                            <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1">Unified platform user retention across all sponsor tiers</p>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <AreaChart data={retentionData} margin={{ left: -20, right: 10, top: 20 }}>
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 11, fontWeight: 700 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} tickFormatter={(val: number) => `${val}%`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorRate)" />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </Card>

                <Card className="glass-dark p-10 border-white/5 rounded-2xl satin-card space-y-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black tracking-widest text-white flex items-center gap-3">
                                <BarChart3 className="w-5 h-5 text-emerald-500" /> Sector Growth Velocity
                            </h3>
                            <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1">YoY participation growth benchmarks by facility sector</p>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <BarChart data={categoryEngagement} layout="vertical" margin={{ left: 40 }}>
                                <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.02)" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="sector" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 11, fontWeight: 700 }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="growth" radius={[0, 4, 4, 0]} barSize={32}>
                                    {categoryEngagement.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}
