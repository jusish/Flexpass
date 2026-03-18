"use client";

import React from "react";
import { 
    Users, 
    Building2, 
    CreditCard, 
    TrendingUp, 
    ShieldCheck, 
    Activity, 
    MoreVertical,
    Search,
    Filter,
    Plus,
    Download,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Globe,
    Zap,
    Briefcase,
    Clock
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
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const corporateData = [
    { 
        id: "CORP-001",
        name: "Bank of Kigali", 
        industry: "Financial Services",
        employees: 450,
        activeMembers: 342,
        model: "Utilization",
        currentBill: 5964000,
        status: "Active",
        paymentStatus: "Paid",
        lastActivity: "12 mins ago"
    },
    { 
        id: "CORP-002",
        name: "MTN Rwanda", 
        industry: "Telecommunications",
        employees: 280,
        activeMembers: 210,
        model: "Subscription",
        currentBill: 4500000,
        status: "Active",
        paymentStatus: "Due",
        lastActivity: "1 hour ago"
    },
    { 
        id: "CORP-003",
        name: "I&M Bank", 
        industry: "Financial Services",
        employees: 180,
        activeMembers: 145,
        model: "Utilization",
        currentBill: 3120000,
        status: "Active",
        paymentStatus: "Paid",
        lastActivity: "4 hours ago"
    },
    { 
        id: "CORP-004",
        name: "VolksWagen Rwanda", 
        industry: "Manufacturing",
        employees: 120,
        activeMembers: 95,
        model: "Utilization",
        currentBill: 1950000,
        status: "Review",
        paymentStatus: "Pending Audit",
        lastActivity: "Yesterday"
    },
    { 
        id: "CORP-005",
        name: "Kigali Marriott", 
        industry: "Hospitality",
        employees: 85,
        activeMembers: 0,
        model: "Subscription",
        currentBill: 0,
        status: "Suspended",
        paymentStatus: "Settled",
        lastActivity: "1 week ago"
    },
];

export default function CorporateManagement() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter text-white">Sponsor Governance</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wide opacity-50">Corporate entity oversight, contract governance, and billable participation metrics</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-bold tracking-widest opacity-60 hover:opacity-100 transition-all">
                        <Download className="w-4 h-4 mr-2" /> Global Audit
                    </Button>
                    <Button size="sm" className="silver-gradient text-black h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest transition-all shadow-xl shadow-white/5">
                        <Plus className="w-4 h-4 mr-2" /> Enroll Entity
                    </Button>
                </div>
            </div>

            {/* Global Sponsor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Sponsors", value: "42 Entities", sub: "8 in onboarding phase", icon: Briefcase, color: "text-indigo-500" },
                    { label: "Market Participation", value: "78.4%", sub: "Avg employee enrollment", icon: Users, color: "text-emerald-500" },
                    { label: "Utilization Invoicing", value: "RWF 24.8M", sub: "Monthly billable aggregate", icon: CreditCard, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-8 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-3 bg-white/5 rounded-2xl border border-white/5 shadow-inner", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-black tracking-widest text-muted-foreground opacity-40">Global Scale</span>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-widest opacity-40 mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{stat.value}</h3>
                        <p className="text-[9px] text-muted-foreground opacity-30 mt-4 font-semibold">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative group w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40 group-focus-within:opacity-100 transition-all" />
                        <Input 
                            placeholder="Search by company name, ID or domain..." 
                            className="h-12 bg-black/40 border-white/5 rounded-2xl pl-12 text-[11px] font-bold focus:ring-1 focus:ring-white/10 transition-all font-sans tracking-wide"
                        />
                    </div>
                </div>

                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10">Corporate Entity / Sector</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16">Revenue Model</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16">Enrollment Index</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16">Financial Status</TableHead>
                                <TableHead className="text-[10px] font-black tracking-widest text-muted-foreground h-16 text-right pr-10">Monthly Exposure</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {corporateData.map((corp, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-xs text-white group-hover:border-primary/20 transition-all shadow-inner">
                                                {corp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-white tracking-widest group-hover:text-glow-silver transition-all">{corp.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black opacity-30 tracking-widest">{corp.id} • {corp.industry}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className={cn(
                                                "text-[8px] font-black tracking-widest px-2 py-0.5 border-white/10",
                                                corp.model === "Utilization" ? "bg-amber-500/10 text-amber-500" : "bg-indigo-500/10 text-indigo-500"
                                            )}>
                                                {corp.model}
                                            </Badge>
                                        </div>
                                        <p className="text-[8px] text-muted-foreground opacity-30 font-bold mt-1 tracking-widest">Contract active</p>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1.5 w-32">
                                            <div className="flex justify-between text-[8px] font-black tracking-widest">
                                                <span className="text-white">{corp.activeMembers} Active</span>
                                                <span className="text-muted-foreground opacity-40">{Math.round((corp.activeMembers / corp.employees) * 100)}%</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(corp.activeMembers / corp.employees) * 100}%` }}
                                                    className={cn(
                                                        "h-full",
                                                        corp.model === "Utilization" ? "bg-amber-500" : "silver-gradient"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {corp.paymentStatus === "Paid" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                                            {corp.paymentStatus === "Due" && <Clock className="w-3.5 h-3.5 text-rose-500" />}
                                            {corp.paymentStatus === "Pending Audit" && <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
                                            <span className={cn(
                                                "text-[9px] font-black tracking-widest",
                                                corp.paymentStatus === "Paid" ? "text-emerald-500" :
                                                corp.paymentStatus === "Due" ? "text-rose-500" : "text-amber-500"
                                            )}>{corp.paymentStatus}</span>
                                        </div>
                                        <p className="text-[8px] text-muted-foreground opacity-30 font-bold mt-1 tracking-widest">Last Activity: {corp.lastActivity}</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <p className="text-sm font-black text-white tracking-tighter">RWF {corp.currentBill.toLocaleString()}</p>
                                        <p className="text-[8px] text-muted-foreground opacity-30 font-black tracking-widest">Monthly Exposure</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
