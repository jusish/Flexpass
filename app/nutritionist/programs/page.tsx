"use client";

import React, { useState } from "react";
import { useMockStore } from "@/lib/store";
import {
    Apple,
    Plus,
    Search,
    TrendingUp,
    Users,
    ArrowRight,
    MapPin,
    Activity,
    ClipboardList,
    Filter,
    HeartPulse,
    ShieldCheck,
    SearchIcon,
    Zap,
    Utensils,
    PieChart
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

export default function NutritionistPrograms() {
    const router = useRouter();
    const { programs } = useMockStore();
    const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Clinical Programs</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Design and manage dietary plans and clinical meal protocols</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-5 border-white/5 bg-white/5 text-xs font-semibold rounded-xl transition-all">
                        Archive
                    </Button>
                    <Button onClick={() => setIsDesignModalOpen(true)} className="h-11 px-6 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest shadow-lg active:scale-95">
                        <Plus className="h-4 w-4 mr-2" /> Create Program
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Active Plans", val: programs.length, sub: "Active dietary models", icon: PieChart, color: "text-indigo-500" },
                    { label: "Clinical Success", val: "88.4%", sub: "Global compliance rate", icon: TrendingUp, color: "text-emerald-500" },
                    { label: "Enrolled Members", val: "112", sub: "Currently monitoring", icon: Users, color: "text-amber-500" },
                    { label: "Service Score", val: "A+", sub: "User satisfaction index", icon: Activity, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-30 mt-3 font-medium">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative group flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all" />
                    <Input
                        placeholder="Search program registry..."
                        className="h-12 bg-black/40 border-white/5 rounded-xl pl-12 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/10 transition-all placeholder:opacity-30"
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-xs font-bold rounded-xl transition-all hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" /> Filter Registry
                </Button>
            </div>

            {/* Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program, i) => (
                    <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card
                            className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card hover:border-white/10 transition-all group p-8 cursor-pointer flex flex-col justify-between h-full min-h-[300px]"
                            onClick={() => router.push(`/nutritionist/programs/${program.id}`)}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-emerald-500 shadow-xl group-hover:scale-110 transition-transform">
                                    <Utensils className="w-6 h-6" />
                                </div>
                                <Badge variant="outline" className="text-[10px] font-bold border-none bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg  tracking-wider">{program.status}</Badge>
                            </div>

                            <div className="grow mb-8">
                                <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-emerald-400 transition-colors ">{program.name}</h3>
                                <div className="flex items-center gap-2 opacity-40">
                                    <HeartPulse className="h-3.5 w-3.5" />
                                    <p className="text-[10px] font-bold  tracking-widest leading-none">Focus: {program.focus}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5 mb-8">
                                <div>
                                    <p className="text-[9px] font-bold text-muted-foreground opacity-30  tracking-widest mb-2">Member Count</p>
                                    <p className="text-sm font-bold text-white  tracking-tight">{program.patients} Registered</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-muted-foreground opacity-30  tracking-widest mb-2">Compliance Avg</p>
                                    <p className="text-sm font-bold text-emerald-500  tracking-tight">{program.successRate}% Success</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex-1 pr-12">
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${program.successRate}%` }}
                                            className="h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0  tracking-widest">
                                    View Details <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}

                <Card
                    className="glass-dark border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-12 gap-5 cursor-pointer hover:bg-white/2 transition-colors group min-h-[300px]"
                    onClick={() => setIsDesignModalOpen(true)}
                >
                    <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="h-8 w-8 text-muted-foreground opacity-20 group-hover:opacity-100" />
                    </div>
                    <p className="text-[11px] font-bold text-muted-foreground  tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">Provision New Program</p>
                </Card>
            </div>

            <Dialog open={isDesignModalOpen} onOpenChange={setIsDesignModalOpen}>
                <DialogContent className="glass-dark border-white/10 max-w-md rounded-[2rem] p-10">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-2xl font-bold text-white  tracking-tight">New Program Protocol</DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-2">Define the clinical guidelines and metabolic goals for this new plan.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Program Designation</label>
                            <Input placeholder="E.G. METABOLIC RESET PHASE 1" className="h-12 bg-white/5 border-white/5 rounded-xl text-xs font-bold  focus:ring-0" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Focus Area</label>
                                <div className="relative">
                                    <select className="w-full h-12 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold px-4 text-white appearance-none outline-none focus:ring-0  cursor-pointer">
                                        <option>WEIGHT CONTROL</option>
                                        <option>MASS YIELD</option>
                                        <option>CLINICAL RECOVERY</option>
                                    </select>
                                    <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground opacity-30 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Intensity</label>
                                <div className="relative">
                                    <select className="w-full h-12 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold px-4 text-white appearance-none outline-none focus:ring-0  cursor-pointer">
                                        <option>MODERATE</option>
                                        <option>INTENSIVE</option>
                                        <option>ELITE/STRICT</option>
                                    </select>
                                    <Activity className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground opacity-30 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-10 sm:justify-between items-center gap-4">
                        <Button variant="ghost" onClick={() => setIsDesignModalOpen(false)} className="text-[10px] font-bold  tracking-widest text-muted-foreground opacity-40 hover:opacity-100 order-2 sm:order-1">Abort</Button>
                        <Button className="h-12 px-10 rounded-xl text-[10px] font-black silver-gradient text-black  tracking-widest order-1 sm:order-2 shadow-xl shadow-white/5">Publish Protocol</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
