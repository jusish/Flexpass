"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    CheckCircle2,
    Search,
    Filter,
    QrCode,
    Download,
    MoreHorizontal,
    Calendar,
    Clock,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckInModal } from "@/components/partner/check-in-modal";

const CHECK_INS = [
    { id: 1, name: "Alice Mukana", tier: "Platinum", time: "14:20", date: "Mar 12, 2026", facility: "Gym", status: "Verified" },
    { id: 2, name: "Bob Rwanda", tier: "Gold", time: "13:15", date: "Mar 12, 2026", facility: "Pool", status: "Verified" },
    { id: 3, name: "Cédric Gasana", tier: "Silver", time: "11:50", date: "Mar 12, 2026", facility: "Gym", status: "Verified" },
    { id: 4, name: "Dative Umutoni", tier: "Platinum", time: "09:30", date: "Mar 12, 2026", facility: "Tennis", status: "Verified" },
    { id: 5, name: "Eric Shema", tier: "Gold", time: "18:45", date: "Mar 11, 2026", facility: "Gym", status: "Verified" },
    { id: 6, name: "Faith Gisa", tier: "Platinum", time: "17:10", date: "Mar 11, 2026", facility: "Gym", status: "Verified" },
    { id: 7, name: "Gabby Ganza", tier: "Silver", time: "16:25", date: "Mar 11, 2026", facility: "Pool", status: "Verified" },
];

export default function CheckInsPage() {
    const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-8 pb-20 text-white">
            <CheckInModal isOpen={isCheckInModalOpen} onClose={() => setIsCheckInModalOpen(false)} />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">Verification Stream</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Live facility access and member validation history</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-11 px-6 rounded-xl text-[9px] font-bold tracking-tight opacity-60 hover:opacity-100 transition-opacity">
                        <Download className="w-3.5 h-3.5 mr-2 opacity-60" /> Export Archive
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => setIsCheckInModalOpen(true)}
                        className="h-11 px-8 rounded-xl text-[10px] font-bold tracking-tight silver-gradient text-black shadow-[0_0_20px_rgba(197,199,201,0.2)]"
                    >
                        <QrCode className="w-4 h-4 mr-2" /> Terminal Entry
                    </Button>
                </div>
            </div>

            <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card shadow-2xl">
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center bg-black/40">
                    <div className="relative flex-1 max-w-sm group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all" />
                        <Input
                            placeholder="Identify member by name..."
                            className="pl-12 h-12 bg-black/40 border-white/10 rounded-xl focus:bg-black/60 focus:border-white/20 transition-all text-[11px] font-bold tracking-tight"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-12 px-6 glass border-white/10 rounded-xl text-[9px] font-bold tracking-tight opacity-60 hover:opacity-100">
                        <Filter className="w-3.5 h-3.5 mr-2 opacity-40" /> Temporal Filter
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[9px] font-black  tracking-widest bg-black/40 text-white">
                                <th className="px-8 py-5">Identity</th>
                                <th className="px-8 py-5">Access Tier</th>
                                <th className="px-8 py-5">Facility Zone</th>
                                <th className="px-8 py-5 text-center">Timestamp</th>
                                <th className="px-8 py-5">Validation</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {CHECK_INS.map((log) => (
                                <tr key={log.id} className="group hover:bg-black/40 transition-all duration-300">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-black/40 rounded-xl flex items-center justify-center font-black text-xs border border-white/5 group-hover:border-primary/20 group-hover:shadow-[0_0_15px_rgba(197,199,201,0.1)] transition-all">
                                                {log.name.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="font-bold text-[13px] tracking-tight block text-white">{log.name}</span>
                                                <span className="text-[9px] text-muted-foreground font-semibold opacity-40">Member ID: FP-{log.id}82</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[9px] font-black  tracking-tighter text-primary px-3 py-1 rounded-md bg-black/40 border border-white/5 group-hover:border-primary/20 transition-all">
                                            {log.tier}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                                            <span className="text-[10px] text-muted-foreground font-bold tracking-tight ">
                                                {log.facility}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-[11px] flex items-center gap-2 text-white leading-none">
                                                <Clock className="w-3 h-3 text-secondary opacity-40 leading-none" /> {log.time}
                                            </span>
                                            <span className="text-[9px] text-muted-foreground font-semibold opacity-40 mt-1.5">{log.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/5 text-emerald-500/80 text-[10px] font-black  tracking-widest border border-emerald-500/10">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> SECURE
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl group-hover:bg-white/5 transition-colors border border-transparent group-hover:border-white/5 text-white">
                                            <MoreHorizontal className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-white/5 flex items-center justify-between bg-black/40">
                    <p className="text-[10px] text-muted-foreground font-semibold tracking-wide opacity-50">
                        Displaying <span className="text-white font-bold opacity-100">1</span> - <span className="text-white font-bold opacity-100">7</span> of 342 records
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" className="glass border-white/10 rounded-xl h-10 w-10 p-0 disabled:opacity-20 transition-all"><ChevronLeft className="w-4 h-4" /></Button>
                        <Button variant="outline" className="glass border-white/10 rounded-xl h-10 w-10 p-0 hover:bg-white/5 transition-all"><ChevronRight className="w-4 h-4" /></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
