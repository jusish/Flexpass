"use client";

import React from "react";
import { 
    TrendingUp, 
    ArrowUpRight, 
    Download, 
    Calendar,
    Zap,
    Users,
    Activity,
    Wallet,
    Target,
    HeartPulse,
    Apple
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    Cell
} from "recharts";
import { cn } from "@/lib/utils";

const metabolicData = [
    { month: "Oct", compliance: 82, outcomes: 78 },
    { month: "Nov", compliance: 85, outcomes: 82 },
    { month: "Dec", compliance: 88, outcomes: 84 },
    { month: "Jan", compliance: 92, outcomes: 88 },
    { month: "Feb", compliance: 91, outcomes: 89 },
    { month: "Mar", compliance: 94, outcomes: 92 },
];

const protocolStats = [
    { name: "Metabolic Reset", value: 48, color: "bg-emerald-500" },
    { name: "Keto Intensive", value: 32, color: "bg-indigo-500" },
    { name: "Elite Perf", value: 20, color: "bg-amber-500" },
];

export default function NutritionistAnalytics() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Track your performance and client health outcomes over time</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-semibold tracking-wide rounded-xl hover:bg-white/10">
                        <Calendar className="w-4 h-4 mr-2" /> Previous Data
                    </Button>
                    <Button className="h-11 px-8 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95">
                        <Download className="w-4 h-4 mr-2" /> Export PDF
                    </Button>
                </div>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Success Rate", val: "92.4%", trend: "+4.2%", sub: "Client goal achievement", icon: Target, color: "text-emerald-500" },
                    { label: "Adherence Rate", val: "94%", trend: "+2.1%", sub: "Average plan compliance", icon: Activity, color: "text-indigo-500" },
                    { label: "Client Retention", val: "88%", trend: "+5.5%", sub: "Monthly active clients", icon: Users, color: "text-amber-500" },
                    { label: "Total Revenue", val: "RWF 4.2M", trend: "+12.0%", sub: "Total program earnings", icon: Apple, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                         <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <ArrowUpRight className="w-2.5 h-2.5 text-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-500 tracking-tight">{stat.trend}</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40 uppercase mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-40 mt-3 font-medium">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-dark p-8 border-white/5 rounded-3xl satin-card space-y-10">
                     <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                                <HeartPulse className="w-4 h-4 text-emerald-400" /> Client Progress vs Adherence
                            </h3>
                            <p className="text-[10px] font-medium text-muted-foreground opacity-60">Correlation between plan adherence and goal achievement</p>
                        </div>
                    </div>
                    
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={metabolicData} margin={{ left: -20, right: 10, top: 0 }}>
                                <defs>
                                    <linearGradient id="colorOutcome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 11, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6E6E73', fontSize: 10, fontWeight: 600 }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', border: 'none' }}
                                    itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="outcomes" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorOutcome)" />
                                <Area type="monotone" dataKey="compliance" stroke="#6366f1" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="glass-dark p-8 border-white/5 rounded-3xl satin-card flex flex-col justify-between">
                     <div className="space-y-2">
                        <h3 className="text-sm font-bold tracking-tight text-white mb-2">Program Effectiveness</h3>
                        <p className="text-[10px] font-medium text-muted-foreground opacity-60">Success rate across different nutritional plans</p>
                    </div>

                    <div className="space-y-8 py-10 flex-1 flex flex-col justify-center">
                        {protocolStats.map((item, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.name}</span>
                                    <span className="text-lg font-bold text-white">{item.value}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="h-12 rounded-xl border-white/10 bg-white/5 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10">
                        Detailed Audit
                    </Button>
                </Card>
            </div>
        </div>
    );
}
