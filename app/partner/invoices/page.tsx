"use client";

import React, { useState } from "react";
import {
    Button,
} from "@/components/ui/button";
import { 
    FileText, 
    Calendar, 
    ArrowRight,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const INVOICES = [
    { id: "INV-2026-001", period: "Mar 2026", amount: "1,240,000 RWF", scans: 84, status: "Pending", dueDate: "Apr 05, 2026" },
    { id: "INV-2026-002", period: "Feb 2026", amount: "980,000 RWF", scans: 62, status: "Paid", dueDate: "Mar 05, 2026" },
    { id: "INV-2026-003", period: "Jan 2026", amount: "1,420,000 RWF", scans: 95, status: "Paid", dueDate: "Feb 05, 2026" },
];

export default function PartnerInvoicesPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-glow-silver text-white">Settlement Ledger</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Review and manage billing distributions from FlexPass Headquarters</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 glass border-white/10 rounded-xl text-[10px] font-bold tracking-tight opacity-70 hover:opacity-100 transition-all">
                        Financial Audit PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Pending Settlement", value: "1,240,000 RWF", sub: "Due in 18 days", icon: Clock },
                    { label: "Total Paid (2026)", value: "2,400,000 RWF", sub: "2 successful cycles", icon: CheckCircle2 },
                    { label: "Average Yield / Scan", value: "14,750 RWF", sub: "Based on 241 scans", icon: FileText },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-black/40 rounded-lg border border-white/10">
                                <stat.icon className="w-4 h-4 text-primary" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 mb-1">{stat.label}</p>
                        <p className="text-2xl font-black tracking-tighter text-white">{stat.value}</p>
                        <p className="text-[9px] text-muted-foreground font-medium opacity-30 mt-1 tracking-wide">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                <div className="p-8 border-b border-white/5 bg-black/40 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <h3 className="text-sm font-black tracking-wide text-glow-silver">Invoice Archive</h3>
                    <div className="flex flex-1 max-w-sm relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                        <Input 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Find invoice by ref..." 
                            className="pl-12 bg-black/60 border-white/10 rounded-xl h-11 text-[11px] font-medium tracking-tight"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-muted-foreground text-[9px] font-black uppercase tracking-widest bg-black/40">
                                <th className="px-8 py-5">Instrument ID</th>
                                <th className="px-8 py-5">Cycle Period</th>
                                <th className="px-8 py-5">Scan Volume</th>
                                <th className="px-8 py-5">Gross Amount</th>
                                <th className="px-8 py-5">Outcome</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {INVOICES.map((inv) => (
                                <tr key={inv.id} className="group hover:bg-black/40 transition-all duration-300">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                                            <span className="font-bold text-[12px] text-white uppercase tracking-tight">{inv.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-[11px] font-bold text-muted-foreground">{inv.period}</td>
                                    <td className="px-8 py-6 text-[11px] font-black text-white">{inv.scans} scans</td>
                                    <td className="px-8 py-6 text-[13px] font-black text-white">{inv.amount}</td>
                                    <td className="px-8 py-6">
                                        <Badge variant="outline" className={cn(
                                            "bg-black/40 text-[9px] font-black uppercase tracking-widest px-3 py-1",
                                            inv.status === "Paid" ? "border-emerald-500/20 text-emerald-500" : "border-amber-500/20 text-amber-500"
                                        )}>
                                            {inv.status}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Button 
                                            onClick={() => router.push(`/partner/invoices/${inv.id}`)}
                                            variant="ghost" 
                                            className="h-9 gap-2 pl-4 pr-3 rounded-lg hover:bg-white/5 text-[10px] font-bold tracking-tight border border-transparent hover:border-white/5"
                                        >
                                            View Audit <ArrowRight className="w-3.5 h-3.5" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
