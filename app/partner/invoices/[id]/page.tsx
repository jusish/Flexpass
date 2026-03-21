"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Download,
    Printer,
    AlertTriangle,
    ChevronLeft,
    CheckCircle2,
    Clock,
    FileText,
    Calendar,
    ArrowRight,
    Search,
    Send,
    MessageSquare,
    X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const MOCK_INVOICE = {
    id: "INV-2026-001",
    period: "March 2026",
    amount: "1,240,000 RWF",
    status: "Pending",
    issueDate: "Mar 15, 2026",
    dueDate: "Apr 05, 2026",
    scans: [
        { id: "S-001", guest: "Alice Mukana", date: "Mar 12, 14:20", cost: "15,000 RWF" },
        { id: "S-002", guest: "Bob Rwanda", date: "Mar 12, 13:15", cost: "15,000 RWF" },
        { id: "S-003", guest: "Cédric Gasana", date: "Mar 11, 11:50", cost: "12,000 RWF" },
        { id: "S-004", guest: "Dative Umutoni", date: "Mar 11, 09:30", cost: "15,000 RWF" },
        { id: "S-005", guest: "Eric Shema", date: "Mar 10, 18:45", cost: "12,000 RWF" },
    ],
    items: [
        { desc: "Corporate Utilization (84 scans)", qty: 84, price: "12,000 RWF", subtotal: "1,008,000 RWF" },
        { desc: "Partner Management Commission", qty: 1, price: "232,000 RWF", subtotal: "232,000 RWF" }
    ],
    grandTotal: "1,240,000 RWF"
};

