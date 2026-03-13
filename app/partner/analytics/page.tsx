"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
    BarChart3,
    TrendingUp,
    Users,
    Clock,
    ArrowUpRight,
    Calendar,
    Download,
    PieChart,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from "recharts";
import { Badge } from "@/components/ui/badge";

const VISITS_DATA = [
    { name: "Mon", visits: 120 },
    { name: "Tue", visits: 150 },
    { name: "Wed", visits: 180 },
    { name: "Thu", visits: 140 },
    { name: "Fri", visits: 250 },
    { name: "Sat", visits: 380 },
    { name: "Sun", visits: 320 },
];

const TIER_DATA = [
    { name: "Platinum", value: 45, color: "#C5C7C9" },
    { name: "Gold", value: 35, color: "#6E6E73" },
    { name: "Silver", value: 20, color: "#1F1F23" },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-glow-silver text-white">Performance Analytics</h1>
                    <p className="text-muted-foreground text-[11px] font-black uppercase tracking-widest opacity-40">Deep-dive into facility traffic and subscriber demographics</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-11 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                        <Calendar className="w-3.5 h-3.5 mr-2 opacity-60" /> Custom Range
                    </Button>
                    <Button variant="outline" size="sm" className="glass border-white/5 h-11 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                        <Download className="w-3.5 h-3.5 mr-2 opacity-60" /> Intelligence Report
                    </Button>
                </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Check-in Index", value: "8,421", trend: "+14.2%", icon: Activity },
                    { label: "Unique Members", value: "1,248", trend: "+5.1%", icon: Users },
                    { label: "Dwell Time", value: "84m", trend: "-2.4%", icon: Clock },
                    { label: "Capture Rate", value: "92%", trend: "+1.2%", icon: TrendingUp },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-6">
                            <div className="p-2.5 bg-black/40 rounded-xl border border-white/10 group-hover:border-primary/30 transition-all">
                                <stat.icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1">
                                {stat.trend} <ArrowUpRight className="w-2.5 h-2.5" />
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
                        <p className="text-2xl font-black tracking-tighter text-white">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Traffic Flow Chart */}
                <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-black uppercase tracking-widest text-glow-silver flex items-center gap-3">
                            <TrendingUp className="w-4 h-4 text-primary" /> Traffic Momentum
                        </h3>
                        <Badge variant="outline" className="bg-black/40 border-white/10 text-[8px] font-black uppercase tracking-widest px-3 py-1">Weekly Volume</Badge>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={VISITS_DATA}>
                                <defs>
                                    <linearGradient id="silverGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C5C7C9" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#C5C7C9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#ffffff40"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontWeight: 900 }}
                                />
                                <YAxis
                                    stroke="#ffffff40"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontWeight: 900 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0F0F0F",
                                        border: "1px solid #ffffff10",
                                        borderRadius: "12px",
                                        fontSize: "10px",
                                        fontWeight: "900",
                                        textTransform: "uppercase"
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#C5C7C9"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#silverGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Subscriber Breakdown */}
                <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-black uppercase tracking-widest text-glow-silver flex items-center gap-3">
                            <PieChart className="w-4 h-4 text-primary" /> Subscriber Logic
                        </h3>
                        <Badge variant="outline" className="bg-black/40 border-white/10 text-[8px] font-black uppercase tracking-widest px-3 py-1">Tier Analysis</Badge>
                    </div>

                    <div className="h-[350px] w-full flex flex-col items-center">
                        <div className="flex-1 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={TIER_DATA} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#ffffff60"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontWeight: 900 }}
                                        tickFormatter={(value) => value.toUpperCase()}
                                        width={80}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: "#0F0F0F", border: "1px solid #ffffff10", borderRadius: "12px" }}
                                    />
                                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                                        {TIER_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-3 gap-8 w-full mt-8 p-6 bg-black/40 rounded-2xl border border-white/5">
                            {TIER_DATA.map((tier, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40 mb-1">{tier.name}</p>
                                    <p className="text-lg font-black text-white">{tier.value}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
