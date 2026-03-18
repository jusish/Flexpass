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
    Save
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
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-white text-sm">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Platform Governance</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Master system parameters, security protocols, and global financial configurations</p>
                </div>
                <Button size="sm" className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5">
                    <Save className="w-4 h-4 mr-2" /> Commit Changes
                </Button>
            </div>

            <Tabs defaultValue="financials" className="space-y-8">
                <TabsList className="bg-black/40 border border-white/5 p-1.5 h-16 rounded-2xl w-fit">
                    <TabsTrigger value="financials" className="rounded-xl px-10 h-full text-[11px] font-black tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Financial Protocols</TabsTrigger>
                    <TabsTrigger value="security" className="rounded-xl px-10 h-full text-[11px] font-black tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Security & Ops</TabsTrigger>
                    <TabsTrigger value="nodes" className="rounded-xl px-10 h-full text-[11px] font-black tracking-widest data-[state=active]:bg-white/5 data-[state=active]:text-white transition-all">Node Governance</TabsTrigger>
                </TabsList>

                <TabsContent value="financials" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="glass-dark p-10 border-white/5 rounded-2xl satin-card space-y-8">
                            <div>
                                <h3 className="text-sm font-black tracking-widest text-white">Platform Commission</h3>
                                <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1">Global take-rate and margin management</p>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black tracking-widest opacity-60">Base Margin Percentage</Label>
                                    <div className="relative">
                                        <Input defaultValue="35" className="h-14 bg-black/40 border-white/5 rounded-2xl pl-6 text-lg font-black text-white" />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-black">%</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black tracking-widest opacity-60">Value Added Tax (VAT)</Label>
                                    <div className="relative">
                                        <Input defaultValue="18" className="h-14 bg-black/40 border-white/5 rounded-2xl pl-6 text-lg font-black text-white" />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-black">%</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="glass-dark p-10 border-white/5 rounded-2xl satin-card space-y-8">
                            <div>
                                <h3 className="text-sm font-black tracking-widest text-white">Settlement Automation</h3>
                                <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1">Partner payout frequency and verification gates</p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white tracking-widest">Auto-Payout Cycle</p>
                                        <p className="text-[9px] text-muted-foreground font-bold opacity-40">Monthly disbursements (EOM)</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white tracking-widest">Audit Verification Gate</p>
                                        <p className="text-[9px] text-muted-foreground font-bold opacity-40">Flag payouts exceeding RWF 10M</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-8">
                    <Card className="glass-dark p-10 border-white/5 rounded-2xl satin-card space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <Lock className="w-6 h-6 text-rose-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black tracking-widest text-white">Access Governance</h3>
                                <p className="text-muted-foreground text-[10px] font-semibold opacity-40 mt-1">Admin role assignment and terminal security</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                           {[
                            { role: "Global SuperAdmin", desc: "Full infrastructure control", status: "Active" },
                            { role: "Financial Auditor", desc: "Payment & Settlement oversight", status: "Read-only" },
                            { role: "Operations Lead", desc: "Sponsor & Partner lifecycle", status: "Active" },
                           ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white/2 rounded-2xl border border-white/5">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-black text-white tracking-widest">{item.role}</p>
                                    <p className="text-[9px] text-muted-foreground font-bold opacity-40 tracking-widest">{item.desc}</p>
                                </div>
                                <Badge variant="outline" className="text-[8px] font-black border-white/10 opacity-60">{item.status}</Badge>
                            </div>
                           ))}
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
