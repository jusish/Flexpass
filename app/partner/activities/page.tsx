"use client";

import React, { useState } from "react";
import {
    Zap,
    Plus,
    TrendingUp,
    Users,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    Play,
    Pause,
    MoreVertical,
    Download,
    BarChart3
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
    SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const myActivities = [
    { id: "act-gym", name: "Fitness & Gym", status: "Active", dailyAvg: 45, visits: 1240, rev: "RWF 8.4M", color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
    { id: "act-swim", name: "Swimming Pool", status: "Active", dailyAvg: 12, visits: 350, rev: "RWF 1.2M", color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
    { id: "act-yoga", name: "Yoga & Pilates", status: "Paused", dailyAvg: 0, visits: 120, rev: "RWF 450k", color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
];

const availableGlobalActivities = [
    { id: "act-spa", name: "Spa & Wellness", icon: Zap },
    { id: "act-sports", name: "Sports Clubs", icon: Zap },
    { id: "act-mma", name: "Mixed Martial Arts", icon: Zap },
    { id: "act-dance", name: "Zumba & Dance", icon: Zap },
];

export default function PartnerActivityManagement() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Operations & Activities</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50  tracking-widest mt-1">Service Modules & Terminal Performance</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl">
                        <Download className="w-4 h-4 mr-2" /> DATA EXPORT
                    </Button>
                    <Button
                        className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" /> ACTIVATE SERVICE
                    </Button>
                </div>
            </div>

            {/* Stats Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Modules", value: "3", sub: "Currently offering", icon: Zap, color: "text-indigo-500" },
                    { label: "Daily Throughput", value: "57", sub: "Avg sessions / day", icon: Users, color: "text-emerald-500" },
                    { label: "Module Yield", value: "RWF 10.05M", sub: "Gross this month", icon: BarChart3, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-8 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 rounded-xl border border-white/5 shadow-inner transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-40 mb-1  text-glow-silver">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold ">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Activity Table */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black tracking-tighter text-white ">Operational Modules</h2>
                </div>

                <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 ">Activity Module</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Operational Status</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-center ">Daily Load</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right ">Module Yield</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pr-10"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {myActivities.map((activity, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner", activity.bgColor, activity.color)}>
                                                <Zap className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-black text-white  tracking-widest">{activity.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest ">MUID: {activity.id}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/2">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
                                                activity.status === "Active" ? "bg-emerald-500 shadow-emerald-500/50 animate-pulse" : "bg-rose-500 shadow-rose-500/50"
                                            )} />
                                            <span className={cn(
                                                "text-[9px] font-black tracking-widest ",
                                                activity.status === "Active" ? "text-emerald-500" : "text-rose-500"
                                            )}>{activity.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <p className="text-xs font-black text-white">{activity.dailyAvg}</p>
                                        <p className="text-[8px] font-black text-muted-foreground opacity-30 tracking-widest ">Sessions / Day</p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-xs font-black text-white">{activity.rev}</p>
                                        <div className="flex items-center justify-end gap-1 opacity-40">
                                            <TrendingUp className="w-2 h-2 text-emerald-500" />
                                            <p className="text-[8px] text-emerald-500 font-bold">+8%</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5">
                                                {activity.status === "Active" ? <Pause className="w-4 h-4 text-rose-500/60" /> : <Play className="w-4 h-4 text-emerald-500/60" />}
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5">
                                                <MoreVertical className="w-4 h-4 text-muted-foreground opacity-40" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Modal - Activate New Activity */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="max-w-xl bg-black/95 border-white/10 backdrop-blur-3xl rounded-3xl satin-card sm:p-10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                            Activate Service Module
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-muted-foreground opacity-50  tracking-widest">
                            Authorized activities from the global ecosystem
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-8 space-y-6">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1">Universal Service Node</Label>
                            <Select>
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all px-6">
                                    <SelectValue placeholder="Identify Activity Type..." />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10 backdrop-blur-3xl rounded-2xl p-2">
                                    {availableGlobalActivities.map((act) => (
                                        <SelectItem key={act.id} value={act.id} className="rounded-xl h-12 text-[11px] font-bold">
                                            <div className="flex items-center gap-3">
                                                <act.icon className="w-4 h-4 text-indigo-400" />
                                                {act.name.to()}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1">Projected Daily Cap</Label>
                                <input type="number" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-xs font-bold text-white outline-none focus:bg-white/10 transition-all" placeholder="e.g. 50" />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1">Module Pricing Level</Label>
                                <Select defaultValue="standard">
                                    <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all px-6">
                                        <SelectValue placeholder="Pricing Tier" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black/95 border-white/10 backdrop-blur-3xl rounded-2xl">
                                        <SelectItem value="standard" className="rounded-xl text-[10px] font-bold ">Standard Rate</SelectItem>
                                        <SelectItem value="premium" className="rounded-xl text-[10px] font-bold ">Premium Surcharge</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-3 sm:gap-0 pt-4">
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="h-14 flex-1 text-muted-foreground text-[10px] font-black  tracking-widest border border-white/5 rounded-2xl">
                            CANCEL
                        </Button>
                        <Button onClick={() => setIsAddModalOpen(false)} className="h-14 flex-2 rounded-2xl text-[10px] font-black  tracking-[0.2em] silver-gradient text-black">
                            ACTIVATE MODULE
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
