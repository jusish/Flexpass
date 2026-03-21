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
    Apple,
    HeartPulse,
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

export default function NutritionistsAdmin() {
    const { nutritionists } = useMockStore();
    const [search, setSearch] = useState("");

    const filteredNutritionists = nutritionists.filter(n =>
        n.name.toLowerCase().includes(search.toLowerCase()) ||
        n.specialty.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white ">Clinical Network</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50  tracking-[0.2em] mt-1">
                        Metabolic Clinicians • Nutritional Supervision Nodes • Clinical Cadre
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl ">
                        Export metabolic audit
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black  active:scale-95 shadow-xl shadow-white/5">
                        Onboard clinical nutritionist
                    </Button>
                </div>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Verified Clinicians", val: nutritionists.length, sub: "Metabolic supervision units", icon: HeartPulse, color: "text-rose-500" },
                    { label: "Aggregate Yield", val: `RWF ${(nutritionists.reduce((acc, n) => acc + n.revenue, 0) / 1000000).toFixed(1)}M`, sub: "Monthly network revenue", icon: CreditCard, color: "text-emerald-500" },
                    { label: "Compliance Index", val: "94.8%", sub: "Global network adherence", icon: Activity, color: "text-sky-500" },
                    { label: "Patient Nodes", val: "1.8k", sub: "Active clinical oversight", icon: Users, color: "text-indigo-500" },
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

            {/* Clinician Registry */}
            <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl">
                <div className="p-8 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-2">
                            Clinician Registry
                        </h3>
                        <p className="text-[10px] text-muted-foreground font-semibold opacity-40  tracking-wider">Governing {nutritionists.length} metabolic professionals</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative group w-64 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all" />
                            <Input
                                placeholder="Identify clinician by name or focus area..."
                                className="h-10 bg-white/5 border-white/10 rounded-xl pl-12 text-[10px] font-black focus:ring-1 focus:ring-white/10 transition-all  opacity-60 focus:opacity-100 tracking-widest"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <DataFilterModal title="Clinical Filter" description="Configure the medical professional and metabolic registry parameters for extraction.">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                    <DateRangeFilter />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Clinical taxonomy</label>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-bold px-4">
                                            <SelectValue placeholder="Focus Area" />
                                        </SelectTrigger>
                                        <SelectContent className="glass-dark border-white/10 rounded-xl">
                                            <SelectItem value="all" className="text-[10px] font-bold">All Clinical Areas</SelectItem>
                                            <SelectItem value="weight" className="text-[10px] font-bold">Weight Regulation</SelectItem>
                                            <SelectItem value="sports" className="text-[10px] font-bold">Sports Metabolism</SelectItem>
                                            <SelectItem value="clinical" className="text-[10px] font-bold">Therapeutic Nutrition</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DataFilterModal>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-collapse">
                    {filteredNutritionists.map((nutri) => (
                        <Link
                            key={nutri.id}
                            href={`/admin/nutritionists/${nutri.id}`}
                            className="p-8 border-b border-r border-white/5 hover:bg-white/4 transition-all group relative overflow-hidden flex flex-col justify-between"                      >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] group-hover:bg-indigo-500/10 transition-all" />
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-8">
                                    <Avatar className="h-14 w-14 border-2 border-white/10 p-0.5 ring-4 ring-white/5 shadow-2xl transition-transform group-hover:scale-110">
                                        <AvatarImage src={nutri.avatar} />
                                        <AvatarFallback className="bg-white/5 font-black text-xs">{nutri.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-end gap-2">
                                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black px-3 py-1  rounded-lg shadow-sm tracking-widest">Clinician Unit</Badge>
                                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            <span className="text-[9px] font-black text-white tabular-nums">4.9</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 tracking-tighter  group-hover:text-glow-silver transition-all">{nutri.name}</h3>
                                <p className="text-[10px] font-black text-muted-foreground opacity-30 flex items-center gap-2  tracking-widest">
                                    <Briefcase className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" /> {nutri.specialty} Specialist
                                </p>

                                <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-muted-foreground  opacity-20 tracking-[0.2em]">Patient Flux</p>
                                        <p className="text-sm font-black text-white tabular-nums">{nutri.activeClients} Units</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-muted-foreground  opacity-20 tracking-[0.2em]">Net Outcome</p>
                                        <p className="text-sm font-black text-emerald-500 tabular-nums">{nutri.adherenceRate}%</p>
                                    </div>
                                </div>
                            </div>

                            <Button variant="ghost" className="w-full h-11 mt-10 rounded-xl text-[10px] font-black border border-white/10 bg-white/2 text-muted-foreground opacity-40 hover:opacity-100 hover:text-white transition-all  tracking-widest">
                                INSPECT CLINICAL PROFILE <ArrowUpRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Button>
                        </Link>
                    ))}
                </div>
            </Card>
        </div>
    );
}
