"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserPlus, CreditCard, Calendar, Mail, Phone, User } from "lucide-react";

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl bg-black/90 border-white/10 backdrop-blur-2xl satin-card">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black tracking-tighter text-white">
                        Onboard New Member
                    </DialogTitle>
                    <DialogDescription className="text-[11px] font-semibold tracking-wide opacity-50">
                        Create a new facility subscription profile and configure billing parameters
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                    <div className="space-y-2 md:col-span-2">
                        <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Legal Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                            <Input placeholder="Enter member's full name" className="pl-12 bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Email Identifier</Label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                            <Input placeholder="name@example.com" className="pl-12 bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Contact Phone</Label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-40" />
                            <Input placeholder="+250 ..." className="pl-12 bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Subscription Plan</Label>
                        <Select>
                            <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all">
                                <SelectValue placeholder="Select Plan" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl">
                                <SelectItem value="platinum" className="text-[11px] font-bold">Platinum Elite ($120/mo)</SelectItem>
                                <SelectItem value="gold" className="text-[11px] font-bold">Gold Standard ($80/mo)</SelectItem>
                                <SelectItem value="silver" className="text-[11px] font-bold">Silver Basic ($50/mo)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground tracking-wide opacity-50 ml-1">Billing Interval</Label>
                        <Select defaultValue="monthly">
                            <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-[11px] font-bold tracking-tight text-white focus:bg-white/10 transition-all">
                                <SelectValue placeholder="Select Cycle" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl">
                                <SelectItem value="monthly" className="text-[11px] font-bold">Monthly</SelectItem>
                                <SelectItem value="quarterly" className="text-[11px] font-bold">Quarterly</SelectItem>
                                <SelectItem value="annually" className="text-[11px] font-bold">Annually</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} className="h-12 border-glow-silver text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                        Discard
                    </Button>
                    <Button className="h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-glow-silver silver-gradient text-black">
                        Activate Membership
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
