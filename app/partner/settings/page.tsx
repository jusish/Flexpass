"use client";

import React, { useState } from "react";
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
    CreditCard,
    Image as ImageIcon,
    Tag,
    Star,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function PartnerSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    const TABS = [
        { id: "profile", label: "Facility Profile", icon: Store },
        { id: "pricing", label: "Product Pricing", icon: Tag },
        { id: "financials", label: "Financials", icon: CreditCard },
        { id: "verification", label: "Security", icon: Shield },
    ];

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-glow-silver text-white">Console Operations</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Manage your facility ecosystem, commercial parameters, and security protocols</p>
                </div>
                <Button className="h-11 px-8 rounded-xl text-[10px] font-bold tracking-tight silver-gradient text-black">
                    <Save className="w-4 h-4 mr-2" /> Sync Configuration
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
                                        layoutId="partner-settings-tab"
                                        className="absolute inset-0 silver-gradient rounded-xl shadow-[0_0_20px_rgba(197,199,201,0.2)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2.5">
                                    <tab.icon className={cn("w-4 h-4", isActive && "scale-110")} />
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <TabsContent value="profile" className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <Card className="lg:col-span-8 glass-dark p-8 border-white/5 rounded-2xl satin-card space-y-8">
                            <div>
                                <h3 className="text-sm font-black tracking-wide text-glow-silver mb-8">Public Identity</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Establishment Name</label>
                                        <Input defaultValue="Waka Fitness" className="bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all px-5" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Contact Email</label>
                                        <Input defaultValue="terminal@wakafit.com" className="bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all px-5" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Geographical Node</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                                            <Input defaultValue="Phase 2, Kigali Heights, Rwanda" className="pl-12 bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all px-5" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Digital Narrative</label>
                                        <textarea 
                                            defaultValue="Waka Fitness is a premium wellness hub in the heart of Kigali, offering state-of-the-art equipment and elite coaching protocols."
                                            className="w-full min-h-[120px] bg-black/40 border border-white/10 rounded-xl p-5 text-[11px] font-bold tracking-tight text-white focus:outline-none focus:border-white/20 focus:bg-black/60 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <h3 className="text-sm font-black tracking-wide text-glow-silver mb-8">Visual Assets</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="aspect-square bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center group cursor-pointer hover:border-primary/20 transition-all overflow-hidden relative">
                                            <ImageIcon className="w-6 h-6 text-muted-foreground opacity-20 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                    <div className="aspect-square border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:border-white/20 transition-all">
                                        <ImageIcon className="w-6 h-6 text-muted-foreground opacity-20 mb-2" />
                                        <span className="text-[8px] font-black uppercase tracking-widest opacity-30">Add Media</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="lg:col-span-4 space-y-8">
                            <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card text-center">
                                <div className="w-24 h-24 bg-black/40 rounded-3xl flex items-center justify-center border border-white/10 mx-auto mb-6 shadow-2xl relative group">
                                    <Store className="w-10 h-10 text-primary" />
                                </div>
                                <h4 className="text-[11px] font-black tracking-widest text-white mb-1">Establishment Symbol</h4>
                                <p className="text-[9px] text-muted-foreground font-medium opacity-40 mb-6 uppercase">HQ Quality Logo / Symbol</p>
                                <Button variant="outline" className="h-10 w-full glass border-white/10 rounded-xl text-[9px] font-bold tracking-wide opacity-60 hover:opacity-100 transition-all">
                                    Update Asset
                                </Button>
                            </Card>

                            <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Sentiment Control</h4>
                                    <Badge variant="outline" className="text-[8px] font-black bg-emerald-500/5 text-emerald-500 border-emerald-500/10 uppercase tracking-widest">Public</Badge>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <Star className="w-4 h-4 text-emerald-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Reviews</span>
                                        </div>
                                        <Switch checked />
                                    </div>
                                    <p className="text-[9px] text-muted-foreground opacity-40 font-medium leading-relaxed">
                                        Enabling reviews allows verified members to log sentiment on your profile.
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-8">
                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card">
                        <h3 className="text-sm font-black tracking-wide text-glow-silver mb-8">Subscription Archetypes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { tier: "Platinum Elite", price: "120", color: "text-primary" },
                                { tier: "Gold Standard", price: "80", color: "text-secondary" },
                                { tier: "Silver Basic", price: "50", color: "text-muted-foreground" },
                            ].map((plan) => (
                                <div key={plan.tier} className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-6 hover:border-white/10 transition-all group">
                                    <div className="flex items-center justify-between">
                                        <Tag className={cn("w-5 h-5", plan.color)} />
                                        <Switch checked />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">{plan.tier}</h4>
                                        <div className="mt-2 flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-white">{plan.price},000 RWF</span>
                                            <span className="text-[10px] font-black text-muted-foreground uppercase opacity-40">/ MO</span>
                                        </div>
                                    </div>
                                    <Input placeholder="Adjust Price" className="bg-black/60 border-white/5 rounded-xl h-10 text-[10px] font-bold" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card">
                        <h3 className="text-sm font-black tracking-wide text-glow-silver mb-8">Point of Sale (Walk-ins)</h3>
                        <div className="flex items-center justify-between bg-black/40 p-6 rounded-2xl border border-white/5">
                            <div className="space-y-1">
                                <h4 className="text-[11px] font-black tracking-widest text-white">Ad-hoc Entry Fee</h4>
                                <p className="text-[9px] text-muted-foreground opacity-40 font-medium">Standard price for non-subscribed visitors</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-black text-emerald-500 opacity-40">RWF</span>
                                    <Input defaultValue="15,000" className="pl-12 w-32 bg-black/60 border-white/10 rounded-xl h-12 text-[13px] font-black" />
                                </div>
                                <Button variant="outline" className="glass border-white/10 h-12 px-6 rounded-xl text-[9px] font-bold tracking-tight">Update</Button>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="financials" className="space-y-8">
                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card">
                        <h3 className="text-sm font-black tracking-wide text-glow-silver mb-8">Settlement Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Invoicing Cycle</label>
                                <Select defaultValue="monthly">
                                    <SelectTrigger className="bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold text-white">
                                        <Clock className="w-4 h-4 mr-2 text-secondary opacity-40" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl text-white">
                                        <SelectItem value="monthly" className="text-[11px] font-bold uppercase tracking-widest">Monthly Settlement</SelectItem>
                                        <SelectItem value="quarterly" className="text-[11px] font-bold uppercase tracking-widest">Quarterly Batch</SelectItem>
                                        <SelectItem value="immediate" className="text-[11px] font-bold uppercase tracking-widest">On-Demand Verification</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Preferred Currency</label>
                                <Select defaultValue="rwf">
                                    <SelectTrigger className="bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold text-white">
                                        <CreditCard className="w-4 h-4 mr-2 text-secondary opacity-40" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl text-white">
                                        <SelectItem value="rwf" className="text-[11px] font-bold uppercase tracking-widest">Rwandan Franc (RWF)</SelectItem>
                                        <SelectItem value="usd" className="text-[11px] font-bold uppercase tracking-widest">United States Dollar (USD)</SelectItem>
                                        <SelectItem value="eur" className="text-[11px] font-bold uppercase tracking-widest">Euro (EUR)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8">
                            <CreditCard className="w-12 h-12 text-primary opacity-5" />
                        </div>
                        <h3 className="text-sm font-black tracking-wide text-glow-silver mb-8">Bank Credentials</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">IBAN / Account Number</label>
                                <Input defaultValue="RW76 BKIG 0012 3456 7890 12" className="bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold text-white px-5" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">SWIFT / BIC Code</label>
                                <Input defaultValue="BKIGRWKX" className="bg-black/40 border-white/10 rounded-xl h-12 text-[11px] font-bold text-white px-5" />
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="verification">
                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card space-y-10 text-white">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-primary" /> Multi-Factor Identification
                                </h4>
                                <p className="text-[10px] text-muted-foreground font-semibold tracking-wide opacity-50 uppercase">Require biometric approval for terminal scans</p>
                            </div>
                            <Switch checked />
                        </div>
                        <div className="flex items-center justify-between border-t border-white/5 pt-10">
                            <div className="space-y-1">
                                <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-primary" /> Session Isolation
                                </h4>
                                <p className="text-[10px] text-muted-foreground font-semibold tracking-wide opacity-50 uppercase">Terminate verification sessions after 5 minutes of inactivity</p>
                            </div>
                            <Switch checked />
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
