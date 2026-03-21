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
    ArrowRight,
    SlidersHorizontal,
    Box
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
import { DataFilterModal } from "@/components/admin/data-filter-modal";
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
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Activity Ecosystem</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-widest opacity-50 uppercase mt-1">Classification Matrix • Financial Performance • Entity Distribution</p>
                </div>
                <div className="flex gap-3">
                    <DataFilterModal title="Ecosystem Protocols" description="Configure activity classification and performance registry parameters.">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase opacity-40 ml-1">Archive period</label>
                                <DateRangeFilter />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase opacity-40 ml-1">Classification node</label>
                                <Select defaultValue="all">
                                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-bold px-4">
                                        <SelectValue placeholder="Protocol category" />
                                    </SelectTrigger>
                                    <SelectContent className="glass-dark border-white/10 rounded-xl">
                                        <SelectItem value="all" className="text-[10px] font-bold">All Activity Nodes</SelectItem>
                                        <SelectItem value="fitness" className="text-[10px] font-bold">Fitness & Body Units</SelectItem>
                                        <SelectItem value="wellness" className="text-[10px] font-bold">Wellness & Mind Units</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </DataFilterModal>

                    <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl uppercase">
                        <Download className="w-4 h-4 mr-2" /> Global node audit
                    </Button>
                    <Button
                        className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black uppercase active:scale-95 shadow-xl shadow-white/5"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Define activity node
                    </Button>
                </div>
            </div>

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activitiesData.map((activity, i) => (
                    <Card
                        key={i}
                        className="glass-dark border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden group cursor-pointer hover:border-white/10 transition-all flex flex-col p-10 bg-linear-to-br from-white/3 to-transparent shadow-xl"
                        onClick={() => router.push(`/admin/activities/${activity.id}`)}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 blur-[50px] group-hover:bg-white/5 transition-all" />
                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <div className={cn("p-4 rounded-2xl border border-white/5 shadow-inner transition-transform group-hover:scale-110", activity.bgColor, activity.color)}>
                                <activity.icon className="w-6 h-6" />
                            </div>
                            <div className="text-right">
                                <Badge variant="outline" className={cn(
                                    "text-[9px] font-black tracking-widest px-3 py-1 rounded-lg border-none",
                                    activity.growth.includes("+") ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                                )}>
                                    {activity.growth} GROWTH
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-2 grow relative z-10">
                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-glow-silver transition-all">{activity.name}</h3>
                            <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed opacity-40 uppercase tracking-widest mt-2">{activity.description}</p>
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/5 grid grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-[0.2em] font-sans">Entity Nodes</p>
                                <p className="text-xl font-black text-white tabular-nums font-sans">{activity.partnerCount}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-[0.2em] font-sans">Participation</p>
                                <p className="text-xl font-black text-white tabular-nums font-sans">{activity.totalVisits.toLocaleString()}</p>
                            </div>
                            <div className="col-span-2 pt-4 border-t border-white/2 space-y-1">
                                <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-[0.2em] font-sans">Gross Ecosystem GMV</p>
                                <p className="text-2xl font-black text-white tabular-nums font-sans group-hover:text-indigo-400 transition-colors">RWF {activity.revenue.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center justify-between relative z-10">
                            <Badge variant="outline" className="text-[8px] font-black tracking-widest border-white/10 bg-white/5 text-muted-foreground opacity-60 uppercase px-3 py-1 rounded-lg">
                                {activity.status}
                            </Badge>
                            <div className="flex items-center gap-2 text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 tracking-widest">
                                INSPECT NODE <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Summary Insights */}
            <Card className="glass-dark p-12 border-white/5 rounded-[2.5rem] satin-card relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/2 to-transparent" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                    <div>
                        <h4 className="text-[10px] font-black text-muted-foreground opacity-40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Box className="w-3.5 h-3.5 text-indigo-500" /> Market Saturation
                        </h4>
                        <div className="space-y-8">
                            {activitiesData.slice(0, 3).map((act, i) => (
                                <div key={i} className="space-y-3 group cursor-help">
                                    <div className="flex justify-between text-[11px] font-black tracking-widest uppercase">
                                        <span className="text-white opacity-60 group-hover:opacity-100 transition-opacity">{act.name}</span>
                                        <span className="text-indigo-400 tabular-nums">{Math.round((act.partnerCount / 112) * 100)}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(act.partnerCount / 112) * 100}%` }}
                                            className={cn("h-full shadow-[0_0_10px_rgba(255,255,255,0.2)]", act.color.replace("text-", "bg-"))}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center text-center border-x border-white/5 px-10 relative group">
                        <div className="absolute inset-0 bg-indigo-500/1 blur-2xl rounded-full group-hover:bg-indigo-500/3 transition-all" />                        
                        <div className="p-5 bg-white/5 rounded-2xl mb-6 relative z-10 border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                            <Zap className="w-8 h-8 text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                        </div>
                        <h3 className="text-5xl font-black text-white tracking-tighter tabular-nums relative z-10 group-hover:text-glow-silver transition-all">134</h3>
                        <p className="text-[10px] font-black text-muted-foreground opacity-40 uppercase tracking-[0.2em] mt-3 relative z-10">Total active node offerings</p>
                    </div>

                    <div className="font-sans">
                        <h4 className="text-[10px] font-black text-muted-foreground opacity-40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Revenue Velocity
                        </h4>
                        <div className="space-y-6">
                            {activitiesData.map((act, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-help">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-2.5 h-2.5 rounded-full shadow-lg", act.color.replace("text-", "bg-"))} />
                                        <span className="text-[11px] font-black text-white/50 uppercase tracking-widest group-hover:text-white transition-opacity">{act.name}</span>
                                    </div>
                                    <span className="text-[11px] font-black text-emerald-500 tracking-widest tabular-nums">{act.growth}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Modal - Define Activity */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="max-w-2xl glass-dark border-white/10 rounded-[2.5rem] p-12 satin-card shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                    <DialogHeader className="space-y-2 mb-10">
                        <DialogTitle className="text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                <Box className="w-6 h-6 text-indigo-400" />
                            </div>
                            Define activity node
                        </DialogTitle>
                        <DialogDescription className="text-[11px] font-black opacity-40 uppercase tracking-[0.2em] mt-2">
                            Technical configuration matrix • Global ecosystem tagging registry
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 py-2">
                        <div className="space-y-4 md:col-span-2">
                            <Label className="text-[10px] font-black text-muted-foreground tracking-[0.2em] opacity-40 ml-1 uppercase">Activity classification identity</Label>
                            <div className="relative group">
                                <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 opacity-40 group-focus-within:opacity-100 transition-all font-sans" />
                                <Input placeholder="e.g. Mixed Martial Arts (MMA)" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-14 text-[12px] font-bold tracking-tight text-white focus:bg-white/10 focus:ring-1 focus:ring-white/10 transition-all uppercase placeholder:opacity-30" />
                            </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <Label className="text-[10px] font-black text-muted-foreground tracking-[0.2em] opacity-40 ml-1 uppercase">Operational scope protocol</Label>
                            <textarea className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-[12px] font-bold text-white outline-none focus:bg-white/10 focus:ring-1 focus:ring-white/10 transition-all resize-none font-sans placeholder:opacity-30" placeholder="Elaborate on the service parameters and authorized facility requirements for this node classification..." />
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black text-muted-foreground tracking-[0.2em] opacity-40 ml-1 uppercase">Base taxonomy</Label>
                            <Select>
                                <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl text-[12px] font-bold px-6 text-white focus:ring-1 focus:ring-white/10">
                                    <SelectValue placeholder="Protocol Sector" />
                                </SelectTrigger>
                                <SelectContent className="glass-dark border-white/10 rounded-2xl font-sans">
                                    <SelectItem value="fitness" className="text-[12px] font-bold uppercase">Fitness & Body Architecture</SelectItem>
                                    <SelectItem value="wellness" className="text-[12px] font-bold uppercase">Wellness & Mind Flow</SelectItem>
                                    <SelectItem value="sports" className="text-[12px] font-bold uppercase">Competitive Node Network</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black text-muted-foreground tracking-[0.2em] opacity-40 ml-1 uppercase">Network Priority</Label>
                            <Select defaultValue="normal">
                                <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl text-[12px] font-bold px-6 text-white focus:ring-1 focus:ring-white/10">
                                    <SelectValue placeholder="Protocol Tier" />
                                </SelectTrigger>
                                <SelectContent className="glass-dark border-white/10 rounded-2xl font-sans">
                                    <SelectItem value="high" className="text-[12px] font-bold uppercase">Emergency Demand</SelectItem>
                                    <SelectItem value="normal" className="text-[12px] font-bold uppercase">Standard Ecosystem</SelectItem>
                                    <SelectItem value="beta" className="text-[12px] font-bold uppercase">Beta Calibration</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="mt-12 flex items-center gap-4">
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="h-14 flex-1 rounded-2xl text-[10px] font-black text-muted-foreground opacity-40 hover:opacity-100 hover:text-white uppercase tracking-[0.2em] border border-white/10">
                            DISCARD SEED
                        </Button>
                        <Button onClick={() => setIsAddModalOpen(false)} className="h-14 flex-[1.5] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] silver-gradient text-black shadow-xl shadow-white/5 active:scale-95 transition-transform">
                            DEPLOY ACTIVITY NODE
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
