"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
import { useMockStore } from "@/lib/store";
import { type Employee } from "@/lib/mock-data";
import { toast } from "sonner";

interface EditEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
}

export function EditEmployeeModal({ isOpen, onClose, employee }: EditEmployeeModalProps) {
    const { updateEmployee, companyPlan } = useMockStore();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tier, setTier] = useState<"Silver" | "Gold" | "Platinum">("Silver");
    const [status, setStatus] = useState<"Active" | "Pending" | "Inactive">("Active");
    const [department, setDepartment] = useState("");
    const [loading, setLoading] = useState(false);

    const TIER_RANK = { "Silver": 1, "Gold": 2, "Platinum": 3 };
    const currentRank = TIER_RANK[companyPlan];

    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setEmail(employee.email);
            setTier(employee.tier);
            setStatus(employee.status);
            setDepartment(employee.department);
        }
    }, [employee]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!employee) return;

        setLoading(true);

        setTimeout(() => {
            updateEmployee(employee.id, {
                name,
                email,
                tier,
                status,
                department,
            });
            toast.success("Profile Updated", {
                description: `Changes for ${name} saved successfully.`,
            });
            setLoading(false);
            onClose();
        }, 800);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass-dark border-white/10 sm:max-w-[425px] max-h-[90vh] overflow-y-auto custom-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Edit Employee Profile</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-xs font-medium">
                        Modify profile. Current Plan: <span className="text-primary font-bold">{companyPlan}</span>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-name" className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Full Name</Label>
                        <Input
                            id="edit-name"
                            className="bg-white/5 border-white/10 rounded-xl h-10 text-xs font-medium"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-email" className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Email Address</Label>
                        <Input
                            id="edit-email"
                            type="email"
                            className="bg-white/5 border-white/10 rounded-xl h-10 text-xs font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-tier" className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Access Tier</Label>
                            <Select value={tier} onValueChange={(v: any) => setTier(v)}>
                                <SelectTrigger id="edit-tier" className="bg-white/5 border-white/10 rounded-xl h-10 text-xs font-medium">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="glass border-white/10">
                                    <SelectItem value="Silver" className="text-xs">Silver</SelectItem>
                                    <SelectItem value="Gold" className="text-xs" disabled={currentRank < 2}>
                                        Gold {currentRank < 2 && "(Upgrade Required)"}
                                    </SelectItem>
                                    <SelectItem value="Platinum" className="text-xs" disabled={currentRank < 3}>
                                        Platinum {currentRank < 3 && "(Upgrade Required)"}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-status" className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Account Status</Label>
                            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                                <SelectTrigger id="edit-status" className="bg-white/5 border-white/10 rounded-xl h-10 text-xs font-medium">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="glass border-white/10">
                                    <SelectItem value="Active" className="text-xs">Active</SelectItem>
                                    <SelectItem value="Pending" className="text-xs">Pending</SelectItem>
                                    <SelectItem value="Inactive" className="text-xs">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-dept" className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Department</Label>
                        <Input
                            id="edit-dept"
                            className="bg-white/5 border-white/10 rounded-xl h-10 text-xs font-medium"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="h-10 text-xs font-semibold">Discard</Button>
                        <Button type="submit" disabled={loading} className="h-10 px-8 rounded-xl text-xs font-bold border-glow">
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
