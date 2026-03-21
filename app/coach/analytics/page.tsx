"use client";

import React from "react";
import {
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Calendar,
    Zap,
    Users,
    Activity,
    Wallet,
    Target,
    BarChart3
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    Cell
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const yieldData = [
    { month: "Oct", yield: 450000, sessions: 42 },
    { month: "Nov", yield: 520000, sessions: 48 },
    { month: "Dec", yield: 480000, sessions: 45 },
    { month: "Jan", yield: 640000, sessions: 54 },
    { month: "Feb", yield: 580000, sessions: 50 },
    { month: "Mar", yield: 720000, sessions: 62 },
];

const sectorData = [
    { name: "Personal HIIT", value: 45, color: "bg-indigo-500" },
    { name: "Group Strength", value: 30, color: "bg-emerald-500" },
    { name: "Yoga Nodes", value: 15, color: "bg-amber-500" },
    { name: "Walk-ins", value: 10, color: "bg-sky-500" },
];

export default function CoachAnalytics() {
    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Earnings Analytics</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Track your performance, client retention, and growth metrics</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/10 bg-white/5 text-[10px] font-bold tracking-widest  transition-all rounded-xl hover:bg-white/10 hover:border-white/20">
                        <Calendar className="w-4 h-4 mr-2" /> View History
                    </Button>
                    <Button className="h-11 px-8 rounded-xl text-[10px] font-bold tracking-widest  silver-gradient text-black transition-all active:scale-95">
                        <Download className="w-4 h-4 mr-2" /> Export Report
                    </Button>
                </div>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Earnings", val: "RWF 3.4M", trend: "+12.4%", sub: "Net income this cycle", icon: Wallet, color: "text-primary" },
                    { label: "Client Retention", val: "92%", trend: "+2.1%", sub: "Stability index", icon: Users, color: "text-secondary" },
                    { label: "Total Sessions", val: "142", trend: "+8.5%", sub: "Operational units", icon: Zap, color: "text-amber-500" },
                    { label: "Quality Rating", val: "4.9/5", trend: "0.0%", sub: "Avg student rating", icon: Target, color: "text-blue-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("p-3 rounded-xl bg-white/5 border border-white/5 transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <ArrowUpRight className="w-2.5 h-2.5 text-emerald-500" />
                                <span className="text-[9px] font-bold text-emerald-500  tracking-widest">{stat.trend}</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-60  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-40 mt-4 font-medium flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-white/10" /> {stat.sub}
                        </p>
                    </Card>
                ))}
            </div>

            {/* Main Yield Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-dark p-8 border-white/5 rounded-3xl satin-card space-y-10">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" /> Earnings Performance
                            </h3>
                            <p className="text-[10px] font-medium text-muted-foreground opacity-60">Net portfolio growth vs session volume</p>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={yieldData} margin={{ left: -20, right: 10, top: 0 }}>
                                <defs>
                                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#c5c5c9" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#c5c5c9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 600 }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="yield" stroke="#c5c5c9" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="glass-dark p-8 border-white/5 rounded-3xl satin-card flex flex-col justify-between">
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold tracking-tight text-white">Service Distribution</h3>
                        <p className="text-[10px] font-medium text-muted-foreground opacity-60">Contribution by session category</p>
                    </div>

                    <div className="space-y-8 py-10 flex-1 flex flex-col justify-center">
                        {sectorData.map((item, i) => (
                            <div key={i} className="space-y-2.5">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold text-white/40  tracking-widest">{item.name}</span>
                                    <span className="text-lg font-bold text-white">{item.value}%</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full transition-all duration-1000", item.color)}
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 bg-white/5 text-[10px] font-bold tracking-widest  hover:bg-white/10">
                        View Detailed Audit
                    </Button>
                </Card>
            </div>
        </div>
    );
}
