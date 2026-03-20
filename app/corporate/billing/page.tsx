"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    CreditCard,
    Check,
    Zap,
    ShieldCheck,
    History,
    Download,
    Smartphone,
    Calendar,
    BadgeCheck,
    ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useMockStore } from "@/lib/store";
import { MOCK_INVOICES, type Invoice } from "@/lib/mock-data";
import { BillingHistoryModal } from "@/components/corporate/billing-history-modal";

const PLANS = [
    {
        id: "silver",
        name: "Silver Tier",
        price: "450,000",
        period: "per month",
        desc: "Essential wellness for small teams",
        features: ["10+ Local Gyms", "Up to 50 Employees", "Standard Reports", "Email Invoicing"]
    },
    {
        id: "gold",
        name: "Gold Tier",
        price: "1,250,000",
        period: "per month",
        desc: "Comprehensive health for growth",
        features: ["25+ Premium Venues", "Up to 200 Employees", "Detailed Reports", "Account Manager"],
        popular: true
    },
    {
        id: "platinum",
        name: "Platinum Tier",
        price: "3,500,000",
        period: "per month",
        desc: "The ultimate wellness luxury",
        features: ["Unlimited Access", "Unlimited Employees", "Company Integration", "VIP Concierge"]
    }
];

export default function BillingPage() {
    const { companyPlan, updatePlan } = useMockStore();
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const activePlan = companyPlan.toLowerCase();

    const handleUpgrade = (id: string) => {
        if (id === activePlan) return;
        setIsUpdating(id);
        setTimeout(() => {
            updatePlan(id.charAt(0).toUpperCase() + id.slice(1) as any);
            setIsUpdating(null);
            toast.success(`Subscription Updated`, { description: `You are now on the ${id} tier.` });
        }, 1200);
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Billing & Subscriptions</h1>
                <p className="text-muted-foreground text-xs font-medium">Manage your corporate plans and financial history.</p>
            </div>

            {/* Subscription Info Card */}
            <div className="flex flex-col lg:flex-row gap-4">
                <Card className="glass-dark border-white/5 p-6 flex-1 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                            <BadgeCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5 opacity-60">Current ACTIVE PLAN</p>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold uppercase tracking-wide">{activePlan} Access</h2>
                                <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold">RENEWING APR 15</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-8 border-l border-white/10 pl-8 h-10 max-md:hidden items-center">
                        <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-40">Monthly Spend</p>
                            <p className="text-sm font-bold">RWF {activePlan === 'gold' ? '1.25M' : activePlan === 'silver' ? '450K' : '3.5M'}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-40">Active Seats</p>
                            <p className="text-sm font-bold">142 / {activePlan === 'platinum' ? '∞' : activePlan === 'gold' ? '200' : '50'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-40">Balance</p>
                            <p className="text-xs font-bold text-primary">No overdue</p>
                        </div>
                        <Button variant="outline" className="h-9 px-4 glass border-white/10 rounded-xl text-xs font-bold">Manage Payment</Button>
                    </div>
                </Card>
            </div>

            {/* Plan Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map((plan) => (
                    <Card
                        key={plan.id}
                        className={cn(
                            "p-6 rounded-2xl border-white/5 transition-all duration-300 flex flex-col relative",
                            activePlan === plan.id ? "bg-white/4 ring-1 ring-primary/50" : "bg-white/1 hover:bg-white/3"
                        )}
                    >
                        {plan.popular && (
                            <Badge className="absolute top-4 right-4 bg-primary text-white text-[9px] font-black uppercase rounded-full">Recommended</Badge>
                        )}
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 opacity-50">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-2xl font-bold">RWF {plan.price}</span>
                            <span className="text-[10px] text-muted-foreground font-medium">{plan.period}</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium mb-6 leading-relaxed">{plan.desc}</p>

                        <div className="space-y-3 mb-8 flex-1">
                            {plan.features.map((f, fi) => (
                                <div key={fi} className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                    <span className="text-xs font-medium opacity-80">{f}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => handleUpgrade(plan.id)}
                            disabled={activePlan === plan.id || isUpdating === plan.id}
                            className={cn(
                                "w-full h-10 rounded-xl text-xs font-bold uppercase tracking-wider",
                                activePlan === plan.id ? "bg-white/5 border-none cursor-default" : "border-glow"
                            )}
                        >
                            {isUpdating === plan.id ? "Processing..." : activePlan === plan.id ? "Current Access" : "Select Tier"}
                        </Button>
                    </Card>
                ))}
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-dark border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <History className="w-4 h-4 text-primary" /> Recent Invoices
                        </h3>
                        <Button
                            variant="link"
                            className="text-primary text-xs font-bold p-0"
                            onClick={() => setIsHistoryOpen(true)}
                        >
                            History
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {MOCK_INVOICES.slice(0, 3).map((inv) => (
                            <div key={inv.id} className="flex items-center justify-between p-3.5 bg-white/2 border border-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-1.5 h-1.5 rounded-full",
                                        inv.status === "Paid" ? "bg-primary shadow-[0_0_8px_rgba(197,197,201,0.5)]" :
                                            inv.status === "Pending" ? "bg-amber-500/50" : "bg-rose-500/50"
                                    )} />
                                    <div>
                                        <p className="text-xs font-bold">{inv.id}</p>
                                        <p className="text-[10px] text-muted-foreground font-medium opacity-60">{inv.period}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-xs font-bold">{inv.amount}</p>
                                        <p className={cn("text-[8px] font-black uppercase tracking-widest leading-none",
                                            inv.status === "Paid" ? "text-primary" :
                                                inv.status === "Pending" ? "text-amber-500/70" : "text-rose-500/70"
                                        )}>{inv.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="space-y-4">
                    <Card className="glass-dark border-white/5 p-6 rounded-2xl flex items-start gap-4 satin-card">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-secondary border border-white/5 shadow-inner">
                            <ShieldCheck className="w-5 h-5 border-glow-silver" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-1 uppercase tracking-wide text-glow-silver">Secure Billing</h4>
                            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">Official and transparent invoicing with high-level payment security.</p>
                        </div>
                    </Card>
                    <div className="p-6 bg-linear-to-r from-white/5 to-transparent border border-white/10 rounded-2xl flex items-center justify-between satin-card">
                        <div className="space-y-0.5">
                            <p className="text-xs font-bold text-transparent bg-clip-text silver-gradient">Annual Savings</p>
                            <p className="text-[10px] text-muted-foreground font-medium">Switch to yearly and save up to 20% total cost.</p>
                        </div>
                        <Button className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-glow-silver silver-gradient text-black">Upgrade Early</Button>
                    </div>
                </div>
            </div>

            <BillingHistoryModal
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
            />
        </div>
    );
}
