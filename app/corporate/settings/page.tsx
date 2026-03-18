"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Building2,
    Bell,
    Shield,
    Mail,
    Globe,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    LogOut,
    Sparkles,
    UserCircle,
    Fingerprint,
    Zap,
    CreditCard,
    DollarSign,
    Target,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useMockStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TAB_ITEMS = [
    { id: "profile", label: "Workspace", icon: Building2 },
    { id: "financials", label: "Financials", icon: CreditCard },
    { id: "notifications", label: "Preferences", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
    const { logout } = useMockStore();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Settings Saved", {
                description: "Your workspace preferences have been updated."
            });
        }, 800);
    };

    const handleLogout = () => {
        logout();
        toast.info("Logged out", { description: "You have been securely signed out." });
        router.push("/auth");
    };

    return (
        <div className="max-w-5xl space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-white">Consolidated Controller</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Manage organization credentials, commercial parameters, and security standards.</p>
                </div>
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="h-9 px-4 text-rose-500/80 hover:bg-rose-500/10 hover:text-rose-500 font-bold text-[10px] tracking-tight rounded-xl transition-all"
                >
                    <LogOut className="w-3.5 h-3.5 mr-2" /> Sign Out
                </Button>
            </div>

            {/* Premium Animated Tabs */}
            <div className="flex items-center p-1.5 bg-black/40 border border-white/5 rounded-2xl w-fit gap-2">
                {TAB_ITEMS.map((tab) => {
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
                                    layoutId="corporate-active-tab-glow"
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

            {/* Tab Content Area */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeTab === "profile" && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <Card className="glass-dark border-white/5 rounded-2xl p-8 overflow-hidden relative satin-card">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                                    <div className="lg:col-span-4 space-y-6">
                                        <div className="w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center font-black text-2xl silver-gradient bg-clip-text text-transparent border-glow-silver">
                                            BK
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-black tracking-tighter text-white">Workspace Profile</h3>
                                            <p className="text-muted-foreground text-[11px] leading-relaxed font-semibold opacity-40">
                                                Update your organization's core profile and identity.
                                            </p>
                                        </div>
                                        <Button variant="outline" className="w-full h-10 rounded-xl glass border-white/10 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Change Logo</Button>
                                    </div>
                                    <div className="lg:col-span-8 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Company Name</Label>
                                                <Input defaultValue="Bank of Kigali" className="bg-black/40 border-white/10 rounded-xl h-12 px-4 text-xs font-bold focus:bg-black/60 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Industry</Label>
                                                <Input defaultValue="Banking & Finance" className="bg-black/40 border-white/10 rounded-xl h-12 px-4 text-xs font-bold focus:bg-black/60 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Work Email</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                                                    <Input defaultValue="hr@bk.rw" className="pl-12 bg-black/40 border-white/10 rounded-xl h-12 text-xs font-bold focus:bg-black/60 transition-all" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Website</Label>
                                                <div className="relative">
                                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                                                    <Input defaultValue="www.bk.rw" className="pl-12 bg-black/40 border-white/10 rounded-xl h-12 text-xs font-bold focus:bg-black/60 transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-6 flex justify-end">
                                            <Button onClick={handleSave} disabled={loading} className="px-10 h-11 rounded-xl font-bold text-[10px] tracking-tight silver-gradient text-black">
                                                {loading ? "Processing..." : "Save Changes"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {activeTab === "financials" && (
                        <motion.div
                            key="financials"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            <Card className="glass-dark border-white/5 rounded-2xl p-8 satin-card space-y-12">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black tracking-wide text-white uppercase">Commercial Engagement Model</h3>
                                    <p className="text-muted-foreground text-[10px] font-semibold opacity-40 uppercase tracking-widest">Select how your organization is billed for wellness access</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { 
                                            id: "subscription", 
                                            title: "Tier Subscription", 
                                            desc: "Fixed monthly fee per employee based on selected tier. Predictable budgeting with no session caps.",
                                            icon: Sparkles,
                                            active: true 
                                        },
                                        { 
                                            id: "utilization", 
                                            title: "Metered Utilization", 
                                            desc: "Pay only for actual gym visits. Rates calculated based on partner pricing with a 1.2x service multiplier.",
                                            icon: Activity,
                                            active: false 
                                        }
                                    ].map((model) => (
                                        <button 
                                            key={model.id}
                                            onClick={() => toast.info(`Model Request Sent`, { description: `Request to switch to ${model.title} has been logged for review.` })}
                                            className={cn(
                                                "relative p-6 rounded-2xl border text-left transition-all duration-300 group satin-card",
                                                model.active 
                                                    ? "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(197,199,201,0.05)]" 
                                                    : "bg-black/40 border-white/5 hover:border-white/10"
                                            )}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl border flex items-center justify-center transition-colors shadow-inner",
                                                    model.active ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/5 border-white/5 text-muted-foreground"
                                                )}>
                                                    <model.icon className="w-5 h-5" />
                                                </div>
                                                {model.active && <div className="text-[8px] font-black uppercase tracking-[0.2em] bg-primary/20 text-primary px-2.5 py-1 rounded-full border border-primary/20">Active Protocol</div>}
                                            </div>
                                            <h4 className={cn("text-xs font-black uppercase tracking-widest mb-2 transition-colors", model.active ? "text-white" : "text-muted-foreground")}>{model.title}</h4>
                                            <p className="text-[10px] text-muted-foreground font-medium opacity-60 leading-relaxed mb-4">{model.desc}</p>
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-1.5 h-1.5 rounded-full", model.active ? "bg-primary animate-pulse" : "bg-white/10")} />
                                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">{model.active ? "Currently Enforced" : "Protocol Standby"}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Billing Cycle</Label>
                                            <Select defaultValue="monthly">
                                                <SelectTrigger className="bg-black/40 border-white/10 rounded-xl h-12 text-xs font-bold">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl">
                                                    <SelectItem value="monthly" className="text-xs font-bold">Monthly Ledger</SelectItem>
                                                    <SelectItem value="quarterly" className="text-xs font-bold">Quarterly Batch</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Default Multiplier</Label>
                                            <div className="relative">
                                                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                                                <Input defaultValue="1.2x" className="pl-12 bg-black/40 border-white/10 rounded-xl h-12 text-xs font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <CreditCard className="w-5 h-5 text-primary" />
                                            </div>
                                            <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Payment Gateway</h4>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-40">Auto-Debit Protocols</span>
                                                <Switch checked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-40">Late Fee Penalties</span>
                                                <Switch checked />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="glass-dark border-white/5 rounded-2xl p-8 satin-card">
                                <h3 className="text-sm font-black tracking-wide text-white mb-8">Client Pricing Configurations</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { type: "Corporate Base", rate: "12,000 RWF", icon: Building2 },
                                        { type: "Walk-in Premium", rate: "18,500 RWF", icon: Zap },
                                        { type: "Ad-hoc Visitor", rate: "15,000 RWF", icon: UserCircle },
                                    ].map((config, i) => (
                                        <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-4 hover:border-white/10 transition-all group">
                                            <config.icon className="w-5 h-5 text-glow-silver opacity-40 group-hover:opacity-100 transition-opacity" />
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50">{config.type}</p>
                                                <p className="text-xl font-black text-white">{config.rate}</p>
                                            </div>
                                            <Input placeholder="Update" className="bg-black/60 border-white/5 h-9 rounded-lg text-[10px] font-bold" />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {activeTab === "notifications" && (
                        <motion.div
                            key="notifications"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {[
                                { title: "Engagement Alerts", desc: "Notify when gym visits drop below quarterly average.", icon: Sparkles },
                                { title: "Monthly Reports", desc: "Automated delivery of utilization PDF reports.", icon: UserCircle },
                                { title: "Security Alerts", desc: "Notify of new device logins or IP changes.", icon: Fingerprint },
                                { title: "Tier Updates", desc: "Alerts for employee subscription change requests.", icon: Zap },
                            ].map((item, i) => (
                                <Card key={i} className="glass-dark border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all satin-card">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center text-secondary group-hover:text-primary transition-all border border-white/5 group-hover:border-primary/20">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold group-hover:text-glow-silver transition-all">{item.title}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium opacity-60 max-w-[200px] leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-emerald-500/40" />
                                </Card>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "security" && (
                        <motion.div
                            key="security"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <Card className="glass-dark border-white/5 rounded-2xl p-8 satin-card">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div className="space-y-8">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-black tracking-tighter text-white">Authentication</h3>
                                            <p className="text-muted-foreground text-[11px] font-semibold opacity-40">Update your administrative credentials securely.</p>
                                        </div>
                                        <div className="space-y-5">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Current Password</Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        defaultValue="••••••••••••"
                                                        className="pl-12 bg-black/40 border-white/10 rounded-xl h-12 text-xs font-bold focus:bg-black/60 transition-all"
                                                    />
                                                    <button
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors p-1"
                                                    >
                                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">New Password</Label>
                                                <Input type="password" placeholder="Min 8 characters required" className="bg-black/40 border-white/10 rounded-xl h-12 px-4 text-xs font-bold focus:bg-black/60 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-black/20 border border-white/5 rounded-2xl flex flex-col justify-center gap-6 satin-card">
                                        <div className="w-12 h-12 bg-emerald-500/5 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-500/10 shadow-inner">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <h4 className="text-xs font-black uppercase tracking-widest">Multi-Factor Auth</h4>
                                            <p className="text-[10px] text-muted-foreground leading-relaxed font-medium opacity-60">Account protected by verification via phone ••56.</p>
                                        </div>
                                        <Button variant="outline" className="w-fit h-9 px-4 rounded-xl glass border-white/10 text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Manage MFA Keys</Button>
                                    </div>
                                </div>
                                <div className="pt-8 flex justify-end">
                                    <Button onClick={handleSave} disabled={loading} className="px-10 h-11 rounded-xl font-bold text-[10px] tracking-tight silver-gradient text-black">
                                        Update Security
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
