"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface AttendanceLogsModalProps {
    isOpen: boolean;
    onClose: () => void;
    memberName: string;
}

const MOCK_LOGS = [
    { date: "Mar 18, 2026", time: "14:20", zone: "Main Gym", status: "Verified" },
    { date: "Mar 16, 2026", time: "09:15", zone: "Swimming Pool", status: "Verified" },
    { date: "Mar 14, 2026", time: "18:45", zone: "Tennis Court", status: "Verified" },
    { date: "Mar 12, 2026", time: "07:30", zone: "Main Gym", status: "Verified" },
    { date: "Mar 11, 2026", time: "17:10", zone: "Cardio Loft", status: "Verified" },
];

export function AttendanceLogsModal({ isOpen, onClose, memberName }: AttendanceLogsModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl bg-black/90 border-white/10 backdrop-blur-2xl satin-card">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                        Attendance Protocol
                    </DialogTitle>
                    <DialogDescription className="text-[11px] font-black uppercase tracking-widest opacity-40">
                        Historical access logs for {memberName}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-4">
                    {MOCK_LOGS.map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-all">
                                    <Clock className="w-4 h-4 text-primary opacity-40 group-hover:opacity-100" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-black text-white">{log.date}</span>
                                        <span className="text-[9px] text-muted-foreground font-bold opacity-40 leading-none">@ {log.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <MapPin className="w-3 h-3 text-secondary opacity-40" />
                                        <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">{log.zone}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/5 text-emerald-500/60 text-[8px] font-black uppercase tracking-widest border border-emerald-500/10">
                                <CheckCircle2 className="w-3 h-3" /> {log.status}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
