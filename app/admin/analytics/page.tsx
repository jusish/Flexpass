"use client";

import React, { useState } from "react";
import { 
    Users, 
    Building2, 
    CreditCard, 
    TrendingUp, 
    Activity, 
    Globe,
    Zap,
    Download,
    PieChart,
    BarChart3,
    Calendar,
    Target,
    HeartPulse,
    MapPin,
    Wallet,
    Coins,
    History,
    FileText,
    ArrowUpRight,
    Handshake,
    CheckCircle2,
    XCircle,
    Shield,
    Plus
} from "lucide-react";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { DateRangeFilter } from "@/components/admin/date-filter";

const marketReachData = [
    { zone: "Kigali CBD", reach: 85, fill: "#6366f1" },
    { zone: "Kimihurura", reach: 62, fill: "#10b981" },
    { zone: "Remera", reach: 48, fill: "#f59e0b" },
    { zone: "Nyarutarama", reach: 35, fill: "#8b5cf6" },
];

const revenueFlowData = [
    { month: "Jan", subscription: 12400000, utilization: 8500000, payout: 15400000 },
    { month: "Feb", subscription: 14200000, utilization: 9200000, payout: 16800000 },
    { month: "Mar", subscription: 16800000, utilization: 12400000, payout: 21200000 },
];

const sectorDistribution = [
    { name: 'Subscription Plan', value: 65, fill: "#6366f1" },
    { name: 'Utilization Model', value: 35, fill: "#10b981" },
];

const chartConfig = {
    subscription: { label: "Subscription Revenue", color: "#6366f1" },
    utilization: { label: "Utilization Revenue", color: "#10b981" },
    payout: { label: "Partner Payouts", color: "#f59e0b" },
    reach: { label: "Market Reach", color: "#6366f1" }
} satisfies ChartConfig;

