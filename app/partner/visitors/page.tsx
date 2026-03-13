"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Users,
    UserPlus,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Mail,
    Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const VISITORS = [
    { id: 1, name: "Alice Mukana", email: "alice@example.com", visits: 24, status: "Active", tier: "Platinum", lastVisit: "2 hours ago" },
    { id: 2, name: "Bob Rwanda", email: "bob@example.com", visits: 12, status: "Active", tier: "Gold", lastVisit: "Yesterday" },
    { id: 3, name: "Cédric Gasana", email: "ced@example.com", visits: 5, status: "New", tier: "Silver", lastVisit: "3 days ago" },
    { id: 4, name: "Dative Umutoni", email: "dative@example.com", visits: 42, status: "Active", tier: "Platinum", lastVisit: "1 hour ago" },
    { id: 5, name: "Eric Shema", email: "eric@example.com", visits: 8, status: "Inactive", tier: "Gold", lastVisit: "2 weeks ago" },
];

export default function VisitorsPage() {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter text-glow-silver text-white">Member Directory</h1>
                    <p className="text-muted-foreground text-[11px] font-black uppercase tracking-widest opacity-40">Manage facility subscribers and engagement metrics</p>
                </div>
                <Button className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-glow-silver silver-gradient text-black">
                    <UserPlus className="w-4 h-4 mr-2" /> Manual Entry
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Visitors", value: "1,284", icon: Users, trend: "+12%", up: true },
                    { label: "Platinum Holders", value: "482", icon: Users, trend: "+5%", up: true },
                    { label: "New This Week", value: "43", icon: UserPlus, trend: "-2%", up: false },
                    { label: "Churn Risk", value: "12", icon: Users, trend: "-8%", up: true },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-black/40 rounded-lg border border-white/10 group-hover:border-primary/20 transition-all">
                                <stat.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black ${stat.up ? "text-emerald-500" : "text-rose-500"}`}>
                                {stat.trend} {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
                        <p className="text-2xl font-black tracking-tighter text-white">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center bg-black/40">
                    <div className="relative flex-1 max-sm group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40 group-focus-within:opacity-100 group-focus-within:text-glow-silver transition-all" />
                        <Input
                            placeholder="Find member by name or email..."
                            className="pl-12 h-12 bg-black/40 border-white/10 rounded-xl focus:bg-black/60 focus:border-white/20 transition-all text-[11px] font-bold tracking-tight text-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-12 px-6 glass border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100">
                            <Filter className="w-3.5 h-3.5 mr-2 opacity-40" /> Category
                        </Button>
                        <Button variant="outline" className="h-12 px-6 glass border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100">
                            Status
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-muted-foreground text-[9px] font-black uppercase tracking-[0.2em] bg-black/40">
                                <th className="px-8 py-5">Subcriber</th>
                                <th className="px-8 py-5">Access Tier</th>
                                <th className="px-8 py-5">Total Visits</th>
                                <th className="px-8 py-5">Engagement</th>
                                <th className="px-8 py-5">Last Activity</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {VISITORS.map((v) => (
                                <tr key={v.id} className="group hover:bg-black/40 transition-all duration-300">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-black/40 rounded-xl flex items-center justify-center font-black text-xs border border-white/5 group-hover:border-primary/20 transition-all text-white">
                                                {v.name.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="font-bold text-[13px] tracking-tight block text-white group-hover:text-glow-silver transition-all">{v.name}</span>
                                                <span className="text-[9px] text-muted-foreground font-medium opacity-40 lowercase">{v.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Badge variant="outline" className="bg-black/40 border-white/10 text-[9px] font-black uppercase tracking-widest text-primary border-glow-silver px-3 py-1">
                                            {v.tier}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[11px] font-black text-white">{v.visits} sessions</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                                <div
                                                    className="h-full silver-gradient shadow-[0_0_10px_rgba(197,199,201,0.3)] transition-all duration-1000"
                                                    style={{ width: `${Math.min(v.visits * 4, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-40">{v.lastVisit}</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white/5 opacity-40 hover:opacity-100 transition-all">
                                                <Mail className="w-4 h-4 text-white" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white/5 opacity-40 hover:opacity-100 transition-all">
                                                <Phone className="w-4 h-4 text-white" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white/5">
                                                <MoreVertical className="w-4 h-4 text-white" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
