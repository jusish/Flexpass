"use client";

import React, { useState } from "react";
import { 
    Users, 
    Search, 
    Filter, 
    Plus, 
    Download, 
    MoreVertical, 
    CheckCircle2, 
    XCircle, 
    TrendingUp, 
    ArrowUpRight,
    UserPlus,
    Activity,
    Edit3
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
    { id: "CL-001", name: "Marie Jeanne", plan: "Monthly Elite", joined: "2 weeks ago", session: "Strength Protocol", status: "Active" },
    { id: "CL-002", name: "Marc Twagira", plan: "Walk-in Node", joined: "1 month ago", session: "Morning Blast", status: "Active" },
    { id: "CL-003", name: "Alice Umutoni", plan: "Monthly Elite", joined: "3 days ago", session: "Power Yoga", status: "Pending Admission" },
    { id: "CL-004", name: "Paul Kagabo", plan: "Quarterly Master", joined: "2 months ago", session: "Evening Cardio", status: "Inactive" },
];

export default function CoachUsers() {
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
                    <h1 className="text-3xl font-bold tracking-tight text-white">Members</h1>
                    <p className="text-muted-foreground text-xs opacity-60">Manage your clients and their membership details</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 border-white/5 bg-white/5 text-xs font-semibold tracking-wide rounded-xl hover:bg-white/10 hover:border-white/20">
                        <Download className="w-4 h-4 mr-2" /> Export Data
                    </Button>
                    <Button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="h-11 px-6 rounded-xl text-xs font-bold tracking-wide silver-gradient text-black shadow-lg transition-all active:scale-95"
                    >
                        <UserPlus className="w-4 h-4 mr-2" /> Register Member
                    </Button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Members", val: "142", sub: "Active client accounts", icon: Users, color: "text-indigo-500" },
                    { label: "Retention Rate", val: "94.2%", sub: "Membership stability", icon: TrendingUp, color: "text-emerald-500" },
                    { label: "New Members", val: "12", sub: "Joined this month", icon: Plus, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner transition-transform group-hover:scale-105", stat.color)}>
                                <stat.icon className="w-5 h-5" />
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
                        placeholder="Search members..." 
                        className="h-11 bg-white/5 border-white/5 rounded-xl pl-11 text-xs font-medium focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    />
                </div>

                <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/5">
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 pl-8 uppercase">Member Identity</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Plan Details</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 uppercase">Current Status</TableHead>
                                <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground h-14 text-right uppercase">Yield Index</TableHead>
                                <TableHead className="text-right pr-8"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clientsData.map((client, i) => (
                                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-bold text-xs text-muted-foreground group-hover:border-primary/20 transition-all">
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
                                            <p className="text-[11px] font-bold text-white/80">{client.plan}</p>
                                            <p className="text-[10px] text-muted-foreground opacity-40 font-medium">Joined {client.joined}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] font-bold tracking-wide px-2.5 py-1 rounded-lg border-none uppercase",
                                            client.status === "Active" ? "bg-emerald-500/10 text-emerald-500" :
                                            client.status === "Pending Admission" ? "bg-amber-500/10 text-amber-500" : "bg-white/5 text-muted-foreground"
                                        )}>
                                            {client.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-xs font-bold text-white">RWF {client.status === "Active" ? "42k" : "0"}</p>
                                        <p className="text-[9px] font-bold text-indigo-400 opacity-60 tracking-tight mt-0.5">Net Flow</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white/5" onClick={() => handleEdit(client)}>
                                            <Edit3 className="w-4 h-4 text-muted-foreground opacity-20 group-hover:opacity-100 transition-opacity" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Add Client Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Register Member</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Enroll a new client into your dashboard.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Full Name</Label>
                            <Input placeholder="e.g. Jean Damascene" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Email Address</Label>
                                <Input placeholder="user@identity.rw" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Service Plan</Label>
                                <Input placeholder="e.g. Monthly Elite" className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-3">
                            <h4 className="text-[11px] font-bold text-white flex items-center gap-2">
                                <Activity className="w-4 h-4 text-indigo-400" /> Operational Protocol
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed opacity-60">
                                This will create a unique member ID. All activity will be logged for tracking and auditing purposes.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="h-11 text-xs font-bold px-6">Cancel</Button>
                        <Button onClick={() => setIsAddModalOpen(false)} className="h-11 px-8 rounded-xl text-xs font-bold border-glow">
                            Authorize Registration
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Client Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="glass-dark border-white/10 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Modify Member</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs font-medium">
                            Update details for {selectedClient?.name}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Full Identity</Label>
                            <Input defaultValue={selectedClient?.name} className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Contact Email</Label>
                                <Input defaultValue={selectedClient?.email || "user@identity.rw"} className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Membership Plan</Label>
                                <Input defaultValue={selectedClient?.plan} className="bg-white/5 border-white/10 rounded-xl h-11 text-xs font-medium" />
                            </div>
                        </div>

                         <div className="space-y-2">
                            <Label className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Operational Status</Label>
                            <Select defaultValue={selectedClient?.status}>
                                <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-medium">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent className="glass border-white/10">
                                    <SelectItem value="Active" className="text-xs">Active</SelectItem>
                                    <SelectItem value="Inactive" className="text-xs">Inactive</SelectItem>
                                    <SelectItem value="Pending Admission" className="text-xs">Pending Audit</SelectItem>
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
