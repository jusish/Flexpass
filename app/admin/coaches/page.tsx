"use client";

import React, { useState } from "react";
import { 
    Users, 
    Zap, 
    TrendingUp, 
    Plus, 
    Download, 
    Search, 
    Filter,
    ShieldCheck,
    Mail,
    Phone,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    UserPlus,
    Dumbbell
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

const coachesData = [
    { id: "COA-001", name: "Jean Pierre", specialty: "HIIT & Strength", sessions: 142, rating: 4.9, status: "Active", revenue: 840000, joined: "Oct 2025" },
    { id: "COA-002", name: "Sarah Mutoni", specialty: "Yoga Flow", sessions: 88, rating: 4.8, status: "Active", revenue: 420000, joined: "Nov 2025" },
    { id: "COA-003", name: "David Kalisa", specialty: "Boxing", sessions: 0, rating: 0, status: "Pending Invite", revenue: 0, joined: "Mar 2026" },
];

export default function AdminCoaches() {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Coach Network</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50 uppercase tracking-widest mt-1">Independent Professional Node Registry & Yield Audit</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all uppercase">
                        <Download className="w-4 h-4 mr-2" /> Global Audit
                    </Button>
                    <Button 
                        onClick={() => setIsInviteModalOpen(true)}
                        className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5 uppercase"
                    >
                        <UserPlus className="w-4 h-4 mr-2" /> Invite Professional
                    </Button>
                </div>
            </div>

            {/* Global Insight Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Professionals", value: "42", trend: "Master Level", icon: ShieldCheck, color: "text-indigo-500" },
                    { label: "Session Capacity", value: "1.2k / mo", trend: "High Load", icon: Zap, color: "text-emerald-500" },
                    { label: "Network Yield", value: "RWF 12.4M", trend: "+15% MoM", icon: TrendingUp, color: "text-amber-500" },
                    { label: "Pending nodes", value: "8", trend: "Verifying credentials", icon: Clock, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-30 uppercase mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold uppercase">{stat.trend}</p>
                    </Card>
                ))}
            </div>

            {/* Filters & Table */}
            <div className="space-y-6">
                <div className="relative group w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 transition-all" />
                    <Input 
                        placeholder="Locate professional by name, ID or discipline..." 
                        className="h-12 bg-black/40 border-white/5 rounded-2xl pl-12 text-[11px] font-bold focus:ring-1 focus:ring-white/10 transition-all font-sans tracking-wide"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 uppercase">Identity Node</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Discipline</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-center">Sessions</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-right">Aggregate Yield</TableHead>
                                <TableHead className="text-[10px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10 uppercase">Auth Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coachesData.map((coach, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-[10px] text-white shadow-inner uppercase">
                                                {coach.name.slice(0, 2)}
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{coach.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest uppercase">{coach.id} • Joined {coach.joined}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-[10px] font-bold text-white tracking-widest uppercase">{coach.specialty}</p>
                                    </TableCell>
                                    <TableCell className="text-center font-black text-xs text-white">
                                        {coach.sessions}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-xs font-black text-white">RWF {coach.revenue.toLocaleString()}</p>
                                        <Badge variant="outline" className="text-[7px] font-black border-white/5 mt-1 opacity-40 uppercase">System Audited</Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-white/2">
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                coach.status === "Active" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-amber-500"
                                            )} />
                                            <span className={cn(
                                                "text-[9px] font-black tracking-widest uppercase",
                                                coach.status === "Active" ? "text-emerald-500" : "text-amber-500"
                                            )}>{coach.status}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Invite Modal */}
            <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
                <DialogContent className="max-w-xl bg-black/95 border-white/10 backdrop-blur-3xl rounded-[32px] satin-card sm:p-10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                            Invite Professional Node
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-muted-foreground opacity-50 uppercase tracking-widest">
                            Issue temporary credentials to an independent service provider
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-8 space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40 uppercase ml-1">Full Identity</Label>
                                <Input placeholder="e.g. Jean Pierre" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40 uppercase ml-1">Contact Email</Label>
                                <Input placeholder="jp@provider.com" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40 uppercase ml-1">Service Discipline</Label>
                            <Input placeholder="e.g. HIIT Specialist / Wellness Consultant" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                        </div>

                        <div className="bg-white/5 rounded-[20px] p-6 border border-white/5 space-y-3">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-indigo-500" /> Security Protocol
                            </h4>
                            <p className="text-[9px] text-muted-foreground font-semibold opacity-60 leading-relaxed uppercase tracking-wider">
                                A temporary encrypted password will be generated and dispatched. The provider will be required to establish a permanent credential node upon initial ingress.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-4 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsInviteModalOpen(false)} className="h-14 flex-1 text-muted-foreground text-[10px] font-black uppercase tracking-widest border border-white/5 rounded-2xl">
                            ABORT
                        </Button>
                        <Button onClick={() => setIsInviteModalOpen(false)} className="h-14 flex-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] silver-gradient text-black shadow-2xl shadow-white/5">
                            DISPATCH INVITE
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
