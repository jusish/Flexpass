"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Calendar,
    Building2,
    Zap,
    History,
    Activity,
    CreditCard
} from "lucide-react";
import { type Employee } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ViewEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
}

export function ViewEmployeeModal({ isOpen, onClose, employee }: ViewEmployeeModalProps) {
    if (!employee) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass-dark border-white/10 sm:max-w-[500px] p-0 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-primary/20 via-primary/5 to-transparent pointer-events-none z-0" />

                <div className="p-6 overflow-y-auto custom-scrollbar relative z-10">
                    <DialogHeader className="pt-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center font-bold text-2xl text-primary border border-primary/20">
                                {employee.name.charAt(0)}
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-bold">{employee.name}</DialogTitle>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge className={cn(
                                        "text-[10px] uppercase font-bold tracking-wider",
                                        employee.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                    )}>
                                        {employee.status}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground font-medium">• {employee.department}</span>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {[
                            { label: "Email Address", value: employee.email, icon: Mail },
                            { label: "Join Date", value: employee.joinDate, icon: Calendar },
                            { label: "Access Tier", value: employee.tier, icon: Zap },
                            { label: "Department", value: employee.department, icon: Building2 },
                        ].map((item, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5 line-clamp-1">
                                    <item.icon className="w-3 h-3" /> {item.label}
                                </p>
                                <p className="text-sm font-semibold truncate">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 space-y-4">
                        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Activity Overview</h4>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-center">
                                <Activity className="w-5 h-5 text-primary mx-auto mb-2" />
                                <p className="text-lg font-bold">{employee.visits}</p>
                                <p className="text-[9px] font-medium text-muted-foreground uppercase">Tot. Visits</p>
                            </div>
                            <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-center">
                                <History className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                                <p className="text-lg font-bold">12</p>
                                <p className="text-[9px] font-medium text-muted-foreground uppercase">This Month</p>
                            </div>
                            <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-center">
                                <CreditCard className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                                <p className="text-lg font-bold">92%</p>
                                <p className="text-[9px] font-medium text-muted-foreground uppercase">Usage ROI</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Recent Visits</h4>
                        <div className="space-y-2">
                            {[
                                { gym: "Waka Fitness", date: "Today, 08:32 AM", type: "Platinum Access" },
                                { gym: "Cercle Sportif", date: "Yesterday, 06:15 PM", type: "Tennis" },
                                { gym: "Mindful Yoga", date: "10 Mar, 07:00 AM", type: "Yoga Class" },
                            ].map((visit, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl group hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold">{visit.gym}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium">{visit.date}</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-bold text-muted-foreground opacity-40 uppercase tracking-widest">{visit.type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-white/10 flex justify-end gap-2 bg-black/20 backdrop-blur-md relative z-20">
                    <button onClick={onClose} className="px-6 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                        Close Profile
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
