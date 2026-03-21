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
    HeartPulse,
    Utensils,
    Apple
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
    { day: "Monday", items: [{ time: "09:00 AM", name: "Consultation", patient: "Alice Mukana", type: "Clinical" }, { time: "02:00 PM", name: "Meal Review", patient: "Group A", type: "General" }] },
    { day: "Tuesday", items: [{ time: "11:00 AM", name: "Dietary Check", patient: "Marc Kagabo", type: "Clinical" }] },
    { day: "Wednesday", items: [{ time: "09:00 AM", name: "Weight Check", patient: "Cédric Gasana", type: "Clinical" }] },
    { day: "Thursday", items: [{ time: "10:00 AM", name: "Hydration Review", patient: "Dative Umutoni", type: "Clinical" }, { time: "03:30 PM", name: "Plan Update", patient: "Group B", type: "General" }] },
    { day: "Friday", items: [{ time: "09:00 AM", name: "Consultation", patient: "Eric Shema", type: "Clinical" }] },
];

export default function NutritionistSchedule() {
    const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"Weekly" | "Monthly">("Weekly");

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Patient Schedule</h1>
                    <p className="text-muted-foreground text-xs opacity-50 font-medium tracking-wide">
                        Manage patient appointments and clinical availability
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setIsConsultModalOpen(true)}
                        className="h-10 px-5 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Book Consultation
                    </Button>
                </div>
            </div>

            {/* Top Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Booked Sessions", val: "12 Sessions", sub: "For this week", icon: Calendar, color: "text-indigo-500" },
                    { label: "Avg Duration", val: "45 Mins", sub: "Per consultation", icon: Clock, color: "text-emerald-500" },
                    { label: "Attendance Rate", val: "94.2%", sub: "Successful visits", icon: Activity, color: "text-amber-500" },
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

            {/* Calendar Grid Section */}
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
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 h-10 w-full md:w-auto overflow-hidden">
                        {["Weekly", "Monthly"].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode as any)}
                                className={cn(
                                    "px-8 rounded-lg text-[10px] font-bold  tracking-widest transition-all",
                                    viewMode === mode ? "bg-white/10 text-white" : "text-muted-foreground opacity-40 hover:opacity-100"
                                )}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

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
                                            <div className="flex justify-between items-start mb-3">
                                                <Badge variant="outline" className={cn(
                                                    "text-[8px] font-bold border-none px-2 py-0.5 rounded-lg  tracking-tight font-sans",
                                                    item.type === "Clinical" ? "bg-emerald-500/10 text-emerald-500" : "bg-white/10 text-white/40"
                                                )}>{item.time}</Badge>
                                            </div>
                                            <p className="text-xs font-bold text-white mb-2 leading-snug">{item.name}</p>
                                            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/5">
                                                <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                    <Users className="w-3 h-3 text-indigo-400" />
                                                    <p className="text-[9px] font-bold  tracking-tight truncate border-b border-white/10">{item.patient}</p>
                                                </div>
                                                <div className="mt-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 -translate-x-1">
                                                    <span className="text-[8px] font-bold  text-emerald-500 tracking-widest">View Patient</span>
                                                    <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="h-full min-h-[120px] w-full border border-dashed border-white/5 rounded-2xl flex items-center justify-center py-10 opacity-10">
                                            <span className="text-[9px] font-bold  tracking-widest">Off Registry</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Book Consultation Modal */}
            <Dialog open={isConsultModalOpen} onOpenChange={setIsConsultModalOpen}>
                <DialogContent className="glass-dark border-white/10 max-w-md rounded-3xl p-0 overflow-hidden shadow-2xl">
                    <div className="p-8 pb-4 border-b border-white/5">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-white">Schedule Appointment</DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground font-medium mt-1">Book a new clinical session for your patient.</DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-muted-foreground  opacity-40 ml-1">Patient Search</label>
                            <div className="relative group">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-20 group-focus-within:opacity-100 transition-all" />
                                <Input placeholder="Type patient name or identification..." className="h-12 bg-white/5 border-white/10 rounded-xl pl-11 text-xs font-bold  tracking-widest outline-none ring-0 focus-visible:ring-1 focus-visible:ring-indigo-500/30" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-muted-foreground  opacity-40 ml-1">Effective Date</label>
                                <Input type="date" className="bg-white/5 border-white/10 rounded-xl h-12 text-xs font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-muted-foreground  opacity-40 ml-1">Time Slot</label>
                                <Input type="time" className="bg-white/5 border-white/10 rounded-xl h-12 text-xs font-bold" />
                            </div>
                        </div>

                        <div className="bg-indigo-500/5 rounded-2xl p-6 border border-indigo-500/10 flex items-center gap-5">
                            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 shadow-inner">
                                <Apple className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-indigo-500/70 font-medium leading-relaxed">
                                Automated confirmation notifications will be dispatched across the FlexPass network once booked.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 bg-white/2 border-t border-white/5 flex gap-4">
                        <Button variant="ghost" onClick={() => setIsConsultModalOpen(false)} className="flex-1 h-12 text-xs font-bold  opacity-50 font-sans tracking-widest">Discard</Button>
                        <Button onClick={() => setIsConsultModalOpen(false)} className="flex-1 h-12 rounded-xl text-xs font-bold  silver-gradient text-black font-sans tracking-widest">
                            Confirm Appointment
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
