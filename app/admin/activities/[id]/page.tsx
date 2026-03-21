"use client";

import React, { use, useState } from "react";
import {
    Users,
    Building2,
    CreditCard,
    TrendingUp,
    Activity as ActivityIcon,
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
    MapPin,
    Dumbbell,
    Waves,
    Sparkles,
    Trophy,
    ArrowLeft,
    Star,
    ArrowUpRight,
    Coins,
    Banknote,
    Wallet,
    Layers,
    SlidersHorizontal,
    Box,
    ChevronLeft,
    ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
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
    ResponsiveContainer
} from "recharts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { DateRangeFilter } from "@/components/admin/date-filter";
import { DataFilterModal } from "@/components/admin/data-filter-modal";

const activityTypes: Record<string, any> = {
    "act-gym": { name: "Fitness & Gym", icon: Dumbbell, color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
    "act-swim": { name: "Swimming Pools", icon: Waves, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
    "act-spa": { name: "Spa & Wellness", icon: Sparkles, color: "text-rose-500", bgColor: "bg-rose-500/10" },
    "act-sports": { name: "Sports Clubs", icon: Trophy, color: "text-amber-500", bgColor: "bg-amber-500/10" },
    "act-yoga": { name: "Yoga & Pilates", icon: ActivityIcon, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
};

const historicalData = [
    { day: "Mon", visits: 120, revenue: 240000 },
    { day: "Tue", visits: 154, revenue: 308000 },
    { day: "Wed", visits: 189, revenue: 378000 },
    { day: "Thu", visits: 142, revenue: 284000 },
    { day: "Fri", visits: 210, revenue: 420000 },
    { day: "Sat", visits: 165, revenue: 330000 },
    { day: "Sun", visits: 98, revenue: 196000 },
];

const activityPartners = [
    { name: "Waka Town Gym", rating: 4.8, location: "Kigali CBD", status: "Active", dailyAvg: 45, visits: 1240, revenue: 8400000, tier: "Platinum" },
    { name: "Kigali Arena Gym", rating: 4.6, location: "Remera", status: "Active", dailyAvg: 68, visits: 2100, revenue: 14200000, tier: "Platinum" },
    { name: "Impact Fitness", rating: 4.5, location: "Kacyiru", status: "Active", dailyAvg: 32, visits: 850, revenue: 4800000, tier: "Gold" },
    { name: "Waka Kimihurura", rating: 4.7, location: "Kimihurura", status: "Active", dailyAvg: 41, visits: 1120, revenue: 7600000, tier: "Platinum" },
    { name: "Neo Fitness", rating: 4.2, location: "Nyarutarama", status: "Repair", dailyAvg: 18, visits: 420, revenue: 2100000, tier: "Silver" },
];

const chartConfig = {
    visits: { label: "Daily Sessions", color: "#6366f1" },
    revenue: { label: "Revenue", color: "#10b981" }
} satisfies ChartConfig;

export default function ActivityDetail({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const activityInfo = activityTypes[resolvedParams.id] || activityTypes["act-gym"];

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
            {/* Nav Back */}
            <div className="flex items-center gap-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-full border border-white/10 hover:bg-white/5 w-12 h-12 shadow-lg transition-transform hover:scale-105"
                >
                    <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </Button>
                <div className="flex items-center gap-6">
                    <div className={cn("p-5 rounded-[1.5rem] border border-white/10 shadow-inner group transition-transform hover:scale-110", activityInfo.bgColor, activityInfo.color)}>
                        <activityInfo.icon className="w-8 h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all leading-none">{activityInfo.name}</h1>
                        <p className="text-muted-foreground text-[11px] font-black opacity-30  tracking-[0.2em] mt-3">Activity Metric Audit • Cross-Entity Participation Flow</p>
                    </div>
                </div>
            </div>

            {/* Financial Summary Benchmarks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Gross Contribution", value: "RWF 37.1M", sub: "Global GMV volume", icon: Banknote, color: "text-indigo-500" },
                    { label: "Net Yield", value: "RWF 5.5M", sub: "Platform flow intensity", icon: Coins, color: "text-emerald-500" },
                    { label: "Session Yield", value: "RWF 4,500", sub: "Average unit access cost", icon: Wallet, color: "text-amber-500" },
                    { label: "Settlement Liquidity", value: "RWF 31.6M", sub: "Authorized disbursements", icon: CreditCard, color: "text-rose-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group hover:scale-[1.02] transition-all shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 rounded-xl border border-white/5 shadow-inner transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-black text-muted-foreground tracking-widest opacity-30  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white tabular-nums">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold  tracking-widest">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Engagement & Revenue Volume Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden shadow-xl flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 relative z-10">
                        <div className="space-y-1">
                            <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-3">
                                <ActivityIcon className="w-6 h-6 text-indigo-500" /> Velocity Audit
                            </h3>
                            <p className="text-muted-foreground text-[10px] font-black opacity-30  tracking-widest mt-1.5 leading-relaxed">Dual-axis participation vs gross clinical yield trajectory registry</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-6 mr-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                                    <span className="text-[9px] font-black text-muted-foreground  opacity-40 tracking-widest">Participation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                    <span className="text-[9px] font-black text-muted-foreground  opacity-40 tracking-widest">Yield Flow</span>
                                </div>
                            </div>
                            <DataFilterModal title="Velocity Protocol" description="Configure visual audit parameters for the participation and yield velocity registry.">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                        <DateRangeFilter />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive Focus</label>
                                        <Select defaultValue="all">
                                            <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                <SelectValue placeholder="Focus Area" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                <SelectItem value="all" className="text-[10px] font-black ">Comprehensive Flow</SelectItem>
                                                <SelectItem value="corp" className="text-[10px] font-black ">Corporate Node Activity</SelectItem>
                                                <SelectItem value="retail" className="text-[10px] font-black ">Retail Stream Yield</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </DataFilterModal>
                        </div>
                    </div>

                    <div className="h-[320px] w-full relative z-10 mt-auto">
                        <ChartContainer id="activityDetailVelocityRedux" config={chartConfig} className="h-full w-full">
                            <AreaChart data={historicalData} margin={{ left: -20, right: 10, top: 0 }}>
                                <defs>
                                    <linearGradient id="colorVisitsRedux" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRevenueRedux" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVisitsRedux)" />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenueRedux)" />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </Card>

                <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card flex flex-col justify-between group overflow-hidden relative shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/3 blur-[50px] group-hover:bg-indigo-500/10 transition-all" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-black tracking-tighter text-white  mb-2">Usage Matrix</h3>
                        <p className="text-muted-foreground text-[10px] font-black opacity-30  tracking-[0.2em] leading-relaxed">Authorized enrollment versus dynamic system ingress egress flow</p>
                    </div>

                    <div className="space-y-10 py-12 relative z-10 border-y border-white/5 mt-10">
                        {[
                            { label: "Corporate Entity Members", val: 68, color: "bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.2)]" },
                            { label: "Retail Platform Access", val: 32, color: "bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.2)]" },
                            { label: "Direct Guest Ingress", val: 12, color: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-4 group/item cursor-help">
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-black text-white/30 tracking-[0.2em]  truncate max-w-[180px] group-hover/item:text-white/60 transition-colors">{stat.label}</p>
                                    <p className="text-2xl font-black text-white tabular-nums group-hover/item:text-glow-silver transition-all leading-none">{stat.val}%</p>
                                </div>
                                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stat.val}%` }}
                                        className={cn("h-full transition-all duration-1000", stat.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="ghost" className="h-16 mt-10 rounded-2xl text-[10px] font-black border border-white/10 bg-white/3 text-muted-foreground opacity-40 hover:opacity-100 hover:text-white transition-all  tracking-[0.2em] relative z-10">
                        ANALYZE DEMOGRAPHIC MATRIX
                    </Button>
                </Card>
            </div>

            {/* Sector Partner Table */}
            <div className="space-y-8">
                <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/1 blur-[100px] pointer-events-none" />
                    <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all">Facility Monetization Audit</h3>
                            <p className="text-muted-foreground text-[10px] font-black opacity-30 tracking-[0.2em]  leading-relaxed">Clinical yield contribution of authorized infrastructure node facility hubs within this taxonomy</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative group min-w-[320px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 group-focus-within:text-indigo-400 transition-all" />
                                <input
                                    placeholder="Identify infrastructure facility hub by name or identity locale..."
                                    className="h-12 w-full bg-white/5 border border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 focus:ring-1 focus:ring-white/10 transition-all placeholder:opacity-30 flex items-center pr-4 shadow-inner"
                                />
                            </div>
                            <DataFilterModal title="Facility Protocol" description="Configure the financial and operational status parameters for infrastructure node audit.">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                        <DateRangeFilter />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Protocol focus</label>
                                        <Select defaultValue="active">
                                            <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                <SelectValue placeholder="Protocol focus" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                <SelectItem value="active" className="text-[10px] font-black ">Authorized Hubs</SelectItem>
                                                <SelectItem value="maintenance" className="text-[10px] font-black ">Maintenance Suspension</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </DataFilterModal>
                            <Button variant="outline" className="h-12 border-white/10 px-8 rounded-xl text-[10px] font-black tracking-widest opacity-40 hover:opacity-100 transition-all  shadow-lg">
                                <Download className="w-4 h-4 mr-3" /> EXPORT AUDIT LOG
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar relative z-10">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 ">Identity Matrix</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Hub Tier</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16  text-center">Protocol State</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16  text-right">Node Yield</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16  text-right pr-10">Participation</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activityPartners.map((partner, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                        <TableCell className="pl-10 py-7">
                                            <div className="flex flex-col">
                                                <h4 className="text-[13px] font-black text-white group-hover:text-glow-silver transition-all  tracking-tight">{partner.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 mt-2 tracking-[0.2em]  flex items-center gap-3">
                                                    <MapPin className="w-3.5 h-3.5 text-indigo-400/50" /> {partner.location}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-[9px] font-black tracking-widest border-none bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-lg shadow-inner">
                                                {partner.tier} Hub
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="inline-flex items-center gap-3 bg-white/2 px-5 py-2 rounded-full border border-white/5 shadow-inner">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    partner.status === "Active" ? "bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                                                )} />
                                                <span className={cn(
                                                    "text-[10px] font-black tracking-[0.2em] ",
                                                    partner.status === "Active" ? "text-emerald-500" : "text-rose-500"
                                                )}>{partner.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex flex-col items-end gap-1">
                                                <p className="text-base font-black text-white tabular-nums tracking-tighter  leading-none group-hover:text-emerald-400 transition-colors">RWF {partner.revenue.toLocaleString()}</p>
                                                <p className="text-[9px] font-black text-muted-foreground opacity-20 tracking-widest  mt-1">Net Settlement Flow</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <div className="flex flex-col items-end gap-1.5">
                                                <p className="text-base font-black text-white tabular-nums tracking-tighter  leading-none">{partner.visits.toLocaleString()}</p>
                                                <div className="flex items-center gap-1.5 text-indigo-400/30 mt-2">
                                                    <TrendingUp className="w-3.5 h-3.5 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]" />
                                                    <span className="text-[9px] font-black tabular-nums">+12.4% Intensity</span>
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
                            LOAD COMPREHENSIVE HUB REPOSITORY <ArrowRight className="w-5 h-5 ml-4 transition-transform group-hover/btn:translate-x-2" />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
