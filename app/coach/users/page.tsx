"use client";

import React, { useState } from "react";
import {
    Users,
    Search,
    Filter,
    Download,
    Plus,
    Activity,
    ShieldCheck,
    ArrowRight,
    SearchIcon,
    Zap,
    Building2,
    Calendar,
    Target
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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const clientsData = [
    { id: "MUID-001", name: "David Gatete", plan: "Elite Protocol", origin: "Waka Fitness", status: "Active", yield: 120000, avatar: "DG", tier: "Gold" },
    { id: "MUID-002", name: "Sarah Pierre", plan: "Basic Access", origin: "Bank of Kigali", status: "Active", yield: 45000, avatar: "SP", tier: "Platinum" },
    { id: "MUID-003", name: "Marc Kagabo", plan: "Elite Protocol", origin: "CIMERWA PLC", status: "Suspended", yield: 120000, avatar: "MK", tier: "Silver" },
    { id: "MUID-004", name: "Alice Umutoni", plan: "Protocol Alpha", origin: "Waka Fitness", status: "Active", yield: 85000, avatar: "AU", tier: "Platinum" },
];

export default function CoachUsers() {
    const router = useRouter();
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Personnel Registry</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Oversee and manage your active member portfolio and institutional enrollments</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-5 border-white/5 bg-white/5 text-xs font-semibold rounded-xl transition-all hover:bg-white/10">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                    <Button onClick={() => setIsEnrollModalOpen(true)} className="h-11 px-6 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest shadow-lg active:scale-95">
                        <Plus className="w-4 h-4 mr-2" /> Enroll Member
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Nodes", val: "84 Members", sub: "Operational load", icon: Users, color: "text-indigo-500" },
                    { label: "Compliance Index", val: "91.4%", sub: "Global performance", icon: ShieldCheck, color: "text-emerald-500" },
                    { label: "Institutional Delta", val: "+14%", sub: "Registry growth", icon: Activity, color: "text-amber-500" },
                    { label: "Service Score", val: "4.9/5", sub: "Net satisfaction", icon: Target, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-30 mt-3 font-medium">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative group flex-1">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all" />
                    <Input
                        placeholder="Search personnel registry..."
                        className="h-12 bg-black/40 border-white/5 rounded-xl pl-12 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/10 transition-all placeholder:opacity-30"
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-xs font-bold rounded-xl transition-all hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" /> Filter Registry
                </Button>
            </div>

            {/* Roster Table */}
            <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                            <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-16 pl-8 ">Active Personnel</TableHead>
                            <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-16 ">Institutional Origin / Corporate</TableHead>
                            <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-16 ">Clinical Status</TableHead>
                            <TableHead className="text-right text-[10px] font-bold tracking-widest text-muted-foreground h-16 ">Cycle Yield</TableHead>
                            <TableHead className="text-right pr-8 text-[10px] font-bold tracking-widest text-muted-foreground h-16 ">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clientsData.map((client) => (
                            <TableRow
                                key={client.id}
                                className="border-white/5 hover:bg-white/2 transition-all group cursor-pointer"
                                onClick={() => router.push(`/coach/users/${client.id}`)}
                            >
                                <TableCell className="pl-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-11 w-11 border border-white/5 p-0.5 ring-1 ring-white/10 shadow-lg transition-transform group-hover:scale-105">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${client.name}`} />
                                            <AvatarFallback className="bg-white/5 text-xs font-bold">{client.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white  tracking-tight group-hover:text-primary transition-colors">{client.name}</span>
                                            <span className="text-[10px] text-muted-foreground opacity-30 font-bold  tracking-widest mt-0.5">{client.id}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
                                            <Building2 className="w-3.5 h-3.5 text-white/30" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white  tracking-tight opacity-70">{client.origin}</span>
                                            <span className="text-[9px] text-muted-foreground opacity-30 font-bold  tracking-widest">Partner Node</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn(
                                        "text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-lg border-none ",
                                        client.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-white/40"
                                    )}>
                                        {client.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <span className="text-sm font-bold text-white tabular-nums tracking-tight">RWF {client.yield.toLocaleString()}</span>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0  tracking-widest">
                                        Audit Profile <ArrowRight className="h-4 w-4" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Dialog open={isEnrollModalOpen} onOpenChange={setIsEnrollModalOpen}>
                <DialogContent className="glass-dark border-white/10 max-w-md rounded-[2rem] p-10">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-2xl font-bold text-white  tracking-tight">Enroll New Member</DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-2">Provision a new personnel node into your training workspace.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 pt-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Member Identification</label>
                            <Input placeholder="E.G. DAVID GATETE" className="h-12 bg-white/5 border-white/5 rounded-xl text-xs font-bold  focus:ring-0 shadow-inner" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Designated Tier</label>
                                <div className="relative">
                                    <select className="w-full h-12 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold px-4 text-white appearance-none outline-none focus:ring-0  cursor-pointer">
                                        <option>ELITE PROTOCOL</option>
                                        <option>MASS YIELD</option>
                                        <option>PERFORMANCE ALPHA</option>
                                    </select>
                                    <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground opacity-30 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Origin Node</label>
                                <div className="relative">
                                    <select className="w-full h-12 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold px-4 text-white appearance-none outline-none focus:ring-0  cursor-pointer">
                                        <option>WAKA FITNESS</option>
                                        <option>BANK OF KIGALI</option>
                                        <option>INDEPENDENT</option>
                                    </select>
                                    <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground opacity-30 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-10 sm:justify-between items-center gap-4">
                        <Button variant="ghost" onClick={() => setIsEnrollModalOpen(false)} className="text-[10px] font-bold  tracking-widest text-muted-foreground opacity-40 hover:opacity-100 order-2 sm:order-1">Abort</Button>
                        <Button className="h-12 px-10 rounded-xl text-[10px] font-black silver-gradient text-black  tracking-widest order-1 sm:order-2 shadow-xl shadow-white/5">Initialize Sync</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
