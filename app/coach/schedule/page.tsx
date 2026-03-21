"use client";

import React, { useState } from "react";
import {
    Calendar,
    Clock,
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Users,
    Activity,
    CheckCircle2,
    Filter,
    ArrowUpRight,
    LucideIcon
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const SCHEDULE_DATA = [
    { day: "Monday", items: [{ time: "08:00 AM", name: "HIIT Blast", location: "Waka Fitness HQ", capacity: "12/20" }, { time: "05:00 PM", name: "Personal Training", location: "Waka Fitness HQ", capacity: "1/1" }] },
    { day: "Tuesday", items: [{ time: "10:30 AM", name: "Strength Work", location: "Cercle Sportif", capacity: "8/15" }] },
    { day: "Wednesday", items: [{ time: "08:00 AM", name: "HIIT Blast", location: "Waka Fitness HQ", capacity: "15/20" }] },
    { day: "Thursday", items: [{ time: "10:30 AM", name: "Strength Work", location: "Cercle Sportif", capacity: "10/15" }] },
    { day: "Friday", items: [{ time: "08:00 AM", name: "HIIT Blast", location: "Waka Fitness HQ", capacity: "18/20" }] },
];

export default function CoachSchedule() {
    const [isAvailModalOpen, setIsAvailModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"Weekly" | "Monthly">("Weekly");

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Schedule</h1>
                    <p className="text-muted-foreground text-xs opacity-50 font-medium">
                        Manage your sessions, availability, and weekly sequences
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setIsAvailModalOpen(true)}
                        className="h-10 px-5 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Set Availability
                    </Button>
                </div>
            </div>

            {/* Top Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Hours", val: "24.5 Hours", sub: "This week", icon: Clock, color: "text-indigo-500" },
                    { label: "Total Capacity", val: "84%", sub: "Average occupancy", icon: Users, color: "text-emerald-500" },
                    { label: "Usage Growth", val: "+12.4%", sub: "Vs last month", icon: Activity, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-2 rounded-lg bg-white/5 border border-white/5", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground  opacity-40 mb-1 font-sans">{stat.label}</p>
                        <h4 className="text-xl font-bold text-white mb-1">{stat.val}</h4>
                        <p className="text-[9px] text-muted-foreground opacity-30 font-bold  tracking-widest">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Calendar Controls */}
            <Card className="glass-dark border-white/5 rounded-2xl p-6 sm:p-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-white">March 2026</h3>
                        </div>
                        <div className="flex gap-1.5">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-white/5 bg-white/5 transition-all hover:bg-white/10">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-white/5 bg-white/5 transition-all hover:bg-white/10">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 h-10 w-full md:w-auto">
                        {["Weekly", "Monthly"].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode as any)}
                                className={cn(
                                    "flex-1 md:px-6 rounded-lg text-[10px] font-bold  tracking-widest transition-all",
                                    viewMode === mode ? "bg-white/5 text-white" : "text-muted-foreground opacity-40 hover:opacity-100"
                                )}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Calendar Grid (Responsive) */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {DAYS.map((day) => {
                        const dayItems = SCHEDULE_DATA.find(s => s.day === day)?.items || [];
                        return (
                            <div key={day} className="space-y-4">
                                <div className="text-center py-3 border-b border-white/5 mb-2 bg-white/2 rounded-t-xl">
                                    <span className="text-[10px] font-bold text-muted-foreground  opacity-40 tracking-wider font-sans">{day.slice(0, 3)}</span>
                                </div>
                                <div className="min-h-[140px] space-y-3">
                                    {dayItems.length > 0 ? dayItems.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 bg-white/5 border border-white/5 rounded-2xl group transition-all hover:bg-white/10 hover:border-white/10 cursor-pointer"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge variant="outline" className="text-[8px] font-bold border-none bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-lg">{item.time}</Badge>
                                            </div>
                                            <p className="text-xs font-bold text-white mb-2 leading-snug">{item.name}</p>
                                            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/5">
                                                <div className="flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
                                                    <MapPin className="w-2.5 h-2.5" />
                                                    <p className="text-[8px] font-bold  truncate">{item.location}</p>
                                                </div>
                                                <div className="flex justify-between items-center opacity-40 group-hover:opacity-100">
                                                    <span className="text-[8px] font-bold ">Reserved</span>
                                                    <span className="text-[10px] font-bold text-white">{item.capacity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="h-full min-h-[120px] w-full border border-dashed border-white/5 rounded-2xl flex items-center justify-center opacity-10">
                                            <span className="text-[9px] font-bold  tracking-wider">Free</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Set Availability Modal */}
            <Dialog open={isAvailModalOpen} onOpenChange={setIsAvailModalOpen}>
                <DialogContent className="glass-dark border-white/10 max-w-md rounded-2xl p-0 overflow-hidden">
                    <div className="p-8 pb-4 border-b border-white/5">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-white">Availability Settings</DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground font-medium mt-1">Configure your working hours for sessions.</DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-muted-foreground  opacity-40 ml-1">Active Day</label>
                                <Select>
                                    <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-bold  tracking-widest">
                                        <SelectValue placeholder="Select Day" />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10">
                                        {DAYS.map(d => <SelectItem key={d} value={d} className="text-xs font-bold  tracking-widest">{d}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-muted-foreground  opacity-40 ml-1">Branch Hub</label>
                                <Select>
                                    <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-bold  tracking-widest">
                                        <SelectValue placeholder="Select Hub" />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10">
                                        <SelectItem value="waka" className="text-xs font-bold  tracking-widest">Waka HQ</SelectItem>
                                        <SelectItem value="cercle" className="text-xs font-bold  tracking-widest">Cercle Sportif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-muted-foreground  opacity-40 ml-1">Start Time</label>
                                <Input type="time" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-muted-foreground  opacity-40 ml-1">End Time</label>
                                <Input type="time" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-bold" />
                            </div>
                        </div>

                        <div className="bg-emerald-500/5 rounded-2xl p-6 border border-emerald-500/10 flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-emerald-500/80 font-medium leading-relaxed">
                                Updates will be immediately reflected in the member booking interface across all nodes.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 bg-white/2 border-t border-white/5 flex gap-3">
                        <Button variant="ghost" onClick={() => setIsAvailModalOpen(false)} className="flex-1 h-12 text-xs font-bold  opacity-50">Discard</Button>
                        <Button onClick={() => setIsAvailModalOpen(false)} className="flex-1 h-12 rounded-xl text-xs font-bold  silver-gradient text-black tracking-widest">
                            Confirm Hours
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
