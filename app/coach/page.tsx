"use client";

import React, { useState } from "react";
import { 
    Users, 
    Zap, 
    TrendingUp, 
    Wallet, 
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Activity,
    Clock,
    CheckCircle2,
    ShieldCheck,
    Dumbbell,
    Play,
    Star
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
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
    ChartConfig
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const performanceData = [
    { month: "Oct", sessions: 45, revenue: 180000, yield: 4000 },
    { month: "Nov", sessions: 52, revenue: 208000, yield: 4100 },
    { month: "Dec", sessions: 38, revenue: 152000, yield: 3900 },
    { month: "Jan", sessions: 65, revenue: 260000, yield: 4400 },
    { month: "Feb", sessions: 48, revenue: 192000, yield: 4050 },
    { month: "Mar", sessions: 72, revenue: 288000, yield: 4600 },
];

const sessions = [
    { 
        id: "SES-001",
        name: "Morning Blast HIITS", 
        partner: "Waka Fitness HQ", 
        users: 12, 
        time: "08:00 AM",
        status: "Active",
        yield: 24000,
        type: "Session"
    },
    { 
        id: "SES-002",
        name: "Strength Protocol", 
        partner: "Cercle Sportif", 
        users: 8, 
        time: "10:30 AM",
        status: "Confirmed",
        yield: 16000,
        type: "Class"
    },
    { 
        id: "SES-003",
        name: "Power Yoga Flow", 
        partner: "Mindful Zen", 
        users: 15, 
        time: "02:00 PM",
        status: "Ready",
        yield: 15000,
        type: "Session"
    },
    { 
        id: "SES-004",
        name: "Evening Cardio Burn", 
        partner: "Waka Fitness HQ", 
        users: 6, 
        time: "05:00 PM",
        status: "Active",
        yield: 12000,
        type: "Class"
    },
];

const chartConfig = {
    revenue: { label: "Gross Revenue", color: "#6366f1" },
    sessions: { label: "Total Sessions", color: "#10b981" }
} satisfies ChartConfig;

export default function CoachDashboard() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Real-time performance and session management terminal</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-semibold tracking-wide rounded-xl hover:bg-white/10 hover:border-white/20">
                        <Wallet className="w-4 h-4 mr-2" /> Audit Invoices
                    </Button>
                    <Button className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95">
                        <Zap className="w-4 h-4 mr-2" /> Execute Session
                    </Button>
                </div>
            </div>

            {/* Micro Global Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Aggregate Yield", val: "RWF 288k", sub: "Month-to-date invoicing", icon: Wallet, color: "text-emerald-500", trend: "+12%" },
                    { label: "Active Members", val: "142", sub: "Total subscribed clients", icon: Users, color: "text-indigo-500", trend: "+5%" },
                    { label: "Session Activity", val: "24 / week", sub: "Operational throughput", icon: Activity, color: "text-amber-500", trend: "Stable" },
                    { label: "Service Index", val: "4.9/5", sub: "Client satisfaction rating", icon: Star, color: "text-sky-500", trend: "+2%" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg tracking-wide uppercase">{stat.trend}</span>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40 uppercase mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-40 mt-3 font-medium">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Performance Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-dark p-8 border-white/5 rounded-3xl satin-card space-y-10">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-indigo-500" /> Financial Performance
                            </h3>
                            <p className="text-[11px] font-medium text-muted-foreground opacity-50">Gross Revenue vs Session Volume benchmarks</p>
                        </div>
                    </div>
                    
                    <div className="h-[350px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <AreaChart data={performanceData} margin={{ left: -20, right: 10, top: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 11, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 600 }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </Card>

                <Card className="glass-dark p-8 border-white/5 rounded-3xl satin-card flex flex-col justify-between">
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
                            <Users className="w-4 h-4 text-indigo-400" /> Member Distribution
                        </h3>
                        <p className="text-[11px] font-medium text-muted-foreground opacity-50">Active members across facilities</p>
                    </div>

                    <div className="space-y-8 py-10 flex-1 flex flex-col justify-center">
                        {[
                            { name: "Global Gym HQ", val: 65, color: "bg-indigo-500" },
                            { name: "Aquatic Center", val: 18, color: "bg-cyan-500" },
                            { name: "Mindful Zen Studio", val: 17, color: "bg-emerald-500" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2.5">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{item.name}</span>
                                    <span className="text-base font-bold text-white">{item.val}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.val}%` }}
                                        className={cn("h-full", item.color)} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="h-12 rounded-xl border-white/5 bg-white/5 text-xs font-bold tracking-wide uppercase hover:bg-white/10">
                        View Detailed Report
                    </Button>
                </Card>
            </div>

            {/* Ingress Logs / Upcoming Sessions */}
            <div className="space-y-5">
                <div className="flex items-center justify-between pl-1">
                    <h3 className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Session Registry</h3>
                    <Button variant="ghost" className="h-8 text-[10px] font-bold text-primary px-3 rounded-lg hover:bg-primary/5">
                        View All
                    </Button>
                </div>
                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 uppercase">Session Name</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Facility</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase text-center">Attendance</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase text-right">Net Yield</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right pr-8 uppercase">ID</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sessions.map((session, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-transform group-hover:scale-105">
                                                <Zap className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{session.name}</h4>
                                                <div className="flex items-center gap-2 mt-1 opacity-50">
                                                    <Clock className="w-3 h-3" />
                                                    <p className="text-[10px] font-medium">{session.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
                                            <span className="text-[11px] font-medium text-muted-foreground">{session.partner}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center text-xs font-bold text-white">{session.users} / 20</TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-xs font-bold text-white">RWF {session.yield.toLocaleString()}</p>
                                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-wide mt-1">Net Payout</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-8 text-[10px] font-bold text-muted-foreground opacity-20 uppercase tracking-widest group-hover:opacity-100 transition-opacity">
                                        {session.id}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
