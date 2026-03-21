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
    Apple,
    HeartPulse,
    MessageSquare,
    ShieldCheck,
    ArrowRight,
    Layers,
    SlidersHorizontal,
    Box,
    ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
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

const ADHERENCE_DATA = [
    { name: "Mon", compliance: 92 },
    { name: "Tue", compliance: 95 },
    { name: "Wed", compliance: 88 },
    { name: "Thu", compliance: 96 },
    { name: "Fri", compliance: 93 },
    { name: "Sat", compliance: 85 },
    { name: "Sun", compliance: 80 },
];

const chartConfig = {
    compliance: { label: "Adherence", color: "#10b981" }
} satisfies ChartConfig;

export default function NutritionistDetailsAdmin({ params }: { params: Promise<{ id: string }> }) {
    const { nutritionists, programs, employees } = useMockStore();
    const resolvedParams = use(params);
    const router = useRouter();

    const nutri = nutritionists.find(n => n.id === resolvedParams.id) || nutritionists[0];
    const nutriPrograms = programs.filter(p => p.nutritionistId === nutri.id);

    const nutriPatients = employees.map((emp, i) => ({
        ...emp,
        origin: i % 2 === 0 ? "Bank of Kigali" : "MTN Rwanda",
        adherence: 85 + (i % 15),
        lastCheckin: i === 0 ? "10 mins ago" : `${i + 1} days ago`,
        program: i % 2 === 0 ? "Weight Loss Reset" : "Athlete Fuel"
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
                        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all">{nutri.name}</h1>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-black px-4 py-1.5 rounded-lg  tracking-widest shadow-sm">Clinical Nutritionist</Badge>
                        </div>
                        <p className="text-muted-foreground text-[11px] font-black opacity-30  tracking-[0.2em] mt-2 flex items-center gap-2">
                            <HeartPulse className="w-3.5 h-3.5 text-emerald-500/50" /> System ID: {nutri.id} • {nutri.specialty} Metabolic Node
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 font-sans">
                    <Button variant="outline" className="h-12 px-6 border-white/10 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 rounded-2xl  transition-all">
                        <MessageSquare className="w-4 h-4 mr-3" /> Message
                    </Button>
                    <Button variant="outline" className="h-12 px-6 border-white/10 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 rounded-2xl  transition-all">
                        <Settings className="w-4 h-4 mr-3" /> Global Registry
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black  shadow-xl shadow-white/5 active:scale-95 transition-all">
                        <Download className="w-4 h-4 mr-3" /> Audit Node
                    </Button>
                </div>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">
                {[
                    { label: "Active Patients", val: nutri.activeClients, sub: "Direct clinical supervision", icon: Users, color: "text-indigo-500" },
                    { label: "Compliance Rate", val: `${nutri.adherenceRate}%`, sub: "Metabolic performance index", icon: Activity, color: "text-emerald-500" },
                    { label: "Success Index", val: "94.8%", sub: "Net outcome trajectory", icon: HeartPulse, color: "text-rose-500" },
                    { label: "Entity GMV", val: `RWF ${nutri.revenue.toLocaleString()}`, sub: "Monthly average throughput", icon: Wallet, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:scale-[1.02] transition-all relative overflow-hidden shadow-xl">
                        <div className="flex justify-between items-center mb-4">
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
                        { val: "overview", label: "Compliance Audit", icon: Activity },
                        { val: "programs", label: "Metabolic Hubs", icon: Box },
                        { val: "clients", label: "Patient Matrix", icon: Users },
                        { val: "financials", label: "Yield Ledgers", icon: CreditCard },
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.val}
                            value={tab.val}
                            className="h-12 px-10 rounded-2xl text-[10px] font-black tracking-widest  data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all flex items-center gap-3 group"
                        >
                            <tab.icon className={cn("w-4 h-4 opacity-30 group-data-[state=active]:opacity-100", tab.val === "overview" && "text-emerald-400")} />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 -mt-2">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Compliance Chart with Integrated Filters */}
                        <Card className="lg:col-span-2 glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden flex flex-col font-sans">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-white  tracking-widest flex items-center gap-3">
                                        <Activity className="w-5 h-5 text-emerald-500" /> Compliance Performance
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground opacity-40  tracking-widest mt-1.5 font-black">Weekly metabolic adherence benchmarks registry</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <DataFilterModal title="Adherence Protocol" description="Configure protocol adherence and clinical performance visualization parameters.">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                                <DateRangeFilter />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Metric Focus</label>
                                                <Select defaultValue="adherence">
                                                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                        <SelectValue placeholder="Protocol focus" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                        <SelectItem value="adherence" className="text-[10px] font-black ">Protocol Compliance</SelectItem>
                                                        <SelectItem value="progress" className="text-[10px] font-black ">Vitals Progression</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </DataFilterModal>
                                </div>
                            </div>
                            <div className="h-[320px] w-full relative z-10">
                                <ChartContainer id="adminNutriDetailChart" config={chartConfig} className="h-full w-full">
                                    <BarChart data={ADHERENCE_DATA} margin={{ left: -20, right: 10, top: 0 }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="compliance" fill="#10b981" radius={[8, 8, 2, 2]} barSize={40} className="drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        {/* Profile Summary Card */}
                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card flex flex-col items-center text-center group relative overflow-hidden font-sans">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/3 blur-[50px] group-hover:bg-emerald-500/10 transition-all" />
                            <div className="relative group/avatar mb-10 z-10">
                                <Avatar className="h-40 w-40 border-2 border-white/10 p-1.5 ring-4 ring-white/5 shadow-2xl relative z-10 transition-transform group-hover/avatar:scale-105">
                                    <AvatarImage src={nutri.avatar} />
                                    <AvatarFallback className="bg-white/5 text-4xl font-black">{nutri.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-3 right-3 h-10 w-10 bg-emerald-500 rounded-2xl border-2 border-black flex items-center justify-center shadow-lg z-20">
                                    <ShieldCheck className="w-6 h-6 text-black" />
                                </div>
                            </div>
                            <div className="mb-12 relative z-10">
                                <h3 className="text-3xl font-black text-white tracking-tighter  group-hover:text-glow-silver transition-all">{nutri.name}</h3>
                                <p className="text-[11px] font-black text-muted-foreground  tracking-[0.2em] mt-3 opacity-30">{nutri.email}</p>
                            </div>
                            <div className="w-full space-y-6 pt-10 border-t border-white/5 mb-12 relative z-10">
                                {[
                                    { label: "Focus Classification", val: nutri.specialty, icon: Apple, color: "text-rose-500" },
                                    { label: "Confidence Interval", val: "4.9 / 5.0", icon: Star, color: "text-amber-500" },
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
                                VIEW CLINICAL CREDENTIALS
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="programs" className="animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {nutriPrograms.map((program) => (
                            <Card key={program.id} className="glass-dark border-white/5 rounded-[2.5rem] p-10 hover:border-white/10 transition-all group flex flex-col justify-between h-full relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/3 blur-[60px] group-hover:bg-emerald-500/10 transition-all font-sans" />
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-10">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-emerald-500 group-hover:scale-110 shadow-inner shadow-emerald-500/10 transition-transform">
                                            <ClipboardList className="h-7 w-7" />
                                        </div>
                                        <Badge variant="outline" className="text-[9px] font-black border-none bg-emerald-500/10 text-emerald-500 px-4 py-1.5  rounded-lg shadow-sm tracking-widest">{program.status}</Badge>
                                    </div>
                                    <h3 className="text-2xl font-black text-white  tracking-tighter mb-3 group-hover:text-glow-silver transition-all leading-tight">{program.name}</h3>
                                    <p className="text-[11px] font-black text-muted-foreground opacity-30  tracking-widest mb-12 leading-relaxed">System-authorized metabolic supervision module for targeted clinical nodes</p>

                                    <div className="grid grid-cols-2 gap-10 mt-12 pt-10 border-t border-white/5">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-muted-foreground opacity-30  tracking-[0.2em]">Enrolled Nodes</p>
                                            <span className="text-2xl font-black text-white tabular-nums">{program.patients} Users</span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-muted-foreground opacity-30  tracking-[0.2em]">Outcome Index</p>
                                            <span className="text-2xl font-black text-emerald-500 tabular-nums">{program.successRate}% Success</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" className="w-full h-14 mt-12 rounded-2xl text-[10px] font-black border border-white/10 bg-white/3 text-muted-foreground opacity-40 hover:opacity-100 hover:text-white transition-all  tracking-[0.2em] relative z-10">
                                    VIEW MODULE ANALYTICS
                                </Button>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="clients" className="animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans">
                    <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative">
                        <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black tracking-tighter text-white  flex items-center gap-3">
                                    <Users className="w-6 h-6 text-indigo-500" /> Patient Infrastructure
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em]">Comprehensive metabolic registry of active clinical patient supervised nodes</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[320px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all font-sans" />
                                    <Input
                                        placeholder="Identify patient by name or identity node..."
                                        className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 transition-all placeholder:opacity-30 focus:ring-1 focus:ring-white/10"
                                    />
                                </div>
                                <DataFilterModal title="Portfolio Protocol" description="Configure participation and status parameters for patient infrastructure audit.">
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
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16 pl-10  tracking-widest">Identify Profile</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Sponsor Node</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Protocol Matrix</TableHead>
                                        <TableHead className="text-right pr-10 text-[9px] font-black text-muted-foreground h-16  tracking-widest">Adherence Index</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {nutriPatients.map((patient) => (
                                        <TableRow key={patient.id} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                            <TableCell className="pl-10 py-7">
                                                <div className="flex items-center gap-6">
                                                    <Avatar className="h-14 w-14 border-2 border-white/10 shadow-xl group-hover:scale-110 transition-transform p-0.5 bg-white/5">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} />
                                                        <AvatarFallback className="bg-white/5 text-[12px] font-black">{patient.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-black text-white  tracking-tighter group-hover:text-glow-silver transition-all">{patient.name}</span>
                                                        <p className="text-[9px] text-muted-foreground opacity-20 font-black  tracking-[0.2em] mt-1.5">{patient.id}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                        <Building2 className="w-5 h-5 text-indigo-400/40" />
                                                    </div>
                                                    <span className="text-[11px] font-black text-white/50  tracking-widest">{patient.origin} Infrastructure</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                        <ClipboardList className="w-5 h-5 text-emerald-500/40" />
                                                    </div>
                                                    <span className="text-[11px] font-black text-white  tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">{patient.program}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-10">
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex items-center gap-3 text-emerald-500">
                                                        <TrendingUp className="w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                                                        <span className="text-xl font-black  tracking-tighter tabular-nums">{patient.adherence}%</span>
                                                    </div>
                                                    <p className="text-[9px] font-black text-muted-foreground opacity-30  tracking-[0.2em]">Check-in: {patient.lastCheckin}</p>
                                                </div>
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
                                    <Wallet className="w-5 h-5 text-indigo-500" /> Settlement Ledger
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em]">Historical billing and disbursement registry for clinical supervision node cycles</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[320px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all font-sans" />
                                    <Input
                                        placeholder="Identify yield ledger by ID or protocol state..."
                                        className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 transition-all placeholder:opacity-30 focus:ring-1 focus:ring-white/10"
                                    />
                                </div>
                                <DataFilterModal title="Financial Protocol" description="Configure yield and disbursement parameters for clinical node audit.">
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
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16 pl-10  tracking-widest">Disbursement ID</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Operational Cycle</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Node Throughput</TableHead>
                                        <TableHead className="text-right pr-10 text-[9px] font-black text-muted-foreground h-16  tracking-widest">Registry Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {MOCK_INVOICES.map((inv) => (
                                        <TableRow key={inv.id} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                            <TableCell className="pl-10 py-7">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                        <History className="w-5 h-5 text-indigo-500/30 group-hover:text-indigo-400 transition-all" />
                                                    </div>
                                                    <span className="text-[12px] font-black text-white/30 font-sans tracking-[0.3em] group-hover:text-white/60 transition-colors ">{inv.id}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <Calendar className="w-5 h-5 text-emerald-500/40 font-sans" />
                                                    <span className="text-[11px] font-black text-white  tracking-widest opacity-60 tabular-nums">{inv.period}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-[12px] font-black text-indigo-400  tracking-tighter tabular-nums group-hover:text-emerald-400 transition-all">RWF {inv.amount}</span>
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
