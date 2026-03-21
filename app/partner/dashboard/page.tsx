"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Zap,
    Users,
    TrendingUp,
    History,
    QrCode,
    CreditCard,
    CheckCircle2,
    AlertCircle,
    Clock,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnerDashboard() {
    const [scanning, setScanning] = useState(false);

    const handleScan = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            toast.success("Verified: Alice Mukana", {
                description: "Platinum Member • Access Granted",
            });
        }, 2000);
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Hero Action */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-8 rounded-2xl relative overflow-hidden flex flex-col justify-center border border-white/5 bg-[#0A0A0B] shadow-2xl">
                    <div className="absolute inset-0 gunmetal-gradient opacity-40" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-black text-[8px] text-primary  tracking-[0.2em] w-fit">
                                Terminal Alpha-01
                            </div>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter mb-2 text-glow-silver text-white">Welcome, Waka Fitness</h1>
                        <p className="text-muted-foreground text-[10px] font-black  tracking-widest mb-10 opacity-40">System ready • Encrypted verification terminal</p>

                        <Button
                            onClick={handleScan}
                            disabled={scanning}
                            size="lg"
                            className="h-14 px-10 rounded-xl text-[10px] font-black  tracking-[0.2em] border-glow-silver silver-gradient text-black transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(197,199,201,0.15)] group"
                        >
                            {scanning ? (
                                <>Syncing Protocols... <div className="ml-3 w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /></>
                            ) : (
                                <><QrCode className="mr-3 w-5 h-5 group-hover:rotate-6 transition-transform" /> Verify FlexPass Access</>
                            )}
                        </Button>
                    </div>
                    <Zap className="absolute -right-12 -bottom-12 w-80 h-80 text-white/2 pointer-events-none" />
                </Card>

                <Card className="glass-dark p-8 border-white/5 rounded-2xl flex flex-col justify-center text-center satin-card relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10">
                        <div className="inline-flex p-4 bg-black/40 rounded-2xl mb-4 border border-white/10 shadow-inner">
                            <CreditCard className="w-6 h-6 text-primary border-glow-silver" />
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground  tracking-widest mb-2 opacity-40">Next Settlement</p>
                        <p className="text-3xl font-black mb-1 text-glow-silver">RWF 1.2M</p>
                        <p className="text-[10px] text-muted-foreground opacity-30 mb-6 font-bold">Scheduled • 15 MAR 2026</p>
                        <Button variant="outline" className="w-full h-11 rounded-xl glass border-white/10 text-[9px] font-black  tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">
                            View Statements
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Check-ins Today", value: "84", icon: Users, color: "text-primary" },
                    { label: "Peak Performance", value: "17:00 - 19:00", icon: Clock, color: "text-secondary" },
                    { label: "Growth Index", value: "+22%", icon: TrendingUp, color: "text-primary" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl flex items-center gap-5 satin-card group hover:border-white/10 transition-all">
                        <div className={`p-3 bg-black/40 rounded-xl ${stat.color} group-hover:scale-110 transition-transform border border-white/5`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground  tracking-widest opacity-40">{stat.label}</p>
                            <p className="text-2xl font-black tracking-tighter text-glow-silver">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Real-time Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-sm font-black  tracking-widest flex items-center gap-3 text-glow-silver">
                                <History className="text-primary w-4 h-4" /> Entry Logs
                            </h3>
                            <p className="text-muted-foreground text-[10px] font-medium opacity-40 mt-1  tracking-widest">Real-time verification stream</p>
                        </div>
                        <div className="px-3 py-1 bg-black/40 border border-white/10 rounded-lg font-black text-[8px] text-primary  tracking-[0.2em] animate-pulse">
                            ACTIVE
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { user: "Alice Mukana", time: "2 min ago", tier: "Platinum", action: "Check-in", statusColor: "text-primary" },
                            { user: "Bob Rwanda", time: "15 min ago", tier: "Gold", action: "Check-in", statusColor: "text-primary" },
                            { user: "Flagged Scan", time: "1 hr ago", tier: "Classic", action: "Rejected", statusColor: "text-rose-500/60" },
                            { user: "Eric Shema", time: "2 hrs ago", tier: "Platinum", action: "Check-in", statusColor: "text-primary" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-black/40 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center font-black text-[11px] border border-white/5 group-hover:border-primary/20 transition-all">
                                        {item.user.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[13px] tracking-tight">{item.user}</h4>
                                        <p className="text-[10px] text-muted-foreground font-black  tracking-tighter opacity-30 group-hover:opacity-60 transition-opacity">
                                            {item.time} <span className="mx-1.5 opacity-30">•</span> {item.tier}
                                        </p>
                                    </div>
                                </div>
                                <div className={`font-black text-[9px]  tracking-widest px-2.5 py-1 rounded-md border border-white/5 ${item.statusColor}`}>
                                    {item.action}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="ghost" className="w-full mt-10 h-11 rounded-xl glass border-white/10 text-[9px] font-black  tracking-widest opacity-60 hover:opacity-100 transition-all">
                        Audit All Sessions
                    </Button>
                </Card>

                {/* Marketing / Ads */}
                <Card className="glass-dark p-8 border-white/5 rounded-2xl flex flex-col satin-card relative overflow-hidden">
                    <div className="absolute inset-0 silver-gradient opacity-5" />
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="mb-10">
                            <h3 className="text-sm font-black  tracking-widest mb-1 text-glow-silver">Partner Outreach</h3>
                            <p className="text-muted-foreground text-[10px] font-black  tracking-widest opacity-40">Targeted member promotions</p>
                        </div>

                        <div className="flex-1 flex flex-col gap-5 justify-center text-center p-10 border-2 border-dashed border-white/5 rounded-3xl bg-black/40">
                            <p className="text-muted-foreground text-[11px] font-bold  tracking-widest opacity-30">No Active Campaigns</p>
                            <Button size="sm" className="rounded-xl h-11 px-8 font-black text-[10px]  tracking-widest border-glow-silver silver-gradient text-black mx-auto">
                                Initialize Offer
                            </Button>
                        </div>

                        <div className="mt-10 p-5 bg-black/60 rounded-2xl border border-white/5 satin-card relative overflow-hidden group">
                            <div className="absolute inset-0 silver-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center border border-white/10">
                                    <Zap className="text-primary w-5 h-5 fill-current border-glow-silver" />
                                </div>
                                <div>
                                    <h4 className="font-black text-[10px]  tracking-[0.2em] text-glow-silver">Strategic Insight</h4>
                                    <p className="text-[10px] text-muted-foreground opacity-60 leading-relaxed font-bold">Flash sales increase visits by 40% on weekends</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
