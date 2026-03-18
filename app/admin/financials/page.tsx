"use client";

import React from "react";
import { 
    Users, 
    Building2, 
    CreditCard, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight, 
    Activity, 
    MoreVertical,
    Search,
    Filter,
    Plus,
    Download,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Globe,
    Zap,
    Briefcase,
    Wallet,
    Receipt,
    Clock
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
import { cn } from "@/lib/utils";
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
    ResponsiveContainer
} from "recharts";

const performanceData = [
    { month: "Oct", revenue: 15.4, payout: 10.2 },
    { month: "Nov", revenue: 22.8, payout: 15.4 },
    { month: "Dec", revenue: 19.5, payout: 14.1 },
    { month: "Jan", revenue: 34.2, payout: 22.8 },
    { month: "Feb", revenue: 42.1, payout: 28.5 },
    { month: "Mar", revenue: 48.9, payout: 32.4 },
];

const disbursements = [
    { partner: "Waka Fitness", amount: 5580000, status: "Pending Settlement", method: "Bank Transfer", cycle: "Monthly - Mar 26" },
    { partner: "Cercle Sportif", amount: 4005000, status: "Processing", method: "Bank Transfer", cycle: "Monthly - Mar 26" },
    { partner: "Kigali Arena", amount: 9450000, status: "Settled", method: "Direct Debit", cycle: "Weekly - W3 Mar 26" },
    { partner: "Mindful Yoga", amount: 2025000, status: "Audit Required", method: "Bank Transfer", cycle: "Monthly - Mar 26" },
    { partner: "Mindful Yoga", amount: 1250000, status: "Settled", method: "Direct Debit", cycle: "Weekly - W2 Mar 26" },
];

const chartConfig = {
    revenue: { label: "Gross Invoicing", color: "#6366f1" },
    payout: { label: "Partner Settlements", color: "#10b981" },
} satisfies ChartConfig;

export default function GlobalFinancials() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Capital Settlement</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Unified billing, partner disbursement engine, and global platform revenue velocity</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100 transition-all text-white">
                        <Download className="w-4 h-4 mr-2" /> Financial Audit
                    </Button>
                    <Button size="sm" className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5">
                        <Receipt className="w-4 h-4 mr-2" /> Run Global Settlement
                    </Button>
                </div>
            </div>

            {/* Core Financial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Aggregate Market Revenue", value: "RWF 48.9M", sub: "Month-to-date invoicing", icon: Wallet, color: "text-indigo-500" },
                    { label: "Net Platform Margin", value: "RWF 16.5M", sub: "33.7% Gross Margin", icon: TrendingUp, color: "text-emerald-500" },
                    { label: "Outstanding Payouts", value: "RWF 15.2M", sub: "Cycle ends in 4 days", icon: CreditCard, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-8 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-6">
                            <div className={cn("p-3 bg-white/5 rounded-2xl border border-white/5 shadow-inner transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[9px] font-black tracking-widest text-muted-foreground opacity-40">Economic Index</span>
                        </div>
                        <p className="text-[10px] font-bold tracking-widest opacity-40 mb-1 text-white/60">{stat.label}</p>
                        <h3 className="text-3xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-4 font-semibold">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Platform Revenue Flow Chart */}
            <Card className="glass-dark p-10 border-white/5 rounded-2xl satin-card space-y-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-black tracking-widest text-white flex items-center gap-3">
                            <Activity className="w-5 h-5 text-emerald-500" /> Capital Throughput Index
                        </h3>
                        <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1">Monthly comparison of platform gross invoicing vs partner disbursement volume</p>
                    </div>
                </div>

                <div className="h-[400px] w-full">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <AreaChart data={performanceData} margin={{ left: -20, right: 10, top: 20 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 11, fontWeight: 700 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} tickFormatter={(val: number) => `RWF ${val}M`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorRevenue)" />
                            <Area type="monotone" dataKey="payout" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPayout)" />
                        </AreaChart>
                    </ChartContainer>
                </div>
            </Card>

            {/* Disbursement Management */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-black tracking-widest text-white pl-2">Pending Disbursement Ledger</h3>
                </div>
                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10">Beneficiary Node</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16">Capital Volume (Settlement)</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16">Verification Status</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16">Disbursement Protocol</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10">Billing Cycle</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {disbursements.map((item, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                                                <Building2 className="w-4 h-4 text-secondary/60" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-white tracking-widest">{item.partner}</h4>
                                                <p className="text-[8px] text-muted-foreground font-black opacity-30 tracking-widest">Node verified</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-white tracking-widest">RWF {item.amount.toLocaleString()}</span>
                                            <span className="text-[10px] font-bold text-emerald-500 opacity-60">Verified Logs</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {item.status === "Settled" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                                            {item.status.includes("Pending") && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                                            {item.status.includes("Audit") && <AlertCircle className="w-3.5 h-3.5 text-rose-500" />}
                                            {item.status === "Processing" && <Activity className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />}
                                            <span className={cn(
                                                "text-[9px] font-black tracking-widest",
                                                item.status === "Settled" ? "text-emerald-500" :
                                                item.status.includes("Pending") ? "text-amber-500" :
                                                item.status.includes("Audit") ? "text-rose-500" : "text-indigo-500"
                                            )}>{item.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500/40" />
                                            <span className="text-[10px] font-bold text-muted-foreground opacity-60 uppercase tracking-widest">{item.method}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <Badge variant="outline" className="text-[9px] font-black border-white/10 opacity-40 px-2.5 py-1">{item.cycle}</Badge>
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
