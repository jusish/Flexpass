"use client";

import React, { useState } from "react";
import {
    MapPin,
    Search,
    Filter,
    Plus,
    Building2,
    Zap,
    TrendingUp,
    Globe,
    ShieldCheck,
    HeartPulse,
    ExternalLink,
    Stethoscope,
    Activity
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

const partnersData = [
    { id: "HUB-001", name: "Global Med Center", type: "Clinical Hub", location: "Nyarutarama, Kigali", consults: 48, status: "Active Node" },
    { id: "HUB-002", name: "Waka Fitness HQ", type: "Wellness Node", location: "Kacyiru, Kigali", consults: 24, status: "Active Node" },
    { id: "HUB-003", name: "Legacy Clinics", type: "Medical Center", location: "Kimironko, Kigali", consults: 0, status: "Pending Audit" },
];

export default function NutritionistPartners() {
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Partners</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Your network of medical centers and clinics</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-semibold tracking-wide rounded-xl hover:bg-white/10">
                        <Globe className="w-4 h-4 mr-2" /> View Directory
                    </Button>
                    <Button
                        onClick={() => setIsLinkModalOpen(true)}
                        className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Link Partner
                    </Button>
                </div>
            </div>

            {/* Hub Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Linked Centers", val: "8 Centers", sub: "Verified integrations", icon: Stethoscope, color: "text-emerald-500" },
                    { label: "Network Activity", val: "72.4%", sub: "Service utilization rate", icon: Activity, color: "text-indigo-500" },
                    { label: "Service Areas", val: "3 Areas", sub: "Regional clinic coverage", icon: MapPin, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-40 mt-3 font-medium">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Registry Table */}
            <div className="space-y-5">
                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    <Input
                        placeholder="Search for a clinic..."
                        className="h-11 bg-white/5 border-white/5 rounded-xl pl-11 text-xs font-medium focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 ">Partner Clinic</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 ">Facility Type</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-center ">Consultations</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right pr-8 ">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {partnersData.map((node, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/20 transition-all shadow-inner">
                                                <Building2 className="w-4 h-4 text-emerald-400 opacity-60 group-hover:opacity-100" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{node.name}</h4>
                                                <p className="text-[10px] text-muted-foreground opacity-40 font-medium tracking-tight">ID: {node.id} • {node.location}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-[11px] font-bold text-white/90">{node.type}</p>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <p className="text-xs font-bold text-white">{node.consults}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground opacity-40  tracking-tight">Sessions Logged</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5">
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                node.status === "Active Node" ? "bg-emerald-500 shadow-sm" :
                                                    node.status === "Pending Audit" ? "bg-amber-500 shadow-sm" : "bg-rose-500 shadow-sm"
                                            )} />
                                            <span className={cn(
                                                "text-[10px] font-bold tracking-wide ",
                                                node.status === "Active Node" ? "text-emerald-400" :
                                                    node.status === "Pending Audit" ? "text-amber-400" : "text-rose-400"
                                            )}>{node.status === "Active Node" ? "Active" : node.status === "Pending Audit" ? "Pending" : node.status}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Link Clinic Modal */}
            <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Link Partner Clinic</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Request a connection with a medical facility to synchronize data.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 pt-6">
                        <div className="space-y-2">
                            <Label className="text-[11px] font-semibold  tracking-wider opacity-70 ml-1">Clinic ID or Name</Label>
                            <Input placeholder="Enter medical facility details..." className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium px-4 w-full" />
                        </div>

                        <div className="bg-white/5 rounded-xl p-5 border border-white/5 space-y-3">
                            <h4 className="text-[11px] font-bold text-white flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security Standards
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed opacity-60">
                                Connecting to a clinical hub enables secure synchronization of client datasets. Data privacy remains our top priority.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button variant="ghost" onClick={() => setIsLinkModalOpen(false)} className="h-11 text-xs font-bold px-6">Cancel</Button>
                        <Button onClick={() => setIsLinkModalOpen(false)} className="h-11 px-8 rounded-xl text-xs font-bold silver-gradient text-black">
                            Send Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
