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
    Plus,
    Box,
    Layers,
    SlidersHorizontal,
    Search,
    ArrowRight
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
import { DataFilterModal } from "@/components/admin/data-filter-modal";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all leading-none">Global Intelligence</h1>
                    <p className="text-muted-foreground text-[11px] font-black opacity-30  tracking-[0.2em] mt-3 leading-relaxed">Cross-entity ecosystem performance and financial reconciliation audit</p>
                </div>
                <div className="flex gap-4">
                    <DataFilterModal title="Global Audit Protocol" description="Configure unified audit parameters for the ecosystem intelligence registry.">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                <DateRangeFilter />
                            </div>
                        </div>
                    </DataFilterModal>
                    <Button variant="outline" className="h-14 px-8 border-white/10 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 rounded-2xl  transition-all shadow-xl">
                        <Download className="w-4 h-4 mr-3" /> Unified Report
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="market" className="w-full space-y-10" onValueChange={setActiveTab}>
                <TabsList className="bg-black/40 border border-white/5 p-2 h-16 rounded-3xl backdrop-blur-3xl inline-flex">
                    {[
                        { val: "market", label: "Penetration Matrix", icon: Globe },
                        { val: "financial", label: "Yield Flow", icon: Coins },
                        { val: "reconciliation", label: "Ledger Recon", icon: History },
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.val}
                            value={tab.val}
                            className="h-12 px-10 rounded-2xl text-[10px] font-black tracking-widest  data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all flex items-center gap-3 group"
                        >
                            <tab.icon className={cn("w-4 h-4 opacity-30 group-data-[state=active]:opacity-100", tab.val === "market" && "text-indigo-400")} />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Market Penetration Tab */}
                <TabsContent value="market" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "Market Reach", value: "84.2%", trend: "+5.1%", icon: Globe, color: "text-indigo-500" },
                            { label: "Node Expansion", value: "112 Hubs", trend: "+12 Nodes", icon: Building2, color: "text-emerald-500" },
                            { label: "Entity Retension", value: "42 Units", trend: "Stability +9%", icon: Shield, color: "text-amber-500" },
                            { label: "Model Velocity", value: "1.8x", trend: "Accelerating", icon: Zap, color: "text-sky-500" },
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:scale-[1.02] transition-all relative overflow-hidden shadow-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110 shadow-inner", stat.color)}>
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                    <Badge variant="outline" className="text-[9px] font-black border-none bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg  tracking-widest shadow-inner">{stat.trend}</Badge>
                                </div>
                                <p className="text-[9px] font-black text-muted-foreground tracking-widest opacity-30  mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-black tracking-tighter text-white tabular-nums">{stat.value}</h3>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden flex flex-col shadow-xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-indigo-500" /> Regional Penetration Index
                                    </h3>
                                    <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-[0.2em] mt-1.5 leading-relaxed">Comparative Reach Audit across facility cluster nodes</p>
                                </div>
                                <DataFilterModal title="Reach Protocol" description="Configure geographic penetration and regional cluster visualization parameters.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                            <DateRangeFilter />
                                        </div>
                                    </div>
                                </DataFilterModal>
                            </div>
                            <div className="h-[320px] w-full relative z-10">
                                <ChartContainer id="adminGlobalGeographicPenRedux" config={chartConfig} className="h-full w-full">
                                    <BarChart data={marketReachData} layout="vertical" margin={{ left: 40, right: 20 }}>
                                        <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="zone" type="category" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} width={100} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="reach" radius={[0, 10, 10, 0]} barSize={40} className="filter drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                                            {marketReachData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card flex flex-col justify-between group relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/3 blur-[50px] group-hover:bg-indigo-500/10 transition-all" />
                            <div className="relative z-10">
                                <h3 className="text-sm font-black tracking-widest text-white  mb-2">Cluster Benchmarks</h3>
                                <p className="text-muted-foreground text-[10px] font-black opacity-30  tracking-[0.2em] leading-relaxed">Platform penetration intensity against authorized clinical targets</p>
                            </div>
                            <div className="space-y-10 py-12 relative z-10 border-y border-white/5 mt-10">
                                {[
                                    { zone: "Kigali CBD", val: 85, color: "bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.2)]" },
                                    { zone: "Nyarutarama", val: 42, color: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]" },
                                    { zone: "Remera", val: 56, color: "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)]" },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-4 group/item cursor-help px-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-white/30 tracking-[0.2em]  truncate max-w-[180px] group-hover/item:text-white/60 transition-colors">{item.zone} Cluster</span>
                                            <span className="text-2xl font-black text-white group-hover/item:text-glow-silver transition-all tabular-nums leading-none">{item.val}% Reach</span>
                                        </div>
                                        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.val}%` }}
                                                className={cn("h-full transition-all duration-1000", item.color)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="h-16 mt-10 rounded-2xl text-[10px] font-black border border-white/10 bg-white/3 text-muted-foreground opacity-30 hover:opacity-100 hover:text-white transition-all  tracking-[0.2em] relative z-10">
                                LOAD FULL PENETRATION REPOSITORY
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                {/* Financial Flow Tab */}
                <TabsContent value="financial" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: "Lifetime GMV", value: "RWF 142.8M", sub: "Total transaction velocity", icon: Wallet, color: "text-indigo-500" },
                            { label: "Net Platform Margin", value: "RWF 21.4M", sub: "Utility fees (15%)", icon: Coins, color: "text-emerald-500" },
                            { label: "Partner Opex Flow", value: "RWF 121.4M", sub: "Clinical module payouts", icon: CreditCard, color: "text-rose-500" },
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark p-10 border-white/5 rounded-2xl satin-card text-center group relative overflow-hidden shadow-xl">
                                <div className="flex justify-center mb-8">
                                    <div className={cn("p-5 bg-white/5 border border-white/5 rounded-2xl transition-transform group-hover:scale-110 shadow-inner group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]", stat.color)}>
                                        <stat.icon className="w-8 h-8" />
                                    </div>
                                </div>
                                <p className="text-[10px] font-black text-muted-foreground opacity-30 mb-2  tracking-[0.2em] leading-relaxed">{stat.label}</p>
                                <h3 className="text-4xl font-black tracking-tighter text-white tabular-nums leading-none">{stat.value}</h3>
                                <p className="text-[10px] text-muted-foreground opacity-20 mt-4 font-black  tracking-widest">{stat.sub}</p>
                            </Card>
                        ))}
                    </div>

                    <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden flex flex-col shadow-xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10">
                            <div className="space-y-1">
                                <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-3">
                                    <TrendingUp className="w-6 h-6 text-indigo-500" /> Revenue Flow Intensity
                                </h3>
                                <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-[0.2em] mt-1.5 leading-relaxed">Comparative analysis of Authorized Subscription vs Dynamic Utilization yield trajectories</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-8 mr-6">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                                        <span className="text-[9px] font-black text-muted-foreground  opacity-40 tracking-widest">Subscription Flow</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                        <span className="text-[9px] font-black text-muted-foreground  opacity-40 tracking-widest">Utilization Yield</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
                                        <span className="text-[9px] font-black text-muted-foreground  opacity-40 tracking-widest">Settlement Node</span>
                                    </div>
                                </div>
                                <DataFilterModal title="Yield Protocol" description="Configure the financial flow visualization and revenue model parameters.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                            <DateRangeFilter />
                                        </div>
                                    </div>
                                </DataFilterModal>
                            </div>
                        </div>
                        <div className="h-[400px] w-full relative z-10 mt-auto">
                            <ChartContainer id="adminGlobalRevenueFlowRedux" config={chartConfig} className="h-full w-full">
                                <AreaChart data={revenueFlowData} margin={{ left: -20, right: 10, top: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSubFlowRedux" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorUtilFlowRedux" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Area type="monotone" dataKey="subscription" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSubFlowRedux)" />
                                    <Area type="monotone" dataKey="utilization" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorUtilFlowRedux)" />
                                </AreaChart>
                            </ChartContainer>
                        </div>
                    </Card>
                </TabsContent>

                {/* Reconciliation Tab */}
                <TabsContent value="reconciliation" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/1 blur-[100px] pointer-events-none" />
                        <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all">Consolidated Settlement Audit</h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em] leading-relaxed">Cross-entity historical ledger of corporate billing and partner clinical disbursement trajectories</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[320px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 group-focus-within:text-indigo-400 transition-all" />
                                    <input
                                        placeholder="Identify ledger trace by entity hub or protocol state..."
                                        className="h-12 w-full bg-white/5 border border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 focus:ring-1 focus:ring-white/10 transition-all placeholder:opacity-30 flex items-center pr-4 shadow-inner"
                                    />
                                </div>
                                <DataFilterModal title="Reconciliation Protocol" description="Configure the unified reconciliation parameters and temporal audit state.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                            <DateRangeFilter />
                                        </div>
                                    </div>
                                </DataFilterModal>
                                <Button variant="outline" className="h-12 px-8 border-white/10 bg-white/5 text-[10px] font-black tracking-widest opacity-40 hover:opacity-100 transition-all rounded-xl  shadow-lg">
                                    <Plus className="w-4 h-4 mr-3" /> CREATE BATCH RECON
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar relative z-10">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                        <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 ">Archetpye</TableHead>
                                        <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Entity Node</TableHead>
                                        <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16  text-right">Invoice Yield</TableHead>
                                        <TableHead className="text-center text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Protocol Status</TableHead>
                                        <TableHead className="text-right pr-10 text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Temporal Issue</TableHead>
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
                                            <TableCell className="pl-10 py-7">
                                                <div className="flex items-center gap-3">
                                                    <Badge variant="outline" className={cn("text-[8px] font-black tracking-[0.2em] border-none bg-white/5  px-4 py-1.5 rounded-lg shadow-inner", row.color)}>{row.type} Node</Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-[12px] font-black text-white  tracking-tighter group-hover:text-glow-silver transition-all leading-none">{row.name}</p>
                                                <p className="text-[8px] font-black text-muted-foreground opacity-20  tracking-[0.3em] mt-2">Active Protocol Authority</p>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <p className="text-sm font-black text-white tabular-nums group-hover:text-indigo-400 transition-colors">{row.amount}</p>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="inline-flex items-center gap-3 bg-white/2 px-5 py-2 rounded-full border border-white/5 shadow-inner">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        row.status === "Settled" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : row.status === "Review" ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                    )} />
                                                    <span className={cn(
                                                        "text-[9px] font-black tracking-[0.2em] ",
                                                        row.status === "Settled" ? "text-emerald-500" : row.status === "Review" ? "text-amber-500" : "text-blue-500"
                                                    )}>{row.status}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-10">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[11px] font-black text-white/40  tracking-widest tabular-nums">{row.date}</span>
                                                    <div className="flex items-center gap-1.5 text-indigo-400/30 mt-2">
                                                        <History className="w-3.5 h-3.5" />
                                                        <span className="text-[8px] font-black tracking-widest ">Verified Trace</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="p-10 border-t border-white/5 bg-white/1 flex justify-center relative z-10">
                            <Button variant="ghost" className="h-14 px-12 rounded-2xl text-[10px] font-black text-muted-foreground opacity-30 hover:opacity-100 hover:text-white transition-all  tracking-[0.2em] border border-white/10 group/btn">
                                ACCESS UNIFIED LEDGER CHRONICLE <ArrowRight className="w-5 h-5 ml-4 transition-transform group-hover/btn:translate-x-2" />
                            </Button>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
