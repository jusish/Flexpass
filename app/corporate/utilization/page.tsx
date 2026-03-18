"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
    Activity,
    TrendingUp,
    Building2,
    Calendar,
    Download,
    ChevronDown,
    Zap,
    Users,
    CreditCard,
    UserPlus
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
    BarChart,
    Bar,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip
} from 'recharts';
import { motion } from "framer-motion";
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

const engagementData = [
    { month: 'Oct', visits: 850, cost: 3570000 },
    { month: 'Nov', visits: 940, cost: 3948000 },
    { month: 'Dec', visits: 780, cost: 3276000 },
    { month: 'Jan', visits: 1100, cost: 4620000 },
    { month: 'Feb', visits: 1250, cost: 5250000 },
    { month: 'Mar', visits: 1420, cost: 5964000 },
];

const facilityData = [
    { name: 'Waka Fitness', visits: 450, cost: 1890000, fill: "#6366f1" },
    { name: 'Cercle Sportif', visits: 320, cost: 1344000, fill: "#10b981" },
    { name: 'Kigali Arena', visits: 280, cost: 1176000, fill: "#f59e0b" },
    { name: 'Mindful Yoga', visits: 190, cost: 798000, fill: "#8b5cf6" },
    { name: 'Others', visits: 150, cost: 630000, fill: "#6E6E73" },
];

const departmentData = [
    { name: "Engineering", visits: 520, utilization: "92%", cost: 2184000 },
    { name: "Sales", visits: 310, utilization: "74%", cost: 1302000 },
    { name: "Marketing", visits: 240, utilization: "68%", cost: 1008000 },
    { name: "Finance", visits: 180, utilization: "85%", cost: 756000 },
    { name: "HR", visits: 95, utilization: "45%", cost: 399000 },
    { name: "Operations", visits: 75, utilization: "30%", cost: 315000 },
];

const dayOfWeekData = [
    { day: "Mon", morning: 45, lunch: 20, vening: 65 },
    { day: "Tue", morning: 30, lunch: 25, vening: 80 },
    { day: "Wed", morning: 55, lunch: 15, vening: 70 },
    { day: "Thu", morning: 40, lunch: 30, vening: 90 },
    { day: "Fri", morning: 25, lunch: 40, vening: 110 },
    { day: "Sat", morning: 80, lunch: 60, vening: 40 },
    { day: "Sun", morning: 110, lunch: 80, vening: 20 },
];

const chartConfig = {
    visits: { label: "Total Visits", color: "#6366f1" },
    cost: { label: "Total Cost", color: "#10b981" },
    morning: { label: "Morning Sessions", color: "#6366f1" },
    lunch: { label: "Lunch Breaks", color: "#f59e0b" },
    vening: { label: "Evening Peak", color: "#8b5cf6" },
} satisfies ChartConfig;

