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
    ArrowLeft,
    Star,
    ArrowUpRight,
    Handshake,
    Wallet,
    Coins,
    History,
    Calendar,
    Settings
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from "recharts";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { DateRangeFilter } from "@/components/admin/date-filter";

const historicalData = [
    { day: "Mon", visits: 45, revenue: 180000 },
    { day: "Tue", visits: 52, revenue: 208000 },
    { day: "Wed", visits: 38, revenue: 152000 },
    { day: "Thu", visits: 65, revenue: 260000 },
    { day: "Fri", visits: 48, revenue: 192000 },
    { day: "Sat", visits: 72, revenue: 288000 },
    { day: "Sun", visits: 55, revenue: 220000 },
];

const activityMix = [
    { name: "Gym & Fitness", visits: 840, share: 65, color: "#6366f1" },
    { name: "Swimming", visits: 220, share: 18, color: "#0ea5e9" },
    { name: "Yoga", visits: 180, share: 17, color: "#10b981" },
];

const recentCheckins = [
    { user: "Jean Pierre", type: "Corporate", activity: "Gym", time: "2 mins ago", plan: "Platinum" },
    { user: "Marie Claire", type: "Retail", activity: "Swimming", time: "15 mins ago", plan: "Gold" },
    { user: "David K.", type: "Corporate", activity: "Gym", time: "1 hour ago", plan: "Platinum" },
    { user: "Alice M.", type: "Retail", activity: "Yoga", time: "3 hours ago", plan: "Silver" },
];

const chartConfig = {
    visits: { label: "Visits", color: "#6366f1" },
    revenue: { label: "Revenue (RWF)", color: "#10b981" }
} satisfies ChartConfig;

export default function PartnerDetail({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="space-y-10 pb-20">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => router.back()}
                        className="rounded-full hover:bg-white/5 border border-white/5"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black tracking-tighter text-white">Waka Fitness HQ</h1>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black tracking-widest uppercase">Active</Badge>
                        </div>
                        <p className="text-muted-foreground text-[11px] font-semibold opacity-50 uppercase tracking-widest mt-1">Node ID: {resolvedParams.id} • Kigali CBD Infrastructure</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <DateRangeFilter />
                    <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl">
                        <Settings className="w-4 h-4 mr-2" /> NODE CONFIG
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black">
                        GENERATE INVOICE
                    </Button>
                </div>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Partner GMV", val: "RWF 12.4M", sub: "+12.4% vs last month", icon: Wallet, color: "text-indigo-500" },
                    { label: "Net Settlement", val: "RWF 10.5M", sub: "Ready for payout", icon: CreditCard, color: "text-emerald-500" },
                    { label: "Avg Session", val: "RWF 4,200", sub: "Platform yield", icon: Coins, color: "text-amber-500" },
                    { label: "NPS Rating", val: "4.8", sub: "High satisfaction", icon: Star, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:border-white/10 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-30 uppercase mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.val}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Main Tabs UI */}
            <Tabs defaultValue="overview" className="w-full space-y-8" onValueChange={setActiveTab}>
                <TabsList className="bg-black/40 border border-white/5 p-1.5 h-14 rounded-2xl backdrop-blur-xl">
                    <TabsTrigger value="overview" className="h-11 px-8 rounded-xl text-[10px] font-black tracking-widest uppercase data-[state=active]:bg-white/5 data-[state=active]:text-white">Overview</TabsTrigger>
                    <TabsTrigger value="activities" className="h-11 px-8 rounded-xl text-[10px] font-black tracking-widest uppercase data-[state=active]:bg-white/5 data-[state=active]:text-white">Supported Activities</TabsTrigger>
                    <TabsTrigger value="traffic" className="h-11 px-8 rounded-xl text-[10px] font-black tracking-widest uppercase data-[state=active]:bg-white/5 data-[state=active]:text-white">User Traffic</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Performance Chart */}
                        <Card className="lg:col-span-2 glass-dark p-10 border-white/5 rounded-3xl satin-card space-y-10">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-black tracking-widest text-white uppercase flex items-center gap-3">
                                        <ActivityIcon className="w-5 h-5 text-indigo-500" /> Economic Throughput
                                    </h3>
                                    <p className="text-[10px] font-semibold text-muted-foreground opacity-40 mt-1 uppercase tracking-widest">Revenue vs Participation Index</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                        <span className="text-[9px] font-black text-muted-foreground uppercase opacity-40 tracking-widest">Visits</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span className="text-[9px] font-black text-muted-foreground uppercase opacity-40 tracking-widest">Revenue</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ChartContainer config={chartConfig} className="h-full w-full">
                                    <AreaChart data={historicalData} margin={{ left: -20, right: 10, top: 0 }}>
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
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                                        <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        {/* Activity Mix */}
                        <Card className="glass-dark p-10 border-white/5 rounded-3xl satin-card flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-black tracking-widest text-white uppercase mb-2">Service Utilization</h3>
                                <p className="text-[10px] font-semibold text-muted-foreground opacity-40 uppercase tracking-widest">Breakdown by authorized activities</p>
                            </div>
                            <div className="space-y-10 py-10">
                                {activityMix.map((item, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-muted-foreground opacity-60 uppercase tracking-widest">{item.name}</span>
                                            <span className="text-xl font-black text-white">{item.share}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.share}%` }}
                                                className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                                style={{ backgroundColor: item.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="h-14 rounded-2xl border-white/5 bg-white/2 text-[10px] font-black tracking-widest opacity-40 hover:opacity-100 transition-all uppercase">
                                AUDIT SERVICE MIX
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="activities" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Gym & Fitness", icon: ActivityIcon, status: "High Load", capacity: "85%", rev: "RWF 8.2M", color: "text-indigo-500" },
                            { name: "Swimming Pool", icon: Globe, status: "Normal", capacity: "45%", rev: "RWF 2.4M", color: "text-cyan-500" },
                            { name: "Yoga & Pilates", icon: Handshake, status: "Low Load", capacity: "12%", rev: "RWF 1.8M", color: "text-emerald-500" },
                        ].map((act, i) => (
                            <Card key={i} className="glass-dark p-8 border-white/5 rounded-3xl satin-card hover:border-white/10 transition-all group">
                                <div className="flex justify-between items-start mb-8">
                                    <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 mb-4 transition-transform", act.color)}>
                                        <act.icon className="w-6 h-6" />
                                    </div>
                                    <Badge variant="outline" className="text-[8px] font-black tracking-widest opacity-40">{act.status}</Badge>
                                </div>
                                <h3 className="text-xl font-black text-white tracking-tighter mb-2">{act.name}</h3>
                                <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-6 mt-8">
                                    <div>
                                        <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-1">Cap Utilization</p>
                                        <p className="text-lg font-black text-white">{act.capacity}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-1">Entity GMV</p>
                                        <p className="text-lg font-black text-white">{act.rev}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="traffic" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 uppercase">Identity</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Plan Tier</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Activity Module</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10 uppercase">Ingress Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentCheckins.map((visit, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                        <TableCell className="pl-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-[10px] text-white select-none uppercase">
                                                    {visit.user.slice(0, 2)}
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{visit.user}</h4>
                                                    <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest uppercase">{visit.type} Node</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-[8px] font-black border-white/5 opacity-60 uppercase">{visit.plan}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-3.5 h-3.5 text-indigo-500" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{visit.activity}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <div className="flex items-center justify-end gap-2 text-[10px] font-black text-muted-foreground opacity-40 uppercase tracking-widest">
                                                <History className="w-3.5 h-3.5" /> {visit.time}
                                            </div>
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
