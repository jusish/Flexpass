"use client";

import React, { useState } from "react";
import { 
    Building2, 
    CreditCard, 
    TrendingUp, 
    Activity, 
    MoreVertical,
    Search,
    Filter,
    Plus,
    Download,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Wallet,
    Receipt,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    History,
    ShieldCheck,
    Coins,
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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { DateRangeFilter } from "@/components/admin/date-filter";

const disbursements = [
    { partner: "Waka Fitness", amount: 5580000, status: "Pending Settlement", method: "Bank Transfer", cycle: "Monthly - Mar 26", type: "Utilization Payout" },
    { partner: "Cercle Sportif", amount: 4005000, status: "Processing", method: "Bank Transfer", cycle: "Monthly - Mar 26", type: "Utilization Payout" },
    { partner: "Kigali Arena", amount: 9450000, status: "Settled", method: "Direct Debit", cycle: "Weekly - W3 Mar 26", type: "Utilization Payout" },
    { partner: "Mindful Yoga", amount: 2025000, status: "Audit Required", method: "Bank Transfer", cycle: "Monthly - Mar 26", type: "Utilization Payout" },
    { partner: "Corporate - MTN", amount: 15400000, status: "Settled", method: "Direct Debit", cycle: "Monthly - Mar 26", type: "Sponsor Payment" },
];

export default function GlobalFinancials() {
    const [isSettlementOpen, setIsSettlementOpen] = useState(false);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Settlement Ledger</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50 uppercase tracking-widest mt-1">Unified capital flow, partner disbursements & platform revenue audit</p>
                </div>
                <div className="flex gap-3">
                    <DateRangeFilter />
                    <Button variant="outline" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100 transition-all text-white">
                        <Download className="w-4 h-4 mr-2" /> DATA EXPORT
                    </Button>
                    <Button 
                        size="sm" 
                        className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5"
                        onClick={() => setIsSettlementOpen(true)}
                    >
                        <Receipt className="w-4 h-4 mr-2" /> EXECUTE SETTLEMENT
                    </Button>
                </div>
            </div>

            {/* Core Financial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Aggregate GMV", value: "RWF 48.9M", sub: "Month-to-date", icon: Wallet, color: "text-indigo-500" },
                    { label: "Partner Opex", value: "RWF 32.4M", sub: "Pending payouts", icon: CreditCard, color: "text-rose-500" },
                    { label: "Net Platform", value: "RWF 16.5M", sub: "Gross Margin", icon: TrendingUp, color: "text-emerald-500" },
                    { label: "Audit Flags", value: "2 Nodes", sub: "Verification needed", icon: ShieldCheck, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground tracking-widest opacity-30 uppercase mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold uppercase">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Ledger Tables */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative group w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 transition-all" />
                        <Input 
                            placeholder="Identify entity by name or invoice ID..." 
                            className="h-12 bg-black/40 border-white/5 rounded-2xl pl-12 text-[11px] font-bold focus:ring-1 focus:ring-white/10 transition-all font-sans tracking-wide"
                        />
                    </div>
                </div>

                <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 uppercase">Entity Node</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Classification</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Capital Vol</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 uppercase">Protocol Status</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10 uppercase">Audit Cycle</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {disbursements.map((item, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                <Building2 className="w-4 h-4 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{item.partner}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest uppercase">Node Verified</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[8px] font-black border-white/10 opacity-60 uppercase">{item.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black text-white">RWF {item.amount.toLocaleString()}</span>
                                            <span className="text-[9px] font-bold text-muted-foreground opacity-30 uppercase">{item.method}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-white/2">
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                item.status === "Settled" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : 
                                                item.status === "Processing" ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "bg-amber-500"
                                            )} />
                                            <span className={cn(
                                                "text-[9px] font-black tracking-widest uppercase",
                                                item.status === "Settled" ? "text-emerald-500" :
                                                item.status === "Processing" ? "text-indigo-500" : "text-amber-500"
                                            )}>{item.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <p className="text-[10px] font-black text-muted-foreground opacity-40 uppercase tracking-widest">{item.cycle}</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Settlement Execution Modal */}
            <Dialog open={isSettlementOpen} onOpenChange={setIsSettlementOpen}>
                <DialogContent className="max-w-xl bg-black/95 border-white/10 backdrop-blur-3xl rounded-3xl satin-card sm:p-10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                            Execute Capital Settlement
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-muted-foreground opacity-50 uppercase tracking-widest">
                            Initiate bulk disbursement protocol for verified partner nodes
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-10 space-y-10">
                        <div className="grid grid-cols-2 gap-8 px-2">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40 uppercase ml-1">Total Payload</p>
                                <div className="text-2xl font-black text-white tracking-widest">RWF 32,410,000</div>
                                <p className="text-[9px] text-emerald-500 font-bold uppercase">12 Nodes Pending Approval</p>
                            </div>
                            <div className="space-y-4 border-l border-white/5 pl-8">
                                <p className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40 uppercase ml-1">Network Capacity</p>
                                <div className="text-2xl font-black text-white tracking-widest">ENABLED</div>
                                <p className="text-[9px] text-muted-foreground opacity-30 font-bold uppercase">Multi-channel Gateway</p>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-indigo-500" /> Financial Security Protocol
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-semibold opacity-60 leading-relaxed uppercase tracking-wide">
                                All payouts will be dispatched to registered IBAN nodes. Settlement cannot be reversed once authorized by administrative terminal.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-3 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsSettlementOpen(false)} className="h-14 flex-1 text-muted-foreground text-[10px] font-black uppercase tracking-widest border border-white/5 rounded-2xl">
                            ABORT
                        </Button>
                        <Button onClick={() => setIsSettlementOpen(false)} className="h-14 flex-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] silver-gradient text-black shadow-2xl shadow-white/5">
                            AUTHORIZE DISBURSEMENT
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
