"use client";

import React, { useState } from "react";
import {
    Settings,
    User,
    Shield,
    Bell,
    Wallet,
    AtSign,
    Camera,
    Save,
    Lock,
    ExternalLink,
    Globe,
    CreditCard,
    Zap,
    Image as ImageIcon
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function CoachSettings() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Manage your profile and portal preferences</p>
                </div>
                <div className="flex gap-3">
                    <Button className="h-11 px-8 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95">
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Config */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card space-y-10">
                        <div className="flex items-center gap-6 border-b border-white/10 pb-8">
                            <div className="relative group">
                                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl text-muted-foreground overflow-hidden">
                                    JP
                                </div>
                                <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                                    <Camera className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-white tracking-tight">Jean Pierre</h3>
                                <p className="text-xs font-medium text-muted-foreground opacity-60">Master Coach • Active since Oct 2025</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2.5">
                                <Label className="text-[11px] font-semibold  tracking-wider opacity-60 ml-1">Full Name</Label>
                                <Input placeholder="Jean Pierre" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium text-white px-5" />
                            </div>
                            <div className="space-y-2.5">
                                <Label className="text-[11px] font-semibold  tracking-wider opacity-60 ml-1">Email Address</Label>
                                <Input placeholder="jp@flexpass.com" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium text-white px-5" />
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <Label className="text-[11px] font-semibold  tracking-wider opacity-60 ml-1">Professional Bio</Label>
                            <Textarea
                                placeholder="Elite HIIT Specialist with focus on metabolic conditioning..."
                                className="bg-white/5 border-white/10 rounded-xl min-h-[140px] text-xs font-medium text-white p-6 leading-relaxed"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2.5">
                                <Label className="text-[11px] font-semibold  tracking-wider opacity-60 ml-1">Specialization</Label>
                                <Select defaultValue="hiit">
                                    <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-medium">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="glass border-white/10">
                                        <SelectItem value="hiit" className="text-xs">HIIT & Strength</SelectItem>
                                        <SelectItem value="yoga" className="text-xs">Yoga Flow</SelectItem>
                                        <SelectItem value="boxing" className="text-xs">Combat Sports</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2.5">
                                <Label className="text-[11px] font-semibold  tracking-wider opacity-60 ml-1">Work Location</Label>
                                <Input placeholder="Kigali, Rwanda" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium text-white px-5" />
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card space-y-8">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                            <Wallet className="w-5 h-5 text-indigo-400" />
                            <h3 className="text-sm font-bold text-white tracking-wide ">Rate Configuration</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2.5">
                                <Label className="text-[11px] font-semibold  tracking-wider opacity-60 ml-1">Single Session (RWF)</Label>
                                <Input type="number" placeholder="15000" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium text-white px-5" />
                            </div>
                            <div className="space-y-2.5">
                                <Label className="text-[11px] font-semibold  tracking-wider opacity-60 ml-1">Monthly Management (RWF)</Label>
                                <Input type="number" placeholder="120000" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium text-white px-5" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Side Configs */}
                <div className="space-y-8">
                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card space-y-8">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                            <Bell className="w-5 h-5 text-amber-500" />
                            <h3 className="text-xs font-bold text-white tracking-wide ">Preferences</h3>
                        </div>
                        <div className="space-y-6">
                            {[
                                { t: "New Bookings", d: "Alert when a client joins a session" },
                                { t: "Payment Reports", d: "Weekly yield statements ready" },
                                { t: "Partner Updates", d: "New available facility alerts" },
                            ].map((n, i) => (
                                <div key={i} className="flex items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-bold text-white/90">{n.t}</p>
                                        <p className="text-[10px] text-muted-foreground opacity-50 font-medium leading-tight">{n.d}</p>
                                    </div>
                                    <Switch className="data-[state=checked]:bg-indigo-500 scale-90" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="glass-dark p-8 border-white/5 rounded-2xl satin-card space-y-8">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                            <Lock className="w-5 h-5 text-rose-500" />
                            <h3 className="text-xs font-bold text-white tracking-tight ">Security</h3>
                        </div>
                        <div className="space-y-4">
                            <Button variant="outline" className="w-full h-11 rounded-xl border-white/5 bg-white/5 text-xs font-bold hover:bg-white/10">
                                Change Password
                            </Button>
                            <Button variant="outline" className="w-full h-11 rounded-xl border-white/5 bg-white/5 text-xs font-bold hover:bg-rose-500/10 hover:border-rose-500/20 text-rose-400 hover:text-rose-500">
                                Deactivate Account
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
