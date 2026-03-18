"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, User, Building2, Footprints, Download, Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CheckInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ScanType = "member" | "corporate" | "walkin";

export function CheckInModal({ isOpen, onClose }: CheckInModalProps) {
    const [step, setStep] = useState<"select" | "qr">("select");
    const [selectedType, setSelectedType] = useState<ScanType | null>(null);

    const handleSelect = (type: ScanType) => {
        setSelectedType(type);
        setStep("qr");
    };

    const reset = () => {
        setStep("select");
        setSelectedType(null);
    };

    const handleClose = () => {
        onClose();
        setTimeout(reset, 300);
    };

    const types = [
        {
            id: "member" as ScanType,
            label: "Partner Member",
            description: "Dedicated members of your facility",
            icon: User,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            id: "corporate" as ScanType,
            label: "Corporate Guest",
            description: "FlexPass / OneFit corporate members",
            icon: Building2,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            id: "walkin" as ScanType,
            label: "Walk-in Visitor",
            description: "One-time visitors or ad-hoc entries",
            icon: Footprints,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md bg-black/90 border-white/10 backdrop-blur-2xl satin-card">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                        {step === "select" ? "Terminal Entry Scan" : "Access QR Generated"}
                    </DialogTitle>
                    <DialogDescription className="text-[11px] font-semibold tracking-wide opacity-50">
                        {step === "select" 
                            ? "Select the member archetype to generate an entry protocol" 
                            : `Scan protocol active for ${selectedType}`}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6">
                    <AnimatePresence mode="wait">
                        {step === "select" ? (
                            <motion.div
                                key="select"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                {types.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => handleSelect(type.id)}
                                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group text-left"
                                    >
                                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110", type.bg)}>
                                            <type.icon className={cn("w-6 h-6", type.color)} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-black text-white">{type.label}</h4>
                                            <p className="text-[10px] text-muted-foreground font-medium">{type.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="qr"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center space-y-8"
                            >
                                <div className="relative p-6 bg-white rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                    <div className="w-48 h-48 bg-black flex items-center justify-center">
                                        {/* Mock QR Code */}
                                        <QrCode className="w-40 h-40 text-white" strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full silver-gradient flex items-center justify-center border-4 border-black">
                                        <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                                    </div>
                                </div>

                                <div className="text-center space-y-2">
                                    <p className="text-[10px] font-bold tracking-wide text-primary">Protocol Active</p>
                                    <p className="text-muted-foreground text-[10px] opacity-50">Reference: FP-{Math.random().toString(36).substring(7).toUpperCase()}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <DialogFooter className="flex flex-col gap-4 mt-2">
                    {step === "qr" && (
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Button variant="outline" className="glass border-white/10 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest hover:bg-white/5">
                                <Download className="w-4 h-4 mr-2" /> PDF
                            </Button>
                            <Button variant="outline" className="glass border-white/10 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest hover:bg-white/5">
                                <Printer className="w-4 h-4 mr-2" /> Print
                            </Button>
                        </div>
                    )}
                    {step === "select" ? (
                        <Button variant="ghost" onClick={handleClose} className="w-full text-muted-foreground hover:text-white text-[10px] font-black uppercase tracking-widest h-10">
                            Cancel Protocol
                        </Button>
                    ) : (
                        <Button onClick={reset} variant="ghost" className="w-full text-muted-foreground hover:text-white text-[10px] font-black uppercase tracking-widest h-10">
                            Reset Terminal
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
