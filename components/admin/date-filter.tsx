"use client";

import React, { useState } from "react";
import { 
    Calendar as CalendarIcon, 
    ChevronDown, 
    Check,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const presets = [
    { label: "This Month", value: "this_month" },
    { label: "Last Month", value: "last_month" },
    { label: "Last 3 Months", value: "last_3_months" },
    { label: "Last 6 Months", value: "last_6_months" },
    { label: "Last Year", value: "last_year" },
    { label: "Custom Range", value: "custom" },
];

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function DateRangeFilter() {
    const [selectedPreset, setSelectedPreset] = useState("this_month");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    className="glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-white/5 transition-all flex items-center gap-3 min-w-[180px]"
                >
                    <CalendarIcon className="w-4 h-4 text-indigo-500" />
                    <span className="opacity-80">
                        {presets.find(p => p.value === selectedPreset)?.label}
                    </span>
                    <ChevronDown className={cn("w-3 h-3 opacity-40 transition-transform", isOpen && "rotate-180")} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[320px] p-0 bg-black/95 border-white/10 backdrop-blur-3xl rounded-3xl overflow-hidden satin-card">
                <div className="p-6 space-y-6">
                    <div>
                        <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Quick Presets
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {presets.map((preset) => (
                                <button
                                    key={preset.value}
                                    onClick={() => {
                                        setSelectedPreset(preset.value);
                                        if (preset.value !== 'custom') setIsOpen(false);
                                    }}
                                    className={cn(
                                        "flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-bold tracking-tight transition-all text-left",
                                        selectedPreset === preset.value 
                                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                                            : "bg-white/2 text-muted-foreground hover:bg-white/5 border border-transparent"
                                    )}
                                >
                                    {preset.label}
                                    {selectedPreset === preset.value && <Check className="w-3 h-3" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <p className="text-[9px] font-black text-muted-foreground opacity-30 uppercase tracking-widest mb-4">Historical Select</p>
                        <div className="grid grid-cols-3 gap-2">
                            {months.map((month, idx) => (
                                <button
                                    key={idx}
                                    className="px-2 py-2 rounded-lg bg-white/2 text-[9px] font-bold text-muted-foreground hover:bg-white/5 transition-all text-center border border-transparent hover:border-white/5"
                                >
                                    {month.substring(0, 3)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white/2 p-4 border-t border-white/5 flex gap-3">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 h-10 rounded-xl text-[9px] font-black border-white/5"
                        onClick={() => setIsOpen(false)}
                    >
                        CANCEL
                    </Button>
                    <Button 
                        size="sm" 
                        className="flex-1 h-10 rounded-xl text-[9px] font-black silver-gradient text-black"
                        onClick={() => setIsOpen(false)}
                    >
                        APPLY FILTER
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
