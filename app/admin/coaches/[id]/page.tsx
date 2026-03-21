"use client";

import React, { use, useState } from "react";
import { useMockStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Users,
    Calendar,
    TrendingUp,
    DollarSign,
    Star,
    Clock,
    Award,
    ChevronLeft,
    Settings,
    Activity,
    Zap,
    History,
    MapPin,
    MoreVertical,
    CreditCard,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Building2,
    Search,
    Filter,
    Plus,
    ArrowRight,
    MessageSquare,
    ShieldCheck,
    Layers,
    SlidersHorizontal,
    Box
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_INVOICES } from "@/lib/mock-data";
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
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig
} from "@/components/ui/chart";

const REVENUE_DATA = [
    { name: "Jan", amount: 1800000 },
    { name: "Feb", amount: 2100000 },
    { name: "Mar", amount: 2400000 },
    { name: "Apr", amount: 2200000 },
    { name: "May", amount: 2800000 },
    { name: "Jun", amount: 3100000 },
];

const chartConfig = {
    amount: { label: "Revenue", color: "#6366f1" }
} satisfies ChartConfig;

export default function CoachDetailsAdmin({ params }: { params: Promise<{ id: string }> }) {
    const { coaches, sessions, employees } = useMockStore();
    const resolvedParams = use(params);
    const router = useRouter();

    const coach = coaches.find(c => c.id === resolvedParams.id) || coaches[0];
    const coachSessions = sessions.filter(s => s.coachId === coach.id);

    const coachMembers = employees.map((emp, i) => ({
        ...emp,
        origin: i % 3 === 0 ? "Direct" : "Waka Fitness",
        lastActivity: i === 0 ? "2 mins ago" : `${i + 2} hours ago`,
        sessionsCount: 12 + i
    })).slice(0, 6);

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full border border-white/10 hover:bg-white/5 w-12 h-12 shadow-lg transition-transform hover:scale-105"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all">{coach.name}</h1>
                            <Badge className="bg-indigo-500/10 text-indigo-400 border-none text-[9px] font-black px-4 py-1.5 rounded-lg  tracking-widest shadow-sm">Certified Coach</Badge>
                        </div>
                        <p className="text-muted-foreground text-[11px] font-black opacity-30  tracking-[0.2em] mt-2 flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 text-indigo-400" /> ID: {coach.id} • {coach.specialty} Specialist Node
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 font-sans">
                    <Button variant="outline" className="h-12 px-6 border-white/10 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 rounded-2xl  transition-all">
                        <MessageSquare className="w-4 h-4 mr-3" /> Signal
                    </Button>
                    <Button variant="outline" className="h-12 px-6 border-white/10 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 rounded-2xl  transition-all">
                        <Settings className="w-4 h-4 mr-3" /> Global Config
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black  shadow-xl shadow-white/5 active:scale-95 transition-all">
                        <Download className="w-4 h-4 mr-3" /> Audit Financials
                    </Button>
                </div>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">
                {[
                    { label: "Active Members", val: coach.activeMembers, sub: "Contextual supervision", icon: Users, color: "text-indigo-500" },
                    { label: "Clinical Consensus", val: coach.rating, sub: "Confidence interval", icon: Star, color: "text-amber-500" },
                    { label: "Platform Yield", val: "94.2%", sub: "Efficiency aggregate", icon: Activity, color: "text-emerald-500" },
                    { label: "Entity GMV", val: `RWF ${coach.revenue.toLocaleString()}`, sub: "Monthly average", icon: Wallet, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:scale-[1.02] transition-all relative overflow-hidden shadow-xl">
                        <div className="flex justify-between items-center mb-4 text-sans">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-black text-muted-foreground  opacity-30 tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black text-white tracking-tighter tabular-nums">{stat.val}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold  tracking-widest">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="overview" className="w-full space-y-10">
                <TabsList className="bg-black/40 border border-white/5 p-2 h-16 rounded-3xl backdrop-blur-3xl inline-flex font-sans">
                    {[
                        { val: "overview", label: "Performance Audit", icon: Activity },
                        { val: "sessions", label: "Registry Logs", icon: Box },
                        { val: "members", label: "Client Portfolio", icon: Users },
                        { val: "financials", label: "Yield Ledgers", icon: CreditCard },
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.val}
                            value={tab.val}
                            className="h-12 px-10 rounded-2xl text-[10px] font-black tracking-widest  data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all flex items-center gap-3 group"
                        >
                            <tab.icon className={cn("w-4 h-4 opacity-30 group-data-[state=active]:opacity-100", tab.val === "overview" && "text-indigo-400")} />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 -mt-2">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden flex flex-col font-sans">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 relative z-10">
                                <div>
                                    <h3 className="text-sm font-black text-white  tracking-widest flex items-center gap-3">
                                        <TrendingUp className="w-5 h-5 text-indigo-500" /> Economic trajectory
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground opacity-40  tracking-widest mt-1.5 font-black">Six-month clinical yield trajectory audit</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <DataFilterModal title="Economic Protocol" description="Configure performance data visualization and yield audit parameters.">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                                <DateRangeFilter />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Registry focus</label>
                                                <Select defaultValue="revenue">
                                                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                        <SelectValue placeholder="Focus Metric" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                        <SelectItem value="revenue" className="text-[10px] font-black ">Gross System Revenue</SelectItem>
                                                        <SelectItem value="commission" className="text-[10px] font-black ">Platform Utility Fee</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </DataFilterModal>
                                </div>
                            </div>
                            <div className="h-[320px] w-full relative z-10">
                                <ChartContainer id="adminCoachDetailChartStandard" config={chartConfig} className="h-full w-full">
                                    <AreaChart data={REVENUE_DATA} margin={{ left: -20, right: 10, top: 0 }}>
                                        <defs>
                                            <linearGradient id="adminCoachColorDetailRedux" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} tickFormatter={(v) => `${v / 1000}k`} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#adminCoachColorDetailRedux)" />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card flex flex-col items-center text-center group relative overflow-hidden font-sans">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/3 blur-[50px] group-hover:bg-indigo-500/10 transition-all" />
                            <div className="relative group/avatar mb-10 z-10">
                                <Avatar className="h-40 w-40 border-2 border-white/10 p-1.5 ring-4 ring-white/5 shadow-2xl relative z-10 transition-transform group-hover/avatar:scale-105">
                                    <AvatarImage src={coach.avatar} />
                                    <AvatarFallback className="bg-white/5 text-4xl font-black">{coach.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-3 right-3 h-10 w-10 bg-emerald-500 rounded-2xl border-2 border-black flex items-center justify-center shadow-lg z-20">
                                    <ShieldCheck className="w-6 h-6 text-black" />
                                </div>
                            </div>
                            <div className="mb-12 relative z-10">
                                <h3 className="text-3xl font-black text-white tracking-tighter  group-hover:text-glow-silver transition-all">{coach.name}</h3>
                                <p className="text-[11px] font-black text-muted-foreground  tracking-[0.2em] mt-3 opacity-30">{coach.email}</p>
                            </div>
                            <div className="w-full space-y-6 pt-10 border-t border-white/5 mb-12 relative z-10">
                                {[
                                    { label: "Spec Classification", val: coach.specialty, icon: Award, color: "text-amber-500" },
                                    { label: "Temporal Exposure", val: coach.experience, icon: Clock, color: "text-indigo-500" },
                                ].map((detail, i) => (
                                    <div key={i} className="flex justify-between items-center text-[10px] font-black  tracking-widest">
                                        <span className="opacity-30 flex items-center gap-4">
                                            <detail.icon className={cn("w-5 h-5", detail.color)} />
                                            {detail.label}
                                        </span>
                                        <Badge variant="outline" className="text-white border-white/10 bg-white/5 px-4 py-1.5 rounded-xl  tracking-widest">{detail.val}</Badge>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full h-14 rounded-2xl text-[10px] font-black border border-white/10 bg-white/3 text-muted-foreground opacity-40 hover:opacity-100 hover:text-white transition-all  tracking-[0.2em] relative z-10">
                                ACCESS PUBLIC PROFILE
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="sessions" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative font-sans">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/1 blur-[100px] pointer-events-none" />
                        <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black tracking-tighter text-white  flex items-center gap-3">
                                    <Box className="w-6 h-6 text-indigo-500" /> Activity Registry
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em]">Comprehensive logs for authorized training module flows</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[320px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all font-sans" />
                                    <Input
                                        placeholder="Identify training module by name or type..."
                                        className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 transition-all placeholder:opacity-30 focus:ring-1 focus:ring-white/10"
                                    />
                                </div>
                                <DataFilterModal title="Registry Protocol" description="Configure the activity and session registry parameters for audit.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                            <DateRangeFilter />
                                        </div>
                                    </div>
                                </DataFilterModal>
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar relative z-10">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16 pl-10  tracking-widest">Registry Module</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Temporal Window</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Node Occupancy</TableHead>
                                        <TableHead className="text-right pr-10 text-[9px] font-black text-muted-foreground h-16  tracking-widest">Operational Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {coachSessions.map((session) => (
                                        <TableRow key={session.id} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                            <TableCell className="pl-10 py-7">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-[12px] text-white/40 shadow-inner group-hover:border-indigo-500/30 transition-all group-hover:scale-110 ">
                                                        EXE
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-black text-white  tracking-tighter group-hover:text-glow-silver transition-all">{session.name}</span>
                                                        <p className="text-[9px] text-muted-foreground opacity-30 font-black  mt-1.5 tracking-[0.2em]">{session.partnerName} Infrastructure</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <Calendar className="w-5 h-5 text-indigo-500 opacity-40" />
                                                    <span className="text-[11px] font-black text-white  tracking-tight opacity-70 tabular-nums">{session.day} • {session.time}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="w-40 space-y-3">
                                                    <div className="flex justify-between items-end text-[9px] font-black  tracking-widest opacity-40 px-1">
                                                        <span>Dynamic Flow</span>
                                                        <span className="text-indigo-400">{Math.round((session.booked / session.capacity) * 100)}%</span>
                                                    </div>
                                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden shadow-inner font-sans">
                                                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.3)]" style={{ width: `${(session.booked / session.capacity) * 100}%` }} />
                                                    </div>
                                                    <span className="text-[9px] font-black text-white/30 tracking-widest  block text-center">{session.booked} / {session.capacity} Slots Active</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-10">
                                                <Badge variant="outline" className="text-[9px] font-black border-none bg-emerald-500/10 text-emerald-500 px-5 py-1.5 rounded-xl  shadow-inner tracking-widest">{session.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="members" className="animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans">
                    <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative">
                        <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-2">
                                    <Users className="w-5 h-5 text-indigo-500" /> Client Portfolio
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em]">Managing {coachMembers.length} active clinical performance supervisions</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[320px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all font-sans" />
                                    <Input
                                        placeholder="Identify participant by name or ID..."
                                        className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 transition-all placeholder:opacity-30 focus:ring-1 focus:ring-white/10"
                                    />
                                </div>
                                <DataFilterModal title="Portfolio Protocol" description="Configure participation and origin parameters for the portfolio audit.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Entity node</label>
                                            <Select defaultValue="all">
                                                <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                    <SelectValue placeholder="Origin Node" />
                                                </SelectTrigger>
                                                <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                    <SelectItem value="all" className="text-[10px] font-black ">All Global Nodes</SelectItem>
                                                    <SelectItem value="direct" className="text-[10px] font-black ">Direct Platform Access</SelectItem>
                                                    <SelectItem value="partner" className="text-[10px] font-black ">Authorized Facility Node</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </DataFilterModal>
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar relative z-10 font-sans">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16 pl-10  tracking-widest">Identity Matrix</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Entry Node</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Engagement index</TableHead>
                                        <TableHead className="text-right pr-10 text-[9px] font-black text-muted-foreground h-16  tracking-widest">System Audit</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {coachMembers.map((member) => (
                                        <TableRow key={member.id} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                            <TableCell className="pl-10 py-7">
                                                <div className="flex items-center gap-6">
                                                    <Avatar className="h-14 w-14 border-2 border-white/10 shadow-xl group-hover:scale-110 transition-transform p-0.5 bg-white/5">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                                                        <AvatarFallback className="bg-white/5 text-[12px] font-black">{member.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-black text-white  tracking-tighter group-hover:text-glow-silver transition-all">{member.name}</span>
                                                        <span className="text-[9px] text-muted-foreground opacity-20 font-black  mt-1.5 tracking-[0.2em]">{member.id}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                        <Building2 className="w-5 h-5 text-indigo-400/40" />
                                                    </div>
                                                    <span className="text-[11px] font-black text-white/50  tracking-widest">{member.origin} Node</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-4">
                                                        <Activity className="w-5 h-5 text-emerald-500/40" />
                                                        <span className="text-[11px] font-black text-white  tracking-widest tabular-nums opacity-60">{member.sessionsCount} Ingress Cycles</span>
                                                    </div>
                                                    <p className="text-[9px] font-black text-muted-foreground opacity-20  tracking-[0.2em] ml-9">Last: {member.lastActivity}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-10">
                                                <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground opacity-20 group-hover:opacity-100 transition-all hover:bg-white/5 rounded-2xl border border-white/5">
                                                    <ArrowUpRight className="h-5 w-5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="financials" className="animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans">
                    <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative">
                        <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-2">
                                    <Wallet className="w-5 h-5 text-indigo-500" /> Yield Ledgers
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em]">Historical disbursement registry for operational clinical cycles</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[320px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all font-sans" />
                                    <Input
                                        placeholder="Identify yield ledger by ID or state..."
                                        className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 transition-all placeholder:opacity-30 focus:ring-1 focus:ring-white/10"
                                    />
                                </div>
                                <DataFilterModal title="Financial Protocol" description="Configure yield and disbursement parameters for the ledger audit.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                            <DateRangeFilter />
                                        </div>
                                    </div>
                                </DataFilterModal>
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar relative z-10">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16 pl-10  tracking-widest">Disbursement identity</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Operational Cycle</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Net Throughput</TableHead>
                                        <TableHead className="text-right pr-10 text-[9px] font-black text-muted-foreground h-16  tracking-widest">Ledger Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {MOCK_INVOICES.map((inv) => (
                                        <TableRow key={inv.id} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                            <TableCell className="pl-10 py-7">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                        <History className="w-5 h-5 text-indigo-500/30 group-hover:text-indigo-400 group-hover:opacity-100 transition-all" />
                                                    </div>
                                                    <span className="text-[12px] font-black text-white/30 font-sans tracking-[0.3em] group-hover:text-white/60 transition-colors ">{inv.id}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <Calendar className="w-5 h-5 text-emerald-500/30 font-sans" />
                                                    <span className="text-[11px] font-black text-white  tracking-widest opacity-60 tabular-nums">{inv.period}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-[12px] font-black text-white  tracking-tighter tabular-nums group-hover:text-emerald-400 transition-colors">{inv.amount}</span>
                                            </TableCell>
                                            <TableCell className="text-right pr-10">
                                                <Badge variant="outline" className={cn(
                                                    "text-[10px] font-black px-5 py-2 rounded-2xl  border-none shadow-inner tracking-widest",
                                                    inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                                )}>{inv.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
