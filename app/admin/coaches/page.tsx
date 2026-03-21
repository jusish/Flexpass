"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Plus,
    Star,
    Users,
    TrendingUp,
    Award,
    Clock,
    MoreVertical,
    ArrowUpRight,
    History,
    Activity,
    Zap,
    Briefcase,
    ShieldCheck,
    CreditCard,
    Layers,
    SlidersHorizontal,
    Box
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useMockStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DateRangeFilter } from "@/components/admin/date-filter";
import { DataFilterModal } from "@/components/admin/data-filter-modal";

export default function CoachesAdmin() {
    const { coaches } = useMockStore();
    const [search, setSearch] = useState("");

    const filteredCoaches = coaches.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.specialty.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white ">Coach Network</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50  tracking-[0.2em] mt-1">
                        Professional Cadre • Performance Node Distribution • Specialized Units
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl ">
                        Export network audit
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black  active:scale-95 shadow-xl shadow-white/5">
                        Onboard clinical professional
                    </Button>
                </div>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Professionals", val: coaches.length, sub: "Verified clinical units", icon: Users, color: "text-indigo-500" },
                    { label: "Aggregate Yield", val: `RWF ${(coaches.reduce((acc, c) => acc + c.revenue, 0) / 1000000).toFixed(1)}M`, sub: "Monthly network revenue", icon: CreditCard, color: "text-emerald-500" },
                    { label: "Performance Index", val: "4.9/5.0", sub: "Global network rating", icon: Star, color: "text-amber-500" },
                    { label: "Utilization Flow", val: "88.4%", sub: "Network session load", icon: Activity, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:scale-[1.02] transition-transform">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 transition-transform group-hover:scale-110 shadow-inner", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground  opacity-30 tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black text-white tracking-tighter tabular-nums">{stat.val}</h3>
                        <p className="text-[9px] font-bold text-muted-foreground opacity-30  tracking-widest mt-2">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Registry Card */}
            <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl">
                <div className="p-8 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-2">
                            Professional Registry
                        </h3>
                        <p className="text-[10px] text-muted-foreground font-semibold opacity-40  tracking-wider">Governing {coaches.length} clinical professionals</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative group w-64 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all" />
                            <Input
                                placeholder="Identify professional by name or specialty..."
                                className="h-10 bg-white/5 border-white/10 rounded-xl pl-12 text-[10px] font-black focus:ring-1 focus:ring-white/10 transition-all  opacity-60 focus:opacity-100 tracking-widest"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <DataFilterModal title="Network Filter" description="Configure the clinical professional and performance registry parameters for extraction.">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Observation period</label>
                                    <DateRangeFilter />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Unit discipline</label>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-bold px-4">
                                            <SelectValue placeholder="Clinical Specialty" />
                                        </SelectTrigger>
                                        <SelectContent className="glass-dark border-white/10 rounded-xl">
                                            <SelectItem value="all" className="text-[10px] font-bold">All Clinical Disciplines</SelectItem>
                                            <SelectItem value="fitness" className="text-[10px] font-bold">Performance Fitness</SelectItem>
                                            <SelectItem value="yoga" className="text-[10px] font-bold">Functional Yoga</SelectItem>
                                            <SelectItem value="hiit" className="text-[10px] font-bold">HIIT Calibration</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DataFilterModal>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-collapse">
                    {filteredCoaches.map((coach) => (
                        <Link
                            key={coach.id}
                            href={`/admin/coaches/${coach.id}`}
                            className="p-8 border-b border-r border-white/5 hover:bg-white/4 transition-all group relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] group-hover:bg-indigo-500/10 transition-all" />
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-8 group-hover:translate-x-1 transition-transform">
                                    <Avatar className="h-14 w-14 border-2 border-white/10 p-0.5 ring-4 ring-white/5 shadow-2xl transition-transform group-hover:scale-110">
                                        <AvatarImage src={coach.avatar} />
                                        <AvatarFallback className="bg-white/5 font-black text-xs">{coach.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-end gap-2">
                                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black px-3 py-1  rounded-lg shadow-sm tracking-widest">Clinical Unit</Badge>
                                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            <span className="text-[9px] font-black text-white tabular-nums">4.9</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 tracking-tighter  group-hover:text-glow-silver transition-all">{coach.name}</h3>
                                <p className="text-[10px] font-black text-muted-foreground opacity-30 flex items-center gap-2  tracking-widest">
                                    <Briefcase className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" /> {coach.specialty} Specialist
                                </p>

                                <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-muted-foreground  opacity-20 tracking-[0.2em]">Member Flux</p>
                                        <p className="text-sm font-black text-white tabular-nums">{coach.activeMembers} Units</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-muted-foreground  opacity-20 tracking-[0.2em]">Net Outcome</p>
                                        <p className="text-sm font-black text-emerald-500 tabular-nums">{coach.adherenceRate}%</p>
                                    </div>
                                </div>
                            </div>

                            <Button variant="ghost" className="w-full h-11 mt-10 rounded-xl text-[10px] font-black border border-white/10 bg-white/2 text-muted-foreground opacity-40 hover:opacity-100 hover:text-white transition-all  tracking-widest">
                                VIEW PROFESSIONAL PROFILE <ArrowUpRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Button>
                        </Link>
                    ))}
                </div>
            </Card>
        </div>
    );
}
