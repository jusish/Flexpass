"use client";

import React, { use } from "react";
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
    Wallet
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
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
    revenue: { label: "Revenue (RWF)", color: "#10b981" }
} satisfies ChartConfig;

export default function ActivityDetail({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const activityInfo = activityTypes[resolvedParams.id] || activityTypes["act-gym"];

    return (
        <div className="space-y-10 pb-20">
            {/* Nav Back */}
            <Button 
                variant="ghost" 
                className="group -ml-4 hover:bg-white/5 text-muted-foreground hover:text-white transition-all text-[10px] font-black tracking-widest uppercase"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back to Ecosystem
            </Button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={cn("p-4 rounded-2xl border border-white/5", activityInfo.bgColor, activityInfo.color)}>
                            <activityInfo.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-white">{activityInfo.name}</h1>
                            <p className="text-muted-foreground text-[11px] font-semibold opacity-50 uppercase tracking-widest mt-1">Cross-Node Participation Intelligence</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="glass-dark border border-white/5 px-6 py-4 rounded-2xl text-center min-w-32">
                        <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-1">Total Venue Hubs</p>
                        <p className="text-2xl font-black text-white">45</p>
                    </div>
                    <div className="glass-dark border border-white/5 px-6 py-4 rounded-2xl text-center min-w-32">
                        <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-1">Avg Rating</p>
                        <div className="flex items-center justify-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <p className="text-2xl font-black text-white">4.73</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Summary Benchmarks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Gross Contribution", value: "RWF 37.1M", sub: "Platform GMV", icon: Banknote, color: "text-indigo-500" },
                    { label: "Net Revenue", value: "RWF 5.5M", sub: "Platform Fees (15%)", icon: Coins, color: "text-emerald-500" },
                    { label: "Avg Session Value", value: "RWF 4,500", sub: "Yield / Access", icon: Wallet, color: "text-amber-500" },
                    { label: "Settlement Flow", value: "RWF 31.6M", sub: "Due to Partners", icon: CreditCard, color: "text-rose-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 rounded-xl border border-white/5 shadow-inner transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-40 mb-1">{stat.label.toUpperCase()}</p>
                        <h3 className="text-xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-2 font-semibold">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Engagement & Revenue Volume Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-dark p-10 border-white/5 rounded-3xl satin-card space-y-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black tracking-widest text-white flex items-center gap-3">
                                <ActivityIcon className="w-5 h-5 text-indigo-500" /> Activity Performance Velocity
                            </h3>
                            <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1">Dual-axis tracking of session volume and gross revenue generation</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                <span className="text-[9px] font-black text-muted-foreground uppercase opacity-40">Sessions</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[9px] font-black text-muted-foreground uppercase opacity-40">Revenue</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <AreaChart data={historicalData} margin={{ left: -20, right: 10, top: 20 }}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 11, fontWeight: 700 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </Card>

                <Card className="glass-dark p-10 border-white/5 rounded-3xl satin-card flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-black tracking-widest text-white mb-2 uppercase">Usage Distribution</h3>
                        <p className="text-muted-foreground text-[10px] font-semibold opacity-40 tracking-widest">Enrollment vs Regular Visits</p>
                    </div>

                    <div className="space-y-10 py-6">
                        {[
                            { label: "Corporate Members", val: 68, color: "bg-indigo-500" },
                            { label: "Retail Members", val: 32, color: "bg-sky-500" },
                            { label: "Guest Access", val: 12, color: "bg-emerald-500" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-black text-white/60 tracking-widest uppercase">{stat.label}</p>
                                    <p className="text-xl font-black text-white">{stat.val}%</p>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stat.val}%` }}
                                        className={cn("h-full", stat.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="h-12 border-white/5 rounded-2xl text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all">
                        VIEW DEMOGRAPHIC AUDIT
                    </Button>
                </Card>
            </div>

            {/* Sector Partner Table */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black tracking-tighter text-white">Node Monetization Audit</h3>
                        <p className="text-muted-foreground text-[10px] font-semibold opacity-50 tracking-widest mt-1 uppercase">Financial contribution of each authorized {activityInfo.name} node</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-11 border-white/5 rounded-xl px-6 text-[10px] font-black tracking-widest opacity-60">
                            <Download className="w-4 h-4 mr-2" /> DATA EXPORT
                        </Button>
                    </div>
                </div>

                <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 uppercase">Partner Entity</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Hub Tier</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-center">Operational Status</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-right">Activity GMV</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-right pr-10">Usage Volume</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activityPartners.map((partner, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <div>
                                            <h4 className="text-[12px] font-black text-white group-hover:text-glow-silver transition-all">{partner.name}</h4>
                                            <p className="text-[9px] text-muted-foreground font-black opacity-30 mt-1 tracking-widest uppercase">{partner.location}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[8px] font-black tracking-widest border-white/10 bg-white/5 text-white/60">
                                            {partner.tier.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="inline-flex items-center gap-2">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                partner.status === "Active" ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-rose-500"
                                            )} />
                                            <span className={cn(
                                                "text-[9px] font-black tracking-widest",
                                                partner.status === "Active" ? "text-emerald-500" : "text-rose-500"
                                            )}>{partner.status.toUpperCase()}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-sm font-black text-white">RWF {partner.revenue.toLocaleString()}</p>
                                        <p className="text-[8px] font-black text-muted-foreground opacity-30 tracking-widest uppercase">Net Settlement Flow</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <p className="text-sm font-black text-white">{partner.visits.toLocaleString()}</p>
                                        <div className="flex items-center justify-end gap-1 opacity-40">
                                            <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                            <p className="text-[9px] font-bold text-emerald-500">+12%</p>
                                        </div>
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
