"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
    Megaphone,
    Plus,
    Zap,
    Target,
    BarChart3,
    Clock,
    CheckCircle2,
    Calendar,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CAMPAIGNS = [
    {
        id: 1,
        title: "Weekend Warrior Blast",
        status: "Active",
        reach: "1.2k",
        conversions: "84",
        ends: "2 days",
        type: "Flash Sale"
    },
    {
        id: 2,
        title: "New Member Welcome",
        status: "Scheduled",
        reach: "450",
        conversions: "-",
        ends: "Starts Monday",
        type: "Onboarding"
    },
    {
        id: 3,
        title: "Platinum Loyalty Reward",
        status: "Completed",
        reach: "850",
        conversions: "142",
        ends: "Ended Mar 10",
        type: "Reward"
    },
];

export default function MarketingPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-glow-silver text-white">Promotions & Outreach</h1>
                    <p className="text-muted-foreground text-[11px] font-black uppercase tracking-widest opacity-40">Create targeted offers and analyze member engagement</p>
                </div>
                <Button className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-glow-silver silver-gradient text-black">
                    <Plus className="w-4 h-4 mr-2" /> Launch Campaign
                </Button>
            </div>

            {/* Campaign Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Reach", value: "2,482", icon: Target, desc: "Potential subscribers targeted" },
                    { label: "Avg. Conversion", value: "18.4%", icon: BarChart3, desc: "Redemption rate this month" },
                    { label: "ROI Index", value: "4.2x", icon: Zap, desc: "Estimated revenue multiplier" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-8 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="absolute inset-0 silver-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
                        <div className="p-3 bg-black/40 rounded-xl border border-white/10 w-fit mb-6">
                            <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 mb-2">{stat.label}</p>
                        <p className="text-3xl font-black tracking-tighter text-white mb-2 text-glow-silver">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground font-medium opacity-60 uppercase tracking-tight">{stat.desc}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Campaigns */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-glow-silver flex items-center gap-3 ml-1">
                        <Megaphone className="w-4 h-4 text-primary" /> Campaign Roadmap
                    </h3>

                    <div className="space-y-4">
                        {CAMPAIGNS.map((c) => (
                            <Card key={c.id} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:border-white/10 transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 ${c.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]" :
                                                c.status === "Scheduled" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                                    "bg-black/40 text-muted-foreground border-white/10"
                                                }`}>
                                                {c.status}
                                            </Badge>
                                            <span className="text-[9px] font-black uppercase tracking-widest opacity-30">{c.type}</span>
                                        </div>
                                        <h4 className="text-lg font-black tracking-tight text-white group-hover:text-glow-silver transition-all">{c.title}</h4>
                                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest opacity-40">
                                            <span className="flex items-center gap-2"><Target className="w-3 h-3" /> {c.reach} Reach</span>
                                            <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> {c.conversions} Opt-ins</span>
                                            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {c.ends} left</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="h-10 px-6 glass border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-all group-hover:border-primary/30">
                                        Optimization Stats <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Campaign Creation Quick Panel */}
                <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-glow-silver ml-1">Templates</h3>
                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card relative overflow-hidden flex flex-col items-center text-center">
                        <div className="absolute inset-0 silver-gradient opacity-5" />
                        <div className="w-16 h-16 bg-black/40 rounded-2xl flex items-center justify-center border border-white/10 mb-6 shadow-2xl">
                            <Zap className="w-8 h-8 text-primary border-glow-silver fill-current" />
                        </div>
                        <h4 className="text-xl font-black tracking-tight text-white mb-2">Flash Sale Engine</h4>
                        <p className="text-[11px] text-muted-foreground font-medium opacity-60 mb-8 leading-relaxed">
                            Generate immediate foot traffic with 24-hour limited offers targeted at local subscribers.
                        </p>
                        <Button className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest silver-gradient text-black">
                            Use Blueprint
                        </Button>
                    </Card>

                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card opacity-60 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center border border-white/5">
                                <Calendar className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                                <h4 className="font-black text-[11px] uppercase tracking-widest text-white">Loyalty Loop</h4>
                                <p className="text-[9px] text-muted-foreground font-bold uppercase">Automated Reward System</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full h-11 rounded-xl glass border-white/10 text-[9px] font-black uppercase tracking-widest">
                            Configure
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
