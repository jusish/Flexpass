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
    HeartPulse,
    ClipboardList,
    ShieldCheck
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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const scheduleItems = [
    { day: "MON", items: [{ time: "09:00 AM", name: "Marie Jeanne", location: "Global Med" }, { time: "11:30 AM", name: "Marc Twagira", location: "Waka HQ" }] },
    { day: "WED", items: [{ time: "02:00 PM", name: "Alice Umutoni", location: "Clinic B" }] },
    { day: "THU", items: [{ time: "04:00 PM", name: "Paul Kagabo", location: "Arena HP" }] },
];

export default function NutritionistSchedule() {
    const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Schedule</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Manage your consultations and professional availability</p>
                </div>
                <div className="flex gap-3">
                    <Button 
                        onClick={() => setIsConsultModalOpen(true)}
                        className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Book Consultation
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Calendar View */}
                <Card className="lg:col-span-3 glass-dark p-8 border-white/5 rounded-3xl satin-card">
                    <div className="flex items-center justify-between mb-10">
                         <div className="flex items-center gap-5">
                            <h3 className="text-xl font-bold text-white tracking-tight font-sans">March 2026</h3>
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
                            <Button variant="ghost" className="h-9 px-5 rounded-lg text-[10px] font-bold text-white bg-white/10 tracking-wider">WEEKLY</Button>
                            <Button variant="ghost" className="h-9 px-5 rounded-lg text-[10px] font-bold text-muted-foreground tracking-wider opacity-60 hover:opacity-100">MONTHLY</Button>
                        </div>
                    </div>

                     <div className="grid grid-cols-7 gap-4">
                        {days.map((day) => (
                            <div key={day} className="space-y-5">
                                <div className="text-center py-2 border-b border-white/5">
                                    <span className="text-[10px] font-bold text-muted-foreground opacity-50 tracking-widest">{day}</span>
                                </div>
                                <div className="space-y-3 min-h-[450px]">
                                    {scheduleItems.find(s => s.day === day)?.items.map((item, idx) => (
                                        <motion.div 
                                            key={idx}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2.5 cursor-pointer group hover:border-primary/20 transition-all"
                                        >
                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline" className="text-[8px] font-bold border-none bg-emerald-500/10 text-emerald-400 uppercase px-1.5 py-0.5 rounded-md">{item.time}</Badge>
                                                <HeartPulse className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">{item.name}</p>
                                                <div className="flex items-center gap-1.5 mt-1 opacity-40">
                                                    <MapPin className="w-2.5 h-2.5" />
                                                    <p className="text-[9px] font-medium uppercase tracking-tight">{item.location}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                 {/* Stats & Next */}
                <div className="space-y-6">
                    <Card className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                         <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-5 border-b border-white/10 pb-3">Next Consultation</h3>
                         <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-white tracking-wide">Marie Jeanne</p>
                                    <p className="text-[10px] text-muted-foreground opacity-60 font-medium mt-0.5">Today • 09:00 AM</p>
                                </div>
                            </div>
                             <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                                <p className="text-[9px] font-bold text-muted-foreground opacity-40 uppercase tracking-tight">Location</p>
                                <p className="text-[10px] font-bold text-white uppercase tracking-wide">Global Med Center</p>
                            </div>
                            <Button className="w-full h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest silver-gradient text-black">START CONSULTATION</Button>
                        </div>
                    </Card>

                    <Card className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-5 border-b border-white/10 pb-3">Weekly Stats</h3>
                        <div className="space-y-5">
                             {[
                                { label: "Weekly Sessions", val: "12 / week", icon: Activity },
                                { label: "Client Growth", val: "Steady", icon: Users },
                                { label: "Record Accuracy", val: "100%", icon: ShieldCheck },
                             ].map((m, i) => (
                                 <div key={i} className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <m.icon className="w-4 h-4 text-emerald-400 opacity-60" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] font-bold text-muted-foreground opacity-40 uppercase tracking-tight">{m.label}</p>
                                        <p className="text-xs font-bold text-white uppercase tracking-wide">{m.val}</p>
                                    </div>
                                 </div>
                             ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Consultation Modal */}
            <Dialog open={isConsultModalOpen} onOpenChange={setIsConsultModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold tracking-tight">Book Consultation</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Schedule a time and location for a client consultation.
                        </DialogDescription>
                    </DialogHeader>

                     <div className="space-y-6 pt-6">
                        <div className="grid grid-cols-2 gap-5">
                             <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Client Name</Label>
                                <Select>
                                    <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-medium">
                                        <SelectValue placeholder="Select Client" />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10">
                                        <SelectItem value="marie" className="text-xs">Marie Jeanne</SelectItem>
                                        <SelectItem value="marc" className="text-xs">Marc Twagira</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Location</Label>
                                <Select>
                                    <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-medium">
                                        <SelectValue placeholder="Select Location" />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10">
                                        <SelectItem value="global" className="text-xs">Global Med Center</SelectItem>
                                        <SelectItem value="waka" className="text-xs">Waka Fitness HQ</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                         <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Start Time</Label>
                                <Input type="time" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium px-4 w-full" />
                            </div>
                             <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Duration</Label>
                                <Input placeholder="45 MIN" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium px-4 w-full uppercase" />
                            </div>
                        </div>

                         <div className="bg-white/5 rounded-xl p-5 border border-white/5 space-y-3">
                            <h4 className="text-[11px] font-bold text-white flex items-center gap-2">
                                <ClipboardList className="w-4 h-4 text-emerald-400" /> Scheduling Policy
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed opacity-60">
                                Sessions are logged for quality assurance. Cancellations should be made at least 2 hours in advance to avoid rescheduling fees.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button variant="ghost" onClick={() => setIsConsultModalOpen(false)} className="h-11 text-xs font-bold px-6">Cancel</Button>
                        <Button onClick={() => setIsConsultModalOpen(false)} className="h-11 px-8 rounded-xl text-xs font-bold silver-gradient text-black">
                            Save Appointment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
