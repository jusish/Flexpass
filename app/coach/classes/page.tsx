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
    LucideIcon,
    Dumbbell,
    Play,
    Edit3
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
    { id: "CLS-001", name: "Morning Blast HIITS", node: "Waka Fitness HQ", time: "08:00 AM", cap: 20, booked: 12, yield: 24000, status: "Active" },
    { id: "CLS-002", name: "Strength Protocol", node: "Cercle Sportif", time: "10:30 AM", cap: 15, booked: 8, yield: 16000, status: "Ready" },
    { id: "CLS-003", name: "Power Yoga Flow", node: "Mindful Zen", time: "02:00 PM", cap: 15, booked: 15, yield: 30000, status: "Fully Operational" },
    { id: "CLS-004", name: "Evening Cardio Burn", node: "Waka Fitness HQ", time: "05:00 PM", cap: 12, booked: 6, yield: 12000, status: "Active" },
];

export default function CoachClasses() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Classes</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Manage your training sessions and facility utilization</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-semibold tracking-wide rounded-xl hover:bg-white/10 hover:border-white/20">
                        <Download className="w-4 h-4 mr-2" /> Export Report
                    </Button>
                    <Button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Create Class
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Classes", val: "24", sub: "Scheduled this week", icon: Zap, color: "text-indigo-500" },
                    { label: "Booking Density", val: "84%", sub: "Avg occupancy rate", icon: Users, color: "text-emerald-500" },
                    { label: "Estimated Yield", val: "RWF 320k", sub: "Monthly projection", icon: TrendingUp, color: "text-amber-500" },
                    { label: "Floor Time", val: "18h", sub: "Total instructional hours", icon: Clock, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40 uppercase mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-40 mt-3 font-medium">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Classes Registry */}
            <div className="space-y-5">
                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    <Input 
                        placeholder="Search sessions..." 
                        className="h-11 bg-white/5 border-white/5 rounded-xl pl-11 text-xs font-medium focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 uppercase">Session Details</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Facility Node</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase text-center">Attendance</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right uppercase">Net Yield</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right pr-8 uppercase">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classesData.map((cls, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-bold text-xs text-muted-foreground group-hover:border-primary/20 transition-all">
                                                <Dumbbell className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{cls.name}</h4>
                                                <p className="text-[10px] text-muted-foreground opacity-40 font-medium tracking-tight">ID: {cls.id} • {cls.time}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
                                            <span className="text-[11px] font-medium text-muted-foreground">{cls.node}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <p className="text-xs font-bold text-white">{cls.booked} / {cls.cap}</p>
                                            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500" style={{ width: `${(cls.booked / cls.cap) * 100}%` }} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-xs font-bold text-white">RWF {cls.yield.toLocaleString()}</p>
                                        <p className="text-[9px] font-bold text-emerald-500 opacity-60 tracking-tight mt-0.5">Revenue Locked</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5">
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                cls.status === "Fully Operational" ? "bg-amber-500" : 
                                                cls.status === "Ready" ? "bg-sky-500" : "bg-emerald-500"
                                            )} />
                                            <span className={cn(
                                                "text-[10px] font-bold tracking-wide uppercase",
                                                cls.status === "Fully Operational" ? "text-amber-500" :
                                                cls.status === "Ready" ? "text-sky-500" : "text-emerald-500"
                                            )}>{cls.status}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Create Session Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Define Session</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Set up a new class session at a facility.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Session Name</Label>
                            <Input placeholder="e.g. Morning Blast HIITS" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Facility Hub</Label>
                                <Select>
                                    <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-medium">
                                        <SelectValue placeholder="Select Hub" />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10">
                                        <SelectItem value="waka" className="text-xs">Waka Fitness HQ</SelectItem>
                                        <SelectItem value="cercle" className="text-xs">Cercle Sportif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Capacity</Label>
                                <Input type="number" placeholder="20" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-3">
                            <h4 className="text-[11px] font-bold text-white flex items-center gap-2">
                                <ClipboardList className="w-4 h-4 text-indigo-400" /> Session Audit
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed opacity-60">
                                This session will be visible for bookings immediately after creation. All participants will be tracked for yield computation.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="h-11 text-xs font-bold px-6">Cancel</Button>
                        <Button onClick={() => setIsCreateModalOpen(false)} className="h-11 px-8 rounded-xl text-xs font-bold border-glow">
                            Create Session
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