export default function UtilizationPage() {
    const [model, setModel] = React.useState<"subscription" | "utilization">("utilization");

    return (
        <div className="space-y-8 pb-20">
            {/* Model Switcher & Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-white">Consolidated Analytics</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Deep dive into organization-wide wellness participation and expenditure</p>
                </div>

                <div className="flex bg-black/40 p-1.5 border border-white/5 rounded-2xl">
                    <button
                        onClick={() => setModel("utilization")}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-[10px] font-bold tracking-tight transition-all",
                            model === "utilization" ? "silver-gradient text-black" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        Utilization Model
                    </button>
                    <button
                        onClick={() => setModel("subscription")}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-[10px] font-bold tracking-tight transition-all",
                            model === "subscription" ? "silver-gradient text-black" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        Tier Subscription
                    </button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="bg-black/40 border border-white/5 p-1.5 h-16 rounded-2xl w-fit">
                    <TabsTrigger value="overview" className="rounded-xl px-10 h-full text-[11px] font-black  tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Overview</TabsTrigger>
                    <TabsTrigger value="departments" className="rounded-xl px-10 h-full text-[11px] font-black  tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Departmental</TabsTrigger>
                    <TabsTrigger value="temporal" className="rounded-xl px-10 h-full text-[11px] font-black  tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Attendance Flow</TabsTrigger>
                    <TabsTrigger value="venues" className="rounded-xl px-10 h-full text-[11px] font-black  tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Venue Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "Active Participation", value: "78%", sub: "342/450 employees", icon: Users, color: "text-primary" },
                            { label: "Cost Per Session", value: "RWF 4,200", sub: "-12% from average", icon: Zap, color: "text-secondary" },
                            { label: "Current Expenditure", value: model === "utilization" ? "RWF 5,964,000" : "RWF 4,500,000", sub: model === "utilization" ? "Pay-per-scan" : "Fixed Monthly", icon: Activity, color: "text-emerald-500" },
                            { label: "Total Sessions", value: "1,420", sub: "+24% growth", icon: TrendingUp, color: "text-blue-500" },
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group">
                                <div className={`p-3 bg-white/5 rounded-xl w-fit mb-4 ${stat.color} border border-white/5 shadow-inner`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                                <p className="text-[10px] font-bold text-muted-foreground tracking-wide mt-1 opacity-50">{stat.label}</p>
                                <p className="text-[10px] text-muted-foreground opacity-30 mt-3 font-semibold flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-white/20" /> {stat.sub}
                                </p>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark p-8 border-white/5 rounded-3xl relative overflow-hidden satin-card space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-primary" /> Utilization Velocity
                                    </h3>
                                    <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1 uppercase tracking-widest">Aggregate session growth index</p>
                                </div>
                                <Badge variant="outline" className="text-[9px] font-black tracking-widest border-white/10 opacity-60 px-2.5 py-1">REAL-TIME</Badge>
                            </div>
                            <div className="h-[350px] w-full">
                                <ChartContainer config={chartConfig} className="h-full w-full">
                                    <AreaChart data={engagementData} margin={{ left: -20, right: 10, top: 20 }}>
                                        <defs>
                                            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }}
                                            tickFormatter={(val: number) => `${(val / 1000000).toFixed(1)}M`}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area
                                            type="monotone"
                                            dataKey="cost"
                                            stroke="#10b981"
                                            strokeWidth={4}
                                            fill="url(#colorCost)"
                                            fillOpacity={1}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <Card className="glass-dark p-8 border-white/5 rounded-3xl satin-card space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Consumption Ledger</h3>
                                    <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1 uppercase tracking-widest">Live employee check-in attribution</p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[9px] font-black uppercase tracking-widest opacity-40 hover:opacity-100">Live Audit</Button>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { user: "Sandra Jones", facility: "Waka Fitness", cost: 12500, time: "10:45 AM", model: "Utilization" },
                                    { user: "Michael King", facility: "Cercle Sportif", cost: 15000, time: "09:20 AM", model: "Utilization" },
                                    { user: "Alice Muhoza", facility: "Kigali Arena", cost: 0, time: "Yesterday", model: "Subscription" },
                                    { user: "David Gasana", facility: "Mindful Yoga", cost: 18000, time: "Yesterday", model: "Utilization" },
                                    { user: "Kevin Kamali", facility: "Waka Fitness", cost: 12500, time: "Yesterday", model: "Utilization" },
                                ].map((log, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-[11px] group-hover:border-primary/20 transition-all">
                                                {log.user.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white tracking-tight">{log.user}</h4>
                                                <p className="text-[10px] text-muted-foreground font-semibold opacity-40">{log.facility} • {log.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={cn(
                                                "text-[11px] font-black tracking-tighter",
                                                log.cost > 0 ? "text-white" : "text-muted-foreground opacity-40"
                                            )}>
                                                {log.cost > 0 ? `${log.cost.toLocaleString()} RWF` : "Covered"}
                                            </p>
                                            <p className="text-[8px] font-black uppercase tracking-widest text-primary/60">{log.model}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full mt-auto silver-gradient text-black font-bold h-10 rounded-xl text-[10px] uppercase tracking-widest">Detailed Monthly Audit</Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="departments" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark border-white/5 rounded-3xl p-8 satin-card space-y-8">
                            <div>
                                <h3 className="text-sm font-black tracking-wide text-white uppercase">Departmental Allocation</h3>
                                <p className="text-muted-foreground text-[10px] font-semibold opacity-40">Participation rate by organizational segment</p>
                            </div>
                            <div className="h-[350px]">
                                <ChartContainer config={chartConfig} className="h-full w-full">
                                    <BarChart data={departmentData} layout="vertical" margin={{ left: 40 }}>
                                        <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.02)" />
                                        <XAxis type="number" hide />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="visits" radius={[0, 4, 4, 0]} fill="#6366f1" barSize={32} />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                            <div className="p-8 border-b border-white/5">
                                <h3 className="text-sm font-black tracking-wide text-white uppercase">Consumption Ledger</h3>
                            </div>
                            <Table>
                                <TableHeader className="bg-white/2 cursor-default">
                                    <TableRow className="hover:bg-transparent border-white/5">
                                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Dept</TableHead>
                                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-center">Sessions</TableHead>
                                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-center">Usage %</TableHead>
                                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-right">Cost (RWF)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {departmentData.map((dept) => (
                                        <TableRow key={dept.name} className="border-white/5 hover:bg-white/5 transition-colors group">
                                            <TableCell className="text-[11px] font-bold text-white py-4">{dept.name}</TableCell>
                                            <TableCell className="text-[11px] font-bold text-muted-foreground text-center">{dept.visits}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className="text-[9px] font-black border-primary/20 bg-primary/5 text-primary">
                                                    {dept.utilization}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-[11px] font-black text-white text-right">
                                                {dept.cost.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="temporal" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="glass-dark border-white/5 rounded-3xl p-10 satin-card space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-sm font-black tracking-wide text-white uppercase">Temporal Presence Flow</h3>
                                <p className="text-muted-foreground text-[10px] font-semibold opacity-40">Peak attendance windows by day of week</p>
                            </div>
                            <div className="flex gap-2">
                                <Badge className="bg-primary/10 text-primary border-primary/10 text-[9px] font-black uppercase">Morning</Badge>
                                <Badge className="bg-secondary/10 text-secondary border-secondary/10 text-[9px] font-black uppercase">Lunch</Badge>
                                <Badge className="bg-black/60 text-white border-white/10 text-[9px] font-black uppercase">Evening</Badge>
                            </div>
                        </div>

                        <div className="h-[450px]">
                            <ChartContainer config={chartConfig} className="h-full w-full">
                                <BarChart data={dayOfWeekData}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6E6E73', fontSize: 11, fontWeight: 700 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 700 }}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="morning" stackId="a" fill="#C5C7C9" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="lunch" stackId="a" fill="#6E6E73" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="vening" stackId="a" fill="#1F1F23" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="venues" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark border-white/5 rounded-3xl p-10 satin-card flex flex-col items-center">
                            <h3 className="text-sm font-black tracking-wide text-white uppercase mb-10 w-full">Node Affinity</h3>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={facilityData}
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={5}
                                            dataKey="visits"
                                        >
                                            {facilityData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.5)" strokeWidth={4} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-8 w-full mt-6">
                                {facilityData.map((item) => (
                                    <div key={item.name} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-white truncate">{item.name}</p>
                                            <p className="text-[9px] text-muted-foreground font-semibold">{item.visits} visits</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="glass-dark border-white/5 rounded-3xl p-8 satin-card space-y-8 flex flex-col">
                            <div className="flex-1">
                                <h3 className="text-sm font-black tracking-wide text-white uppercase mb-8">Venue Comparison (Cost Index)</h3>
                                <div className="space-y-6">
                                    {facilityData.sort((a, b) => b.cost - a.cost).map((item, i) => (
                                        <div key={item.name} className="space-y-2">
                                            <div className="flex justify-between items-center text-[10px]">
                                                <span className="font-bold text-white">{item.name}</span>
                                                <span className="font-black text-primary">RWF {item.cost.toLocaleString()}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(item.cost / 2000000) * 100}%` }}
                                                    className="h-full silver-gradient"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl">
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Corporate Strategy Note</p>
                                <p className="text-[11px] text-muted-foreground font-medium italic">
                                    Employees show 85% affinity for Waka Fitness. Tier optimization suggested for this node.
                                </p>
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

