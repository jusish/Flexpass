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
    HeartPulse,
    Apple,
    Globe
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

const nutritionistsData = [
    { id: "NUT-001", name: "Dr. Sarah L.", specialty: "Clinical Nutrition", programs: 24, rating: 4.9, status: "Active", revenue: 1240000, joined: "Oct 2025" },
    { id: "NUT-002", name: "Marc K.", specialty: "Sport Nutritionist", programs: 18, rating: 4.8, status: "Active", revenue: 680000, joined: "Jan 2026" },
];

export default function AdminNutritionists() {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Nutritionist Global Network</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50 uppercase tracking-widest mt-1">Strategic Wellness Officers & Clinical Performance nodes</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all uppercase">
                        <Download className="w-4 h-4 mr-2" /> Global Audit
                    </Button>
                    <Button 
                        onClick={() => setIsInviteModalOpen(true)}
                        className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5 uppercase"
                    >
                        <UserPlus className="w-4 h-4 mr-2" /> Invite Officer
                    </Button>
                </div>
            </div>

            {/* Global Insight Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Clinical Staff", value: "24 Nodes", trend: "High Impact", icon: Globe, color: "text-emerald-500" },
                    { label: "Plan Yield (MTD)", value: "RWF 3.8M", trend: "Steady Flow", icon: TrendingUp, color: "text-indigo-500" },
                    { label: "Active Programs", value: "112", trend: "+5% Weekly", icon: Apple, color: "text-amber-500" },
                    { label: "Audit Flags", value: "0 Protocols", trend: "None detected", icon: ShieldCheck, color: "text-sky-500" },
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

            {/* Table */}
            <div className="space-y-6">
                <div className="relative group w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 transition-all" />
                    <Input 
                        placeholder="Search officer by name, ID or clinical protocol..." 
                        className="h-12 bg-black/40 border-white/5 rounded-2xl pl-12 text-[11px] font-bold focus:ring-1 focus:ring-white/10 transition-all font-sans tracking-wide"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 uppercase">Identity Node</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Clinical Domain</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-center">Programs</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase text-right">Aggregate Yield</TableHead>
                                <TableHead className="text-[10px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10 uppercase">Global Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {nutritionistsData.map((nut, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-[10px] text-emerald-500 shadow-inner uppercase">
                                                {nut.name.slice(0, 2)}
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">{nut.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest uppercase">{nut.id} • Joined {nut.joined}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-[10px] font-bold text-muted-foreground opacity-60 tracking-widest uppercase">{nut.specialty}</p>
                                    </TableCell>
                                    <TableCell className="text-center font-black text-xs text-white">
                                        {nut.programs}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-xs font-black text-white italic tracking-tighter">RWF {nut.revenue.toLocaleString()}</p>
                                        <Badge variant="outline" className="text-[7px] font-black border-white/5 mt-1 opacity-40 uppercase">Metabolic Compliance Verified</Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-white/2">
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                nut.status === "Active" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-amber-500"
                                            )} />
                                            <span className={cn(
                                                "text-[9px] font-black tracking-widest uppercase",
                                                nut.status === "Active" ? "text-emerald-500" : "text-amber-500"
                                            )}>{nut.status}</span>
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
                        <DialogTitle className="text-2xl font-black tracking-tighter text-white uppercase italic">
                            Invite Wellness Officer
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-muted-foreground opacity-50 uppercase tracking-widest">
                            Authorize new clinical node for metabolic protocol distribution
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-8 space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40 uppercase ml-1">Officer Identity</Label>
                                <Input placeholder="e.g. Dr. Sarah" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40 uppercase ml-1">Secure Email</Label>
                                <Input placeholder="sarah@clinic.com" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40 uppercase ml-1">Clinical Specialization</Label>
                            <Input placeholder="e.g. Metabolic Strategy / Pediatric Nutrition" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 w-full" />
                        </div>

                        <div className="bg-white/5 rounded-[20px] p-6 border border-white/5 space-y-3">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Administrative Protocol
                            </h4>
                            <p className="text-[9px] text-muted-foreground font-semibold opacity-60 leading-relaxed uppercase tracking-wider italic">
                                Registration will initiate identity verification flow. Access to sensitive metabolic datasets will be restricted until full node authorization is established.
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
