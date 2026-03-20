"use client";

import React, { useState } from "react";
import { 
    Users, 
    Search, 
    Filter, 
    Plus, 
    Download, 
    MoreVertical, 
    TrendingUp, 
    ArrowUpRight,
    UserPlus,
    Activity,
    Edit3,
    HeartPulse,
    ClipboardList,
    ShieldCheck,
    Apple
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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const clientsData = [
    { id: "MUID-001", name: "Dr. Sarah Pierre", program: "Keto Intensive", adherence: 94, status: "Active" },
    { id: "MUID-002", name: "Marc Kagabo", program: "Elite Athlete Plan", adherence: 88, status: "Active" },
    { id: "MUID-003", name: "Alice Umutoni", program: "Metabolic Reset", adherence: 0, status: "Pending Protocol" },
    { id: "MUID-004", name: "Paul Munyaneza", program: "Weight Protocol", adherence: 72, status: "Active" },
];

export default function NutritionistUsers() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>(null);

    const handleEdit = (client: any) => {
        setSelectedClient(client);
        setIsEditModalOpen(true);
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Clients</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Manage your clients and their nutritional progress</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-semibold tracking-wide rounded-xl hover:bg-white/10">
                        <Download className="w-4 h-4 mr-2" /> Export Data
                    </Button>
                    <Button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95"
                    >
                        <UserPlus className="w-4 h-4 mr-2" /> Add Client
                    </Button>
                </div>
            </div>

            {/* Insight Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Clients", val: "84 Users", sub: "Total clinical portfolio", icon: Users, color: "text-emerald-500" },
                    { label: "Avg Compliance", val: "91.4%", sub: "Program adherence rate", icon: ShieldCheck, color: "text-indigo-500" },
                    { label: "Monthly Revenue", val: "RWF 1.2M", sub: "Clinical practice income", icon: Apple, color: "text-amber-500" },
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

            {/* Client Table */}
            <div className="space-y-5">
                 <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    <Input 
                        placeholder="Search for a client..." 
                        className="h-11 bg-white/5 border-white/5 rounded-xl pl-11 text-xs font-medium focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 uppercase">Client Profile</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Nutrition Plan</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-center uppercase">Adherence</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right uppercase">Status</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right pr-8 uppercase"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clientsData.map((client, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-bold text-xs text-muted-foreground group-hover:border-primary/20 transition-all shadow-inner">
                                                {client.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{client.name}</h4>
                                                <p className="text-[10px] text-muted-foreground opacity-40 font-medium tracking-tight">ID: {client.id}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-0.5">
                                            <p className="text-[11px] font-bold text-white/90">{client.program}</p>
                                            <p className="text-[9px] text-muted-foreground opacity-40 font-bold uppercase tracking-tight">Active Plan</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                         <div className="flex flex-col justify-center items-center">
                                            <p className={cn(
                                                "text-xs font-bold",
                                                client.adherence > 90 ? "text-emerald-500" :
                                                client.adherence > 50 ? "text-amber-500" : "text-white/60"
                                            )}>{client.adherence}%</p>
                                            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                                                <div className={cn("h-full rounded-full", client.adherence > 90 ? "bg-emerald-500" : "bg-indigo-500")} style={{ width: `${client.adherence}%` }} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] font-bold tracking-wide px-2.5 py-1 rounded-lg border-none uppercase",
                                            client.status === "Active" ? "bg-emerald-500/10 text-emerald-400 shadow-sm" :
                                            client.status === "Pending Protocol" ? "bg-amber-500/10 text-amber-500" : "bg-white/5 text-muted-foreground"
                                        )}>
                                            {client.status === "Pending Protocol" ? "Pending" : client.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white/5" onClick={() => handleEdit(client)}>
                                            <Edit3 className="w-4 h-4 text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Enroll Client Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Add Client</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Create a new client profile and assign a nutritional plan.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Full Name</Label>
                            <Input placeholder="Enter client's legal name" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Email Address</Label>
                                <Input placeholder="email@client.com" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Assigned Plan</Label>
                                <Input placeholder="e.g. Keto Plan" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                        </div>

                         <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-3">
                            <h4 className="text-[11px] font-bold text-white flex items-center gap-2">
                                <HeartPulse className="w-4 h-4 text-emerald-400" /> Data Privacy
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed opacity-60">
                                Enrollment creates a secure clinical record. All nutritional data is handled according to health privacy standards.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="h-11 text-xs font-bold px-6">Cancel</Button>
                        <Button onClick={() => setIsAddModalOpen(false)} className="h-11 px-8 rounded-xl text-xs font-bold silver-gradient text-black">
                            Add Client
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Client Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Edit Client Information</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Update profile and program status for {selectedClient?.name}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Full Name</Label>
                            <Input defaultValue={selectedClient?.name} className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Email Address</Label>
                                <Input defaultValue={selectedClient?.email || "email@client.com"} className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Active Plan</Label>
                                <Input defaultValue={selectedClient?.program} className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                        </div>

                         <div className="space-y-2">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70 ml-1">Program Status</Label>
                            <Select defaultValue={selectedClient?.status}>
                                <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-medium">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent className="glass border-white/10">
                                    <SelectItem value="Active" className="text-xs">Active Program</SelectItem>
                                    <SelectItem value="Pending Protocol" className="text-xs">Pending Review</SelectItem>
                                    <SelectItem value="Suspended" className="text-xs">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button variant="ghost" onClick={() => setIsEditModalOpen(false)} className="h-11 text-xs font-bold px-6">Cancel</Button>
                        <Button onClick={() => setIsEditModalOpen(false)} className="h-11 px-8 rounded-xl text-xs font-bold border-glow">
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
