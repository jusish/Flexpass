"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    Calendar,
    Activity,
    Zap,
    TrendingUp,
    MapPin,
    Clock,
    HeartPulse,
    BadgeCheck,
    User,
    ArrowUpRight,
    Search,
    Download,
    CreditCard
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from "recharts";
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
import { cn } from "@/lib/utils";
import { useMockStore } from "@/lib/store";

const activityData = [
    { day: "Mon", sessions: 1 },
    { day: "Tue", sessions: 0 },
    { day: "Wed", sessions: 2 },
    { day: "Thu", sessions: 1 },
    { day: "Fri", sessions: 3 },
    { day: "Sat", sessions: 2 },
    { day: "Sun", sessions: 0 },
];

const categoryData = [
    { name: "Gym", value: 45, fill: "#6366f1" },
    { name: "Swimming", value: 25, fill: "#10b981" },
    { name: "Yoga", value: 20, fill: "#f59e0b" },
    { name: "Spas", value: 10, fill: "#8b5cf6" },
];

const visitHistory = [
    { id: "V-1024", venue: "Waka Fitness", activity: "High Intensity Training", date: "Mar 18, 2026", time: "06:30 AM", cost: 12500, status: "Verified" },
    { id: "V-1021", venue: "Cercle Sportif", activity: "Tennis Session", date: "Mar 16, 2026", time: "05:15 PM", cost: 15000, status: "Verified" },
    { id: "V-1018", venue: "Mindful Yoga", activity: "Vinyasa Flow", date: "Mar 14, 2026", time: "12:10 PM", cost: 10000, status: "Verified" },
    { id: "V-1015", venue: "Waka Fitness", activity: "Gym Workout", date: "Mar 12, 2026", time: "07:00 AM", cost: 12500, status: "Verified" },
    { id: "V-1012", venue: "Kigali Arena", activity: "Basketball", date: "Mar 10, 2026", time: "06:45 PM", cost: 8000, status: "Verified" },
];

const chartConfig = {
    sessions: { label: "Sessions", color: "#6366f1" },
    cost: { label: "Total Cost", color: "#10b981" },
} satisfies ChartConfig;

