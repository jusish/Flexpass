"use client";

import React from "react";
import { 
    Users, 
    Building2, 
    CreditCard, 
    TrendingUp, 
    ArrowUpRight, 
    Clock, 
    Activity, 
    MoreVertical,
    Search,
    Filter,
    Plus,
    Download,
    CheckCircle2,
    XCircle,
    AlertCircle,
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
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const partnersData = [
    { 
        id: "PRT-001",
        name: "Waka Fitness", 
        category: "Fitness & Gym",
        location: "Kigali CBD",
        status: "Active",
        visits: 1240, 
        settlement: 5580000, 
        lastVisit: "2 mins ago",
        tier: "Platinum"
    },
    { 
        id: "PRT-002",
        name: "Cercle Sportif", 
        category: "Sports Club",
        location: "Rugunga",
        status: "Active",
        visits: 890, 
        settlement: 4005000, 
        lastVisit: "15 mins ago",
        tier: "Gold"
    },
    { 
        id: "PRT-003",
        name: "Mindful Yoga", 
        category: "Wellness",
        location: "Nyatarama",
        status: "Review",
        visits: 450, 
        settlement: 2025000, 
        lastVisit: "1 hour ago",
        tier: "Silver"
    },
    { 
        id: "PRT-004",
        name: "Kigali Arena Gym", 
        category: "Fitness & Gym",
        location: "Remera",
        status: "Active",
        visits: 2100, 
        settlement: 9450000, 
        lastVisit: "Just now",
        tier: "Platinum"
    },
    { 
        id: "PRT-005",
        name: "Aero Health Club", 
        category: "Sports Club",
        location: "Kanombe",
        status: "Suspended",
        visits: 0, 
        settlement: 0, 
        lastVisit: "3 days ago",
        tier: "Gold"
    },
];

export default function PartnerManagement() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Partner Node Registry</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Global venue oversight, operational health, and real-time settlement tracking</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100 transition-all">
                        <Download className="w-4 h-4 mr-2" /> Node Report
                    </Button>
                    <Button size="sm" className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5">
                        <Plus className="w-4 h-4 mr-2" /> Register New Node
                    </Button>
                </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Revenue Nodes", value: "112", trend: "+4 this month", icon: Building2, color: "text-indigo-500" },
                    { label: "Pending Settlements", value: "RWF 32.4M", trend: "18 nodes ready", icon: CreditCard, color: "text-amber-500" },
                    { label: "System Uptime", value: "99.98%", trend: "Global terminal health", icon: Activity, color: "text-emerald-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-8 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-3 bg-white/5 rounded-2xl border border-white/5 shadow-inner", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-black tracking-widest text-muted-foreground opacity-40">{stat.trend}</span>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-widest opacity-40 mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                    </Card>
                ))}
            </div>

            {/* Filters & Table */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative group w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 transition-all" />
                        <Input 
                            placeholder="Search partners by name, ID or location..." 
                            className="h-12 bg-black/40 border-white/5 rounded-2xl pl-12 text-[11px] font-bold focus:ring-1 focus:ring-white/10 transition-all font-sans tracking-wide"
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-12 rounded-2xl px-6 border-white/5 text-[10px] font-bold tracking-widest opacity-60">
                            <Filter className="w-4 h-4 mr-2 opacity-60" /> Advanced Filter
                        </Button>
                    </div>
                </div>

                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10">Partner Entity & ID</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16">Classification</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16">Operational Status</TableHead>
                                <TableHead className="text-[10px] font-black tracking-widest text-muted-foreground h-16 text-center">Volume (Vits)</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right">Settlement Index</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {partnersData.map((partner, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-xs text-white group-hover:border-primary/20 transition-all shadow-inner">
                                                {partner.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-white tracking-widest group-hover:text-glow-silver transition-all">{partner.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest">{partner.id} • {partner.location}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-white tracking-widest">{partner.category}</p>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-[7px] font-black border-white/5 opacity-40 px-1.5 py-0">{partner.tier}</Badge>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {partner.status === "Active" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                                            {partner.status === "Review" && <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
                                            {partner.status === "Suspended" && <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                                            <span className={cn(
                                                "text-[9px] font-black tracking-widest",
                                                partner.status === "Active" ? "text-emerald-500" :
                                                partner.status === "Review" ? "text-amber-500" : "text-rose-500"
                                            )}>{partner.status}</span>
                                        </div>
                                        <p className="text-[8px] text-muted-foreground opacity-30 font-bold mt-1 tracking-widest">Last Activity: {partner.lastVisit}</p>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <p className="text-xs font-black text-white tracking-tighter">{partner.visits.toLocaleString()}</p>
                                        <p className="text-[8px] text-muted-foreground opacity-30 font-black tracking-widest">Sessions</p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-xs font-black text-white tracking-tighter">RWF {partner.settlement.toLocaleString()}</p>
                                        <div className="flex items-center justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <TrendingUp className="w-2 h-2 text-emerald-500" />
                                            <p className="text-[8px] text-emerald-500 font-bold">+12%</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/5 opacity-40 hover:opacity-100 transition-all">
                                            <MoreVertical className="w-4 h-4 text-secondary" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="h-20 bg-white/2 flex items-center justify-center border-t border-white/5">
                        <Button variant="ghost" className="text-[9px] font-black tracking-widest opacity-40 hover:opacity-100 transition-all">
                            Load Consolidated Partner Registry (All 112 Nodes)
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
