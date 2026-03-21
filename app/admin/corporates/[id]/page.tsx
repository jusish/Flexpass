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
    Activity,
    ChevronLeft,
    Building2,
    DollarSign,
    Target,
    ArrowUpRight,
    MapPin,
    ArrowRight,
    Search,
    Download,
    Filter,
    Clock,
    UserCircle2,
    Briefcase,
    CreditCard,
    History,
    PieChart as PieChartIcon,
    BarChart3,
    Layers,
    SlidersHorizontal,
    Box,
    Globe,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
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
    { name: "Oct", amount: 1200000 },
    { name: "Nov", amount: 1550000 },
    { name: "Dec", amount: 1380000 },
    { name: "Jan", amount: 2100000 },
    { name: "Feb", amount: 1850000 },
    { name: "Mar", amount: 2450000 },
];

const ENGAGEMENT_DATA = [
    { name: "Fitness", value: 65, color: "#6366f1" },
    { name: "Wellness", value: 20, color: "#10b981" },
    { name: "Yoga", value: 15, color: "#0ea5e9" },
];

const chartConfig = {
    amount: { label: "Revenue", color: "#6366f1" }
} satisfies ChartConfig;

export default function CorporateDetailsAdmin({ params }: { params: Promise<{ id: string }> }) {
    const { companies, employees } = useMockStore();
    const resolvedParams = use(params);
    const router = useRouter();

    const company = (companies.find(c => c.id === resolvedParams.id) || companies[0]) as any;
    const companyEmployees = (employees.filter((e: any) => e.companyId === company.id)) || [];

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20 font-sans">
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
                            <h1 className="text-4xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all">{company.name}</h1>
                            <Badge className="bg-indigo-500/10 text-indigo-400 border-none text-[9px] font-black px-4 py-1.5 rounded-lg  tracking-widest shadow-sm">Operational Sponsor Node</Badge>
                        </div>
                        <p className="text-muted-foreground text-[11px] font-black opacity-30  tracking-[0.2em] mt-2 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400/50" /> {company.tier} TIER • ID: {company.id} • {company.location.toUpperCase()}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 border-white/10 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 rounded-2xl  transition-all">
                        <Download className="w-4 h-4 mr-3" /> Global Audit
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black  shadow-xl shadow-white/5 active:scale-95 transition-all">
                        <Zap className="w-4 h-4 mr-3" /> Reconfigure Contract
                    </Button>
                </div>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Lifetime Exposure", val: `RWF ${(company.totalSpent / 1000000).toFixed(1)}M`, sub: "Gross billing aggregate", icon: DollarSign, color: "text-emerald-500" },
                    { label: "Active Personnel", val: company.activeUsers, sub: `Of ${company.employeeCount} total nodes`, icon: Users, color: "text-indigo-500" },
                    { label: "Participation Index", val: "84/100", sub: "Member engagement flow", icon: Activity, color: "text-amber-500" },
                    { label: "Portfolio Health", val: "92.4%", sub: "Net operational metric", icon: Target, color: "text-sky-500" },
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

            <Tabs defaultValue="financials" className="w-full space-y-10 font-sans">
                <TabsList className="bg-black/40 border border-white/5 p-2 h-16 rounded-3xl backdrop-blur-3xl inline-flex">
                    {[
                        { val: "financials", label: "Yield Ledger", icon: CreditCard },
                        { val: "analytics", label: "Engagement Hub", icon: BarChart3 },
                        { val: "employees", label: "Workforce Matrix", icon: Users },
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.val}
                            value={tab.val}
                            className="h-12 px-10 rounded-2xl text-[10px] font-black tracking-widest  data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all flex items-center gap-3 group"
                        >
                            <tab.icon className={cn("w-4 h-4 opacity-30 group-data-[state=active]:opacity-100", tab.val === "financials" && "text-emerald-400")} />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="financials" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 -mt-2">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Financial Performance with Integrated Filters */}
                        <Card className="lg:col-span-2 glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden flex flex-col font-sans">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-white  tracking-widest flex items-center gap-3">
                                        <TrendingUp className="w-5 h-5 text-emerald-500" /> Revenue Performance
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground opacity-40  tracking-widest mt-1.5 font-black">Six-month clinical yield and billing trajectory audit</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <DataFilterModal title="Yield Protocol" description="Configure revenue performance and billing visualization parameters.">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                                <DateRangeFilter />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Registry Focus</label>
                                                <Select defaultValue="revenue">
                                                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                        <SelectValue placeholder="Protocol focus" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                        <SelectItem value="revenue" className="text-[10px] font-black ">Gross System Yield</SelectItem>
                                                        <SelectItem value="usage" className="text-[10px] font-black ">Resource Ingress Flow</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </DataFilterModal>
                                </div>
                            </div>
                            <div className="h-[320px] w-full relative z-10">
                                <ChartContainer id="adminCorpRevDetail" config={chartConfig} className="h-full w-full">
                                    <AreaChart data={REVENUE_DATA} margin={{ left: -20, right: 10, top: 0 }}>
                                        <defs>
                                            <linearGradient id="adminCorpColorRevRedux" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 900 }} tickFormatter={(v) => `${v / 1000}k`} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#adminCorpColorRevRedux)" />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card flex flex-col justify-between group relative overflow-hidden font-sans">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/3 blur-[50px] group-hover:bg-emerald-500/10 transition-all" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-emerald-500 shadow-inner group-hover:scale-110 transition-transform">
                                        <CreditCard className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-white  tracking-tighter">Billing Overview</h3>
                                        <p className="text-[11px] text-muted-foreground opacity-30  tracking-widest font-black mt-1">Sponsor node financial state audit</p>
                                    </div>
                                </div>
                                <div className="space-y-10 py-10 border-y border-white/5">
                                    {[
                                        { label: "Current Balance", val: "RWF 1.2M", color: "text-amber-500", desc: "Awaiting cycle settlement" },
                                        { label: "Total Yield", val: "RWF 11.2M", color: "text-emerald-500", desc: "Net historical output" },
                                        { label: "Pending Units", val: "12 Invoices", color: "text-white/40", desc: "Queued registry modules" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-start group/item cursor-help">
                                            <div className="space-y-1.5">
                                                <span className="text-[10px] font-black text-muted-foreground  opacity-30 tracking-[0.2em] block">{item.label}</span>
                                                <span className="text-[9px] font-black text-white/10  tracking-widest block">{item.desc}</span>
                                            </div>
                                            <span className={cn("text-2xl font-black  tabular-nums group-hover/item:text-glow-silver transition-all leading-none", item.color)}>{item.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full h-16 mt-10 rounded-2xl text-[10px] font-black border border-white/10 bg-white/3 text-muted-foreground opacity-40 hover:opacity-100 hover:text-white transition-all  tracking-[0.2em] relative z-10">
                                <Download className="w-4 h-4 mr-3" /> ANALYZE LEDGER STATEMENT
                            </Button>
                        </Card>
                    </div>

                    {/* Integrated Invoicing Ledger Filters */}
                    <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative font-sans">
                        <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black tracking-tighter text-white  flex items-center gap-3">
                                    <History className="w-6 h-6 text-emerald-500" /> Disbursement Registry
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em]">Comprehensive historical logs for authorized sponsor entity yield modules</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[320px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all font-sans" />
                                    <Input
                                        placeholder="Identify ledger by trace ID or temporal period..."
                                        className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 transition-all placeholder:opacity-30 focus:ring-1 focus:ring-white/10"
                                    />
                                </div>
                                <DataFilterModal title="Disbursement Protocol" description="Configure yield and billing registry parameters for sponsor audit.">
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
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16 pl-10  tracking-widest">Identify Trace ID</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Operational Cycle</TableHead>
                                        <TableHead className="text-center text-[9px] font-black text-muted-foreground h-16  tracking-widest">Entity Ref</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Net Output</TableHead>
                                        <TableHead className="text-right pr-10 text-[9px] font-black text-muted-foreground h-16  tracking-widest">Audit Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {MOCK_INVOICES.map((inv) => (
                                        <TableRow key={inv.id} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer font-sans">
                                            <TableCell className="pl-10 py-7">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                        <History className="w-5 h-5 text-emerald-500/30 group-hover:text-emerald-400 group-hover:opacity-100 transition-all" />
                                                    </div>
                                                    <span className="text-[12px] font-black text-white/30 tracking-[0.3em] group-hover:text-white/60 transition-colors ">{inv.id}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <Calendar className="w-5 h-5 text-indigo-500 opacity-40" />
                                                    <span className="text-[11px] font-black text-white  tracking-tight opacity-70 tabular-nums">{inv.period}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className="text-[8px] font-black border-none bg-white/5 text-muted-foreground opacity-30  px-4 py-1.5 rounded-xl tracking-widest">CORP-NET</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-[12px] font-black text-white  tracking-tighter tabular-nums group-hover:text-emerald-400 transition-colors">RWF {inv.amount}</span>
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

                <TabsContent value="analytics" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 -mt-2 font-sans">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card flex flex-col space-y-12 relative overflow-hidden font-sans shadow-xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-white  tracking-widest flex items-center gap-3">
                                        <PieChartIcon className="w-6 h-6 text-indigo-500" /> Integration Breakdown
                                    </h3>
                                    <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-[0.2em] mt-1.5">Cross-module participation intensity index</p>
                                </div>
                                <DataFilterModal title="Engagement Audit" description="Configure engagement visualization and cross-module participation parameters.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                            <DateRangeFilter />
                                        </div>
                                    </div>
                                </DataFilterModal>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-16 py-12 relative z-10">
                                <div className="h-[320px] w-full md:w-1/2 relative group">
                                    <div className="absolute inset-0 bg-indigo-500/3 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-all" />
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={ENGAGEMENT_DATA}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={85}
                                                outerRadius={120}
                                                paddingAngle={12}
                                                stroke="none"
                                            >
                                                {ENGAGEMENT_DATA.map((entry, index) => (
                                                    <Cell key={index} fill={entry.color} className="filter drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all hover:opacity-80" />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '10px', fontWeight: '900', textTransform: '' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-full md:w-1/2 space-y-10">
                                    {ENGAGEMENT_DATA.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center group/item cursor-help">
                                            <div className="flex items-center gap-5">
                                                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: item.color }} />
                                                <span className="text-[12px] font-black text-white/40  tracking-widest group-hover/item:text-white transition-colors">{item.name} Hub</span>
                                            </div>
                                            <span className="text-2xl font-black text-white group-hover/item:text-glow-silver transition-all tabular-nums leading-none">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card flex flex-col justify-between group relative overflow-hidden font-sans shadow-xl">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/2 blur-[80px] pointer-events-none" />
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-white  tracking-widest flex items-center gap-3">
                                        <BarChart3 className="w-6 h-6 text-amber-500" /> Sector Penetration
                                    </h3>
                                    <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-[0.2em] mt-1.5">Real-time organizational performance benchmarks</p>
                                </div>
                                <Badge variant="outline" className="text-[9px] font-black border-none bg-emerald-500/10 text-emerald-500 px-5 py-2  rounded-2xl shadow-inner tracking-widest">Live Flow Active</Badge>
                            </div>
                            <div className="space-y-12 py-6 relative z-10">
                                {[
                                    { label: "Active Usage Ingress", val: 82, color: "#6366f1", icon: Activity },
                                    { label: "Daily Session module", val: 45, color: "#10b981", icon: Zap },
                                    { label: "Entity Node Cohesion", val: 91, color: "#f59e0b", icon: Globe },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-5 group/item cursor-help px-2">
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-4">
                                                <item.icon className={cn("w-5 h-5 opacity-30 group-hover/item:opacity-100 transition-opacity",)} style={{ color: item.color }} />
                                                <span className="text-[11px] font-black text-muted-foreground  opacity-40 tracking-widest block">{item.label}</span>
                                            </div>
                                            <span className="text-2xl font-black text-white tabular-nums group-hover/item:text-glow-silver transition-all leading-none">{item.val}%</span>
                                        </div>
                                        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden relative shadow-inner">
                                            <div className="h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.05)]" style={{ width: `${item.val}%`, backgroundColor: item.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full h-16 mt-12 rounded-2xl text-[10px] font-black border border-white/10 bg-white/3 text-muted-foreground opacity-40 hover:opacity-100 hover:text-white transition-all  tracking-[0.2em] relative z-10">
                                VIEW PENETRATION METRICS
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="employees" className="animate-in fade-in slide-in-from-bottom-2 duration-500 -mt-2 font-sans">
                    <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative">
                        <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black tracking-tighter text-white  flex items-center gap-3">
                                    <Users className="w-6 h-6 text-indigo-500" /> Managed Workforce
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em]">Governing {companyEmployees.length} personnel nodes within this authorized sponsorship matrix</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[320px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all font-sans" />
                                    <Input
                                        placeholder="Identify personnel by name or identity module..."
                                        className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 transition-all placeholder:opacity-30 focus:ring-1 focus:ring-white/10"
                                    />
                                </div>
                                <DataFilterModal title="Workforce Protocol" description="Configure personnel filtering and departmental node parameters.">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                            <DateRangeFilter />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Entity node</label>
                                            <Select defaultValue="all">
                                                <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                    <SelectValue placeholder="Department node" />
                                                </SelectTrigger>
                                                <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                    <SelectItem value="all" className="text-[10px] font-black ">All Global Depts</SelectItem>
                                                    <SelectItem value="eng" className="text-[10px] font-black ">Engineering Hub</SelectItem>
                                                    <SelectItem value="ops" className="text-[10px] font-black ">Operational Core</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </DataFilterModal>
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar relative z-10">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16 pl-10  tracking-widest">Personnel node</TableHead>
                                        <TableHead className="text-[9px] font-black text-muted-foreground h-16  tracking-widest">Department Node</TableHead>
                                        <TableHead className="text-center text-[9px] font-black text-muted-foreground h-16  tracking-widest">Engagement index</TableHead>
                                        <TableHead className="text-right pr-10 text-[9px] font-black text-muted-foreground h-16  tracking-widest">System Audit</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {companyEmployees.map((emp) => (
                                        <TableRow key={emp.id} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer font-sans">
                                            <TableCell className="pl-10 py-7">
                                                <div className="flex items-center gap-6">
                                                    <Avatar className="h-14 w-14 border-2 border-white/10 p-0.5 shadow-xl transition-transform group-hover:scale-110 bg-white/5">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.name}`} />
                                                        <AvatarFallback className="bg-white/5 text-[12px] font-black">{emp.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-black text-white  tracking-tighter group-hover:text-glow-silver transition-all">{emp.name}</span>
                                                        <p className="text-[9px] text-muted-foreground opacity-20 font-black  tracking-[0.2em] mt-1.5">{emp.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-[9px] font-black border-none bg-white/5 text-muted-foreground opacity-30  px-4 py-1.5 rounded-xl tracking-widest">{emp.department} Hub</Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <Activity className="w-4 h-4 text-indigo-500 opacity-40 shadow-[0_0_10px_rgba(99,102,241,0.2)]" />
                                                        <span className="text-[11px] font-black text-white  tracking-tight tabular-nums opacity-60">84% Participation index</span>
                                                    </div>
                                                    <div className="w-40 h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                                                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.3)]" style={{ width: '84%' }} />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-10">
                                                <Badge variant="outline" className={cn(
                                                    "text-[10px] font-black px-5 py-2 rounded-2xl  border-none shadow-inner tracking-widest",
                                                    emp.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                                )}>{emp.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="p-12 bg-white/1 border-t border-white/5 flex justify-center relative z-10">
                            <Button variant="ghost" className="h-16 px-12 rounded-2xl text-[10px] font-black text-muted-foreground opacity-30 hover:opacity-100 hover:text-white hover:bg-white/3 border border-white/10  tracking-[0.2em] transition-all">
                                LOAD FULL WORKFORCE REPOSITORY <ArrowRight className="w-5 h-5 ml-4" />
                            </Button>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
