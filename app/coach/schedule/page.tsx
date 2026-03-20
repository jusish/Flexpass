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
    CheckCircle2
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
import { motion } from "framer-motion";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const scheduleItems = [
    { day: "MON", items: [{ time: "08:00 AM", name: "HIIT Blast", location: "Waka HQ" }, { time: "05:00 PM", name: "Cardio", location: "Waka HQ" }] },
    { day: "TUE", items: [{ time: "10:30 AM", name: "Strength", location: "Cercle" }] },
    { day: "WED", items: [{ time: "08:00 AM", name: "HIIT Blast", location: "Waka HQ" }] },
    { day: "THU", items: [{ time: "10:30 AM", name: "Strength", location: "Cercle" }, { time: "02:00 PM", name: "Yoga Flow", location: "Mindful Zen" }] },
    { day: "FRI", items: [{ time: "08:00 AM", name: "HIIT Blast", location: "Waka HQ" }] },
];

export default function CoachSchedule() {
    const [isAvailModalOpen, setIsAvailModalOpen] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Schedule</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Manage your weekly training sessions and availability</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={() => setIsAvailModalOpen(true)}
                        className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Set Availability
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Calendar View */}
                <Card className="lg:col-span-3 glass-dark p-8 border-white/5 rounded-3xl satin-card">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl font-bold text-white tracking-tight">March 2026</h3>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border border-white/5 hover:bg-white/5">
                                    <ChevronLeft className="w-4 h-4 text-white" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border border-white/5 hover:bg-white/5">
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                            <Button variant="ghost" className="h-9 px-4 rounded-lg text-xs font-bold text-white bg-white/10">Weekly</Button>
                            <Button variant="ghost" className="h-9 px-4 rounded-lg text-xs font-bold text-muted-foreground opacity-50 hover:opacity-100">Monthly</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {days.map((day) => (
                            <div key={day} className="space-y-5">
                                <div className="text-center py-2 border-b border-white/5">
                                    <span className="text-[10px] font-bold text-muted-foreground opacity-40 uppercase tracking-widest">{day}</span>
                                </div>
                                <div className="space-y-4 min-h-[450px]">
                                    {scheduleItems.find(s => s.day === day)?.items.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-3 cursor-pointer group hover:border-indigo-500/20 shadow-lg transition-all"
                                        >
                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline" className="text-[9px] font-bold border-none bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md uppercase">{item.time}</Badge>
                                                <Activity className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-white/90 leading-tight">{item.name}</p>
                                                <div className="flex items-center gap-1.5 mt-1.5 opacity-40">
                                                    <MapPin className="w-2.5 h-2.5 text-muted-foreground" />
                                                    <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-tight">{item.location}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Logistics */}
                <div className="space-y-6">
                    <Card className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                        <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-5 border-b border-white/10 pb-3 font-sans">Next Up</h3>
                        <div className="space-y-5">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-white/90">HIIT Blast Session</p>
                                    <p className="text-[10px] text-muted-foreground opacity-50 mt-0.5">Tomorrow • 8:00 AM</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2.5">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-muted-foreground opacity-40 uppercase">Booked</span>
                                    <span className="text-[10px] font-bold text-white">12 / 20</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500" style={{ width: "60%" }} />
                                </div>
                            </div>
                            <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-bold tracking-wide bg-white/5 border-white/5 hover:bg-white/10">View Session List</Button>
                        </div>
                    </Card>

                    <Card className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                        <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-5 border-b border-white/10 pb-3 font-sans">Quick Metrics</h3>
                        <div className="space-y-5">
                            {[
                                { label: "Total Load", val: "18.5 hrs", icon: Clock },
                                { label: "Utilization", val: "84.2%", icon: Activity },
                                { label: "Growth", val: "+12.4%", icon: Plus },
                            ].map((m, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                        <m.icon className="w-3.5 h-3.5 text-indigo-400/50" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] font-medium text-muted-foreground opacity-50 uppercase tracking-tight">{m.label}</p>
                                        <p className="text-xs font-bold text-white/90">{m.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Availability Modal */}
            <Dialog open={isAvailModalOpen} onOpenChange={setIsAvailModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Set Availability</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Configure your working hours for the selected day.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Day of Week</Label>
                                <Select>
                                    <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-medium">
                                        <SelectValue placeholder="Select Day" />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10">
                                        {days.map(d => <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Location Hub</Label>
                                <Select>
                                    <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-medium">
                                        <SelectValue placeholder="Facility" />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10">
                                        <SelectItem value="waka" className="text-xs">Waka Fitness HQ</SelectItem>
                                        <SelectItem value="cercle" className="text-xs">Cercle Sportif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Start Time</Label>
                                <Input type="time" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">End Time</Label>
                                <Input type="time" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-3">
                            <h4 className="text-[11px] font-bold text-white flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-indigo-400" /> Operational Update
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed opacity-60">
                                Updating these slots will immediately affect member booking options. Any overlaps will be highlighted.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button variant="ghost" onClick={() => setIsAvailModalOpen(false)} className="h-11 text-xs font-bold px-6">Cancel</Button>
                        <Button onClick={() => setIsAvailModalOpen(false)} className="h-11 px-8 rounded-xl text-xs font-bold border-glow">
                            Save Availability
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
