"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
    Activity,
    TrendingUp,
    Building2,
    Calendar,
    Download,
    ChevronDown,
    Zap,
    Users
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
    Cell
} from 'recharts';
import { motion } from "framer-motion";

const engagementData = [
    { month: 'Oct', visits: 850 },
    { month: 'Nov', visits: 940 },
    { month: 'Dec', visits: 780 },
    { month: 'Jan', visits: 1100 },
    { month: 'Feb', visits: 1250 },
    { month: 'Mar', visits: 1420 },
];

const facilityData = [
    { name: 'Waka Fitness', visits: 450, fill: "#C5C7C9" },
    { name: 'Cercle Sportif', visits: 320, fill: "#C5C7C9" },
    { name: 'Kigali Arena', visits: 280, fill: "#6E6E73" },
    { name: 'Mindful Yoga', visits: 190, fill: "#6E6E73" },
    { name: 'Others', visits: 150, fill: "#1F1F23" },
];

const chartConfig = {
    visits: {
        label: "Total Visits",
        color: "#C5C7C9",
    },
} satisfies ChartConfig;

export default function UtilizationPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow-silver">Wellness Utilization</h1>
                    <p className="text-muted-foreground text-xs font-bold tracking-tight opacity-60">Deep dive into employee engagement and ROI metrics</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-10 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-60">
                        <Calendar className="w-3.5 h-3.5 mr-2 opacity-60" /> Last 6 Months <ChevronDown className="ml-2 w-3.5 h-3.5 opacity-40" />
                    </Button>
                    <Button variant="outline" size="sm" className="glass border-white/5 h-10 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-60">
                        <Download className="w-3.5 h-3.5 mr-2" /> Export Data
                    </Button>
                </div>
            </div>

            {/* High Level Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Participation", value: "78%", sub: "342/450 employees", icon: Users, color: "text-primary" },
                    { label: "Cost Per Visit", value: "RWF 4,200", sub: "-12% from last month", icon: Zap, color: "text-secondary" },
                    { label: "Total Sessions", value: "1,420", sub: "+24% growth", icon: Activity, color: "text-emerald-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl relative overflow-hidden group satin-card">
                        <div className={`p-3 bg-white/5 rounded-xl w-fit mb-4 ${stat.color} group-hover:scale-110 transition-all border border-white/5 shadow-inner`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter text-glow-silver">{stat.value}</h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1 opacity-60">{stat.label}</p>
                        <p className="text-[10px] text-muted-foreground opacity-40 mt-3 font-medium flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-white/20" /> {stat.sub}
                        </p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Engagement Trend */}
                <Card className="lg:col-span-2 glass-dark p-6 border-white/5 rounded-2xl flex flex-col satin-card">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-glow-silver">
                                <TrendingUp className="w-4 h-4 text-primary" /> Engagement Trend
                            </h3>
                            <p className="text-muted-foreground text-[10px] font-medium opacity-60">Monthly visit volume across all facilities</p>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[300px]">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <AreaChart data={engagementData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C5C7C9" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#C5C7C9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 600 }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#C5C7C9"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </Card>

                {/* Top Facilities */}
                <Card className="glass-dark p-6 border-white/5 rounded-2xl flex flex-col satin-card">
                    <div className="mb-8">
                        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-glow-silver">
                            <Building2 className="w-4 h-4 text-primary" /> Top Venues
                        </h3>
                        <p className="text-muted-foreground text-[10px] font-medium opacity-60">Most visited wellness locations</p>
                    </div>

                    <div className="flex-1 space-y-6">
                        {facilityData.map((item, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="font-bold opacity-80">{item.name}</span>
                                    <span className="font-black text-primary bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{item.visits}</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.visits / 500) * 100}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full silver-gradient rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 glass">
                        <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1 opacity-60 text-glow-silver text-center">Utilization Insight</p>
                        <p className="text-[10px] text-muted-foreground font-medium italic text-center leading-relaxed">
                            "Waka Fitness remains the favorite. Consider a dedicated company class there on weekends."
                        </p>
                    </div>
                </Card>
            </div>

            {/* Department Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-dark p-6 border-white/5 rounded-2xl min-h-[300px] satin-card">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-glow-silver">Departmental Analytics</h3>
                    <div className="space-y-3">
                        {[
                            { dept: "IT & Engineering", use: "94%", count: 120 },
                            { dept: "Finance", use: "82%", count: 45 },
                            { dept: "Operations", use: "65%", count: 80 },
                            { dept: "Human Resources", use: "88%", count: 12 },
                        ].map((d, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/2 border border-white/5 group hover:bg-white/5 transition-all">
                                <div>
                                    <p className="text-xs font-bold group-hover:text-primary transition-colors">{d.dept}</p>
                                    <p className="text-[10px] text-muted-foreground font-medium opacity-40">{d.count} Enrolled Members</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-primary text-glow-silver">{d.use}</p>
                                    <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest opacity-30">Active</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="glass-dark p-6 border-white/5 rounded-2xl min-h-[300px] flex flex-col justify-center items-center text-center satin-card relative overflow-hidden">
                    <div className="absolute inset-0 silver-gradient opacity-5" />
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-xl group hover:scale-110 transition-transform">
                        <Activity className="w-8 h-8 text-primary border-glow-silver" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 tracking-tighter text-glow-silver">Health ROI: 3.2x</h3>
                    <p className="text-[11px] text-muted-foreground max-w-xs font-medium leading-relaxed mb-6 opacity-80">
                        Based on your current utilization rate, your estimated productivity gain is equivalent to <span className="text-primary font-bold">14 extra working days</span> per month.
                    </p>
                    <Button className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-glow-silver silver-gradient text-black">
                        Download ROI Report
                    </Button>
                </Card>
            </div>
        </div>
    );
}
