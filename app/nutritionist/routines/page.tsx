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
    Activity,
    ClipboardList,
    Filter,
    Zap,
    Clock,
    MoreVertical,
    Copy,
    Edit3,
    Trash2,
    Utensils,
    Scale,
    Timer,
    SearchIcon,
    Flame,
    PieChart
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

export default function NutritionistRoutines() {
    const { routines } = useMockStore();
    const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
    const nutritionistRoutines = routines.filter(r => r.category === "Nutrition" || r.category === "Yoga");

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Meal Plan Library</h1>
                    <p className="text-muted-foreground text-xs opacity-50 font-medium  tracking-widest mt-1">
                        Manage your collection of 7-day meal routines and dietary guidelines
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setIsDesignModalOpen(true)}
                        className="h-10 px-5 rounded-xl text-xs font-bold silver-gradient text-black"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Design New Plan
                    </Button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Plans", val: nutritionistRoutines.length, sub: "Verified meal sets", icon: Utensils, color: "text-indigo-500" },
                    { label: "Member Usage", val: "84 Members", sub: "Currently assigned", icon: Users, color: "text-emerald-500" },
                    { label: "Avg Compliance", val: "92%", sub: "Dietary adherence", icon: CheckCircle2, color: "text-amber-500" },
                    { label: "Plan Rating", val: "4.8/5", sub: "User feedback", icon: Activity, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2 rounded-lg bg-white/5 border border-white/5", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground  opacity-40 mb-1 font-sans">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-white tracking-tight">{stat.val}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-20 mt-1 font-bold  tracking-widest font-sans">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative group flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all" />
                    <Input
                        placeholder="Search meal plan library..."
                        className="h-11 bg-black/40 border-white/5 rounded-xl pl-12 text-xs font-medium focus:ring-1 focus:ring-white/10 transition-all outline-none  placeholder:opacity-30"
                    />
                </div>
                <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-bold rounded-xl  opacity-60 hover:opacity-100 transition-all">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
            </div>

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {nutritionistRoutines.map((routine, i) => (
                    <motion.div
                        key={routine.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group p-6 flex flex-col justify-between h-full min-h-[260px] satin-card">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-emerald-500">
                                    <Apple className="w-6 h-6" />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5">
                                            <MoreVertical className="h-4 w-4 text-muted-foreground opacity-30" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="glass-dark border-white/10 rounded-xl">
                                        <DropdownMenuItem className="text-[10px] font-bold  hover:bg-white/5 transition-colors"><Edit3 className="h-3.5 w-3.5 mr-2" /> Edit Plan</DropdownMenuItem>
                                        <DropdownMenuItem className="text-[10px] font-bold  hover:bg-white/5 transition-colors"><Copy className="h-3.5 w-3.5 mr-2" /> Duplicate</DropdownMenuItem>
                                        <DropdownMenuItem className="text-[10px] font-bold  text-red-500 hover:bg-red-500/10 transition-colors"><Trash2 className="h-3.5 w-3.5 mr-2" /> Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="grow mb-6">
                                <h3 className="text-lg font-bold text-white  tracking-tight mb-2 font-sans">{routine.name}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge variant="outline" className="text-[8px] font-bold border-none bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-lg ">{routine.difficulty}</Badge>
                                    <Badge variant="outline" className="text-[8px] font-bold border-none bg-white/5 text-white/40 px-2 py-0.5 rounded-lg ">{routine.category}</Badge>
                                </div>
                                <p className="text-[11px] text-muted-foreground font-medium leading-relaxed line-clamp-2 opacity-50">
                                    {routine.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-6">
                                <div className="flex items-center gap-2">
                                    <Flame className="w-3.5 h-3.5 text-amber-500 opacity-40" />
                                    <div>
                                        <p className="text-[8px] font-bold text-muted-foreground  opacity-30">Avg Target</p>
                                        <p className="text-[11px] font-bold text-white">2,150 Kcal</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity className="w-3.5 h-3.5 text-emerald-500 opacity-40" />
                                    <div>
                                        <p className="text-[8px] font-bold text-muted-foreground  opacity-30">Success</p>
                                        <p className="text-[11px] font-bold text-emerald-500 ">High yield</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/5  tracking-widest font-sans">
                                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> Cycle: 90 Days
                                </div>
                                <div className="flex items-center gap-1.5 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0  tracking-widest cursor-pointer">
                                    View Details <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}

                <Card
                    className="glass-dark border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 gap-3 cursor-pointer hover:bg-white/2 transition-colors group min-h-[260px]"
                    onClick={() => setIsDesignModalOpen(true)}
                >
                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Plus className="h-6 w-6 text-muted-foreground opacity-20 group-hover:opacity-100" />
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground  tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">Design New Routine</p>
                </Card>
            </div>

            <Dialog open={isDesignModalOpen} onOpenChange={setIsDesignModalOpen}>
                <DialogContent className="glass-dark border-white/10 max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-white  font-sans">Initialize Meal Plan</DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">Setup a new dietary guideline in your library.</DialogDescription>
                    </DialogHeader>
                    <div className="py-6 space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-muted-foreground  opacity-40">Plan Designation</label>
                            <Input placeholder="E.G. PERFORMANCE LOADING" className="h-11 bg-white/5 border-white/5 rounded-xl text-xs font-bold  outline-none focus:ring-0" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-muted-foreground  opacity-40">Primary Nutrient Focus</label>
                            <select className="w-full h-11 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold px-3 text-white appearance-none outline-none focus:ring-0  cursor-pointer">
                                <option>PROTEIN SYNTHESIS</option>
                                <option>FAT OXIDATION</option>
                                <option>GLYCOGEN REPLENISHMENT</option>
                            </select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDesignModalOpen(false)} className="text-[10px] font-bold  text-muted-foreground opacity-40 hover:opacity-100">Cancel</Button>
                        <Button className="h-11 px-8 rounded-xl text-[10px] font-bold silver-gradient text-black ">Confirm Design</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function CheckCircle2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
