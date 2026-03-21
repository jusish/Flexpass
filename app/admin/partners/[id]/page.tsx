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
    Settings,
    Layers,
    SlidersHorizontal,
    Box
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
import { Input } from "@/components/ui/input";

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
    revenue: { label: "Revenue", color: "#10b981" }
} satisfies ChartConfig;

export default function PartnerDetail({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full hover:bg-white/5 border border-white/5 w-12 h-12 shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all">Waka Fitness HQ</h1>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-black tracking-widest  px-3 py-1 rounded-lg shadow-sm">Operational Node</Badge>
                        </div>
                        <p className="text-muted-foreground text-[11px] font-black opacity-30  tracking-[0.2em] mt-2 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400" /> ID: {resolvedParams.id} • KIGALI CBD CROSS-ENTITY INFRASTRUCTURE
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 border-white/10 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl ">
                        <Settings className="w-4 h-4 mr-2" /> Node Config
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black  shadow-xl shadow-white/5 active:scale-95">
                        <Download className="w-4 h-4 mr-2" /> Generate Yield Audit
                    </Button>
                </div>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Partner GMV", val: "RWF 12.4M", sub: "Yield index: +12.4%", icon: Wallet, color: "text-indigo-500" },
                    { label: "Net Settlement", val: "RWF 10.5M", sub: "Awaiting disbursement", icon: CreditCard, color: "text-emerald-500" },
                    { label: "Avg Yield/Visit", val: "RWF 4,200", sub: "Platform economic flow", icon: Coins, color: "text-amber-500" },
                    { label: "Confidence Index", val: "4.8", sub: "Clinical satisfaction rate", icon: Star, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:scale-[1.02] transition-transform font-sans">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-black text-muted-foreground tracking-widest opacity-30  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white tabular-nums">{stat.val}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold  tracking-widest">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Main Tabs UI */}
            <Tabs defaultValue="overview" className="w-full space-y-8" onValueChange={setActiveTab}>
                <TabsList className="bg-black/40 border border-white/5 p-2 h-16 rounded-3xl backdrop-blur-3xl inline-flex font-sans">
                    {[
                        { val: "overview", label: "Performance Audit", icon: ActivityIcon },
                        { val: "activities", label: "Infrastructure Hubs", icon: Box },
                        { val: "traffic", label: "Registry Logs", icon: Users },
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.val}
                            value={tab.val}
                            className="h-12 px-10 rounded-2xl text-[10px] font-black tracking-widest  data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all flex items-center gap-3 group"
                        >
                            <tab.icon className={cn("w-4 h-4 opacity-30 group-data-[state=active]:opacity-100", activeTab === tab.val && "text-indigo-500")} />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Performance Chart with Integrated Filters */}
                        <Card className="lg:col-span-2 glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden flex flex-col font-sans">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-3">
                                        <ActivityIcon className="w-5 h-5 text-indigo-500" /> Economic Throughput
                                    </h3>
                                    <p className="text-[10px] font-semibold text-muted-foreground opacity-40 mt-1  tracking-widest">Revenue vs Participation Index trajectories</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <DataFilterModal title="Economic Protocol" description="Configure performance data visualization and yield audit parameters.">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                                <DateRangeFilter />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Analytical focus</label>
                                                <Select defaultValue="visits">
                                                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                        <SelectValue placeholder="Focus Metric" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                        <SelectItem value="visits" className="text-[10px] font-black ">Traffic Flow Volume</SelectItem>
                                                        <SelectItem value="revenue" className="text-[10px] font-black ">Gross System Revenue</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </DataFilterModal>
                                </div>
                            </div>

                            <div className="h-[320px] w-full relative z-10">
                                <ChartContainer id="partner-detail-performance-chart-redesign" config={chartConfig} className="h-full w-full">
                                    <AreaChart data={historicalData} margin={{ left: -20, right: 10, top: 0 }}>
                                        <defs>
                                            <linearGradient id="colorVisitsPartner" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorRevenuePartner" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVisitsPartner)" />
                                        <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenuePartner)" />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        {/* Activity Mix */}
                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card flex flex-col justify-between group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/3 blur-[50px] group-hover:bg-indigo-500/10 transition-all font-sans" />
                            <div className="flex items-center justify-between mb-10 relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black tracking-widest text-white ">Module Analysis</h3>
                                    <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-[0.2em]">Operational service breakdown</p>
                                </div>
                                <DataFilterModal title="Distribution Audit" description="Configure distribution parameters for service auditing.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Registry period</label>
                                            <DateRangeFilter />
                                        </div>
                                    </div>
                                </DataFilterModal>
                            </div>
                            <div className="space-y-10 py-6 relative z-10 font-sans">
                                {activityMix.map((item, i) => (
                                    <div key={i} className="space-y-4 group/item cursor-help">
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-white/40  tracking-[0.2em]">{item.name}</span>
                                                <span className="text-[11px] font-black text-indigo-400 tabular-nums  mt-2">{item.visits} Ingress Units</span>
                                            </div>
                                            <span className="text-2xl font-black text-white group-hover/item:text-glow-silver transition-all">{item.share}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden relative font-sans shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.share}%` }}
                                                className="h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                                style={{ backgroundColor: item.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="h-14 rounded-2xl border border-white/10 bg-white/3 text-[10px] font-black tracking-[0.2em] text-muted-foreground opacity-40 hover:opacity-100 hover:text-white transition-all  mt-8 relative z-10 font-sans">
                                <History className="w-5 h-5 mr-3" /> AUDIT OPERATIONAL FLOW
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="activities" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Gym & Fitness", icon: ActivityIcon, status: "High Load", capacity: "85%", rev: "RWF 8.2M", color: "text-indigo-500", desc: "Primary metabolic performance infrastructure" },
                            { name: "Swimming Pool", icon: Globe, status: "Normal", capacity: "45%", rev: "RWF 2.4M", color: "text-cyan-500", desc: "Low impact cardiovascular node" },
                            { name: "Yoga & Pilates", icon: Handshake, status: "Low Load", capacity: "12%", rev: "RWF 1.8M", color: "text-emerald-500", desc: "Functional recovery & alignment module" },
                        ].map((act, i) => (
                            <Card key={i} className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card hover:border-white/10 transition-all group relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/3 blur-[60px] group-hover:bg-indigo-500/10 transition-all" />
                                <div>
                                    <div className="flex justify-between items-start mb-10 relative z-10">
                                        <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 shadow-inner transition-transform", act.color)}>
                                            <act.icon className="w-7 h-7" />
                                        </div>
                                        <Badge variant="outline" className="text-[9px] font-black tracking-widest border-none bg-emerald-500/10 text-emerald-500 px-4 py-1.5  rounded-lg shadow-sm">{act.status}</Badge>
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tighter  mb-3 relative z-10 group-hover:text-glow-silver transition-all">{act.name}</h3>
                                    <p className="text-[11px] font-black text-muted-foreground opacity-30  tracking-widest mb-12 relative z-10 leading-relaxed font-sans">{act.desc}</p>
                                </div>

                                <div className="pt-10 border-t border-white/5 grid grid-cols-2 gap-10 relative z-10 font-sans">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-muted-foreground opacity-30  tracking-[0.2em]">Node Load</p>
                                        <p className="text-2xl font-black text-white tabular-nums">{act.capacity}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-muted-foreground opacity-30  tracking-[0.2em]">GMV Yield</p>
                                        <p className="text-2xl font-black text-emerald-500 tabular-nums">{act.rev}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="traffic" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative font-sans">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/1 blur-[100px] pointer-events-none" />
                        <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black tracking-tighter text-white  flex items-center gap-3">
                                    <ActivityIcon className="w-6 h-6 text-indigo-500" /> User Ingress Registry
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em]">Real-time operational traffic logs for this entity node</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[320px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all font-sans" />
                                    <Input
                                        placeholder="Identify participant by name or infrastructure plan..."
                                        className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 transition-all placeholder:opacity-30 focus:ring-1 focus:ring-white/10"
                                    />
                                </div>

                                <DataFilterModal title="Traffic Protocol" description="Configure participation and access registry parameters for flow analysis.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Registry period</label>
                                            <DateRangeFilter />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Infrastructure node</label>
                                            <Select defaultValue="all">
                                                <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                    <SelectValue placeholder="Protocol Node" />
                                                </SelectTrigger>
                                                <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                    <SelectItem value="all" className="text-[10px] font-black ">All Unified Nodes</SelectItem>
                                                    <SelectItem value="corp" className="text-[10px] font-black ">Corporate Sponsors Only</SelectItem>
                                                    <SelectItem value="retail" className="text-[10px] font-black ">Retail Market Access</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </DataFilterModal>
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar relative z-10 transition-all">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                        <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 ">Identity Matrix</TableHead>
                                        <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Plan Node</TableHead>
                                        <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Module Egress</TableHead>
                                        <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10 ">Registry Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentCheckins.map((visit, i) => (
                                        <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                            <TableCell className="pl-10 py-7">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-[12px] text-white select-none  shadow-inner group-hover:border-indigo-500/30 transition-all group-hover:scale-110">
                                                        {visit.user.slice(0, 2)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h4 className="text-[12px] font-black text-white  tracking-tighter group-hover:text-glow-silver transition-all">{visit.user}</h4>
                                                        <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-[0.2em]  mt-1.5">{visit.type} Node Infrastructure</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-[9px] font-black border-none bg-indigo-500/10 text-indigo-400 px-4 py-1.5  rounded-lg shadow-sm tracking-widest">
                                                    {visit.plan} Tier
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                        <Zap className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                                    </div>
                                                    <span className="text-[11px] font-black text-white  tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">{visit.activity}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-10">
                                                <div className="flex items-center justify-end gap-3 text-[10px] font-black text-muted-foreground opacity-30  tracking-[0.2em]">
                                                    <History className="w-5 h-5 text-indigo-500/40" /> {visit.time}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="p-10 bg-white/1 border-t border-white/5 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] font-black tracking-widest text-muted-foreground opacity-30 ">Operational flow audit active</p>
                            </div>
                            <Button variant="ghost" className="h-12 px-8 rounded-2xl text-[10px] font-black border border-white/10 opacity-40 hover:opacity-100 hover:text-white transition-all  tracking-[0.2em]">LOG MORE DATA</Button>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
