"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { MOCK_INVOICES, type Invoice } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface BillingHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BillingHistoryModal({ isOpen, onClose }: BillingHistoryModalProps) {
    const getStatusIcon = (status: Invoice["status"]) => {
        switch (status) {
            case "Paid": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            case "Pending": return <Clock className="w-4 h-4 text-amber-500" />;
            case "Overdue": return <AlertCircle className="w-4 h-4 text-rose-500" />;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass-dark border-white/10 sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader className="px-6 pt-6">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                        <FileText className="w-6 h-6 text-primary" /> Billing History
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-xs font-medium">
                        View and download your past corporate subscription invoices.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 custom-scrollbar">
                    {MOCK_INVOICES.map((inv) => (
                        <div
                            key={inv.id}
                            className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white/5 rounded-xl text-muted-foreground group-hover:text-primary transition-colors">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold tracking-tight">{inv.id}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] text-muted-foreground font-medium opacity-60">{inv.period}</span>
                                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                                        <span className="text-[10px] text-muted-foreground font-medium opacity-60">{inv.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-sm font-bold">{inv.amount}</p>
                                    <div className="flex items-center gap-1.5 justify-end mt-1">
                                        {getStatusIcon(inv.status)}
                                        <span className={cn(
                                            "text-[9px] font-bold uppercase tracking-wider",
                                            inv.status === "Paid" ? "text-emerald-500/80" :
                                                inv.status === "Pending" ? "text-amber-500/80" : "text-rose-500/80"
                                        )}>
                                            {inv.status}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-white/5 bg-white/2">
                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/20">
                        <div>
                            <p className="text-xs font-bold text-primary">Need a custom report?</p>
                            <p className="text-[10px] text-muted-foreground font-medium">Generate a consolidated PDF for your tax audits.</p>
                        </div>
                        <Button className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-glow">Request PDF</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
