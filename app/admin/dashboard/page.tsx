"use client";

import React, { useState } from "react";
import {
    Users,
    Building2,
    CreditCard,
    TrendingUp,
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
    Clock,
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
    Cell,
    PieChart,
    Pie,
    Tooltip
} from "recharts";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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


const revenueData = [
    { month: "Jan", revenue: 4500000, users: 1200 },
    { month: "Feb", revenue: 5200000, users: 1500 },
    { month: "Mar", revenue: 4800000, users: 1400 },
    { month: "Apr", revenue: 6100000, users: 1800 },
    { month: "May", revenue: 5900000, users: 1750 },
    { month: "Jun", revenue: 7200000, users: 2100 },
];

const sectorData = [
    { name: "Banking", value: 35, color: "#6366f1" },
    { name: "Telecom", value: 25, color: "#0ea5e9" },
    { name: "Tech", value: 20, color: "#10b981" },
    { name: "Hospitality", value: 15, color: "#f59e0b" },
    { name: "Other", value: 5, color: "#94a3b8" },
];

const chartConfig = {
    revenue: { label: "Revenue", color: "#6366f1" },
    users: { label: "Active Users", color: "#10b981" }
} satisfies ChartConfig;

const recentActivity = [
    { id: 1, type: "Partnership", title: "New Gym Partner", desc: "Waka Fitness joined the network", time: "2m ago", status: "success" },
    { id: 2, type: "Corporate", title: "Corporate Onboarding", desc: "MTN Rwanda enrolled 200 employees", time: "15m ago", status: "pending" },
    { id: 3, type: "Financial", title: "Payout Processed", desc: "Monthly settlements for 45 coaches", time: "1h ago", status: "success" },
    { id: 4, type: "System", title: "Maintenance Alert", desc: "Core infrastructure updated to v2.4", time: "3h ago", status: "alert" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">Ecosystem Overview</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50  tracking-[0.2em] mt-1">
                        Operational Intelligence • Global Node Analytics • Network Yield
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl">
                        <Download className="w-4 h-4 mr-2" /> Global node audit
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black  active:scale-95 shadow-xl shadow-white/5">
                        <Plus className="w-4 h-4 mr-2" /> Initialize entity
                    </Button>
                </div>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Aggregate Revenue", value: "RWF 42.8M", trend: "+12.4%", icon: CreditCard, color: "text-indigo-500" },
                    { label: "Active Entities", value: "1,248 Nodes", trend: "+5.2%", icon: Globe, color: "text-emerald-500" },
                    { label: "Clinical Network", value: "245 Units", trend: "+8.1%", icon: Activity, color: "text-rose-500" },
                    { label: "System Load", value: "94.2%", trend: "Optimal", icon: Zap, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:scale-[1.02] transition-transform">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                            <Badge className="bg-white/5 text-[8px] font-black tracking-widest border-none text-muted-foreground/40">{stat.trend}</Badge>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-30  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                    </Card>
                ))}
            </div>

            {/* Main Operational Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Graph */}
                <Card className="lg:col-span-2 glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                        <div className="space-y-1">
                            <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-indigo-500" /> Revenue Performance
                            </h3>
                            <p className="text-[10px] font-semibold text-muted-foreground opacity-40  tracking-widest">Cross-entity financial trajectory audit</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <DataFilterModal title="Protocol Dynamics" description="Configure performance data visualization parameters.">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Time horizon</label>
                                        <DateRangeFilter />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Data stream</label>
                                        <Select defaultValue="revenue">
                                            <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-bold px-4">
                                                <SelectValue placeholder="Stream" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                <SelectItem value="revenue" className="text-[10px] font-bold">Invoiced Revenue</SelectItem>
                                                <SelectItem value="users" className="text-[10px] font-bold">Active Participation</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </DataFilterModal>
                        </div>
                    </div>

                    <div className="h-[320px] w-full relative z-10">
                        <ChartContainer id="dashboard-revenue-performance-chart" config={chartConfig} className="h-full w-full">
                            <AreaChart data={revenueData} margin={{ left: -20, right: 0, top: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevDash" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }} tickFormatter={(value) => `${value / 1000000}M`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRevDash)" />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </Card>

                {/* Sector Allocation */}
                <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card flex flex-col items-center justify-between text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] group-hover:bg-indigo-500/10 transition-all" />
                    <div className="w-full flex justify-between items-start mb-10 relative z-10">
                        <div className="text-left space-y-1">
                            <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-2">
                                <Box className="w-4 h-4 text-emerald-500" /> Sector Allocation
                            </h3>
                            <p className="text-[10px] font-semibold text-muted-foreground opacity-40  tracking-widest">Participation density index</p>
                        </div>
                        <DataFilterModal title="Sector Filter" description="Filter participation density by entity nodes.">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Entity node</label>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-bold px-4">
                                            <SelectValue placeholder="Node" />
                                        </SelectTrigger>
                                        <SelectContent className="glass-dark border-white/10 rounded-xl">
                                            <SelectItem value="all" className="text-[10px] font-bold">All entities</SelectItem>
                                            <SelectItem value="bank" className="text-[10px] font-bold">Banking institutions</SelectItem>
                                            <SelectItem value="telco" className="text-[10px] font-bold">Telecom networks</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DataFilterModal>
                    </div>

                    <div className="h-[240px] w-full relative z-10 mb-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart id="dashboard-sector-allocation-pie">
                                <Pie
                                    data={sectorData}
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {sectorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(0,0,0,0.8)', 
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        borderRadius: '12px', 
                                        fontSize: '10px', 
                                        color: '#fff',
                                        fontWeight: 900,
                                        letterSpacing: '0.1em'
                                    }} 
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full space-y-4 relative z-10 h-32 overflow-y-auto no-scrollbar">
                        {sectorData.map((s, i) => (
                            <div key={i} className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-xl transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                    <span className="text-[11px] font-black text-muted-foreground/60  tracking-widest group-hover/item:text-white transition-colors">{s.name}</span>
                                </div>
                                <span className="text-[11px] font-black text-white">{s.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Ingress Matrix & Registry */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Ingress Log */}
                <Card className="glass-dark p-8 border-white/5 rounded-[2.5rem] satin-card flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-2">
                            Activity registry
                        </h3>
                        <Button variant="ghost" className="h-10 px-4 rounded-xl text-[10px] font-bold border border-white/5 bg-white/5 opacity-40 hover:opacity-100  transition-all tracking-widest">
                            View full audit
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="flex items-center justify-between p-5 border border-white/5 rounded-2xl bg-white/2 hover:bg-white/5 transition-all group cursor-pointer shadow-inner">
                                <div className="flex items-center gap-5">
                                    <div className={cn(
                                        "p-2.5 rounded-xl border transition-all group-hover:scale-110",
                                        activity.status === "success" ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-500" :
                                            activity.status === "pending" ? "bg-amber-500/5 border-amber-500/10 text-amber-500" :
                                                "bg-rose-500/5 border-rose-500/10 text-rose-500"
                                    )}>
                                        {activity.status === "success" ? <CheckCircle2 className="w-4 h-4" /> :
                                            activity.status === "pending" ? <Clock className="w-4 h-4" /> :
                                                <AlertCircle className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-black text-white  tracking-widest">{activity.title}</h4>
                                        <p className="text-[10px] text-muted-foreground opacity-30 font-semibold  tracking-wider mt-1 leading-relaxed">{activity.desc}</p>
                                    </div>
                                </div>
                                <span className="text-[9px] font-black text-muted-foreground tabular-nums opacity-30  tracking-widest whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Entity Performance Summary */}
                <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card">
                    <div className="p-8 border-b border-white/5 bg-white/2 flex items-center justify-between">
                        <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-2">
                            Top operational nodes
                        </h3>
                        <div className="relative group w-48">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30 group-focus-within:text-indigo-400 transition-colors" />
                            <Input
                                placeholder="Search node registry..."
                                className="h-9 bg-black/40 border-white/5 rounded-xl pl-9 text-[10px] font-bold focus:ring-1 focus:ring-white/10 transition-all  opacity-40 focus:opacity-100"
                            />
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest h-14 pl-8 ">Entity node</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest h-14 ">Utilization index</TableHead>
                                <TableHead className="text-right pr-8 text-[9px] font-black tracking-widest h-14 ">System flow</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { name: "Bank of Kigali", yield: "94.2%", flow: "RWF 12.4M", trend: "up" },
                                { name: "MTN Rwanda", yield: "88.7%", flow: "RWF 8.1M", trend: "up" },
                                { name: "I&M Bank", yield: "91.5%", flow: "RWF 5.2M", trend: "down" },
                                { name: "Cogebanque", yield: "85.2%", flow: "RWF 4.8M", trend: "up" },
                                { name: "Equity Bank", yield: "79.8%", flow: "RWF 3.9M", trend: "up" },
                            ].map((node, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer group-hover:scale-[1.01]">
                                    <TableCell className="pl-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-xs text-indigo-500  overflow-hidden shadow-inner">
                                                <div className="w-full h-full glass flex items-center justify-center">
                                                    {node.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-black text-white  tracking-widest group-hover:text-glow-silver transition-all">{node.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest  mt-1">Cross-Entity Node</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: node.yield }} />
                                            </div>
                                            <span className="text-[10px] font-black text-white opacity-40">{node.yield}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <p className="text-[11px] font-black text-white tracking-widest tabular-nums ">{node.flow}</p>
                                        <p className="text-[9px] text-emerald-500 font-bold mt-1 opacity-60  tracking-widest">Yield optimal</p>
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
