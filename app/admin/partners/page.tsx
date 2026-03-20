"use client";

import React, { useState } from "react";
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
    Globe,
    Zap,
    MapPin,
    Handshake,
    MessageSquare,
    PhoneCall,
    Check
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
    DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { DateRangeFilter } from "@/components/admin/date-filter";

const partnersData = [
    { 
        id: "PRT-001",
        name: "Waka Fitness", 
        category: "Fitness & Gym",
        location: "Kigali CBD",
        status: "Active", // Active, Pending, Not Reached Out, Rejected, Negotiating
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
        status: "Negotiating",
        visits: 0, 
        settlement: 0, 
        lastVisit: "Not yet",
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
        status: "Pending",
        visits: 0, 
        settlement: 0, 
        lastVisit: "3 days ago",
        tier: "Gold"
    },
    { 
        id: "PRT-006",
        name: "Urban Boutique Hotel Pool", 
        category: "Swimming Pool",
        location: "Kigali CBD",
        status: "Not Reached Out",
        visits: 0, 
        settlement: 0, 
        lastVisit: "Never",
        tier: "Silver"
    },
];

const getStatusStyles = (status: string) => {
    switch(status) {
        case "Active": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        case "Negotiating": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        case "Pending": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
        case "Rejected": return "text-rose-500 bg-rose-500/10 border-rose-500/20";
        default: return "text-muted-foreground bg-white/5 border-white/10";
    }
};

const getStatusIcon = (status: string) => {
    switch(status) {
        case "Active": return <CheckCircle2 className="w-3 h-3" />;
        case "Negotiating": return <Handshake className="w-3 h-3" />;
        case "Pending": return <Clock className="w-3 h-3" />;
        case "Rejected": return <XCircle className="w-3 h-3" />;
        default: return <AlertCircle className="w-3 h-3" />;
    }
};

