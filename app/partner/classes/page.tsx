"use client";

import React, { useState } from "react";
import {
    Zap,
    Calendar,
    Users,
    TrendingUp,
    Plus,
    Clock,
    ShieldCheck,
    MoreVertical,
    Search,
    Download,
    Star,
    ArrowUpRight,
    ClipboardList,
    LucideIcon
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

const classesData = [
    { id: "CLS-001", name: "HIIT Intensity Night", coach: "Jean Pierre", activity: "Gym & Fitness", time: "06:30 PM", cap: 20, booked: 18, yield: 36000, status: "Active" },
    { id: "CLS-002", name: "Aqua Strength", coach: "Sarah Mutoni", activity: "Swimming", time: "08:00 AM", cap: 12, booked: 12, yield: 24000, status: "Full" },
    { id: "CLS-003", name: "Zen Yoga Protocol", coach: "Sarah Mutoni", activity: "Wellness", time: "10:00 AM", cap: 15, booked: 5, yield: 10000, status: "Booking" },
];

export default function PartnerClasses() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Class Infrastructure</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50  tracking-widest mt-1">Operational Session Nodes, Capacity Management & Revenue Logs</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all ">
                        <Download className="w-4 h-4 mr-2" /> Class Yield Report
                    </Button>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5 "
                    >
                        <Plus className="w-4 h-4 mr-2" /> Define New Session
                    </Button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Nodes", value: "24 / week", sub: "Operational classes", icon: Zap, color: "text-indigo-500" },
                    { label: "Booking Density", value: "84%", sub: "Average fill rate", icon: Users, color: "text-emerald-500" },
                    { label: "Aggr. Performance", value: "RWF 580k", sub: "Weekly projected yield", icon: TrendingUp, color: "text-amber-500" },
                    { label: "Instructor Staff", value: "3 Active", sub: "Linked professionals", icon: ShieldCheck, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-30  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold ">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Classes Registry */}
            <div className="space-y-6">
                <div className="relative group w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 transition-all" />
                    <Input
                        placeholder="Scan for session by name, coach or activity..."
                        className="h-12 bg-black/40 border-white/5 rounded-2xl pl-12 text-[11px] font-bold focus:ring-1 focus:ring-white/10 transition-all font-sans tracking-wide"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 ">Session Module</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Professional Node</TableHead>
                                <TableHead className="text-[10px] font-black tracking-widest text-muted-foreground h-16 text-center ">Capacity Load</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right ">Node Yield</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10 ">Ingress Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classesData.map((cls, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner">
                                                <Zap className="w-4 h-4 text-indigo-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-black text-white  tracking-widest group-hover:text-glow-silver transition-all">{cls.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest ">{cls.activity} • {cls.time}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-white  tracking-widest">{cls.coach}</span>
                                            <span className="text-[8px] text-muted-foreground opacity-40  tracking-widest mt-1">Authorized Professional</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <p className="text-xs font-black text-white">{cls.booked} / {cls.cap}</p>
                                        <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden mx-auto max-w-[80px]">
                                            <div className="h-full bg-indigo-500" style={{ width: `${(cls.booked / cls.cap) * 100}%` }} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-xs font-black text-white">RWF {cls.yield.toLocaleString()}</p>
                                        <p className="text-[8px] font-bold text-emerald-500 opacity-60  tracking-widest mt-1">+8% Trend</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-white/2">
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                cls.status === "Full" ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "bg-emerald-500"
                                            )} />
                                            <span className={cn(
                                                "text-[9px] font-black tracking-widest ",
                                                cls.status === "Full" ? "text-rose-500" : "text-emerald-500"
                                            )}>{cls.status}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Create Class Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="max-w-2xl bg-black/95 border-white/10 backdrop-blur-3xl rounded-[40px] satin-card sm:p-12">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black tracking-tighter text-white ">
                            Operational Class Protocol
                        </DialogTitle>
                        <DialogDescription className="text-[11px] font-bold text-muted-foreground opacity-40  tracking-widest">
                            Configure node parameters for a new instructional session
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-10 space-y-10">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1">Service Denomination</Label>
                                <Input placeholder="e.g. Master Boxing Session" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1">Professional Node</Label>
                                <Select>
                                    <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6">
                                        <SelectValue placeholder="Identify Instructor" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black/95 border-white/10 backdrop-blur-3xl rounded-2xl p-2">
                                        <SelectItem value="jp" className="rounded-xl h-11 text-xs">JEAN PIERRE</SelectItem>
                                        <SelectItem value="sarah" className="rounded-xl h-11 text-xs">SARAH MUTONI</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1">Temporal Data (Time)</Label>
                                <Input type="time" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1">Aggregate Capacity</Label>
                                <Input type="number" placeholder="20" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1">Service Surcharge</Label>
                                <Input type="number" placeholder="RWF" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-[24px] p-8 border border-white/5 space-y-4">
                            <h4 className="text-[11px] font-black text-white  tracking-widest flex items-center gap-3">
                                <ClipboardList className="w-5 h-5 text-indigo-500" /> Administrative Audit
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-semibold opacity-60 leading-relaxed  tracking-widest">
                                Sessions will be listed across both the Partner Node and the Coach Terminal. Cancellations within 2 hours of execution will initiate a protocol audit.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-4 sm:gap-0 pt-4">
                        <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="h-16 flex-1 text-muted-foreground text-[10px] font-black  tracking-widest border border-white/5 rounded-2xl">
                            ABORT
                        </Button>
                        <Button onClick={() => setIsCreateModalOpen(false)} className="h-16 flex-2 rounded-2xl text-[10px] font-black  tracking-[0.2em] silver-gradient text-black shadow-2xl shadow-white/5">
                            AUTHORIZE PROTOCOL
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
