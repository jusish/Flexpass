"use client";

import React, { useState } from "react";
import { 
    Users, 
    Zap, 
    ShieldCheck, 
    MoreVertical, 
    Search,
    UserPlus,
    Activity,
    Star,
    HeartPulse,
    Apple,
    Calendar,
    Clock
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
import { cn } from "@/lib/utils";

const teamData = [
    { id: "T-001", name: "Jean Pierre", role: "Master Coach", type: "Coach", sessions: 42, rating: 4.9, status: "Active" },
    { id: "T-002", name: "Sarah Mutoni", role: "Yoga Specialist", type: "Coach", sessions: 28, rating: 4.8, status: "Active" },
    { id: "T-003", name: "Dr. Sarah L.", role: "Clinical Lead", type: "Nutritionist", sessions: 15, rating: 4.9, status: "Active" },
];

export default function PartnerTeam() {
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Instructional Team</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50 uppercase tracking-widest mt-1">Authorized Independent Nodes serving this facility</p>
                </div>
                <div className="flex gap-3">
                    <Button 
                        onClick={() => setIsLinkModalOpen(true)}
                        className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5 uppercase"
                    >
                        <UserPlus className="w-4 h-4 mr-2" /> Connect Professional
                    </Button>
                </div>
            </div>

            {/* Insight Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Instructional Load", value: "3 Nodes", trend: "Fully Active", icon: ShieldCheck, color: "text-indigo-500" },
                    { label: "Weekly Capacity", value: "85 Sessions", trend: "Maxed out", icon: Calendar, color: "text-emerald-500" },
                    { label: "Team Rating", value: "4.9 / 5", trend: "Market Leading", icon: Star, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-30 uppercase mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold">{stat.trend}</p>
                    </Card>
                ))}
            </div>

            {/* Team Table */}
            <div className="space-y-6">
                <div className="relative group w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 transition-all" />
                    <Input 
                        placeholder="Filter team by name, specialty or type..." 
                        className="h-12 bg-black/40 border-white/5 rounded-2xl pl-12 text-[11px] font-bold focus:ring-1 focus:ring-white/10 transition-all font-sans tracking-wide"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 uppercase">Member Identity</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Clinical/Sport Role</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-center">Unit Load</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-right pr-10">Service Index</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamData.map((member, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-[10px] text-white shadow-inner transition-transform group-hover:scale-110">
                                                {member.type === "Coach" ? <ShieldCheck className="w-4 h-4 text-indigo-500" /> : <HeartPulse className="w-4 h-4 text-emerald-500" />}
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{member.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest uppercase">{member.id} • {member.type.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-[10px] font-bold text-white tracking-widest uppercase">{member.role}</p>
                                    </TableCell>
                                    <TableCell className="text-center font-black text-xs text-white">
                                        {member.sessions} <span className="text-[8px] opacity-30 tracking-widest uppercase ml-1">UNITS / WK</span>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <div className="flex items-center justify-end gap-2 text-white font-black text-xs">
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            {member.rating}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Invite Modal */}
            <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
                <DialogContent className="max-w-xl bg-black/95 border-white/10 backdrop-blur-3xl rounded-[32px] satin-card sm:p-10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                            Link Professional Node
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-muted-foreground opacity-50 uppercase tracking-widest">
                            Authorized connection to independent flexpass service providers
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-8 space-y-6">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40 uppercase ml-1 font-sans">Provider Identity / ID</Label>
                            <Input placeholder="Enter Professional ID or Registered Email..." className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                        </div>

                        <div className="bg-white/5 rounded-[20px] p-6 border border-white/5 space-y-3">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-4 h-4 text-indigo-500" /> Connection Protocol
                            </h4>
                            <p className="text-[9px] text-muted-foreground font-semibold opacity-60 leading-relaxed uppercase tracking-wider">
                                By inviting a professional, you are authorizing them to schedule sessions using your facility nodes. All revenue distribution will be managed by the Flexpass Central Ledger.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-4 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsLinkModalOpen(false)} className="h-14 flex-1 text-muted-foreground text-[10px] font-black uppercase tracking-widest border border-white/5 rounded-2xl">
                            ABORT
                        </Button>
                        <Button onClick={() => setIsLinkModalOpen(false)} className="h-14 flex-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] silver-gradient text-black shadow-2xl shadow-white/5">
                            SEND CONNECTION REQUEST
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