export default function InvoiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Button
                    onClick={() => router.back()}
                    variant="ghost"
                    className="h-10 w-10 p-0 rounded-xl glass border-white/10"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </Button>
                <div>
                    <h1 className="text-2xl font-black tracking-tighter text-white">Audit Statement</h1>
                    <p className="text-[10px] text-muted-foreground font-black  tracking-widest opacity-40">Reference: {params.id || MOCK_INVOICE.id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Invoice Section */}
                <div className="lg:col-span-8 space-y-8">
                    <Card className="glass-dark border-white/5 rounded-3xl overflow-hidden satin-card p-0">
                        <div className="p-10 border-b border-white/5 bg-black/40 flex justify-between items-start">
                            <div className="space-y-4">
                                <div className="p-3 bg-white/5 border border-white/10 w-fit rounded-2xl">
                                    <FileText className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white tracking-tighter ">{MOCK_INVOICE.id}</h2>
                                    <p className="text-[10px] text-muted-foreground font-semibold tracking-widest opacity-40 ">Billed to: Waka Fitness Terminal</p>
                                </div>
                            </div>
                            <div className="text-right space-y-2">
                                <Badge className={cn(
                                    "px-4 py-1.5 rounded-lg text-[10px] font-black  tracking-widest",
                                    MOCK_INVOICE.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                )}>
                                    {MOCK_INVOICE.status}
                                </Badge>
                                <p className="text-[10px] text-muted-foreground font-medium opacity-40  tracking-widest">Period: {MOCK_INVOICE.period}</p>
                            </div>
                        </div>

                        <div className="p-10 space-y-10">
                            {/* Summary Table */}
                            <div className="space-y-4">
                                <h3 className="text-[11px] font-black  tracking-widest text-glow-silver opacity-60">Ledger Summary</h3>
                                <div className="border border-white/5 rounded-2xl overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-white/5">
                                            <tr className="text-[9px] font-black  tracking-[0.2em] text-muted-foreground">
                                                <th className="px-6 py-4">Item Logic</th>
                                                <th className="px-6 py-4 text-center">Qty</th>
                                                <th className="px-6 py-4">Unit Rate</th>
                                                <th className="px-6 py-4 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {MOCK_INVOICE.items.map((item, i) => (
                                                <tr key={i} className="text-[11px] font-bold text-white/80 group hover:bg-white/5 transition-all">
                                                    <td className="px-6 py-5">{item.desc}</td>
                                                    <td className="px-6 py-5 text-center">{item.qty}</td>
                                                    <td className="px-6 py-5">{item.price}</td>
                                                    <td className="px-6 py-5 text-right font-black text-white">{item.subtotal}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-black/60">
                                            <tr className="text-[13px] font-black text-white">
                                                <td colSpan={3} className="px-6 py-6 text-right  tracking-widest opacity-40">Consolidated Settlement</td>
                                                <td className="px-6 py-6 text-right text-glow-silver text-2xl">{MOCK_INVOICE.grandTotal}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Scan History Section */}
                            <div className="space-y-4">
                                <h3 className="text-[11px] font-black  tracking-widest text-glow-silver opacity-60">Linked Check-in Payload</h3>
                                <div className="space-y-3">
                                    {MOCK_INVOICE.scans.map((scan, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center font-black text-[10px] border border-white/5">
                                                    #{i + 1}
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black text-white">{scan.guest}</p>
                                                    <p className="text-[9px] text-muted-foreground opacity-40 font-bold tracking-tight ">{scan.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[11px] font-black text-primary">{scan.cost}</p>
                                                <p className="text-[8px] text-muted-foreground font-black  tracking-widest opacity-20">Unit Cost</p>
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="w-full text-[9px] font-black  tracking-[0.2em] opacity-40 hover:opacity-100 h-10">
                                        View All 84 Linked Sessions <ArrowRight className="w-3 h-3 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Info & Actions */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="glass-dark border-white/5 rounded-3xl p-8 satin-card space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black  tracking-widest text-white/40">Timeline Data</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black  tracking-widest opacity-30">Issue Date</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3 text-primary opacity-40" />
                                        <p className="text-[11px] font-black text-white">{MOCK_INVOICE.issueDate}</p>
                                    </div>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-[9px] font-black  tracking-widest opacity-30">Due Date</p>
                                    <div className="flex items-center gap-2 justify-end">
                                        <Clock className="w-3 h-3 text-amber-500 opacity-40" />
                                        <p className="text-[11px] font-black text-white">{MOCK_INVOICE.dueDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <Button className="w-full h-12 rounded-xl silver-gradient text-black text-[10px] font-black  tracking-[0.2em]">
                                <Download className="w-4 h-4 mr-2" /> Download Statement
                            </Button>
                            <Button variant="outline" className="w-full h-12 rounded-xl glass border-white/10 text-[10px] font-black  tracking-widest">
                                <Printer className="w-4 h-4 mr-2" /> Print PDF
                            </Button>
                        </div>
                    </Card>

                    <Card className="bg-rose-500/5 border-rose-500/10 p-8 rounded-3xl space-y-4 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                            <AlertTriangle className="w-6 h-6 text-rose-500" />
                        </div>
                        <h4 className="text-[11px] font-black  tracking-widest text-rose-500">Conflict protocol</h4>
                        <p className="text-[10px] text-muted-foreground/60 leading-relaxed font-medium">
                            Discrepancy detected in scan calculation? Initiate a formal reconciliation report to our financial node.
                        </p>
                        <Button
                            onClick={() => setIsReportModalOpen(true)}
                            variant="ghost"
                            className="w-full h-11 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-[10px]  tracking-widest border border-rose-500/5 hover:border-rose-500/20 transition-all font-bold"
                        >
                            Report Calculation Error
                        </Button>
                    </Card>
                </div>
            </div>

            <ReportConflictModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                invoiceId={MOCK_INVOICE.id}
            />
        </div>
    );
}

function ReportConflictModal({ isOpen, onClose, invoiceId }: { isOpen: boolean, onClose: () => void, invoiceId: string }) {
    const [step, setStep] = useState<"form" | "success">("form");
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        setStep("success");
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep("form");
            setReason("");
        }, 300);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md bg-black/95 border-white/10 backdrop-blur-2xl satin-card">
                <AnimatePresence mode="wait">
                    {step === "form" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6 py-4"
                        >
                            <DialogHeader>
                                <DialogTitle className="text-xl font-black tracking-tighter text-white">Initiate Reconciliation</DialogTitle>
                                <DialogDescription className="text-[11px] font-semibold tracking-wide opacity-50">
                                    Reference: {invoiceId}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Error Category</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Mismatch Count", "Unit Price", "Duplicate Entry", "Other"].map((cat) => (
                                            <Button
                                                key={cat}
                                                variant="outline"
                                                className="h-10 text-[9px] font-black  tracking-widest glass border-white/5 hover:border-primary/20"
                                            >
                                                {cat}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Context / Evidence</label>
                                    <textarea
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        placeholder="Explain the discrepancy..."
                                        className="w-full min-h-[100px] bg-black/40 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-white focus:outline-none focus:border-primary/20 transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <DialogFooter className="gap-3 sm:flex-row flex-col">
                                <Button variant="ghost" onClick={handleClose} className="text-muted-foreground hover:text-white text-[10px] font-black  tracking-widest h-11">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="silver-gradient text-black h-11 px-8 rounded-xl text-[10px] font-black  tracking-widest flex-1"
                                >
                                    <Send className="w-4 h-4 mr-2" /> Send Protocol
                                </Button>
                            </DialogFooter>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-12 flex flex-col items-center text-center space-y-6"
                        >
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black tracking-tighter text-white">Report Dispatched</h3>
                                <p className="text-[11px] text-muted-foreground font-medium max-w-[240px]">
                                    Our financial node has received your reconciliation request. We will review the scan payload and respond within 24 hours.
                                </p>
                            </div>
                            <Button
                                onClick={handleClose}
                                className="glass-dark border-white/10 hover:bg-white/5 text-white h-11 px-10 rounded-xl text-[10px] font-black  tracking-widest"
                            >
                                Acknowledge
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
