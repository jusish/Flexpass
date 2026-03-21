"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Plus,
    Building2,
    Users,
    TrendingUp,
    Activity,
    Globe,
    Briefcase,
    ShieldCheck,
    CreditCard,
    DollarSign,
    Target,
    ArrowUpRight,
    MapPin,
    Layers,
    SlidersHorizontal,
    Box
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useMockStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DateRangeFilter } from "@/components/admin/date-filter";
import { DataFilterModal } from "@/components/admin/data-filter-modal";

export default function CorporatesAdmin() {
    const { companies } = useMockStore();
    const [search, setSearch] = useState("");

    const filteredCompanies = companies.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white ">Sponsor Governance</h1>
                    <p className="text-muted-foreground text-[11px] font-semibold opacity-50  tracking-[0.2em] mt-1">
                        Corporate Entities • Enrollment Infrastructure • Financial Nodes
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 border-white/5 bg-white/5 text-[10px] font-black tracking-widest opacity-60 hover:opacity-100 transition-all rounded-2xl ">
                        Export governance audit
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest silver-gradient text-black  active:scale-95 shadow-xl shadow-white/5">
                        Initialize corporate sponsor
                    </Button>
                </div>
            </div>

            {/* Micro Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Sponsors", val: companies.length, sub: "Verified corporate nodes", icon: Building2, color: "text-indigo-500" },
                    { label: "Aggregate Yield", val: `RWF ${(companies.reduce((acc, c) => acc + c.totalSpent, 0) / 1000000).toFixed(1)}M`, sub: "Lifetime network billing", icon: CreditCard, color: "text-emerald-500" },
                    { label: "Enrollment Flux", val: "84.2%", sub: "Net workforce participation", icon: Users, color: "text-amber-500" },
                    { label: "Entity Retention", val: "99.1%", sub: "Global node health", icon: ShieldCheck, color: "text-rose-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group hover:scale-[1.02] transition-transform">
                        <div className="flex justify-between items-center mb-4 font-sans">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 transition-transform group-hover:scale-110 shadow-inner", stat.color)}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground  opacity-30 tracking-widest mb-1 font-sans">{stat.label}</p>
                        <h3 className="text-2xl font-black text-white tracking-tighter font-sans tabular-nums">{stat.val}</h3>
                        <p className="text-[9px] font-bold text-muted-foreground opacity-30  tracking-widest mt-2">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Main Governance Matrix */}
            <Card className="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden satin-card shadow-2xl">
                <div className="p-8 border-b border-white/5 bg-white/2 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h3 className="text-sm font-black tracking-widest text-white  flex items-center gap-2">
                            Corporate Registry
                        </h3>
                        <p className="text-[10px] text-muted-foreground font-semibold opacity-40  tracking-wider">Governing {companies.length} active sponsor nodes</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative group w-64 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all font-sans" />
                            <Input
                                placeholder="Identify sponsor by name or industry..."
                                className="h-10 bg-white/5 border-white/10 rounded-xl pl-12 text-[10px] font-black focus:ring-1 focus:ring-white/10 transition-all  opacity-60 focus:opacity-100 tracking-widest font-sans"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <DataFilterModal title="Governance Filter" description="Configure the corporate sponsorship and yield registry parameters for extraction.">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Archive period</label>
                                    <DateRangeFilter />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black tracking-widest text-muted-foreground  opacity-40 ml-1">Industry node</label>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-bold px-4">
                                            <SelectValue placeholder="Industry Classification" />
                                        </SelectTrigger>
                                        <SelectContent className="glass-dark border-white/10 rounded-xl">
                                            <SelectItem value="all" className="text-[10px] font-bold">All Industry Nodes</SelectItem>
                                            <SelectItem value="banking" className="text-[10px] font-bold">Banking Institutions</SelectItem>
                                            <SelectItem value="telecom" className="text-[10px] font-bold">Telecom Networks</SelectItem>
                                            <SelectItem value="tech" className="text-[10px] font-bold">Technological Units</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DataFilterModal>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 pl-10 ">Entity Identity</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Industry Node</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16  text-center">Enrollment Matrix</TableHead>
                                <TableHead className="text-[9px] font-black tracking-widest text-muted-foreground h-16 ">System Yield</TableHead>
                                <TableHead className="text-right pr-10 text-[9px] font-black tracking-widest text-muted-foreground h-16 ">Registry</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCompanies.map((company) => (
                                <TableRow key={company.id} className="border-white/5 hover:bg-white/5 transition-all group cursor-pointer" onClick={() => window.location.href = `/admin/corporates/${company.id}`}>
                                    <TableCell className="pl-10 py-7">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-sm text-indigo-500  overflow-hidden shadow-inner font-sans group-hover:scale-110 transition-transform">
                                                {company.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-white  tracking-widest group-hover:text-glow-silver transition-all">{company.name}</span>
                                                <p className="text-[9px] text-muted-foreground opacity-30 font-black  tracking-widest mt-1.5 flex items-center gap-2">
                                                    <MapPin className="w-3 h-3 text-indigo-400" /> {company.location}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[9px] font-black border-white/10 bg-white/5 text-muted-foreground opacity-60  px-3 py-1 rounded-lg shadow-sm font-sans tracking-widest">
                                            {company.industry}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex flex-col items-center gap-2 font-sans">
                                            <div className="flex items-center gap-3">
                                                <Users className="w-3.5 h-3.5 text-indigo-500 opacity-40" />
                                                <span className="text-[11px] font-black text-white  tracking-tight tabular-nums opacity-60">{company.activeUsers} / {company.employeeCount} Nodes</span>
                                            </div>
                                            <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner relative">
                                                <div
                                                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                                                    style={{ width: `${(company.activeUsers / company.employeeCount) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black text-white  tracking-tighter tabular-nums font-sans">RWF {(company.totalSpent / 1000000).toFixed(1)}M</span>
                                            <span className="text-[8px] font-black text-emerald-500 opacity-40  tracking-widest mt-1 font-sans">Yield Optimal</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <Badge variant="outline" className="text-[9px] font-black px-4 py-1.5 rounded-xl  border-none bg-indigo-500/10 text-indigo-400 shadow-inner tracking-widest">
                                            {company.tier}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
