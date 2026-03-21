"use client";

import React, { useState } from "react";
import {
    Users,
    Download,
    UserPlus,
    Activity,
    ShieldCheck,
    Apple,
    ArrowRight,
    SearchIcon,
    Search,
    Filter,
    Stethoscope,
    HeartPulse,
    MapPin,
    Building2,
    DollarSign,
    Target,
    Zap
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
import { motion } from "framer-motion";

const clientsData = [
    { id: "MUID-001", name: "Sarah Pierre", program: "Keto Intensive", institution: "Waka Fitness", adherence: 94, status: "Active", avatar: "SP", tier: "Plan A" },
    { id: "MUID-002", name: "Marc Kagabo", program: "Elite Athlete Plan", institution: "MTN Rwanda", adherence: 88, status: "Active", avatar: "MK", tier: "Plan B" },
    { id: "MUID-003", name: "Alice Umutoni", program: "Metabolic Reset", institution: "Cercle Sportif", adherence: 0, status: "Pending", avatar: "AU", tier: "Plan A" },
    { id: "MUID-004", name: "Paul Munyaneza", program: "Weight Protocol", institution: "Bank of Kigali", adherence: 72, status: "Active", avatar: "PM", tier: "Plan C" },
];

export default function NutritionistUsers() {
    const router = useRouter();
    const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Client Portfolio</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Manage your clinical dietary protocols and monitor institutional client compliance</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-5 border-white/5 bg-white/5 text-xs font-semibold rounded-xl transition-all hover:bg-white/10">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                    <Button onClick={() => setIsAdmitModalOpen(true)} className="h-11 px-6 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest shadow-lg active:scale-95">
                        <UserPlus className="w-4 h-4 mr-2" /> Add Client
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Nodes", val: "84 Clients", sub: "Clinical load", icon: Users, color: "text-indigo-500" },
                    { label: "Compliance Avg", val: "91.4%", sub: "Global adherence", icon: ShieldCheck, color: "text-emerald-500" },
                    { label: "Revenue Delta", val: "+18%", sub: "Monthly yield growth", icon: DollarSign, color: "text-amber-500" },
                    { label: "Clinical Score", val: "A+", sub: "User focus index", icon: Target, color: "text-sky-500" },
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
                        placeholder="Search clinical registry..."
                        className="h-12 bg-black/40 border-white/5 rounded-xl pl-12 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/10 transition-all placeholder:opacity-30"
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-xs font-bold rounded-xl transition-all hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" /> Filter Registry
                </Button>
            </div>

            {/* Client Table */}
            <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                            <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-16 pl-8 ">Active Client</TableHead>
                            <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-16 ">Institutional Origin / Partner</TableHead>
                            <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-16 ">Assigned Protocol</TableHead>
                            <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-16 ">Compliance</TableHead>
                            <TableHead className="text-right pr-8 text-[10px] font-bold tracking-widest text-muted-foreground h-16 ">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clientsData.map((client) => (
                            <TableRow
                                key={client.id}
                                className="border-white/5 hover:bg-white/2 transition-all group cursor-pointer"
                                onClick={() => router.push(`/nutritionist/users/${client.id}`)}
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
                                            <span className="text-xs font-bold text-white  tracking-tight opacity-70">{client.institution}</span>
                                            <span className="text-[9px] text-muted-foreground opacity-30 font-bold  tracking-widest">Partner Node</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white  tracking-tight">{client.program}</span>
                                        <span className="text-[9px] text-muted-foreground opacity-30 font-bold  tracking-widest mt-0.5">{client.tier}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${client.adherence}%` }}
                                                className={cn("h-full rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all", client.adherence > 90 ? "bg-emerald-500" : "bg-indigo-500")}
                                            />
                                        </div>
                                        <span className={cn("text-[10px] font-bold font-sans tracking-widest", client.adherence > 90 ? "text-emerald-500" : "text-white/40")}>
                                            {client.adherence}%
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <div className="flex items-center justify-end gap-3">
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-lg border-none ",
                                            client.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-white/40"
                                        )}>
                                            {client.status}
                                        </Badge>
                                        <ArrowRight className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Dialog open={isAdmitModalOpen} onOpenChange={setIsAdmitModalOpen}>
                <DialogContent className="glass-dark border-white/10 max-w-md rounded-[2rem] p-10">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-2xl font-bold text-white  tracking-tight">New Registration</DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-2">Admit a new clinical member into your nutrition portfolio.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 pt-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Client Identification</label>
                            <Input placeholder="E.G. SARAH PIERRE" className="h-12 bg-white/5 border-white/5 rounded-xl text-xs font-bold  focus:ring-0 shadow-inner" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Assigned Protocol</label>
                                <div className="relative">
                                    <select className="w-full h-12 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold px-4 text-white appearance-none outline-none focus:ring-0  cursor-pointer">
                                        <option>METABOLIC RESET</option>
                                        <option>MASS YIELD</option>
                                        <option>ATHLETE FUEL</option>
                                    </select>
                                    <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground opacity-30 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Institution</label>
                                <div className="relative">
                                    <select className="w-full h-12 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold px-4 text-white appearance-none outline-none focus:ring-0  cursor-pointer">
                                        <option>WAKA FITNESS</option>
                                        <option>MTN RWANDA</option>
                                        <option>INDEPENDENT</option>
                                    </select>
                                    <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground opacity-30 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-10 sm:justify-between items-center gap-4">
                        <Button variant="ghost" onClick={() => setIsAdmitModalOpen(false)} className="text-[10px] font-bold  tracking-widest text-muted-foreground opacity-40 hover:opacity-100 order-2 sm:order-1">Abort</Button>
                        <Button className="h-12 px-10 rounded-xl text-[10px] font-black silver-gradient text-black  tracking-widest order-1 sm:order-2 shadow-xl shadow-white/5">Register Peer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
