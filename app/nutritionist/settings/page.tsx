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
    Image as ImageIcon,
    Stethoscope,
    HeartPulse,
    Apple
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

export default function NutritionistSettings() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white  italic">Clinical Config</h1>
                    <p className="text-muted-foreground text-[10px] font-semibold opacity-40  tracking-[0.2em] mt-1 font-sans italic">Professional Clinical Identity & Health Data Parameters</p>
                </div>
                <div className="flex gap-4">
                    <Button className="h-14 px-10 rounded-2xl text-[10px] font-black tracking-widest  silver-gradient text-black shadow-2xl shadow-emerald-500/5 transition-all active:scale-95 font-sans italic">
                        <Save className="w-4 h-4 mr-3" /> Commit Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 font-sans italic">
                {/* Clinical Profile */}
                <div className="lg:col-span-2 space-y-12">
                    <Card className="glass-dark p-12 border-white/5 rounded-[40px] satin-card space-y-10">
                        <div className="flex items-center gap-8 border-b border-white/10 pb-10">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center font-black text-2xl text-secondary overflow-hidden font-sans italic">
                                    DR
                                </div>
                                <div className="absolute inset-0 bg-black/60 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-white  tracking-widest font-sans italic">Dr. Sarah Pierre</h3>
                                <p className="text-[10px] font-bold text-muted-foreground opacity-40  tracking-widest font-sans italic">Senior Clinical Nutritionist • Verified Node</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1 font-sans italic">Clinical identity</Label>
                                <Input placeholder="Sarah Pierre" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 font-sans italic" />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1 font-sans italic">Contact hub (Email)</Label>
                                <Input placeholder="dr.sarah@flexhealth.com" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 font-sans italic" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1 font-sans italic">Professional Philosophy</Label>
                            <Textarea
                                placeholder="Specializing in metabolic syndrome reversal and elite athletic performance protocols..."
                                className="bg-white/5 border-white/10 rounded-3xl min-h-[160px] text-xs font-bold text-white p-8 font-sans italic"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1 font-sans italic">Clinical Speciality</Label>
                                <Select defaultValue="metabolic">
                                    <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl text-[10px] font-bold tracking-widest  font-sans italic">
                                        <SelectValue placeholder="Discipline" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black/95 border-white/10 backdrop-blur-2xl p-2 rounded-2xl italic  font-sans">
                                        <SelectItem value="metabolic" className="text-[10px] font-black rounded-xl font-sans italic">METABOLIC RESET</SelectItem>
                                        <SelectItem value="sports" className="text-[10px] font-black rounded-xl font-sans italic">SPORTS NUTRITION</SelectItem>
                                        <SelectItem value="clinical" className="text-[10px] font-black rounded-xl font-sans italic">CLINICAL DIETETICS</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1 font-sans italic">Clinical License #</Label>
                                <Input placeholder="RMC-42901-X" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 font-sans italic " />
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-dark p-12 border-white/5 rounded-[40px] satin-card space-y-10">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-6  italic font-sans">
                            <CreditCard className="w-5 h-5 text-emerald-500" />
                            <h3 className="text-sm font-black text-white tracking-widest  italic">Fiscal Reconciliation</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1 font-sans italic">Consultation Yield (RWF)</Label>
                                <Input type="number" placeholder="45000" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 font-sans italic" />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black tracking-widest text-muted-foreground opacity-40  ml-1 font-sans italic">Audit Disbursement Node</Label>
                                <Input placeholder="MTN MoMo Hub" className="bg-white/5 border-white/10 rounded-2xl h-14 text-xs font-bold text-white px-6 font-sans italic " />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Logistics */}
                <div className="space-y-10 font-sans italic">
                    <Card className="glass-dark p-10 border-white/5 rounded-[32px] satin-card space-y-10 font-sans italic">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-6 italic">
                            <Bell className="w-5 h-5 text-amber-500" />
                            <h3 className="text-xs font-black text-white tracking-widest  italic">Clinical Alerts</h3>
                        </div>
                        <div className="space-y-8">
                            {[
                                { t: "Appointment Ingress", d: "Alert when patient secures consultation node" },
                                { t: "Metabolic Criticality", d: "Alert on abnormal patient dataset input" },
                                { t: "Clinical Settlement", d: "Weekly financial audit is authorized" },
                            ].map((n, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white  tracking-widest italic">{n.t}</p>
                                        <p className="text-[8px] text-muted-foreground opacity-40  tracking-wide leading-relaxed italic">{n.d}</p>
                                    </div>
                                    <Switch className="data-[state=checked]:bg-emerald-500 scale-90" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="glass-dark p-10 border-white/5 rounded-[32px] satin-card space-y-10 font-sans italic">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-6 italic">
                            <Lock className="w-5 h-5 text-rose-500" />
                            <h3 className="text-xs font-black text-white tracking-widest  italic">Security Protocol</h3>
                        </div>
                        <div className="space-y-6">
                            <Button variant="outline" className="w-full h-14 rounded-2xl border-white/5 bg-white/2 text-[10px] font-black tracking-widest  hover:bg-white/5 italic">
                                RESET ACCESS NODE
                            </Button>
                            <Button variant="outline" className="w-full h-14 rounded-2xl border-white/5 bg-white/2 text-[10px] font-black tracking-widest  hover:bg-rose-500/10 hover:border-rose-500/20 text-rose-500/60 hover:text-rose-500 italic">
                                TERMINATE CLINICAL NODE
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
