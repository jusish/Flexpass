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
    HeartPulse,
    Apple,
    Star,
    ClipboardList
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

const metabolicData = [
    { month: "Oct", clients: 25, adherence: 88, revenue: 120000 },
    { month: "Nov", clients: 32, adherence: 90, revenue: 155000 },
    { month: "Dec", clients: 28, adherence: 85, revenue: 138000 },
    { month: "Jan", clients: 42, adherence: 92, revenue: 210000 },
    { month: "Feb", clients: 35, adherence: 94, revenue: 185000 },
    { month: "Mar", clients: 50, adherence: 96, revenue: 245000 },
];

const consultations = [
    { 
        id: "CON-001",
        client: "Marie Jeanne", 
        program: "Keto Intensive", 
        facility: "Global Med Center", 
        time: "09:00 AM",
        status: "Confirmed",
        yield: 15000
    },
    { 
        id: "CON-002",
        client: "Marc Twagira", 
        program: "Performance Diet", 
        facility: "Waka Fitness HQ", 
        time: "11:30 AM",
        status: "Active",
        yield: 12000
    },
    { 
        id: "CON-003",
        client: "Alice Umutoni", 
        program: "Weight Protocol", 
        facility: "Private Clinic B", 
        time: "02:00 PM",
        status: "Pending",
        yield: 18000
    },
    { 
        id: "CON-004",
        client: "Paul Kagabo", 
        program: "Elite Athlete Plan", 
        facility: "Arena High Performance", 
        time: "04:00 PM",
        status: "Ready",
        yield: 25000
    },
];

const chartConfig = {
    revenue: { label: "Session Revenue", color: "#10b981" },
    adherence: { label: "Client Adherence", color: "#6366f1" }
} satisfies ChartConfig;

export default function NutritionistDashboard() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Monitor your clinical performance and client progress</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-semibold tracking-wide rounded-xl hover:bg-white/10">
                        <ClipboardList className="w-4 h-4 mr-2" /> View Reports
                    </Button>
                    <Button className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95">
                        <Apple className="w-4 h-4 mr-2" /> New Plan
                    </Button>
                </div>
            </div>

            {/* Global Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", val: "RWF 245k", sub: "Month-to-date income", icon: Wallet, color: "text-emerald-500", trend: "+18%" },
                    { label: "Total Clients", val: "84", sub: "Active program participants", icon: Users, color: "text-indigo-500", trend: "+8%" },
                    { label: "Adherence Rate", val: "96.2%", sub: "Avg compliance score", icon: ShieldCheck, color: "text-amber-500", trend: "Optimal" },
                    { label: "Weekly Sessions", val: "18", sub: "Consultations this week", icon: Activity, color: "text-sky-500", trend: "+4%" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full tracking-wider">{stat.trend}</span>
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
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold tracking-wide text-white flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" /> Revenue & Adherence
                        </h3>
                        <p className="text-[11px] font-medium text-muted-foreground opacity-50">Tracking client compliance against practice growth</p>
                    </div>
                    
                    <div className="h-[350px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <AreaChart data={metabolicData} margin={{ left: -10, right: 10, top: 0 }}>
                                <defs>
                                    <linearGradient id="colorAdh" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 600 }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                <Area type="monotone" dataKey="adherence" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAdh)" />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </Card>

                <Card className="glass-dark p-8 border-white/5 rounded-3xl satin-card flex flex-col justify-between">
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold tracking-wide text-white mb-2">Program Breakdown</h3>
                        <p className="text-[11px] font-medium text-muted-foreground opacity-50">Distribution of active clinical strategies</p>
                    </div>

                    <div className="space-y-8 py-10 flex-1 flex flex-col justify-center">
                        {[
                            { name: "Keto Intensive", val: 42, color: "bg-emerald-500" },
                            { name: "Elite Athlete Plan", val: 35, color: "bg-indigo-500" },
                            { name: "Metabolic Reset", val: 23, color: "bg-amber-500" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-[11px] font-bold text-white/50">{item.name}</span>
                                    <span className="text-lg font-bold text-white">{item.val}%</span>
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

                    <Button variant="outline" className="h-12 rounded-xl border-white/5 bg-white/5 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10">
                        View Details
                    </Button>
                </Card>
            </div>

            {/* Upcoming Consultations */}
            <div className="space-y-5">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-[11px] font-bold tracking-widest text-white uppercase opacity-40">Upcoming Consultations</h3>
                </div>
                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 uppercase">Client</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Program</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Status</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase text-right">Yield</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right pr-8 uppercase">Protocol ID</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {consultations.map((con, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/20 transition-all shadow-inner">
                                                <HeartPulse className="w-4 h-4 text-emerald-400 opacity-60 group-hover:opacity-100" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{con.client}</h4>
                                                <p className="text-[10px] text-muted-foreground opacity-40 font-medium mt-0.5">{con.facility}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/20" />
                                            <span className="text-[11px] font-medium text-white/90">{con.program}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] font-bold tracking-wide px-2.5 py-1 rounded-lg border-none uppercase",
                                            con.status === "Confirmed" ? "bg-indigo-500/10 text-indigo-400" :
                                            con.status === "Active" ? "bg-emerald-500/10 text-emerald-400" :
                                            con.status === "Ready" ? "bg-sky-500/10 text-sky-400" : "bg-white/5 text-muted-foreground"
                                        )}>
                                            {con.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-xs font-bold text-white">RWF {con.yield.toLocaleString()}</p>
                                        <p className="text-[9px] font-bold text-emerald-500 opacity-60 tracking-tight mt-0.5">Paid</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest group-hover:text-white/40 transition-colors">{con.id}</span>
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
