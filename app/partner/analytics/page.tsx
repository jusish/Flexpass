"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
    Activity,
    TrendingUp,
    Users,
    Clock,
    ArrowUpRight,
    Calendar,
    Download,
    PieChart,
    CreditCard,
    UserPlus,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
    Tooltip
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

const VISITS_DATA = [
    { name: "Mon", visits: 120, revenue: 504000 },
    { name: "Tue", visits: 150, revenue: 630000 },
    { name: "Wed", visits: 180, revenue: 756000 },
    { name: "Thu", visits: 140, revenue: 588000 },
    { name: "Fri", visits: 250, revenue: 1050000 },
    { name: "Sat", visits: 380, revenue: 1596000 },
    { name: "Sun", visits: 320, revenue: 1344000 },
];

const TIER_DATA = [
    { name: "Platinum", value: 45, visits: 640, color: "#6366f1" },
    { name: "Gold", value: 35, visits: 480, color: "#10b981" },
    { name: "Silver", value: 20, visits: 280, color: "#f59e0b" },
];

const HOURLY_FLOW = [
    { hour: "06:00", volume: 45 },
    { hour: "08:00", volume: 120 },
    { hour: "10:00", volume: 60 },
    { hour: "12:00", volume: 95 },
    { hour: "14:00", volume: 50 },
    { hour: "16:00", volume: 85 },
    { hour: "18:00", volume: 160 },
    { hour: "20:00", volume: 70 },
];

const REVENUE_RETENTION = [
    { month: "Oct", new: 1200000, recurring: 4500000 },
    { month: "Nov", new: 1500000, recurring: 4800000 },
    { month: "Dec", new: 1100000, recurring: 5200000 },
    { month: "Jan", new: 1800000, recurring: 5500000 },
    { month: "Feb", new: 2100000, recurring: 5800000 },
    { month: "Mar", new: 1950000, recurring: 6421000 },
];

const chartConfig = {
    visits: { label: "Sessions", color: "#6366f1" },
    revenue: { label: "Revenue (RWF)", color: "#10b981" },
    new: { label: "New Acquisition", color: "#8b5cf6" },
    recurring: { label: "Recurring Loyalty", color: "#6366f1" },
} satisfies ChartConfig;

