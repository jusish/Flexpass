"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    CreditCard,
    DollarSign,
    Users,
    Footprints,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    FileText,
    ArrowRight,
    CheckCircle2,
    Clock,
    AlertCircle,
    Printer,
    Download,
    ChevronRight,
    X,
    Users as UsersIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const BILLS = [
    { id: "BILL-5021", guest: "Alice Mukana", type: "Subscription", period: "Mar 2026", amount: "120,000 RWF", status: "Paid", method: "Credit Card" },
    { id: "BILL-5022", guest: "Bob Rwanda", type: "Subscription", period: "Mar 2026", amount: "80,000 RWF", status: "Pending", method: "Awaiting Payment" },
    { id: "BILL-W001", guest: "Eric Shema", type: "Walk-in", period: "Mar 18, 14:30", amount: "15,000 RWF", status: "Paid", method: "Cash" },
    { id: "BILL-W002", guest: "Faith Gisa", type: "Walk-in", period: "Mar 17, 10:15", amount: "15,000 RWF", status: "Paid", method: "Mobile Money" },
];

export default function PartnerBillingPage() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<"all" | "subscription" | "walkin">("all");
    const [selectedBill, setSelectedBill] = useState<typeof BILLS[0] | null>(null);

    const filteredBills = BILLS.filter(bill => {
        if (activeFilter === "subscription") return bill.type === "Subscription";
        if (activeFilter === "walkin") return bill.type === "Walk-in";
        return true;
    }).filter(bill => bill.guest.toLowerCase().includes(search.toLowerCase()) || bill.id.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-glow-silver text-white">Revenue Operations</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Manage outbound billing for facility members and verified walk-in guests</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-8 rounded-xl text-[10px] font-bold tracking-tight glass border-white/10 hover:border-white/20 transition-all">
                        Financial Statement
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Revenue (Mar)", value: "2,450,000 RWF", trend: "+14%", up: true, icon: DollarSign },
                    { label: "Pending Collection", value: "420,000 RWF", trend: "-5%", up: false, icon: Clock },
                    { label: "Subscriber Yield", value: "1,880,000 RWF", trend: "+8%", up: true, icon: UsersIcon },
                    { label: "Walk-in Revenue", value: "570,000 RWF", trend: "+22%", up: true, icon: Footprints },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-black/40 rounded-lg border border-white/10">
                                <stat.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className={cn("flex items-center gap-1 text-[10px] font-bold", stat.up ? "text-emerald-500" : "text-rose-500")}>
                                {stat.trend} {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 mb-1">{stat.label}</p>
                        <p className="text-2xl font-black tracking-tighter text-white">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                <div className="p-8 border-b border-white/5 bg-black/40 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="flex items-center gap-2 p-1 bg-black/40 border border-white/5 rounded-xl">
                        <Button 
                            onClick={() => setActiveFilter("all")}
                            variant={activeFilter === "all" ? "default" : "ghost"}
                            className={cn(
                                "h-9 px-6 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                activeFilter === "all" ? "silver-gradient text-black" : "text-muted-foreground"
                            )}
                        >All Bills</Button>
                        <Button 
                            onClick={() => setActiveFilter("subscription")}
                            variant={activeFilter === "subscription" ? "default" : "ghost"}
                            className={cn(
                                "h-9 px-6 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                activeFilter === "subscription" ? "silver-gradient text-black" : "text-muted-foreground"
                            )}
                        >Subscriptions</Button>
                        <Button 
                            onClick={() => setActiveFilter("walkin")}
                            variant={activeFilter === "walkin" ? "default" : "ghost"}
                            className={cn(
                                "h-9 px-6 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                activeFilter === "walkin" ? "silver-gradient text-black" : "text-muted-foreground"
                            )}
                        >Walk-ins</Button>
                    </div>

                    <div className="relative flex-1 max-w-sm group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40 group-focus-within:opacity-100 group-focus-within:text-glow-silver transition-all" />
                        <Input
                            placeholder="Find billing record..."
                            className="pl-12 h-12 bg-black/40 border-white/10 rounded-xl focus:bg-white/10 transition-all text-[11px] font-bold tracking-tight text-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-muted-foreground text-[9px] font-black uppercase tracking-widest bg-black/40">
                                <th className="px-8 py-5">Instrument</th>
                                <th className="px-8 py-5">Guest Identification</th>
                                <th className="px-8 py-5">Service Period</th>
                                <th className="px-8 py-5">Amount</th>
                                <th className="px-8 py-5">Settlement</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {filteredBills.map((bill) => (
                                    <motion.tr 
                                        key={bill.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-black/40 transition-all duration-300"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-4 h-4 text-primary opacity-40" />
                                                <span className="font-bold text-[12px] text-white uppercase tracking-tight">{bill.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[13px] text-white tracking-tight">{bill.guest}</span>
                                                <span className="text-[9px] text-muted-foreground font-semibold tracking-wide opacity-30">{bill.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-[11px] font-bold text-muted-foreground">{bill.period}</td>
                                        <td className="px-8 py-6 text-[13px] font-black text-white">{bill.amount}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <Badge variant="outline" className={cn(
                                                    "w-fit bg-black/40 text-[9px] font-black uppercase tracking-widest px-3 py-1 mb-1",
                                                    bill.status === "Paid" ? "border-emerald-500/20 text-emerald-500" : "border-amber-500/20 text-amber-500"
                                                )}>
                                                    {bill.status}
                                                </Badge>
                                                <span className="text-[8px] text-muted-foreground font-semibold tracking-wide opacity-30">{bill.method}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Button 
                                                onClick={() => setSelectedBill(bill)}
                                                variant="ghost" 
                                                className="h-9 gap-2 pl-4 pr-3 rounded-lg hover:bg-white/5 text-[10px] font-bold tracking-tight border border-transparent hover:border-white/5"
                                            >
                                                View <ArrowRight className="w-3.5 h-3.5" />
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </Card>

            {selectedBill && (
                <BillDetailModal 
                    bill={selectedBill} 
                    isOpen={!!selectedBill} 
                    onClose={() => setSelectedBill(null)} 
                />
            )}
        </div>
    );
}

function BillDetailModal({ bill, isOpen, onClose }: { bill: typeof BILLS[0], isOpen: boolean, onClose: () => void }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl bg-black/90 border-white/10 backdrop-blur-2xl satin-card text-white">
                <DialogHeader className="border-b border-white/5 pb-6">
                    <DialogTitle className="text-2xl font-black tracking-tighter uppercase">Bill Statement</DialogTitle>
                    <DialogDescription className="text-[10px] font-semibold tracking-wide opacity-40">
                        Record ID: {bill.id} • Issued to {bill.guest}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-8 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Guest Category</p>
                            <div className="flex items-center gap-2">
                                <UsersIcon className="w-4 h-4 text-primary" />
                                <span className="text-[12px] font-black text-white">{bill.type}</span>
                            </div>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Period / Timestamp</p>
                            <span className="text-[12px] font-black text-white">{bill.period}</span>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl border border-white/5 p-6 space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                            <span>Service Description</span>
                            <span>Yield</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-5 rounded-xl border border-white/5">
                            <div className="space-y-1">
                                <p className="text-[13px] font-black text-white">{bill.type} Access</p>
                                <p className="text-[9px] text-muted-foreground font-medium opacity-40 tracking-tight">Standard Protocol yield</p>
                            </div>
                            <p className="text-xl font-black text-white">{bill.amount}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Settlement Method</p>
                            <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] font-black uppercase tracking-widest px-3 py-1 text-white">
                                {bill.method}
                            </Badge>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Status Verification</p>
                            <Badge className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-3 py-1",
                                bill.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                            )}>
                                {bill.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                <DialogFooter className="border-t border-white/5 pt-6 gap-3 sm:flex-row flex-col">
                    <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex-1">
                        <Button variant="outline" className="glass border-white/10 rounded-xl h-11 text-[9px] font-black uppercase tracking-widest text-white hover:bg-white/5">
                            <Printer className="w-3.5 h-3.5 mr-2" /> Receipt
                        </Button>
                        <Button variant="outline" className="glass border-white/10 rounded-xl h-11 text-[9px] font-black uppercase tracking-widest text-white hover:bg-white/5">
                            <Download className="w-3.5 h-3.5 mr-2" /> Export
                        </Button>
                    </div>
                    <Button variant="ghost" onClick={onClose} className="text-muted-foreground hover:text-white text-[9px] font-black uppercase tracking-widest h-11">
                        Close Audit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
