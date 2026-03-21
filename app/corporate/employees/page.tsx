"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
    Users,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Download,
    Mail,
    BadgeCheck,
    Clock,
    ChevronLeft,
    ChevronRight,
    Eye,
    Edit2,
    Trash2,
    UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMockStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { type Employee } from "@/lib/mock-data";
import { AddEmployeeModal } from "@/components/corporate/add-employee-modal";
import { EditEmployeeModal } from "@/components/corporate/edit-employee-modal";
import { ViewEmployeeModal } from "@/components/corporate/view-employee-modal";
import { toast } from "sonner";

export default function EmployeesPage() {
    const { employees, deleteEmployee } = useMockStore();
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [tierFilter, setTierFilter] = useState<string | null>(null);

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
                emp.email.toLowerCase().includes(search.toLowerCase());
            const matchesTier = tierFilter ? emp.tier === tierFilter : true;
            return matchesSearch && matchesTier;
        });
    }, [employees, search, tierFilter]);

    const handleView = (emp: Employee) => {
        router.push(`/corporate/employees/${emp.id}`);
    };

    const handleEdit = (emp: Employee) => {
        setSelectedEmployee(emp);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string, name: string) => {
        deleteEmployee(id);
        toast.error("Employee Removed", {
            description: `${name} has been removed from the directory.`,
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1 text-glow-silver">Employee Directory</h1>
                    <p className="text-muted-foreground text-xs font-bold tracking-tight opacity-60">Manage and monitor wellness subscriptions for your team</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="glass border-white/5 h-10 rounded-xl text-[10px] font-bold  tracking-widest opacity-60">
                        <Download className="w-3.5 h-3.5 mr-2" /> Export
                    </Button>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        size="sm"
                        className="h-10 rounded-xl px-4 font-black text-[10px]  tracking-widest border-glow-silver silver-gradient text-black"
                    >
                        <UserPlus className="w-3.5 h-3.5 mr-2" /> Enroll Employee
                    </Button>
                </div>
            </div>

            <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden satin-card">
                {/* Table Controls */}
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between bg-black/10">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-50" />
                        <Input
                            placeholder="Search directory..."
                            className="pl-10 h-10 bg-white/3 border-white/10 rounded-xl focus:border-white/20 transition-all text-xs font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-10 px-4 glass border-white/10 rounded-xl text-[10px] font-bold  tracking-widest opacity-60">
                                    <Filter className="w-3.5 h-3.5 mr-2 opacity-60" />
                                    Tier: {tierFilter || "All"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="glass border-white/10 rounded-xl p-1 w-44">
                                <DropdownMenuItem onClick={() => setTierFilter(null)} className="rounded-lg text-xs py-2">All Access Tiers</DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem onClick={() => setTierFilter("Platinum")} className="rounded-lg text-xs py-2 text-primary font-bold">Platinum</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTierFilter("Gold")} className="rounded-lg text-xs py-2">Gold</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTierFilter("Silver")} className="rounded-lg text-xs py-2">Silver</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-secondary text-[9px] font-black  tracking-widest bg-black/20">
                                <th className="px-6 py-4">Employee Name</th>
                                <th className="px-6 py-4 text-center">Usage</th>
                                <th className="px-6 py-4">Tier</th>
                                <th className="px-6 py-4">Join Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredEmployees.map((emp) => (
                                <tr key={emp.id} className="group hover:bg-white/2 transition-all duration-300 text-xs font-medium text-foreground/80">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/3 rounded-xl flex items-center justify-center font-bold text-primary text-xs border border-white/10 group-hover:border-primary/30 transition-all group-hover:bg-primary group-hover:text-black">
                                                {emp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <Link href={`/corporate/employees/${emp.id}`}>
                                                    <p className="font-bold text-foreground group-hover:text-primary transition-colors text-sm underline-offset-4 hover:underline cursor-pointer">{emp.name}</p>
                                                </Link>
                                                <p className="text-[10px] text-muted-foreground opacity-60 flex items-center gap-1 font-medium mt-0.5">
                                                    {emp.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-sm font-bold tracking-tight">{emp.visits}</span>
                                            <span className="text-[8px] text-muted-foreground  tracking-widest font-black opacity-30">Visits</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[9px] font-bold  tracking-wider",
                                            emp.tier === "Platinum" ? "border-primary/20 text-primary bg-primary/5 shadow-[0_0_10px_rgba(197,199,201,0.05)]" : "border-white/5 text-muted-foreground bg-white/5 opacity-60"
                                        )}>
                                            {emp.tier === "Platinum" && <BadgeCheck className="w-3 h-3" />}
                                            {emp.tier}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 opacity-60 font-medium">
                                            <Clock className="w-3 h-3" /> {emp.joinDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2.5 py-1 rounded-lg text-[9px] font-black  tracking-widest border",
                                            emp.status === "Active" ? "bg-emerald-500/5 text-emerald-500/70 border-emerald-500/10" :
                                                emp.status === "Pending" ? "bg-amber-500/5 text-amber-500/70 border-amber-500/10" :
                                                    "bg-rose-500/5 text-rose-500/70 border-rose-500/10"
                                        )}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/10 opacity-40 hover:opacity-100">
                                                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="glass border-white/10 rounded-xl p-1 min-w-[140px]">
                                                <DropdownMenuItem onClick={() => handleView(emp)} className="rounded-lg text-xs py-2 font-semibold">
                                                    <Eye className="w-3.5 h-3.5 mr-2 opacity-60" /> View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleEdit(emp)} className="rounded-lg text-xs py-2 font-semibold">
                                                    <Edit2 className="w-3.5 h-3.5 mr-2 opacity-60" /> Edit Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/5" />
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(emp.id, emp.name)}
                                                    className="rounded-lg text-xs py-2 font-bold text-rose-500 focus:bg-rose-500/10 focus:text-rose-500"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5 mr-2" /> Deactivate
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredEmployees.length === 0 && (
                        <div className="p-20 text-center">
                            <Users className="w-8 h-8 text-muted-foreground/10 mx-auto mb-3" />
                            <p className="text-xs text-muted-foreground font-medium opacity-40  tracking-widest">No matching results found</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-white/5 flex items-center justify-between bg-black/10">
                    <p className="text-[9px] text-muted-foreground font-black  tracking-widest opacity-40">
                        Displaying <span className="text-primary">{filteredEmployees.length}</span> of <span className="text-primary">{employees.length}</span> Members
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" className="glass border-white/10 rounded-xl h-9 w-9 p-0 opacity-40 hover:opacity-100 transition-opacity"><ChevronLeft className="w-3.5 h-3.5" /></Button>
                        <Button variant="default" className="rounded-xl h-9 px-4 text-[11px] border-glow-silver font-black bg-white/10 hover:bg-white/20">PAGE 1</Button>
                        <Button variant="outline" className="glass border-white/10 rounded-xl h-9 w-9 p-0 opacity-40 hover:opacity-100 transition-opacity"><ChevronRight className="w-3.5 h-3.5" /></Button>
                    </div>
                </div>
            </Card>

            {/* Modals */}
            <AddEmployeeModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
            <EditEmployeeModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                employee={selectedEmployee}
            />
            <ViewEmployeeModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                employee={selectedEmployee}
            />
        </div>
    );
}