export default function AnalyticsPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-white">Facility Intelligence</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Comprehensive performance audit and member engagement strategy</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-11 px-6 rounded-xl text-[10px] font-bold tracking-tight opacity-60">
                        <Download className="w-3.5 h-3.5 mr-2 opacity-60" /> Export PDF
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="bg-black/40 border border-white/5 p-1.5 h-16 rounded-2xl w-fit">
                    <TabsTrigger value="overview" className="rounded-xl px-10 h-full text-[11px] font-black tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Performance Overview</TabsTrigger>
                    <TabsTrigger value="revenue" className="rounded-xl px-10 h-full text-[11px] font-black tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Revenue Logic</TabsTrigger>
                    <TabsTrigger value="traffic" className="rounded-xl px-10 h-full text-[11px] font-black tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Traffic Flow</TabsTrigger>
                    <TabsTrigger value="loyalty" className="rounded-xl px-10 h-full text-[11px] font-black tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Member Loyalty</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "Check-in Index", value: "8,421", trend: "+14.2%", icon: Activity, color: "text-primary" },
                            { label: "Unique Members", value: "1,248", trend: "+5.1%", icon: Users, color: "text-blue-500" },
                            { label: "Gross Revenue", value: "RWF 8.3M", trend: "+12.4%", icon: CreditCard, color: "text-emerald-500" },
                            { label: "Retention Rate", value: "92%", trend: "+1.2%", icon: TrendingUp, color: "text-secondary" },
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                                <div className="flex justify-between items-center mb-6">
                                    <div className={cn("p-2.5 bg-white/5 rounded-xl border border-white/5 shadow-inner", stat.color)}>
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1">
                                        {stat.trend} <ArrowUpRight className="w-2.5 h-2.5" />
                                    </span>
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 mb-1">{stat.label}</p>
                                <p className="text-2xl font-black tracking-tighter text-white">{stat.value}</p>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark p-8 border-white/5 rounded-3xl satin-card">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-sm font-black tracking-wide text-white flex items-center gap-3 ">
                                    <TrendingUp className="w-4 h-4 text-primary" /> Traffic Momentum
                                </h3>
                                <Badge variant="outline" className="bg-black/40 border-white/10 text-[9px] font-bold px-3 py-1">Weekly Volume</Badge>
                            </div>

                            <div className="h-[350px] w-full">
                                <ChartContainer id="partner-traffic-momentum-chart" config={chartConfig} className="h-full w-full">
                                    <AreaChart data={VISITS_DATA} margin={{ left: -20, right: 10, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="visGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                        <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700, fill: "#6E6E73" }} />
                                        <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700, fill: "#6E6E73" }} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={3} fill="url(#visGradient)" fillOpacity={1} />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <Card className="glass-dark p-8 border-white/5 rounded-3xl satin-card flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center border-glow-silver">
                                <Activity className="w-10 h-10 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black tracking-tighter text-white">Peak Efficiency: 94%</h3>
                                <p className="text-[11px] text-muted-foreground font-semibold opacity-60  tracking-widest">Facility Utilization Grade</p>
                            </div>
                            <p className="text-[11px] text-muted-foreground font-medium opacity-40 max-w-xs">
                                Your facility is operating at near-optimal capacity during morning and evening peaks.
                            </p>
                            <Button className="w-full h-12 rounded-xl silver-gradient text-black font-bold">Deep Audit History</Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="revenue" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark p-8 border-white/5 rounded-3xl satin-card space-y-8">
                            <h3 className="text-sm font-black tracking-wide text-white ">Revenue Attribution</h3>
                            <div className="h-[350px]">
                                <ChartContainer id="partner-revenue-attribution-chart" config={chartConfig} className="h-full w-full">
                                    <BarChart data={TIER_DATA} layout="vertical" margin={{ left: 40 }}>
                                        <CartesianGrid horizontal={false} stroke="#ffffff05" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontWeight: 700, fill: "#6E6E73", fontSize: 10 }} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="visits" radius={[0, 4, 4, 0]} fill="#6366f1" barSize={32} />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                            <div className="p-8 border-b border-white/5">
                                <h3 className="text-sm font-black tracking-wide text-white ">Subscription Tier Impact</h3>
                            </div>
                            <Table>
                                <TableHeader className="bg-white/2 cursor-default">
                                    <TableRow className="hover:bg-transparent border-white/5">
                                        <TableHead className="text-[9px] font-bold tracking-widest text-muted-foreground">Tier</TableHead>
                                        <TableHead className="text-[9px] font-bold tracking-widest text-muted-foreground text-center">Avg Session</TableHead>
                                        <TableHead className="text-[9px] font-bold tracking-widest text-muted-foreground text-center">Volume %</TableHead>
                                        <TableHead className="text-[9px] font-bold tracking-widest text-muted-foreground text-right">Revenue (RWF)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {TIER_DATA.map((tier) => (
                                        <TableRow key={tier.name} className="border-white/5 hover:bg-white/5 transition-colors">
                                            <TableCell className="text-[11px] font-bold text-white py-4">{tier.name}</TableCell>
                                            <TableCell className="text-[11px] font-bold text-muted-foreground text-center">RWF 4,500</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className="text-[9px] font-black border-primary/20 bg-primary/5 text-primary">
                                                    {tier.value}%
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-[11px] font-black text-white text-right">
                                                {(tier.visits * 4500).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="traffic" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="glass-dark border-white/5 rounded-3xl p-10 satin-card space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-sm font-black tracking-wide text-white ">Intraday Traffic Density</h3>
                                <p className="text-muted-foreground text-[10px] font-semibold opacity-40">Load distribution by facility operating hours</p>
                            </div>
                        </div>

                        <div className="h-[400px]">
                            <ChartContainer id="partner-intraday-traffic-chart" config={chartConfig} className="h-full w-full">
                                <BarChart data={HOURLY_FLOW}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ffffff05" />
                                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#6E6E73" }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "#6E6E73" }} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="volume" radius={[4, 4, 0, 0]} barSize={40}>
                                        {HOURLY_FLOW.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.volume > 120 ? "#10b981" : "#6366f1"} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="loyalty" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 glass-dark p-8 border-white/5 rounded-3xl satin-card space-y-8">
                            <div>
                                <h3 className="text-sm font-black tracking-wide text-white  flex items-center gap-2">
                                    <Users className="w-4 h-4 text-primary" /> Retention Growth Strategy
                                </h3>
                                <p className="text-muted-foreground text-[10px] font-semibold opacity-40">New member acquisition vs recurring recurring visits</p>
                            </div>
                            <div className="h-[400px]">
                                <ChartContainer id="partner-retention-growth-chart" config={chartConfig} className="h-full w-full">
                                    <AreaChart data={REVENUE_RETENTION} margin={{ left: -20 }}>
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontWeight: 700, fontSize: 10, fill: "#6E6E73" }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontWeight: 700, fontSize: 10, fill: "#6E6E73" }} tickFormatter={(val: number) => `${(val / 1000000).toFixed(1)}M`} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area type="monotone" dataKey="recurring" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                                        <Area type="monotone" dataKey="new" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <div className="space-y-6">
                            {[
                                { title: "Loyalty Score", value: "88/100", desc: "Top 5% of facilities in district", icon: Zap },
                                { title: "New Acquisition", value: "242", desc: "Members first visit this month", icon: UserPlus },
                                { title: "Churn Risk", value: "4.2%", desc: "Decrease in inactivity index", icon: Activity },
                            ].map((item, i) => (
                                <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white">{item.title}</p>
                                        <p className="text-lg font-black tracking-tight text-glow-silver mb-1">{item.value}</p>
                                        <p className="text-[10px] text-muted-foreground font-semibold opacity-40">{item.desc}</p>
                                    </div>
                                </Card>
                            ))}
                            <Button className="w-full h-14 rounded-2xl border border-white/10 glass text-[11px] font-black  tracking-widest opacity-60 hover:opacity-100 transition-all">
                                Request Loyalty Deep-Dive
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