export default function GlobalAnalytics() {
    const [activeTab, setActiveTab] = useState("market");

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Ecosystem Command</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50 uppercase tracking-widest mt-1">Global Intelligence & Financial Reconciliation Auditor</p>
                </div>
                <div className="flex gap-3">
                    <DateRangeFilter />
                    <Button variant="outline" size="sm" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100 transition-all">
                        <Download className="w-4 h-4 mr-2" /> Unified Audit
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="market" className="w-full space-y-8" onValueChange={setActiveTab}>
                <TabsList className="bg-black/40 border border-white/5 p-1.5 h-14 rounded-2xl backdrop-blur-xl">
                    <TabsTrigger value="market" className="h-11 px-8 rounded-xl text-[10px] font-black tracking-widest uppercase">Market Penetration</TabsTrigger>
                    <TabsTrigger value="financial" className="h-11 px-8 rounded-xl text-[10px] font-black tracking-widest uppercase">Financial Flow</TabsTrigger>
                    <TabsTrigger value="reconciliation" className="h-11 px-8 rounded-xl text-[10px] font-black tracking-widest uppercase">Invoicing & Recon</TabsTrigger>
                </TabsList>

                {/* Market Penetration Tab */}
                <TabsContent value="market" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "Global Reach", value: "84.2%", trend: "+5.1%", icon: Globe, color: "text-indigo-500" },
                            { label: "Partner Growth", value: "112 Nodes", trend: "+12 Nodes", icon: Building2, color: "text-emerald-500" },
                            { label: "Active Sponsors", value: "42", trend: "High Retention", icon: Shield, color: "text-amber-500" },
                            { label: "Sector Velocity", value: "1.8x", trend: "Accelerating", icon: Zap, color: "text-sky-500" },
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                                <div className="flex justify-between items-center mb-4">
                                    <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform", stat.color)}>
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[9px] font-black text-emerald-500">{stat.trend}</span>
                                </div>
                                <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-30 uppercase mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark p-10 border-white/5 rounded-3xl satin-card space-y-10">
                            <div>
                                <h3 className="text-sm font-black tracking-widest text-white flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-indigo-500" /> Geographic Penetration Index
                                </h3>
                                <p className="text-[10px] font-semibold text-muted-foreground opacity-40 mt-1 uppercase tracking-widest">Reach analysis across regional clusters</p>
                            </div>
                            <div className="h-[300px] w-full">
                                <ChartContainer config={chartConfig} className="h-full w-full">
                                    <BarChart data={marketReachData} layout="vertical" margin={{ left: 40 }}>
                                        <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.02)" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="zone" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="reach" radius={[0, 10, 10, 0]} barSize={40}>
                                            {marketReachData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <Card className="glass-dark p-10 border-white/5 rounded-3xl satin-card flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-black tracking-widest text-white mb-2 uppercase">Market Comparison</h3>
                                <p className="text-[10px] font-semibold text-muted-foreground opacity-40 uppercase tracking-widest">Reach benchmarks against platform goals</p>
                            </div>
                            <div className="space-y-8 py-10">
                                {[
                                    { zone: "Kigali CBD", val: 85, color: "bg-indigo-500" },
                                    { zone: "Nyarutarama", val: 42, color: "bg-emerald-500" },
                                    { zone: "Remera", val: 56, color: "bg-amber-500" },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-muted-foreground opacity-60 uppercase tracking-widest">{item.zone}</span>
                                            <span className="text-xl font-black text-white">{item.val}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.val}%` }}
                                                className={cn("h-full shadow-[0_0_10px_rgba(255,255,255,0.1)]", item.color)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="h-14 rounded-2xl border-white/5 text-[10px] font-black tracking-widest opacity-40 hover:opacity-100 transition-all uppercase">
                                VIEW PENETRATION AUDIT
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                {/* Financial Flow Tab */}
                <TabsContent value="financial" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Gross GMV", value: "RWF 142.8M", sub: "Total transaction volume", icon: Wallet, color: "text-indigo-500" },
                            { label: "Net Platform Margin", value: "RWF 21.4M", sub: "Platform fees (15%)", icon: Coins, color: "text-emerald-500" },
                            { label: "Partner Opex", value: "RWF 121.4M", sub: "Utilization payouts", icon: CreditCard, color: "text-rose-500" },
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark p-8 border-white/5 rounded-2xl satin-card text-center group">
                                <div className="flex justify-center mb-6">
                                    <div className={cn("p-4 bg-white/5 border border-white/5 rounded-2xl transition-transform group-hover:scale-110", stat.color)}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground opacity-40 mb-1 uppercase tracking-widest">{stat.label}</p>
                                <h3 className="text-3xl font-black tracking-tighter text-white">{stat.value}</h3>
                                <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold uppercase">{stat.sub}</p>
                            </Card>
                        ))}
                    </div>

                    <Card className="glass-dark p-10 border-white/5 rounded-3xl satin-card space-y-10">
                        <div>
                            <h3 className="text-sm font-black tracking-widest text-white flex items-center gap-3 uppercase">
                                <TrendingUp className="w-5 h-5 text-indigo-500" /> Revenue Flow & Model Comparison
                            </h3>
                            <p className="text-[10px] font-semibold text-muted-foreground opacity-40 mt-1 uppercase tracking-widest">Comparing Fixed Subscription vs Utilization-based Revenue</p>
                        </div>
                        <div className="h-[350px] w-full">
                            <ChartContainer config={chartConfig} className="h-full w-full">
                                <AreaChart data={revenueFlowData} margin={{ left: -20, right: 10, top: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorUtil" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Area type="monotone" dataKey="subscription" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSub)" />
                                    <Area type="monotone" dataKey="utilization" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUtil)" />
                                </AreaChart>
                            </ChartContainer>
                        </div>
                    </Card>
                </TabsContent>

                {/* Reconciliation Tab */}
                <TabsContent value="reconciliation" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                        <div className="p-10 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-black tracking-widest text-white uppercase">Invoicing & Settlement Audit</h3>
                                <p className="text-[10px] font-semibold text-muted-foreground opacity-40 mt-1 uppercase tracking-widest">Consolidated log of corporate billing & partner payouts</p>
                            </div>
                            <Button variant="outline" className="h-12 px-6 border-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl uppercase">
                                <Plus className="w-4 h-4 mr-2" /> CREATE BATCH RECON
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 uppercase">Archetpye</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Entity Node</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-right">Invoice Value</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-center">Protocol Status</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10 uppercase">Date Issued</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { type: "Sponsor", name: "MTN Rwanda", amount: "RWF 12.4M", status: "Settled", date: "Mar 15, 2026", color: "text-indigo-500" },
                                    { type: "Partner", name: "Waka Fitness", amount: "RWF 8.5M", status: "Pending", date: "Mar 18, 2026", color: "text-emerald-500" },
                                    { type: "Sponsor", name: "Bank of Kigali", amount: "RWF 18.2M", status: "Review", date: "Mar 12, 2026", color: "text-indigo-500" },
                                    { type: "Partner", name: "Kigali Arena Gym", amount: "RWF 4.2M", status: "Settled", date: "Mar 14, 2026", color: "text-emerald-500" },
                                ].map((row, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                        <TableCell className="pl-10 py-6">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className={cn("text-[7px] font-black tracking-widest border-white/10 uppercase", row.color)}>{row.type}</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-[11px] font-black text-white uppercase tracking-widest">{row.name}</p>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <p className="text-[11px] font-black text-white">{row.amount}</p>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/2">
                                                <div className={cn(
                                                    "w-1 h-1 rounded-full",
                                                    row.status === "Settled" ? "bg-emerald-500" : row.status === "Review" ? "bg-amber-500" : "bg-blue-500"
                                                )} />
                                                <span className={cn(
                                                    "text-[8px] font-black tracking-widest uppercase",
                                                    row.status === "Settled" ? "text-emerald-500" : row.status === "Review" ? "text-amber-500" : "text-blue-500"
                                                )}>{row.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10 text-[10px] font-black text-muted-foreground opacity-40 uppercase tracking-widest border-none">
                                            {row.date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
