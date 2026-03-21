"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DataFilterModalProps {
    title?: string;
    description?: string;
    triggerClassName?: string;
    children: React.ReactNode;
    onApply?: () => void;
    onReset?: () => void;
    activeFiltersCount?: number;
}

export function DataFilterModal({
    title = "Data Filters",
    description = "Refine your data view with specific parameters.",
    triggerClassName,
    children,
    onApply,
    onReset,
    activeFiltersCount = 0
}: DataFilterModalProps) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant="outline"
                size="sm"
                className={cn(
                    "h-10 px-4 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 group relative",
                    triggerClassName
                )}
            >
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-white/70">Filter</span>
            </Button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        "h-10 px-4 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 group relative",
                        triggerClassName
                    )}
                >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-semibold text-white/70">Filter</span>
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-indigo-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center shadow-lg border border-black/50">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="glass-dark border-white/10 rounded-[2rem] p-8 max-w-md w-[95vw] shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                <DialogHeader className="space-y-2 mb-6 text-left">
                    <DialogTitle className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                            <Filter className="w-4 h-4 text-indigo-400" />
                        </div>
                        {title}
                    </DialogTitle>
                    <p className="text-[11px] font-medium text-muted-foreground opacity-50 leading-relaxed  tracking-widest">
                        {description}
                    </p>
                </DialogHeader>

                <div className="space-y-8 py-2">
                    {children}
                </div>

                <DialogFooter className="mt-10 flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
                    <Button
                        variant="ghost"
                        className="flex-1 h-12 rounded-xl text-[11px] font-bold text-muted-foreground hover:bg-white/5 hover:text-white transition-all  tracking-widest gap-2"
                        onClick={() => {
                            onReset?.();
                            setOpen(false);
                        }}
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Clear filters
                    </Button>
                    <Button
                        className="flex-[1.5] h-12 rounded-xl text-[11px] font-black silver-gradient text-black transition-all active:scale-[0.98] shadow-lg shadow-white/5 gap-2  tracking-widest"
                        onClick={() => {
                            onApply?.();
                            setOpen(false);
                        }}
                    >
                        <Check className="w-3.5 h-3.5" /> Apply changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