export default function EmployeeDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { employees } = useMockStore();

    const employee = useMemo(() => {
        return employees.find(e => e.id === params.id) || employees[0];
    }, [params.id, employees]);

    if (!employee) return null;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header / Breadcrumbs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold tracking-tight text-white">{employee.name}</h1>
                            <Badge className={cn(
                                "text-[10px] font-bold  border-none",
                                employee.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/40"
                            )}>
                                {employee.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground text-xs font-medium opacity-60 flex items-center gap-2">
                            {employee.department} • {employee.email}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-6 rounded-xl border-white/10 bg-white/5 text-xs font-bold hover:bg-white/10">
                        <Download className="w-4 h-4 mr-2" /> Export Report
                    </Button>
                    <Button className="h-11 px-6 rounded-xl text-xs font-bold silver-gradient text-black shadow-lg shadow-emerald-500/5 active:scale-95 transition-all">
                        Adjust Plan
                    </Button>
                </div>
            </div>

            {/* Top Cards: Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Visits", val: employee.visits || "48", sub: "Since joining", icon: MapPin, color: "text-indigo-400" },
                    { label: "Weekly Avg", val: "3.4", sub: "Sessions per week", icon: Activity, color: "text-emerald-400" },
                    { label: "Organization Cost", val: "RWF 142k", sub: "Monthly allowance used", icon: TrendingUp, color: "text-amber-400" },
                    { label: "Active Plan", val: employee.tier || "Platinum", sub: "Unlimited access", icon: BadgeCheck, color: "text-sky-400" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-40 mt-3 font-medium">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Main Tabs Container */}
            <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="bg-black/40 border border-white/5 p-1.5 h-16 rounded-2xl w-fit">
                    <TabsTrigger value="overview" className="rounded-xl px-10 h-full text-[11px] font-bold tracking-wide data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Overview</TabsTrigger>
                    <TabsTrigger value="finances" className="rounded-xl px-10 h-full text-[11px] font-bold tracking-wide data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Finances</TabsTrigger>
                    <TabsTrigger value="history" className="rounded-xl px-10 h-full text-[11px] font-bold tracking-wide data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Visit History</TabsTrigger>
                    <TabsTrigger value="activity" className="rounded-xl px-10 h-full text-[11px] font-bold tracking-wide data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Activity Breakdown</TabsTrigger>
                </TabsList>

                {/* Overview Tab Content */}
                <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Weekly Activity Chart */}
                        <Card className="glass-dark border-white/5 rounded-3xl p-8 satin-card space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-bold tracking-tight text-white">Weekly Activity Flow</h3>
                                    <p className="text-[10px] font-medium text-muted-foreground opacity-60">Sessions completed in the last 7 days</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-40" />
                            </div>
                            <div className="h-[300px]">
                                <ChartContainer id="employee-weekly-activity-chart" config={chartConfig} className="h-full w-full">
                                    <BarChart data={activityData}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                        <XAxis
                                            dataKey="day"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#888', fontSize: 11, fontWeight: 600 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#888', fontSize: 10, fontWeight: 600 }}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="sessions" radius={[4, 4, 0, 0]} fill="#6366f1" barSize={40} />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        {/* Preferred Venues / Activity Distribution */}
                        <Card className="glass-dark border-white/5 rounded-3xl p-8 satin-card flex flex-col items-center">
                            <div className="flex justify-between items-center w-full mb-8">
                                <div>
                                    <h3 className="text-sm font-bold tracking-tight text-white text-left">Activity Split</h3>
                                    <p className="text-[10px] font-medium text-muted-foreground opacity-60 text-left">Breakdown of preferred wellness nodes</p>
                                </div>
                            </div>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.5)" strokeWidth={4} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-4 mt-6">
                                {categoryData.map((item) => (
                                    <div key={item.name} className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-bold text-white leading-none">{item.name}</span>
                                            <span className="text-[9px] text-muted-foreground font-semibold mt-1">{item.value}% engagement</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Quick Visit Preview */}
                    <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-sm font-bold tracking-tight text-white">Recent Visit History</h3>
                            <Button variant="ghost" className="text-[10px] font-bold  tracking-widest opacity-40 hover:opacity-100">See All</Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                    <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 ">Venue & Activity</TableHead>
                                    <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 ">Date & Time</TableHead>
                                    <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-center ">Status</TableHead>
                                    <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right pr-8 ">Cost Allocated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {visitHistory.slice(0, 3).map((v, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                        <TableCell className="pl-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/20 transition-all shadow-inner">
                                                    <Clock className="w-4 h-4 text-emerald-400 opacity-60" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-white  tracking-tight">{v.venue}</h4>
                                                    <p className="text-[10px] text-muted-foreground opacity-40 font-medium">{v.activity}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs font-bold text-white">{v.date}</p>
                                            <p className="text-[10px] text-muted-foreground opacity-40 font-medium">{v.time}</p>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-none text-[9px] font-bold px-2 py-0.5 rounded-lg ">
                                                {v.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <p className="text-xs font-bold text-white">RWF {v.cost.toLocaleString()}</p>
                                            <p className="text-[9px] text-muted-foreground opacity-40 font-medium  tracking-tight">Utilization</p>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                {/* Finances Tab Content */}
                <TabsContent value="finances" className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Total Spent", val: "RWF 412,500", sub: "Lifetime cost", icon: CreditCard, color: "text-emerald-400" },
                            { label: "Avg Session", val: "RWF 12,400", sub: "Cost per check-in", icon: Zap, color: "text-amber-400" },
                            { label: "Remaining Budget", val: "RWF 85,000", sub: "This month's limit", icon: TrendingUp, color: "text-indigo-400" },
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                                <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40  mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-white">{stat.val}</h3>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className={cn("p-1.5 rounded-lg bg-white/5 border border-white/5", stat.color)}>
                                        <stat.icon className="w-3 h-3" />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground opacity-40 font-medium">{stat.sub}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Card className="glass-dark border-white/5 rounded-3xl p-8 satin-card">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-bold text-white">Monthly Expenditure</h3>
                            <Badge variant="outline" className="text-[9px] font-bold border-white/10 opacity-60">2026 FISCAL YEAR</Badge>
                        </div>
                        <div className="h-[300px]">
                            <ChartContainer id="employee-monthly-expenditure-chart" config={chartConfig} className="h-full w-full">
                                <AreaChart data={[
                                    { month: "Jan", cost: 85000 },
                                    { month: "Feb", cost: 125000 },
                                    { month: "Mar", cost: 142000 },
                                ]}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10 }} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Area type="monotone" dataKey="cost" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={3} />
                                </AreaChart>
                            </ChartContainer>
                        </div>
                    </Card>
                </TabsContent>

                {/* Activity Breakdown Tab Content */}
                <TabsContent value="activity" className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 glass-dark border-white/5 rounded-3xl p-8 satin-card">
                            <h3 className="text-sm font-bold text-white mb-8">Activity Engagement</h3>
                            <div className="space-y-6">
                                {[
                                    { name: "Gym Workout", count: 18, color: "bg-indigo-500", percentage: 45 },
                                    { name: "Swimming", count: 12, color: "bg-emerald-500", percentage: 30 },
                                    { name: "Tennis", count: 6, color: "bg-amber-500", percentage: 15 },
                                    { name: "Yoga", count: 4, color: "bg-purple-500", percentage: 10 },
                                ].map((item) => (
                                    <div key={item.name} className="space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-white/80">{item.name}</span>
                                            <span className="font-bold text-white">{item.count} sessions</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: `${item.percentage}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="glass-dark border-white/5 rounded-3xl p-8 satin-card space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
                                    <HeartPulse className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-sm font-bold text-white">Coach Interactions</h3>
                            </div>
                            <div className="space-y-5">
                                {[
                                    { name: "Coach Mike", role: "Personal Trainer", sessions: 8, avatar: "M" },
                                    { name: "Sarah Zen", role: "Yoga Instructor", sessions: 4, avatar: "S" },
                                    { name: "Jean Swimming", role: "Life Guard", sessions: 12, avatar: "J" },
                                ].map((coach, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-muted-foreground group-hover:border-primary/40 transition-all">
                                                {coach.avatar}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white">{coach.name}</p>
                                                <p className="text-[10px] text-muted-foreground opacity-60 font-medium">{coach.role}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-[9px] font-bold border-white/10 opacity-60 h-6">
                                            {coach.sessions} SESSIONS
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full h-10 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold  tracking-widest hover:bg-white/10">View All Coaches</Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="history" className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-sm font-bold tracking-tight text-white">Complete Stay Log</h3>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground opacity-40" />
                                <input placeholder="Search logs..." className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-[10px] text-white focus:outline-none focus:border-white/20" />
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                    <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 ">Stay ID</TableHead>
                                    <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 ">Venue</TableHead>
                                    <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 ">Activity</TableHead>
                                    <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 ">Duration</TableHead>
                                    <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right pr-8 ">Allocation</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {visitHistory.map((v, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                        <TableCell className="pl-8 py-6 text-[11px] font-bold text-white/30">{v.id}</TableCell>
                                        <TableCell>
                                            <h4 className="text-xs font-bold text-white ">{v.venue}</h4>
                                            <p className="text-[9px] text-muted-foreground opacity-40 font-medium">{v.date}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-white/5 border-white/5 text-[10px] font-medium px-2 py-0.5 rounded-lg">{v.activity}</Badge>
                                        </TableCell>
                                        <TableCell className="text-xs font-bold text-white">1h 15m</TableCell>
                                        <TableCell className="text-right pr-8">
                                            <p className="text-xs font-bold text-emerald-400">RWF {v.cost.toLocaleString()}</p>
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
