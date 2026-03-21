"use client";

import React, { useState } from "react";
import { useMockStore } from "@/lib/store";
import {
    Dumbbell,
    Plus,
    Search,
    TrendingUp,
    Users,
    ArrowRight,
    Activity,
    ClipboardList,
    Filter,
    Zap,
    Clock,
    MoreVertical,
    Copy,
    Edit3,
    Trash2,
    Settings
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export default function CoachRoutines() {
    const { routines } = useMockStore();
    const coachRoutines = routines.filter(r => r.category !== "Nutrition");

    return (
        <div className="flex-1 space-y-10 p-8 pt-6 bg-background/95 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">Training Protocols</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50  tracking-widest mt-1">
                        Node Management • Performance Registry • Operational Standards
                    </p>
                </div>
                <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black ">
                    <Plus className="h-4 w-4 mr-2" /> Provision Protocol
                </Button>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Protocols", val: coachRoutines.length, sub: "Verified sequences", icon: ClipboardList, color: "text-indigo-500" },
                    { label: "Complexity Avg", val: "Inter.", sub: "Standard difficulty", icon: TrendingUp, color: "text-emerald-500" },
                    { label: "Enrollment Total", val: "142", sub: "Active user nodes", icon: Users, color: "text-amber-500" },
                    { label: "Operational Impact", val: "High", sub: "Performance yield", icon: Zap, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:border-white/10 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-30  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.val}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    <input
                        placeholder="Search sequence registry..."
                        className="w-full h-12 bg-black/40 border-white/5 rounded-2xl pl-11 pr-4 text-[10px] font-bold tracking-widest focus:ring-1 focus:ring-white/10 transition-all outline-none "
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl ">
                    <Filter className="h-4 w-4 mr-2" /> Node Filter
                </Button>
            </div>

            {/* Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {coachRoutines.map((routine, i) => (
                    <motion.div
                        key={routine.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card hover:border-white/10 transition-all group p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-indigo-500">
                                    <Dumbbell className="w-6 h-6" />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5">
                                            <MoreVertical className="h-4 w-4 text-muted-foreground opacity-40" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="glass-dark border-white/10">
                                        <DropdownMenuItem className="text-[9px] font-black  tracking-widest text-white/50 hover:text-white transition-colors"><Edit3 className="h-3.5 w-3.5 mr-2" /> Modify Node</DropdownMenuItem>
                                        <DropdownMenuItem className="text-[9px] font-black  tracking-widest text-white/50 hover:text-white transition-colors"><Copy className="h-3.5 w-3.5 mr-2" /> Fork Registry</DropdownMenuItem>
                                        <DropdownMenuItem className="text-[9px] font-black  tracking-widest text-red-500/50 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5 mr-2" /> Decommission</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="grow mb-8">
                                <h3 className="text-xl font-black text-white tracking-tighter mb-2 ">{routine.name}</h3>
                                <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-widest flex items-center gap-2">
                                    <Activity className="h-3 w-3" /> Metabolic Focus: {routine.category}
                                </p>
                                <p className="mt-6 text-[11px] text-muted-foreground font-medium leading-relaxed line-clamp-2 opacity-50">
                                    {routine.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5 mb-8">
                                <div>
                                    <p className="text-[9px] font-black text-muted-foreground opacity-30  tracking-widest mb-2">Complexity</p>
                                    <p className="text-sm font-black text-white ">{routine.difficulty}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-muted-foreground opacity-30  tracking-widest mb-2">Operational Time</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                                        <span className="text-sm font-black text-white  tracking-tight">45 Min</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full h-11 rounded-xl text-[10px] font-black tracking-widest border-white/10 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all ">
                                View Full Protocol
                            </Button>
                        </Card>
                    </motion.div>
                ))}

                <Card className="glass-dark border-dashed border-white/10 rounded-3xl satin-card flex flex-col items-center justify-center p-12 gap-4 cursor-pointer hover:bg-white/2 transition-colors group">
                    <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="h-8 w-8 text-muted-foreground opacity-20 group-hover:opacity-100" />
                    </div>
                    <p className="text-[10px] font-black text-muted-foreground  tracking-[0.2em] opacity-30 group-hover:opacity-100 transition-opacity">Provision Protocol</p>
                </Card>
            </div>
        </div>
    );
}
