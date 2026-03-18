"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Users,
    Building2,
    Footprints,
    Search,
    Filter,
    MoreHorizontal,
    Plus,
    History,
    CreditCard,
    ChevronRight,
    UserPlus,
    Mail,
    Phone,
    Calendar,
    Settings,
    User,
    ArrowRight,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AddMemberModal } from "@/components/partner/add-member-modal";
import { AttendanceLogsModal } from "@/components/partner/attendance-logs-modal";

const MY_MEMBERS = [
    { id: 1, name: "Alice Mukana", email: "alice@example.com", visits: 24, status: "Active", plan: "Platinum", lastVisit: "2 hours ago", cycle: "Monthly" },
    { id: 2, name: "Bob Rwanda", email: "bob@example.com", visits: 12, status: "Active", plan: "Gold", lastVisit: "1 day ago", cycle: "Quarterly" },
    { id: 3, name: "Cédric Gasana", email: "cedric@example.com", visits: 5, status: "Pending", plan: "Silver", lastVisit: "3 days ago", cycle: "Monthly" },
];

const CORPORATE_MEMBERS = [
    { id: 101, name: "Innocent Kagabo", company: "Bank of Kigali", visits: 45, plan: "Corporate Elite", lastVisit: "30 mins ago" },
    { id: 102, name: "Dative Umutoni", company: "MTN Rwanda", visits: 18, plan: "Corporate Standard", lastVisit: "5 hours ago" },
];

const WALK_INS = [
    { id: 201, name: "Eric Shema", date: "Mar 18, 14:30", amount: "15,000 RWF", status: "Paid" },
    { id: 202, name: "Faith Gisa", date: "Mar 17, 10:15", amount: "15,000 RWF", status: "Paid" },
];

export default function VisitorsPage() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<"members" | "corporate" | "walkins">("members");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<string | null>(null);

    const TABS = [
        { id: "members", label: "My Members", icon: Users },
        { id: "corporate", label: "Corporate", icon: Building2 },
        { id: "walkins", label: "Walk-ins", icon: Footprints },
    ];

    return (
        <div className="space-y-8 pb-20 text-white">
            <AddMemberModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            {selectedMember && (
                <AttendanceLogsModal 
                    isOpen={!!selectedMember} 
                    onClose={() => setSelectedMember(null)} 
                    memberName={selectedMember} 
                />
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-glow-silver">Visitor Infrastructure</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Manage authenticated residents, enterprise partners, and ad-hoc guests</p>
                </div>
                <Button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="h-11 px-6 rounded-xl text-[10px] font-bold tracking-tight silver-gradient text-black"
                >
                    <UserPlus className="w-4 h-4 mr-2" /> Register Member
                </Button>
            </div>

            <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                <div className="p-8 border-b border-white/5 bg-black/40 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="flex items-center p-1 bg-black/40 border border-white/5 rounded-2xl w-fit gap-1">
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300",
                                        isActive ? "text-black" : "text-muted-foreground hover:text-white/60"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="visitor-tab-glow"
                                            className="absolute inset-0 silver-gradient rounded-xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <tab.icon className={cn("w-3.5 h-3.5", isActive && "scale-110")} />
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative flex-1 max-w-sm group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40 group-focus-within:opacity-100 group-focus-within:text-glow-silver transition-all" />
                        <Input
                            placeholder={`Search ${activeTab}...`}
                            className="pl-12 h-12 bg-black/40 border-white/10 rounded-xl focus:bg-white/10 transition-all text-[11px] font-bold tracking-tight text-white focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-muted-foreground text-[9px] font-black uppercase tracking-widest bg-black/40">
                                <th className="px-8 py-5">Profile Entity</th>
                                {activeTab === "members" && <th className="px-8 py-5">Tier / Plan</th>}
                                {activeTab === "corporate" && <th className="px-8 py-5">Organization</th>}
                                {activeTab === "walkins" && <th className="px-8 py-5">Service Fee</th>}
                                <th className="px-8 py-5">Activity Metrics</th>
                                <th className="px-8 py-5">Status Node</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {activeTab === "members" && MY_MEMBERS.map((v) => (
                                    <motion.tr 
                                        key={v.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-black/40 transition-all duration-300"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-glow-silver">
                                                    {v.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[13px] tracking-tight">{v.name}</span>
                                                    <span className="text-[10px] text-muted-foreground font-medium opacity-40">{v.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white">{v.plan}</Badge>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black">{v.visits} Visits</span>
                                                <span className="text-[9px] text-muted-foreground font-semibold opacity-40">Last: {v.lastVisit}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge className={cn(
                                                "text-[9px] font-black uppercase tracking-widest",
                                                v.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                            )}>{v.status}</Badge>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-9 w-9 p-0 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl satin-card min-w-[160px]">
                                                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest opacity-40">Protocol Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem 
                                                        onClick={() => setSelectedMember(v.name)}
                                                        className="text-[11px] font-bold text-white hover:bg-white/10 cursor-pointer"
                                                    >
                                                        <History className="w-3.5 h-3.5 mr-2 text-primary" /> View Logs
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-[11px] font-bold text-white hover:bg-white/10 cursor-pointer">
                                                        <CreditCard className="w-3.5 h-3.5 mr-2 text-primary" /> Billing Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/5" />
                                                    <DropdownMenuItem className="text-[11px] font-bold text-rose-500 hover:bg-rose-500/10 cursor-pointer">
                                                        Deactivate Entity
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </motion.tr>
                                ))}

                                {activeTab === "corporate" && CORPORATE_MEMBERS.map((v) => (
                                    <motion.tr 
                                        key={v.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-black/40 transition-all duration-300"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center font-black text-xs text-emerald-500">
                                                    {v.name.charAt(0)}
                                                </div>
                                                <span className="font-bold text-[13px] tracking-tight">{v.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-[11px] font-semibold text-white/60">{v.company}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black">{v.visits} Visits</span>
                                                <span className="text-[9px] text-muted-foreground font-semibold opacity-40">Last: {v.lastVisit}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge className="bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest">{v.plan}</Badge>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-9 w-9 p-0 rounded-lg hover:bg-white/5">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl satin-card">
                                                    <DropdownMenuItem 
                                                        onClick={() => setSelectedMember(v.name)}
                                                        className="text-[11px] font-bold text-white hover:bg-white/10 cursor-pointer"
                                                    >
                                                        <History className="w-3.5 h-3.5 mr-2 text-primary" /> Access Logs
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </motion.tr>
                                ))}

                                {activeTab === "walkins" && WALK_INS.map((v) => (
                                    <motion.tr 
                                        key={v.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-black/40 transition-all duration-300"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center font-black text-xs text-amber-500">
                                                    {v.name.charAt(0)}
                                                </div>
                                                <span className="font-bold text-[13px] tracking-tight">{v.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-[11px] font-black">{v.amount}</td>
                                        <td className="px-8 py-6 text-[11px] font-bold text-muted-foreground">{v.date}</td>
                                        <td className="px-8 py-6">
                                            <Badge className="bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest">{v.status}</Badge>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-9 w-9 p-0 rounded-lg hover:bg-white/5">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl satin-card">
                                                    <DropdownMenuItem 
                                                        onClick={() => setSelectedMember(v.name)}
                                                        className="text-[11px] font-bold text-white hover:bg-white/10 cursor-pointer"
                                                    >
                                                        <FileText className="w-3.5 h-3.5 mr-2 text-primary" /> View Receipt
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
