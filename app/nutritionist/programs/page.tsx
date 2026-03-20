"use client";

import React, { useState } from "react";
import { 
    Apple, 
    Plus, 
    Search, 
    TrendingUp, 
    Users, 
    Clock, 
    ShieldCheck, 
    MoreVertical, 
    Download,
    CheckCircle2,
    Activity,
    ClipboardList,
    ArrowUpRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const protocolsData = [
    { id: "PRO-42", name: "Keto Intensive Protocol", focus: "Metabolic Reset", patients: 42, success: 94, status: "Clinical" },
    { id: "PRO-38", name: "Elite Athlete Nutrition", focus: "Perf. Optimization", patients: 28, success: 88, status: "Active" },
    { id: "PRO-24", name: "Weight Loss Protocol", focus: "Caloric Deficit", patients: 15, success: 72, status: "Experimental" },
    { id: "PRO-12", name: "Pediatric Wellness", focus: "Growth & Recovery", patients: 8, success: 96, status: "Clinical" },
];

export default function NutritionistPrograms() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Programs</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Create and manage nutritional plans for your clients</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-semibold tracking-wide rounded-xl hover:bg-white/10">
                        <Download className="w-4 h-4 mr-2" /> Export Reports
                    </Button>
                    <Button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Create Program
                    </Button>
                </div>
            </div>

            {/* Program Performance */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Plans", val: "12 Plans", sub: "Currently assigned", icon: ClipboardList, color: "text-emerald-500" },
                    { label: "Success Rate", val: "88.4%", sub: "Avg goal achievement", icon: TrendingUp, color: "text-indigo-500" },
                    { label: "Total Enrollments", val: "112 Users", sub: "Assigned across plans", icon: Users, color: "text-amber-500" },
                    { label: "Compliance", val: "A+", sub: "Clinical standard score", icon: ShieldCheck, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40 uppercase mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-40 mt-3 font-medium">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Registry Table */}
            <div className="space-y-5">
                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    <Input 
                        placeholder="Search programs..." 
                        className="h-11 bg-white/5 border-white/5 rounded-xl pl-11 text-xs font-medium focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 uppercase">Program Name</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Primary Focus</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-center uppercase">Enrollments</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right uppercase">Success Rate</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right pr-8 uppercase">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {protocolsData.map((pro, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/20 transition-all shadow-inner">
                                                <Apple className="w-4 h-4 text-emerald-400 opacity-60 group-hover:opacity-100" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{pro.name}</h4>
                                                <p className="text-[10px] text-muted-foreground opacity-40 font-medium tracking-tight">ID: {pro.id}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-[11px] font-bold text-white/90">{pro.focus}</p>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-xs text-white">
                                        {pro.patients} <span className="text-[9px] opacity-40 ml-1 font-medium">USERS</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex flex-col items-end">
                                            <p className="text-xs font-bold text-white">{pro.success}%</p>
                                            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                                                <div className="h-full bg-emerald-500" style={{ width: `${pro.success}%` }} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5">
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                pro.status === "Clinical" ? "bg-emerald-500 shadow-sm" : 
                                                pro.status === "Active" ? "bg-indigo-500 shadow-sm" : "bg-white/10"
                                            )} />
                                            <span className={cn(
                                                "text-[10px] font-bold tracking-wide uppercase",
                                                pro.status === "Clinical" ? "text-emerald-400" :
                                                pro.status === "Active" ? "text-indigo-400" : "text-muted-foreground"
                                            )}>{pro.status}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Create Program Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Create Program</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Define a new nutritional strategy for clinical enrollment.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Program Name</Label>
                            <Input placeholder="e.g. Metabolic Reset 2.0" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Focus Area</Label>
                                <Input placeholder="e.g. Weight Loss" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Target Success Rate</Label>
                                <Input placeholder="%" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                        </div>

                         <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-3">
                            <h4 className="text-[11px] font-bold text-white flex items-center gap-2">
                                <Apple className="w-4 h-4 text-emerald-400" /> Standard Protocols
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed opacity-60">
                                Programs are audited for scientific compliance. All data sets will be used for longitudinal performance tracking.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="h-11 text-xs font-bold px-6">Cancel</Button>
                        <Button onClick={() => setIsCreateModalOpen(false)} className="h-11 px-8 rounded-xl text-xs font-bold silver-gradient text-black">
                            Create Program
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
