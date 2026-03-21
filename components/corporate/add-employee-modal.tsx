"use client";

import React, { useState } from "react";
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
import { toast } from "sonner";

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddEmployeeModal({ isOpen, onClose }: AddEmployeeModalProps) {
    const { addEmployee, companyPlan, user } = useMockStore();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tier, setTier] = useState<"Silver" | "Gold" | "Platinum">("Silver");
    const [department, setDepartment] = useState("");
    const [loading, setLoading] = useState(false);

    const TIER_RANK = { "Silver": 1, "Gold": 2, "Platinum": 3 };
    const currentRank = TIER_RANK[companyPlan];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            addEmployee({
                name,
                email,
                tier,
                department,
                status: "Active",
                companyId: user?.companyId || "c1",
            });
            toast.success("Employee Added", {
                description: `${name} has been enrolled successfully.`,
            });
            setLoading(false);
            onClose();
            // Reset form
            setName("");
            setEmail("");
            setTier("Silver");
            setDepartment("");
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass-dark border-white/10 sm:max-w-[425px] max-h-[90vh] overflow-y-auto custom-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Enroll New Employee</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-xs font-medium">
                        Add a new team member. Current Plan: <span className="text-primary font-bold">{companyPlan}</span>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-[11px] font-semibold  tracking-wider opacity-70">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Jean Damascene"
                            className="bg-white/5 border-white/10 rounded-xl h-10 text-xs font-medium"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[11px] font-semibold  tracking-wider opacity-70">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@company.rw"
                            className="bg-white/5 border-white/10 rounded-xl h-10 text-xs font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tier" className="text-[11px] font-semibold  tracking-wider opacity-70">Access Tier</Label>
                            <Select value={tier} onValueChange={(v: any) => setTier(v)}>
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-10 text-xs font-medium">
                                    <SelectValue placeholder="Select Tier" />
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
                            <Label htmlFor="dept" className="text-[11px] font-semibold  tracking-wider opacity-70">Department</Label>
                            <Input
                                id="dept"
                                placeholder="e.g. IT"
                                className="bg-white/5 border-white/10 rounded-xl h-10 text-xs font-medium"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="h-10 text-xs font-semibold">Cancel</Button>
                        <Button type="submit" disabled={loading} className="h-10 px-8 rounded-xl text-xs font-bold border-glow">
                            {loading ? "Enrolling..." : "Enroll Employee"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
