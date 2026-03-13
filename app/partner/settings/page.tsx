"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
    Settings,
    Store,
    Bell,
    Lock,
    Shield,
    MapPin,
    Globe,
    Save,
    CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PartnerSettingsPage() {
    const [activeTab, setActiveTab] = useState("facility");

    const TABS = [
        { id: "facility", label: "Global Info", icon: Store },
        { id: "verification", label: "Security Pol", icon: Shield },
        { id: "billing", label: "Settlement", icon: CreditCard },
        { id: "notifications", label: "Protocols", icon: Bell },
    ];

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-glow-silver text-white">Facility Controller</h1>
                    <p className="text-muted-foreground text-[11px] font-black uppercase tracking-widest opacity-40">Configure operational settings and terminal verification protocols</p>
                </div>
                <Button className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-glow-silver silver-gradient text-black">
                    <Save className="w-4 h-4 mr-2" /> Commit Profile
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <div className="flex items-center p-1.5 bg-black/40 border border-white/5 rounded-2xl w-fit gap-2">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative flex items-center gap-3 px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                                    isActive ? "text-black" : "text-muted-foreground hover:text-white/60"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="partner-active-tab-glow"
                                        className="absolute inset-0 silver-gradient rounded-xl shadow-[0_0_20px_rgba(197,199,201,0.2)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2.5">
                                    <tab.icon className={cn("w-4 h-4 transition-transform", isActive && "scale-110")} />
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <TabsContent value="facility" className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <Card className="lg:col-span-8 glass-dark p-8 border-white/5 rounded-2xl satin-card">
                            <h3 className="text-sm font-black uppercase tracking-widest text-glow-silver mb-8">Facility Identification</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 ml-1">Establishment Name</label>
                                    <Input defaultValue="Waka Fitness" className="bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-black/60 focus:border-white/20 transition-all px-5" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 ml-1">Contact Protocol (Email)</label>
                                    <Input defaultValue="terminal@wakafit.com" className="bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-black/60 focus:border-white/20 transition-all px-5" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 ml-1">Geographical Node</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                                        <Input defaultValue="Phase 2, Kigali Heights, Rwanda" className="pl-12 bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-black/60 focus:border-white/20 transition-all px-5" />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 ml-1">Digital Presence (URL)</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                                        <Input defaultValue="https://wakafit.com" className="pl-12 bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-black/60 focus:border-white/20 transition-all px-5" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="lg:col-span-4 glass-dark p-8 border-white/5 rounded-2xl satin-card relative overflow-hidden flex flex-col items-center justify-center text-center">
                            <div className="absolute inset-0 silver-gradient opacity-5" />
                            <div className="w-32 h-32 bg-black/40 rounded-3xl flex items-center justify-center border border-white/10 mb-8 shadow-2xl relative group">
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                                <Store className="w-12 h-12 text-primary border-glow-silver" />
                            </div>
                            <Button variant="outline" className="h-10 px-8 glass border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-all">
                                Update Brand Asset
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="verification">
                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card space-y-10">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-primary" /> Multi-Factor Identification
                                </h4>
                                <p className="text-[10px] text-muted-foreground font-medium opacity-40 uppercase tracking-widest">Require biometric approval for terminal scans</p>
                            </div>
                            <Switch checked />
                        </div>
                        <div className="flex items-center justify-between border-t border-white/5 pt-10">
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-primary" /> Session Isolation
                                </h4>
                                <p className="text-[10px] text-muted-foreground font-medium opacity-40 uppercase tracking-widest">Terminate verification sessions after 5 minutes of inactivity</p>
                            </div>
                            <Switch checked />
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