export default function PartnerManagement() {
    const router = useRouter();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<any>(null);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Partner Infrastructure</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50 uppercase tracking-widest mt-1">Ecosystem Nodes, Operational Status & Yield Audit</p>
                </div>
                <div className="flex gap-3">
                    <DateRangeFilter />
                    <Button variant="outline" size="sm" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100 transition-all">
                        <Download className="w-4 h-4 mr-2" /> Node Report
                    </Button>
                    <Button 
                        size="sm" 
                        className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Register Node
                    </Button>
                </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Nodes", value: "112", trend: "Global network", icon: Building2, color: "text-indigo-500" },
                    { label: "Active Revenue", value: "84", trend: "Providing service", icon: Zap, color: "text-emerald-500" },
                    { label: "Negotiating", value: "12", trend: "High probability", icon: Handshake, color: "text-amber-500" },
                    { label: "Yield (30D)", value: "RWF 32.4M", trend: "Settlement due", icon: CreditCard, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 rounded-xl border border-white/5 shadow-inner transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-40 mb-1 uppercase">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold">{stat.trend}</p>
                    </Card>
                ))}
            </div>

            {/* Filters & Table */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative group w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 transition-all" />
                        <Input 
                            placeholder="Identify partner by name, ID or location..." 
                            className="h-12 bg-black/40 border-white/5 rounded-2xl pl-12 text-[11px] font-bold focus:ring-1 focus:ring-white/10 transition-all font-sans tracking-wide"
                        />
                    </div>
                </div>

                <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 uppercase">Partner Entity</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Sector</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Status</TableHead>
                                <TableHead className="text-[10px] font-black tracking-widest text-muted-foreground h-16 text-center uppercase">Volume</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right uppercase pr-10">Settlement</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {partnersData.map((partner, i) => (
                                <TableRow 
                                    key={i} 
                                    className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer"
                                    onClick={() => router.push(`/admin/partners/${partner.id}`)}
                                >
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-xs text-white group-hover:border-primary/20 transition-all shadow-inner uppercase">
                                                {partner.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-white tracking-widest group-hover:text-glow-silver transition-all uppercase">{partner.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest uppercase">{partner.id} • {partner.location}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-white tracking-widest uppercase">{partner.category}</p>
                                            <Badge variant="outline" className="text-[7px] font-black border-white/5 opacity-40 px-1.5 py-0 uppercase">{partner.tier}</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedPartner(partner);
                                                setIsStatusUpdateOpen(true);
                                            }}
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black tracking-widest transition-all hover:scale-105 active:scale-95",
                                                getStatusStyles(partner.status)
                                            )}
                                        >
                                            {getStatusIcon(partner.status)}
                                            {partner.status.toUpperCase()}
                                        </button>
                                        <p className="text-[8px] text-muted-foreground opacity-30 font-bold mt-1 tracking-widest uppercase">Last Activity: {partner.lastVisit}</p>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <p className="text-xs font-black text-white tracking-tighter">{partner.visits.toLocaleString()}</p>
                                        <p className="text-[8px] text-muted-foreground opacity-30 font-black tracking-widest uppercase">Visits</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <div className="flex flex-col items-end gap-1">
                                            <p className="text-xs font-black text-white tracking-tighter">RWF {partner.settlement.toLocaleString()}</p>
                                            {partner.status === "Active" && (
                                                <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                                    <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                                    <p className="text-[8px] text-emerald-500 font-bold">+12%</p>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Modal - Register Node */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="max-w-xl bg-black/90 border-white/10 backdrop-blur-2xl rounded-3xl satin-card">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                            Register Partner Node
                        </DialogTitle>
                        <DialogDescription className="text-[11px] font-semibold opacity-50 uppercase tracking-widest">
                            Authorize new facility integration into the global network
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 py-8 px-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1 uppercase">Official Business Denomination</Label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                                <Input placeholder="e.g. Waka Fitness HQ" className="pl-12 bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1 uppercase">Service Classification</Label>
                            <Select>
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl">
                                    <SelectItem value="gym" className="text-[11px] font-bold">Fitness & Gym</SelectItem>
                                    <SelectItem value="sports" className="text-[11px] font-bold">Sports Club</SelectItem>
                                    <SelectItem value="wellness" className="text-[11px] font-bold">Wellness & Spa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1 uppercase">Initial Status</Label>
                            <Select defaultValue="not_reached">
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all">
                                    <SelectValue placeholder="Current Phase" />
                                </SelectTrigger>
                                <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl">
                                    <SelectItem value="not_reached" className="text-[11px] font-bold">Not Reached Out</SelectItem>
                                    <SelectItem value="pending" className="text-[11px] font-bold">Pending Reachout</SelectItem>
                                    <SelectItem value="negotiating" className="text-[11px] font-bold">In Negotiation</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1 uppercase">Operation Tier</Label>
                            <Select defaultValue="silver">
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all">
                                    <SelectValue placeholder="Service Class" />
                                </SelectTrigger>
                                <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl">
                                    <SelectItem value="platinum" className="text-[11px] font-bold uppercase">Platinum Exclusive</SelectItem>
                                    <SelectItem value="gold" className="text-[11px] font-bold uppercase">Gold Standard</SelectItem>
                                    <SelectItem value="silver" className="text-[11px] font-bold uppercase">Silver Base</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1 uppercase">HQ Latitude</Label>
                            <Input placeholder="-1.9441" className="bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all" />
                        </div>
                    </div>

                    <DialogFooter className="gap-3 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="h-12 border-glow-silver text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                            DISCARD ENTRY
                        </Button>
                        <Button onClick={() => setIsAddModalOpen(false)} className="h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-glow-silver silver-gradient text-black">
                            AUTHORIZE NODE
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal - Update Status */}
            <Dialog open={isStatusUpdateOpen} onOpenChange={setIsStatusUpdateOpen}>
                <DialogContent className="max-w-md bg-black/90 border-white/10 backdrop-blur-2xl rounded-3xl satin-card">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black tracking-tighter text-white">
                            Update Operational Status
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-muted-foreground opacity-50 uppercase tracking-widest">
                            Transitioning {selectedPartner?.name}&apos;s lifecycle
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-8 space-y-4">
                        {[
                            { id: "Active", label: "Active Engagement", desc: "Signed and providing services", icon: CheckCircle2, color: "text-emerald-500" },
                            { id: "Negotiating", label: "Negotiation Phase", desc: "Contract discussions in progress", icon: Handshake, color: "text-amber-500" },
                            { id: "Pending", label: "Pending Activation", desc: "Waiting for partner response", icon: Clock, color: "text-blue-500" },
                            { id: "Rejected", label: "Rejected / Declined", desc: "Partner declined association", icon: XCircle, color: "text-rose-500" },
                        ].map((status) => (
                            <button
                                key={status.id}
                                onClick={() => setIsStatusUpdateOpen(false)}
                                className={cn(
                                    "w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group hover:scale-[1.02] active:scale-100",
                                    selectedPartner?.status === status.id 
                                        ? "bg-white/10 border-white/20" 
                                        : "bg-white/2 border-white/5 hover:bg-white/5 hover:border-white/10"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-2 rounded-xl bg-black/40", status.color)}>
                                        <status.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-white uppercase tracking-wider">{status.label}</p>
                                        <p className="text-[9px] font-semibold text-muted-foreground opacity-50 uppercase">{status.desc}</p>
                                    </div>
                                </div>
                                {selectedPartner?.status === status.id && (
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-black" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsStatusUpdateOpen(false)} className="w-full h-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            CANCEL TRANSITION
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
