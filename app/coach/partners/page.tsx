"use client";

import React, { useState } from "react";
import { 
    MapPin, 
    Search, 
    Filter, 
    Plus, 
    Download, 
    MoreVertical, 
    Zap, 
    TrendingUp, 
    ArrowUpRight,
    Building2,
    ShieldCheck,
    Globe,
    ExternalLink
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
    { id: "NODE-001", name: "Waka Fitness HQ", type: "Gym & Sports", location: "Kacyiru, Kigali", sessions: 24, status: "Active Node" },
    { id: "NODE-002", name: "Cercle Sportif", type: "Tennis & Swimming", location: "Kiyovu, Kigali", sessions: 12, status: "Active Node" },
    { id: "NODE-003", name: "Mindful Zen", type: "Wellness Spa", location: "Kimi, Kigali", sessions: 6, status: "Pending Audit" },
    { id: "NODE-004", name: "Arena High Perf", type: "Elite Gym", location: "Kimihurura, Kigali", sessions: 0, status: "Disconnected" },
];

export default function CoachPartners() {
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Partners</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Connected gyms and training facilities</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-semibold tracking-wide rounded-xl hover:bg-white/10 hover:border-white/20">
                        <Globe className="w-4 h-4 mr-2" /> Map View
                    </Button>
                    <Button 
                        onClick={() => setIsLinkModalOpen(true)}
                        className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Connect Facility
                    </Button>
                </div>
            </div>

            {/* Network Insight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Partners", val: "12 Hubs", sub: "Verified facilities", icon: Building2, color: "text-indigo-500" },
                    { label: "Utilization", val: "84.2%", sub: "Avg booking density", icon: Zap, color: "text-emerald-500" },
                    { label: "Coverage", val: "4 Areas", sub: "Kigali distribution", icon: MapPin, color: "text-amber-500" },
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

            {/* Partner Registry Table */}
            <div className="space-y-5">
                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    <Input 
                        placeholder="Search partners..." 
                        className="h-11 bg-white/5 border-white/5 rounded-xl pl-11 text-xs font-medium focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 uppercase">Facility Name</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Category</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Location</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-center uppercase">Classes</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right pr-8 uppercase">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {partnersData.map((node, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-bold text-xs text-muted-foreground group-hover:border-primary/20 transition-all">
                                                <Building2 className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{node.name}</h4>
                                                <p className="text-[10px] text-muted-foreground opacity-40 font-medium tracking-tight">ID: {node.id}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-[11px] font-medium text-white/90">{node.type}</p>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3 text-muted-foreground opacity-40" />
                                            <span className="text-[11px] font-medium text-muted-foreground">{node.location}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <p className="text-xs font-bold text-white">{node.sessions}</p>
                                        <p className="text-[9px] font-medium text-muted-foreground opacity-40 tracking-tight mt-0.5">Sessions / Wk</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5">
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                node.status === "Active Node" ? "bg-emerald-500" : 
                                                node.status === "Pending Audit" ? "bg-amber-500" : "bg-rose-500"
                                            )} />
                                            <span className={cn(
                                                "text-[10px] font-bold tracking-wide uppercase",
                                                node.status === "Active Node" ? "text-emerald-500" :
                                                node.status === "Pending Audit" ? "text-amber-500" : "text-rose-500"
                                            )}>{node.status === "Active Node" ? "Active" : node.status === "Pending Audit" ? "Pending" : "Hidden"}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Link Node Modal */}
            <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Connect Facility</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Request authorization to use a facility for your classes.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Search Facility</Label>
                            <Input placeholder="Enter facility name or ID..." className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                        </div>
                        
                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-3">
                            <h4 className="text-[11px] font-bold text-white flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-indigo-400" /> Connecting Protocol
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed opacity-60">
                                Connecting to a facility allows you to schedule sessions within their infrastructure. All activity will be audited for compliance.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button variant="ghost" onClick={() => setIsLinkModalOpen(false)} className="h-11 text-xs font-bold px-6">Cancel</Button>
                        <Button onClick={() => setIsLinkModalOpen(false)} className="h-11 px-8 rounded-xl text-xs font-bold border-glow">
                            Request Access
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
