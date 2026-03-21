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
import {
    QrCode,
    User,
    Building2,
    Footprints,
    Download,
    Printer,
    Zap,
    ChevronRight,
    ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface CheckInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ScanType = "member" | "corporate" | "walkin";
type Step = "select_type" | "select_activity" | "qr";

export function CheckInModal({ isOpen, onClose }: CheckInModalProps) {
    const [step, setStep] = useState<Step>("select_type");
    const [selectedType, setSelectedType] = useState<ScanType | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

    const handleTypeSelect = (type: ScanType) => {
        setSelectedType(type);
        setStep("select_activity");
    };

    const handleActivitySelect = (activity: string) => {
        setSelectedActivity(activity);
        setStep("qr");
    };

    const reset = () => {
        setStep("select_type");
        setSelectedType(null);
        setSelectedActivity(null);
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

    const activities = [
        { id: "gym", label: "Fitness & Gym", icon: Zap },
        { id: "swim", label: "Swimming Pool", icon: Zap },
        { id: "yoga", label: "Yoga & Pilates", icon: Zap },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md bg-black/95 border-white/10 backdrop-blur-3xl rounded-3xl satin-card">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-2">
                        {step !== "select_type" && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-white/5 -ml-2"
                                onClick={() => setStep(step === "qr" ? "select_activity" : "select_type")}
                            >
                                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        )}
                        <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                            {step === "select_type" ? "Archetype Selection" :
                                step === "select_activity" ? "Select Activity" :
                                    "Access Protocol Active"}
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-[11px] font-semibold tracking-widest opacity-50 ">
                        {step === "select_type" ? "Identify the member's engagement model" :
                            step === "select_activity" ? `Configuring activity for ${selectedType?.toUpperCase()}` :
                                "Terminal scan ready for verification"}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 overflow-hidden min-h-[340px]">
                    <AnimatePresence mode="wait">
                        {step === "select_type" && (
                            <motion.div
                                key="select_type"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-3"
                            >
                                {types.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => handleTypeSelect(type.id)}
                                        className="w-full h-20 flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group text-left"
                                    >
                                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110", type.bg)}>
                                            <type.icon className={cn("w-6 h-6", type.color)} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-[12px] font-black text-white  tracking-widest">{type.label}</h4>
                                            <p className="text-[9px] text-muted-foreground font-black opacity-40 ">{type.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {step === "select_activity" && (
                            <motion.div
                                key="select_activity"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-3"
                            >
                                {activities.map((act) => (
                                    <button
                                        key={act.id}
                                        onClick={() => handleActivitySelect(act.id)}
                                        className="w-full h-20 flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group text-left"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 transition-all">
                                            <Zap className="w-6 h-6 text-indigo-500 transition-all group-hover:scale-110" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-[12px] font-black text-white  tracking-widest">{act.label}</h4>
                                            <p className="text-[9px] text-muted-foreground font-black opacity-40 ">Authorized Service Node</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-20 group-hover:opacity-100 transition-all" />
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {step === "qr" && (
                            <motion.div
                                key="qr"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center space-y-8 py-4"
                            >
                                <div className="relative p-8 bg-white rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10">
                                    <div className="w-40 h-40 bg-black flex items-center justify-center">
                                        <QrCode className="w-32 h-32 text-white" strokeWidth={1} />
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full silver-gradient flex items-center justify-center border-4 border-black">
                                        <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                                    </div>
                                </div>

                                <div className="text-center space-y-4">
                                    <div className="flex items-center gap-2 justify-center opacity-60">
                                        <Badge variant="outline" className="text-[8px] font-black tracking-widest border-white/10">{selectedType?.toUpperCase()}</Badge>
                                        <div className="w-1 h-1 rounded-full bg-white/10" />
                                        <Badge variant="outline" className="text-[8px] font-black tracking-widest border-white/10">{selectedActivity?.toUpperCase()}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-[10px] opacity-30 font-black tracking-widest  truncate max-w-[200px]">Node: FP-{Math.random().toString(36).substring(7).toUpperCase()}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <DialogFooter className="flex flex-col gap-4">
                    {step === "qr" && (
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Button variant="outline" className="h-14 bg-white/5 border-white/10 rounded-2xl text-[10px] font-black  tracking-widest hover:bg-white/10">
                                <Download className="w-4 h-4 mr-2" /> PDF
                            </Button>
                            <Button variant="outline" className="h-14 bg-white/5 border-white/10 rounded-2xl text-[10px] font-black  tracking-widest hover:bg-white/10">
                                <Printer className="w-4 h-4 mr-2" /> Print
                            </Button>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        onClick={step === "select_type" ? handleClose : reset}
                        className="w-full text-muted-foreground hover:text-white text-[10px] font-black  tracking-widest h-12 rounded-2xl border border-white/5"
                    >
                        {step === "select_type" ? "Terminate Terminal" : "Start New Entry"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
