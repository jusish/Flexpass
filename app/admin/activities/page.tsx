"use client";

import React, { useState } from "react";
import { 
    Users, 
    Building2, 
    CreditCard, 
    TrendingUp, 
    Activity as ActivityIcon, 
    MoreVertical,
    Search,
    Filter,
    Plus,
    Download,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Globe,
    Zap,
    MapPin,
    Dumbbell,
    Waves,
    Sparkles,
    Trophy,
    ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { DateRangeFilter } from "@/components/admin/date-filter";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const activitiesData = [
    { 
        id: "act-gym",
        name: "Fitness & Gym", 
        description: "Standard weightlifting, cardio, and general fitness facilities.",
        partnerCount: 45,
        totalVisits: 12450,
        revenue: 24800000,
        growth: "+14.2%",
        status: "High Demand",
        icon: Dumbbell,
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10"
    },
    { 
        id: "act-swim",
        name: "Swimming Pools", 
        description: "Olympic and leisure pools with professional coaching options.",
        partnerCount: 18,
        totalVisits: 5620,
        revenue: 84000000,
        growth: "+1.8%",
        status: "Stable",
        icon: Waves,
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10"
    },
    { 
        id: "act-spa",
        name: "Spa & Wellness", 
        description: "Massages, saunas, and holistic wellness treatments.",
        partnerCount: 12,
        totalVisits: 2100,
        revenue: 12500000,
        growth: "+22.5%",
        status: "Premium",
        icon: Sparkles,
        color: "text-rose-500",
        bgColor: "bg-rose-500/10"
    },
    { 
        id: "act-sports",
        name: "Sports Clubs", 
        description: "Tennis, basketball, and other organized sports facilities.",
        partnerCount: 37,
        totalVisits: 8900,
        revenue: 15600000,
        growth: "+5.4%",
        status: "Active",
        icon: Trophy,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10"
    },
    { 
        id: "act-yoga",
        name: "Yoga & Pilates", 
        description: "Mindfulness and flexibility sessions for all levels.",
        partnerCount: 22,
        totalVisits: 4300,
        revenue: 9200000,
        growth: "+18.2%",
        status: "Growing",
        icon: ActivityIcon,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
    },
];

export default function ActivityManagement() {
    const router = useRouter();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Activity Ecosystem</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-widest opacity-50 uppercase mt-1">Classification Matrix & Financial Performance</p>
                </div>
                <div className="flex gap-3">
                    <DateRangeFilter />
                    <Button variant="outline" size="sm" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100 transition-all">
                        <Download className="w-4 h-4 mr-2" /> Global Report
                    </Button>
                    <Button 
                        size="sm" 
                        className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Define Activity
                    </Button>
                </div>
            </div>

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activitiesData.map((activity, i) => (
                    <Card 
                        key={i} 
                        className="glass-dark border-white/5 rounded-3xl satin-card relative overflow-hidden group cursor-pointer hover:border-white/10 transition-all flex flex-col p-8"
                        onClick={() => router.push(`/admin/activities/${activity.id}`)}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className={cn("p-4 rounded-2xl border border-white/5 shadow-inner transition-transform group-hover:scale-110", activity.bgColor, activity.color)}>
                                <activity.icon className="w-6 h-6" />
                            </div>
                            <div className="text-right">
                                <span className={cn(
                                    "text-[9px] font-black tracking-widest px-2.5 py-1 rounded-lg border",
                                    activity.growth.includes("+") ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-rose-500 border-rose-500/20 bg-rose-500/10"
                                )}>
                                    {activity.growth} GROWTH
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2 grow">
                            <h3 className="text-xl font-black text-white tracking-tight">{activity.name}</h3>
                            <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed opacity-50">{activity.description}</p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-1">Partners</p>
                                <p className="text-lg font-black text-white">{activity.partnerCount}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-1">Visits</p>
                                <p className="text-lg font-black text-white">{activity.totalVisits.toLocaleString()}</p>
                            </div>
                            <div className="col-span-2 pt-2 border-t border-white/2">
                                <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-1">Gross Ecosystem GMV</p>
                                <p className="text-xl font-black text-white">RWF {activity.revenue.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            <Badge variant="outline" className="text-[8px] font-black tracking-widest border-white/5 opacity-40">
                                {activity.status.toUpperCase()}
                            </Badge>
                            <div className="flex items-center gap-2 text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                DETAILS <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Summary Insights */}
            <Card className="glass-dark p-10 border-white/5 rounded-3xl satin-card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h4 className="text-[10px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-4">Market Saturation</h4>
                        <div className="space-y-6">
                            {activitiesData.slice(0, 3).map((act, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black tracking-widest">
                                        <span className="text-white">{act.name}</span>
                                        <span className="text-muted-foreground opacity-40">{Math.round((act.partnerCount / 112) * 100)}%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(act.partnerCount / 112) * 100}%` }}
                                            className={cn("h-full", act.color.replace("text-", "bg-"))}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center text-center border-x border-white/5 px-10">
                        <div className="p-4 bg-white/5 rounded-full mb-4">
                            <Zap className="w-8 h-8 text-indigo-500" />
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tighter">134</h3>
                        <p className="text-[10px] font-bold text-muted-foreground opacity-40 uppercase tracking-widest mt-1">Total Active Offerings</p>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-4">Revenue Velocity</h4>
                        <div className="space-y-4">
                            {activitiesData.map((act, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-2 h-2 rounded-full", act.color.replace("text-", "bg-"))} />
                                        <span className="text-[11px] font-bold text-white">{act.name}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-500 tracking-tighter">{act.growth}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Modal - Define Activity */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="max-w-xl bg-black/90 border-white/10 backdrop-blur-2xl rounded-3xl satin-card">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                            Define Platform Activity
                        </DialogTitle>
                        <DialogDescription className="text-[11px] font-semibold opacity-50 uppercase tracking-widest">
                            Technical Metadata Configuration & Global Ecosystem Tagging
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 py-8 px-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1 uppercase">Activity Classification Name</Label>
                            <div className="relative">
                                <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                                <Input placeholder="e.g. Mixed Martial Arts (MMA)" className="pl-12 bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1 uppercase">Service Scope Description</Label>
                            <textarea className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-white outline-none focus:bg-white/10 transition-all resize-none" placeholder="Elaborate on the service parameters and authorized facility requirements..." />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1 uppercase">Base Category</Label>
                            <Select>
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all">
                                    <SelectValue placeholder="Select Sector" />
                                </SelectTrigger>
                                <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl">
                                    <SelectItem value="fitness" className="text-[11px] font-bold">Fitness & Body</SelectItem>
                                    <SelectItem value="wellness" className="text-[11px] font-bold">Wellness & Mind</SelectItem>
                                    <SelectItem value="sports" className="text-[11px] font-bold">Competitive Sports</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1 uppercase">Market Priority</Label>
                            <Select defaultValue="normal">
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all">
                                    <SelectValue placeholder="Priority Tier" />
                                </SelectTrigger>
                                <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl">
                                    <SelectItem value="high" className="text-[11px] font-bold">Emergency High Demand</SelectItem>
                                    <SelectItem value="normal" className="text-[11px] font-bold">Standard Ecosystem</SelectItem>
                                    <SelectItem value="beta" className="text-[11px] font-bold">Beta / Pilot Phase</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="gap-3 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="h-12 border-glow-silver text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                            DISCARD SEED
                        </Button>
                        <Button onClick={() => setIsAddModalOpen(false)} className="h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-glow-silver silver-gradient text-black">
                            DEPLOY ACTIVITY NODE
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
