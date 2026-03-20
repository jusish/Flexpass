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

export default function AnalyticsPage() {
    const [model, setModel] = React.useState<"subscription" | "utilization">("utilization");
    const hasSubscription = false; // Mocking subscription status

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
            {/* Model Switcher & Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Company Statistics</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Track how your team is using their wellness benefits and how much it costs</p>
                </div>

                <div className="flex bg-white/5 p-1 border border-white/10 rounded-xl">
                    <button
                        onClick={() => setModel("utilization")}
                        className={cn(
                            "px-5 py-2 rounded-lg text-xs font-bold transition-all",
                            model === "utilization" ? "silver-gradient text-black" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        Utilization
                    </button>
                    <button
                        onClick={() => setModel("subscription")}
                        className={cn(
                            "px-5 py-2 rounded-lg text-xs font-bold transition-all",
                            model === "subscription" ? "silver-gradient text-black" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        Subscription
                    </button>
                </div>
            </div>

            {model === "subscription" && !hasSubscription ? (
                <Card className="glass-dark border-white/5 rounded-3xl p-12 satin-card text-center space-y-6">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/10">
                        <CreditCard className="w-8 h-8 text-secondary" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">No Active Subscription</h2>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto opacity-60">
                            You're currently on the pay-as-you-go model. Switch to a Tier Subscription to save up to 30% on employee wellness.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                        {[
                            { name: "Silver", price: "RWF 25,000", users: "Up to 50", features: ["15 sessions/mo", "Basic Gyms", "Reporting"] },
                            { name: "Gold", price: "RWF 45,000", users: "Up to 200", features: ["Unlimited sessions", "Premium Gyms", "Analytics+"] },
                            { name: "Platinum", price: "RWF 85,000", users: "Unlimited", features: ["VIP Partners", "Private Coaches", "Dedicated Support"] },
                        ].map((plan) => (
                            <Card key={plan.name} className="bg-white/5 border-white/10 p-6 rounded-2xl text-left hover:border-white/20 transition-all cursor-pointer group">
                                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                                <p className="text-2xl font-black text-primary mb-4">{plan.price}<span className="text-[10px] text-muted-foreground font-normal"> /user</span></p>
                                <ul className="space-y-2 mb-6">
                                    {plan.features.map(f => (
                                        <li key={f} className="text-[11px] text-muted-foreground flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-primary" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full bg-white/10 hover:bg-white/20 border-none group-hover:silver-gradient group-hover:text-black">Choose {plan.name}</Button>
                            </Card>
                        ))}
                    </div>
                </Card>
            ) : (
                <Tabs defaultValue="overview" className="space-y-10">
                    <TabsList className="bg-white/5 border border-white/10 p-1 h-12 rounded-xl w-fit">
                        <TabsTrigger value="overview" className="rounded-lg px-8 h-full text-xs font-bold tracking-wide data-[state=active]:bg-white/10 data-[state=active]:text-white">Overview</TabsTrigger>
                        <TabsTrigger value="departments" className="rounded-lg px-8 h-full text-xs font-bold tracking-wide data-[state=active]:bg-white/10 data-[state=active]:text-white">By Department</TabsTrigger>
                        <TabsTrigger value="temporal" className="rounded-lg px-8 h-full text-xs font-bold tracking-wide data-[state=active]:bg-white/10 data-[state=active]:text-white">Peak Hours</TabsTrigger>
                        <TabsTrigger value="venues" className="rounded-lg px-8 h-full text-xs font-bold tracking-wide data-[state=active]:bg-white/10 data-[state=active]:text-white">Top Places</TabsTrigger>
                    </TabsList>

                <TabsContent value="overview" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "Active Employees", value: "78%", sub: "342/450 people active", icon: Users, color: "text-primary" },
                            { label: "Avg Session Cost", value: "RWF 4,200", sub: "Lower than last month", icon: Zap, color: "text-secondary" },
                            { label: "Total Spent", value: model === "utilization" ? "RWF 5,964,000" : "RWF 4,500,000", sub: model === "utilization" ? "Pay-as-you-go" : "Subscription Plan", icon: Activity, color: "text-emerald-500" },
                            { label: "Total Sessions", value: "1,420", sub: "+24% growth", icon: TrendingUp, color: "text-blue-500" },
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group">
                                <div className={`p-3 bg-white/5 rounded-xl w-fit mb-4 ${stat.color} border border-white/5`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-white">{stat.value}</h3>
                                <p className="text-[10px] font-bold text-muted-foreground tracking-wider mt-1 opacity-60 uppercase">{stat.label}</p>
                                <p className="text-[10px] text-muted-foreground opacity-40 mt-3 font-medium flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-white/20" /> {stat.sub}
                                </p>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark p-8 border-white/5 rounded-3xl satin-card space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-primary" /> Visits Over Time
                                    </h3>
                                    <p className="text-muted-foreground text-[10px] font-medium opacity-60 mt-1">Total growth in employee check-ins</p>
                                </div>
                                <Badge variant="outline" className="text-[9px] font-bold tracking-widest border-white/10 opacity-60 px-2.5 py-1">LIVE</Badge>
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
                                            tick={{ fill: '#888', fontSize: 10, fontWeight: 600 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#888', fontSize: 10, fontWeight: 600 }}
                                            tickFormatter={(val: number) => `${(val / 1000000).toFixed(1)}M`}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area
                                            type="monotone"
                                            dataKey="cost"
                                            stroke="#10b981"
                                            strokeWidth={3}
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
                                    <h3 className="text-sm font-bold tracking-tight text-white">Recent Activity</h3>
                                    <p className="text-muted-foreground text-[10px] font-medium opacity-60 mt-1">Latest employee check-ins across different venues</p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[9px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100">See All</Button>
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
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[11px] group-hover:bg-primary group-hover:text-black group-hover:border-primary/20 transition-all">
                                                {log.user.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white tracking-tight">{log.user}</h4>
                                                <p className="text-[10px] text-muted-foreground font-medium opacity-40">{log.facility} • {log.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={cn(
                                                "text-xs font-bold",
                                                log.cost > 0 ? "text-white" : "text-emerald-400"
                                            )}>
                                                {log.cost > 0 ? `RWF ${log.cost.toLocaleString()}` : "Included"}
                                            </p>
                                            <p className="text-[8px] font-bold uppercase tracking-widest text-primary/60">{log.model}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full mt-auto silver-gradient text-black font-bold h-11 rounded-xl text-[10px] uppercase tracking-widest">Download Monthly Report</Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="departments" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="glass-dark border-white/5 rounded-3xl p-8 satin-card space-y-8">
                            <div>
                                <h3 className="text-sm font-bold tracking-tight text-white">Department Activity</h3>
                                <p className="text-muted-foreground text-[10px] font-medium opacity-60">Check-ins grouped by organization department</p>
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
                                            tick={{ fill: '#888', fontSize: 10, fontWeight: 600 }}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="visits" radius={[0, 4, 4, 0]} fill="#6366f1" barSize={32} />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </Card>

                        <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                            <div className="p-8 border-b border-white/5">
                                <h3 className="text-sm font-bold tracking-tight text-white">Activity Breakdown</h3>
                            </div>
                            <Table>
                                <TableHeader className="bg-white/2 cursor-default">
                                    <TableRow className="hover:bg-transparent border-white/5">
                                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground h-12 pl-8">DEPT</TableHead>
                                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-center">SESSIONS</TableHead>
                                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-center">USAGE %</TableHead>
                                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-right pr-8">COST (RWF)</TableHead>
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
                                <h3 className="text-sm font-bold tracking-tight text-white">Peak Activity Hours</h3>
                                <p className="text-muted-foreground text-[10px] font-medium opacity-60">Most popular times of the day for employee visits</p>
                            </div>
                            <div className="flex gap-2">
                                <Badge className="bg-primary/10 text-primary border-primary/10 text-[9px] font-bold uppercase">Morning</Badge>
                                <Badge className="bg-secondary/10 text-secondary border-secondary/10 text-[9px] font-bold uppercase">Lunch</Badge>
                                <Badge className="bg-white/10 text-white border-white/10 text-[9px] font-bold uppercase">Evening</Badge>
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
                            <h3 className="text-sm font-bold tracking-tight text-white mb-10 w-full">Top Preferred Venues</h3>
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
                                <h3 className="text-sm font-bold tracking-tight text-white mb-8">Cost by Location</h3>
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
            )}
        </div>
    );
}

