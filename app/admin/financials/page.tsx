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
    Zap,
    Box,
    Layers,
    SlidersHorizontal
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
import { DataFilterModal } from "@/components/admin/data-filter-modal";

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
        <div className="space-y-10 pb-20 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all leading-none">Settlement Ledger</h1>
                    <p className="text-muted-foreground text-[11px] font-black opacity-30  tracking-[0.2em] mt-3 leading-relaxed">Unified capital flow, partner disbursements and clinical platform revenue audit registry</p>
                </div>
                <div className="flex gap-4">
                    <DataFilterModal title="Settlement Protocol" description="Configure visual audit parameters for the capital flow and settlement registry.">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                <DateRangeFilter />
                            </div>
                        </div>
                    </DataFilterModal>
                    <Button variant="outline" className="h-14 px-8 border-white/10 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 rounded-2xl  transition-all shadow-xl font-sans">
                        <Download className="w-4 h-4 mr-3" /> Data Export
                    </Button>
                    <Button
                        size="sm"
                        className="silver-gradient text-black h-14 px-10 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5 "
                        onClick={() => setIsSettlementOpen(true)}
                    >
                        <Receipt className="w-4 h-4 mr-3" /> Execute Settlement
                    </Button>
                </div>
            </div>

            {/* Core Financial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Aggregate GMV", value: "RWF 48.9M", sub: "Month-to-date transaction volume", icon: Wallet, color: "text-indigo-500" },
                    { label: "Partner Opex", value: "RWF 32.4M", sub: "Pending authorized payouts", icon: CreditCard, color: "text-rose-500" },
                    { label: "Net Platform", value: "RWF 16.5M", sub: "Gross operational margin yield", icon: TrendingUp, color: "text-emerald-500" },
                    { label: "Audit Flags", value: "2 Nodes", sub: "Manual verification required", icon: ShieldCheck, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:scale-[1.02] transition-all relative overflow-hidden shadow-xl font-sans">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl transition-transform group-hover:scale-110 shadow-inner", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-black text-muted-foreground tracking-widest opacity-30  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white tabular-nums">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-3 font-semibold  tracking-widest">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Ledger Tables */}
            <div className="space-y-8 font-sans">
                <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl relative font-sans">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/1 blur-[100px] pointer-events-none" />
                    <div className="p-10 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all">Authorized Settlement Registry</h3>
                            <p className="text-[10px] text-muted-foreground font-black opacity-30  tracking-[0.2em] leading-relaxed">Historical chronicle of authorized clinical module disbursements and sponsor yield intakes</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative group min-w-[320px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 group-focus-within:text-indigo-400 transition-all font-sans" />
                                <input
                                    placeholder="Identify entity trace by name or invoice ID..."
                                    className="h-12 w-full bg-white/5 border border-white/10 rounded-xl pl-12 text-[11px] font-bold tracking-widest  focus:bg-white/10 focus:ring-1 focus:ring-white/10 transition-all placeholder:opacity-30 flex items-center pr-4 shadow-inner"
                                />
                            </div>
                            <DataFilterModal title="Ledger Protocol" description="Configure visual audit parameters for the settlement and invoicing registry.">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                        <DateRangeFilter />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Protocol focus</label>
                                        <Select defaultValue="all">
                                            <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-black px-4 text-white">
                                                <SelectValue placeholder="Protocol focus" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-dark border-white/10 rounded-xl">
                                                <SelectItem value="all" className="text-[10px] font-black ">All Global Ledgers</SelectItem>
                                                <SelectItem value="payouts" className="text-[10px] font-black ">Partner Disbursements</SelectItem>
                                                <SelectItem value="sponsor" className="text-[10px] font-black ">Sponsor Intakes</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </DataFilterModal>
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar relative z-10 font-sans">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 ">Entity Node</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16  text-center">Classification</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Capital Vol</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16  text-center">Protocol Status</TableHead>
                                    <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10 ">Audit Cycle</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {disbursements.map((item, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group font-sans">
                                        <TableCell className="pl-10 py-7">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                    <Building2 className="w-5 h-5 text-white opacity-20 group-hover:opacity-100 group-hover:text-indigo-400 transition-all font-sans" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[13px] font-black text-white  tracking-tight group-hover:text-glow-silver transition-all leading-none">{item.partner}</h4>
                                                    <p className="text-[9px] text-muted-foreground font-black opacity-20 mt-2 tracking-[0.2em] ">Authorized Node Identity Verified</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className="text-[8px] font-black border-none bg-white/5 text-muted-foreground opacity-30  px-4 py-1.5 rounded-lg tracking-widest shadow-inner">{item.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-base font-black text-white tabular-nums tracking-tighter group-hover:text-indigo-400 transition-colors  leading-none">RWF {item.amount.toLocaleString()}</span>
                                                <span className="text-[9px] font-black text-muted-foreground opacity-20 tracking-widest ">{item.method} Gateway</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="inline-flex items-center gap-3 bg-white/2 px-5 py-2 rounded-full border border-white/5 shadow-inner transition-all hover:bg-white/5">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    item.status === "Settled" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" :
                                                        item.status === "Processing" ? "bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                                )} />
                                                <span className={cn(
                                                    "text-[9px] font-black tracking-[0.2em] ",
                                                    item.status === "Settled" ? "text-emerald-500" :
                                                        item.status === "Processing" ? "text-indigo-500" : "text-amber-500"
                                                )}>{item.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <p className="text-[11px] font-black text-white/40  tracking-widest tabular-nums font-sans">{item.cycle}</p>
                                            <div className="flex items-center gap-1.5 text-indigo-400/20 font-sans mt-2 justify-end">
                                                <History className="w-3.5 h-3.5" />
                                                <span className="text-[8px] font-black tracking-widest ">Protocol Trace</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>

            {/* Settlement Execution Modal */}
            <Dialog open={isSettlementOpen} onOpenChange={setIsSettlementOpen}>
                <DialogContent className="max-w-xl bg-black/95 border-white/10 backdrop-blur-3xl rounded-[2.5rem] satin-card sm:p-12 font-sans overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/3 blur-[100px] pointer-events-none" />
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black tracking-tighter text-white  leading-none">
                            Execute Capital Settlement
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-black text-muted-foreground opacity-40  tracking-[0.2em] mt-4 leading-relaxed">
                            Initiate bulk clinical disbursement protocol for verified and authorized facility partner nodes within the current fiscal cycle
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-12 space-y-12">
                        <div className="grid grid-cols-2 gap-10 px-2 font-sans relative z-10">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black tracking-[0.3em] text-muted-foreground opacity-30  ml-1">Total Payload Volume</p>
                                <div className="text-3xl font-black text-white tracking-widest tabular-nums leading-none">RWF 32,410,000</div>
                                <p className="text-[9px] text-emerald-500/60 font-black  tracking-widest flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3" /> 12 Nodes Authorized
                                </p>
                            </div>
                            <div className="space-y-4 border-l border-white/5 pl-10 font-sans">
                                <p className="text-[10px] font-black tracking-[0.3em] text-muted-foreground opacity-30  ml-1">Network Capacity</p>
                                <div className="text-3xl font-black text-indigo-400 tracking-widest leading-none">ENABLED</div>
                                <p className="text-[9px] text-muted-foreground opacity-20 font-black  tracking-widest">Multi-channel Gateway Active</p>
                            </div>
                        </div>

                        <div className="bg-white/3 rounded-3xl p-8 border border-white/5 space-y-6 relative z-10 shadow-inner">
                            <h4 className="text-[11px] font-black text-white  tracking-[0.2em] flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-indigo-500/60" /> Financial Security Protocol
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-black opacity-40 leading-relaxed  tracking-widest">
                                Authorized disbursements will be dispatched to registered clinical IBAN nodes immediately. This protocol authorization is definitive and cannot be reversed by administrative terminals.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-4 sm:gap-4 relative z-10 font-sans pt-4">
                        <Button variant="ghost" onClick={() => setIsSettlementOpen(false)} className="h-16 flex-1 text-muted-foreground opacity-40 text-[10px] font-black  tracking-[0.3em] border border-white/10 rounded-2xl hover:opacity-100 hover:text-white hover:bg-white/5 transition-all">
                            ABORT PROTOCOL
                        </Button>
                        <Button onClick={() => setIsSettlementOpen(false)} className="h-16 flex-[1.5] rounded-2xl text-[10px] font-black  tracking-[0.3em] silver-gradient text-black shadow-2xl shadow-white/10 hover:scale-[1.02] active:scale-95 transition-all">
                            AUTHORIZE DISBURSEMENT
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
