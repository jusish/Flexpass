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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Download, FileText, BarChart3, Clock } from "lucide-react";
import { toast } from "sonner";

interface ExportReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ExportReportModal({ isOpen, onClose }: ExportReportModalProps) {
    const [format, setFormat] = useState("pdf");
    const [range, setRange] = useState("current");
    const [loading, setLoading] = useState(false);

    const handleExport = () => {
        setLoading(true);
        setTimeout(() => {
            toast.success("Report Generated", {
                description: `Your ${format.toUpperCase()} report for the ${range} period is ready.`,
            });
            setLoading(false);
            onClose();
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass-dark border-white/10 sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" /> Export Analytics
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-xs font-medium">
                        Generate a comprehensive wellness report for your organization.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pt-6">
                    <div className="space-y-3">
                        <Label className="text-[11px] font-bold uppercase tracking-wider opacity-60 pl-1">Report Period</Label>
                        <Select value={range} onValueChange={setRange}>
                            <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-xs font-semibold">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 opacity-50" />
                                    <SelectValue />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10">
                                <SelectItem value="current" className="text-xs">Current Month (Mar 2026)</SelectItem>
                                <SelectItem value="last" className="text-xs">Last Month (Feb 2026)</SelectItem>
                                <SelectItem value="quarter" className="text-xs">Last Quarter</SelectItem>
                                <SelectItem value="year" className="text-xs">Year to Date (2026)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[11px] font-bold uppercase tracking-wider opacity-60 pl-1">File Format</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setFormat("pdf")}
                                className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${format === "pdf" ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-white/10 hover:border-white/20"
                                    }`}
                            >
                                <FileText className={`w-5 h-5 ${format === "pdf" ? "text-primary" : "text-muted-foreground"}`} />
                                <span className="text-xs font-bold uppercase tracking-wide">PDF</span>
                            </button>
                            <button
                                onClick={() => setFormat("csv")}
                                className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${format === "csv" ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-white/10 hover:border-white/20"
                                    }`}
                            >
                                <Download className={`w-5 h-5 ${format === "csv" ? "text-primary" : "text-muted-foreground"}`} />
                                <span className="text-xs font-bold uppercase tracking-wide">CSV</span>
                            </button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="pt-8">
                    <Button variant="ghost" onClick={onClose} className="h-11 text-xs font-bold opacity-60 hover:opacity-100">Cancel</Button>
                    <Button
                        onClick={handleExport}
                        disabled={loading}
                        className="h-11 px-8 rounded-xl text-xs font-black tracking-widest border-glow"
                    >
                        {loading ? "Processing..." : "Generate Report"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
