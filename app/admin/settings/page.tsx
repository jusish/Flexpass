"use client";

import React from "react";
import {
    Users,
    Building2,
    CreditCard,
    TrendingUp,
    ShieldCheck,
    Activity,
    Globe,
    Zap,
    Download,
    Settings,
    Lock,
    Bell,
    Database,
    Cloud,
    Key,
    Save,
    Shield
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PlatformSettings() {
    return (
        <div className="space-y-10 pb-20 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 font-sans">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tighter text-white  group-hover:text-glow-silver transition-all leading-none">Platform Governance</h1>
                    <p className="text-muted-foreground text-[11px] font-black opacity-30  tracking-[0.2em] mt-3 leading-relaxed">Master system parameters, security protocols, and global financial configurations audit</p>
                </div>
                <Button size="sm" className="silver-gradient text-black h-14 px-10 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5  active:scale-95">
                    <Save className="w-4 h-4 mr-3" /> Commit Changes
                </Button>
            </div>

            <Tabs defaultValue="financials" className="space-y-10">
                <TabsList className="bg-black/40 border border-white/5 p-2 h-16 rounded-3xl backdrop-blur-3xl inline-flex font-sans">
                    {[
                        { val: "financials", label: "Financial Protocols", icon: CreditCard },
                        { val: "security", label: "Security & Ops", icon: Shield },
                        { val: "nodes", label: "Node Governance", icon: Activity },
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.val}
                            value={tab.val}
                            className="h-12 px-10 rounded-2xl text-[10px] font-black tracking-widest  data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all flex items-center gap-3 group"
                        >
                            <tab.icon className={cn("w-4 h-4 opacity-30 group-data-[state=active]:opacity-100", tab.val === "financials" && "text-emerald-400")} />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="financials" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card space-y-12 relative overflow-hidden shadow-xl font-sans">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/2 blur-[50px] pointer-events-none" />
                            <div className="space-y-2 relative z-10">
                                <h3 className="text-xl font-black tracking-tighter text-white  leading-none">Platform Commission</h3>
                                <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-[0.2em] mt-2">Global take-rate and clinical margin yield management</p>
                            </div>
                            <div className="space-y-10 relative z-10">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black tracking-[0.3em] text-muted-foreground opacity-30  ml-1">Base Margin Percentage</Label>
                                    <div className="relative group">
                                        <input
                                            defaultValue="35"
                                            className="h-16 w-full bg-white/5 border border-white/10 rounded-2xl px-8 text-2xl font-black text-white tabular-nums tracking-widest focus:bg-white/10 transition-all shadow-inner focus:ring-1 focus:ring-white/10"
                                        />
                                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground opacity-20 font-black text-xl tabular-nums">%</span>
                                    </div>
                                </div>
                                <div className="space-y-4 font-sans">
                                    <Label className="text-[10px] font-black tracking-[0.3em] text-muted-foreground opacity-30  ml-1">Value Added Tax (VAT)</Label>
                                    <div className="relative group">
                                        <input
                                            defaultValue="18"
                                            className="h-16 w-full bg-white/5 border border-white/10 rounded-2xl px-8 text-2xl font-black text-white tabular-nums tracking-widest focus:bg-white/10 transition-all shadow-inner focus:ring-1 focus:ring-white/10"
                                        />
                                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground opacity-20 font-black text-xl tabular-nums">%</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="glass-dark p-10 border-white/5 rounded-[2.5rem] satin-card space-y-12 relative overflow-hidden shadow-xl font-sans">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/2 blur-[50px] pointer-events-none" />
                            <div className="space-y-2 relative z-10 font-sans">
                                <h3 className="text-xl font-black tracking-tighter text-white  leading-none">Settlement Automation</h3>
                                <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-[0.2em] mt-2 leading-relaxed">Partner clinical payout frequency and automated verification gate thresholds</p>
                            </div>
                            <div className="space-y-8 relative z-10">
                                <div className="flex items-center justify-between p-8 bg-white/2 rounded-[2rem] border border-white/5 shadow-inner transition-all hover:bg-white/5 group/switch">
                                    <div className="space-y-2">
                                        <p className="text-[11px] font-black text-white tracking-[0.2em]  leading-none group-hover/switch:text-glow-silver transition-all">Auto-Payout Cycle</p>
                                        <p className="text-[9px] text-muted-foreground font-black opacity-20  tracking-widest leading-relaxed">Initiate global disbursements at clinical cycle EOM</p>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-emerald-500 shadow-xl" />
                                </div>
                                <div className="flex items-center justify-between p-8 bg-white/2 rounded-[2rem] border border-white/5 shadow-inner transition-all hover:bg-white/5 group/switch">
                                    <div className="space-y-2">
                                        <p className="text-[11px] font-black text-white tracking-[0.2em]  leading-none group-hover/switch:text-glow-silver transition-all">Audit Verification Gate</p>
                                        <p className="text-[9px] text-muted-foreground font-black opacity-20  tracking-widest leading-relaxed">Flag and halt payouts exceeding RWF 10M protocol threshold</p>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-indigo-500 shadow-xl" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans">
                    <Card className="glass-dark p-12 border-white/5 rounded-[2.5rem] satin-card space-y-12 relative overflow-hidden shadow-xl font-sans">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/1 blur-[100px] pointer-events-none" />
                        <div className="flex items-center gap-6 relative z-10 font-sans">
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 shadow-inner group transition-transform hover:scale-110">
                                <Lock className="w-8 h-8 text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black tracking-tighter text-white  leading-none">Security Access Governance</h3>
                                <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-[0.2em] mt-2 leading-relaxed">Administrative role assignment and terminal protocol authority audit</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            {[
                                { role: "Global SuperAdmin", desc: "Full clinical infrastructure control", status: "Active Protocol", color: "text-rose-500" },
                                { role: "Financial Auditor", desc: "Payment & Settlement registry oversight", status: "Read-only Flow", color: "text-indigo-400" },
                                { role: "Operations Lead", desc: "Sponsor & Partner node lifecycle", status: "Active Protocol", color: "text-emerald-400" },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col justify-between p-8 bg-white/2 rounded-[2rem] border border-white/5 shadow-inner transition-all hover:bg-white/5 hover:scale-[1.02] cursor-pointer group/card h-full font-sans">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <p className={cn("text-[13px] font-black  tracking-tight group-hover/card:text-glow-silver transition-all leading-none", item.color)}>{item.role}</p>
                                            <Badge variant="outline" className="text-[8px] font-black border-none bg-white/5 text-muted-foreground opacity-30  px-3 py-1 rounded-lg tracking-widest shadow-inner">{item.status}</Badge>
                                        </div>
                                        <p className="text-[9px] text-muted-foreground font-black opacity-20  tracking-widest leading-relaxed">{item.desc}</p>
                                    </div>
                                    <Button variant="ghost" className="h-12 mt-10 rounded-xl text-[9px] font-black border border-white/10 bg-white/2 text-muted-foreground opacity-20 hover:opacity-100 hover:text-white transition-all  tracking-[0.2em] w-full">
                                        RECONFIGURE ACCESS
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
