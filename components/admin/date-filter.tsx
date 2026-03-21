"use client";

import React, { useState } from "react";
import {
    Calendar as CalendarIcon,
    ChevronDown,
    Check,
    Clock,
    X,
    CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { format, subMonths, startOfMonth, endOfMonth, isSameMonth } from "date-fns";
import { DateRange } from "react-day-picker";

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

export function DateRangeFilter({ className }: { className?: string }) {
    const [selectedPreset, setSelectedPreset] = useState("this_month");
    const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
    });
    const [isOpen, setIsOpen] = useState(false);

    const toggleMonth = (idx: number) => {
        setSelectedPreset("months");
        setSelectedMonths(prev =>
            prev.includes(idx)
                ? prev.filter(m => m !== idx)
                : [...prev, idx]
        );
    };

    const getDisplayLabel = () => {
        if (selectedPreset === "custom" && dateRange?.from) {
            if (dateRange.to) {
                return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`;
            }
            return format(dateRange.from, "MMM d, yyyy");
        }
        if (selectedPreset === "months" && selectedMonths.length > 0) {
            if (selectedMonths.length === 1) return months[selectedMonths[0]];
            return `${selectedMonths.length} Months Selected`;
        }
        return presets.find(p => p.value === selectedPreset)?.label || "Select Date";
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "glass border-white/5 h-12 px-6 rounded-2xl text-[10px] font-black tracking-widest  hover:bg-white/5 transition-all flex items-center gap-3 min-w-[200px] shadow-lg",
                        className
                    )}
                >
                    <CalendarIcon className="w-4 h-4 text-indigo-500" />
                    <span className="opacity-80">
                        {getDisplayLabel()}
                    </span>
                    <ChevronDown className={cn("w-3 h-3 opacity-40 transition-transform", isOpen && "rotate-180")} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className={cn(
                    "p-0 bg-black/95 border-white/10 backdrop-blur-3xl rounded-[2rem] overflow-hidden satin-card shadow-2xl transition-all duration-300",
                    selectedPreset === "custom" ? "w-[720px]" : "w-[380px]"
                )}
            >
                <div className="flex flex-col">
                    <div className="flex divide-x divide-white/5">
                        {/* Sidebar Presets */}
                        <div className={cn("p-6 space-y-6 shrink-0", selectedPreset === "custom" ? "w-48" : "w-full")}>
                            <div>
                                <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-widest mb-4 flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> Timeframes
                                </p>
                                <div className={cn("grid gap-1.5", selectedPreset === "custom" ? "grid-cols-1" : "grid-cols-2")}>
                                    {presets.map((preset) => (
                                        <button
                                            key={preset.value}
                                            onClick={() => {
                                                setSelectedPreset(preset.value);
                                                setSelectedMonths([]);
                                                if (preset.value !== 'custom') {
                                                    // Set defaults for presets
                                                    if (preset.value === "this_month") {
                                                        setDateRange({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) });
                                                    } else if (preset.value === "last_month") {
                                                        const last = subMonths(new Date(), 1);
                                                        setDateRange({ from: startOfMonth(last), to: endOfMonth(last) });
                                                    }
                                                }
                                            }}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-bold tracking-tight transition-all text-left",
                                                selectedPreset === preset.value
                                                    ? "bg-indigo-500 text-white border-none shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                                                    : "bg-white/2 text-muted-foreground hover:bg-white/5 border border-transparent hover:border-white/10"
                                            )}
                                        >
                                            {preset.label}
                                            {selectedPreset === preset.value && <Check className="w-3 h-3" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedPreset !== "custom" && (
                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-widest mb-4">Specific Months</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {months.map((month, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => toggleMonth(idx)}
                                                className={cn(
                                                    "px-2 py-2.5 rounded-xl text-[9px] font-black transition-all text-center border",
                                                    selectedMonths.includes(idx)
                                                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                                        : "bg-white/2 text-muted-foreground border-transparent hover:border-white/10 hover:bg-white/5"
                                                )}
                                            >
                                                {month.substring(0, 3).toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Custom Date Range Picker */}
                        <AnimatePresence>
                            {selectedPreset === "custom" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex-1 p-6"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex flex-col">
                                            <p className="text-[10px] font-black text-muted-foreground opacity-30  tracking-widest flex items-center gap-2">
                                                <CalendarDays className="w-3 h-3" /> Range Selection
                                            </p>
                                            <span className="text-xs font-bold text-white mt-1">
                                                {dateRange?.from ? format(dateRange.from, "PPP") : "Select start"} - {dateRange?.to ? format(dateRange.to, "PPP") : "Select end"}
                                            </span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full border border-white/5"
                                            onClick={() => setSelectedPreset("this_month")}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <div className="flex gap-4">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={dateRange?.from}
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={2}
                                            className="rounded-2xl border-none p-0 bg-transparent text-white"
                                            classNames={{
                                                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                                month: "space-y-4",
                                                caption: "flex justify-center pt-1 relative items-center",
                                                caption_label: "text-xs font-bold  tracking-widest text-white px-2",
                                                nav: "space-x-1 flex items-center",
                                                nav_button: "h-7 w-7 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all",
                                                nav_button_previous: "absolute left-1",
                                                nav_button_next: "absolute right-1",
                                                table: "w-full border-collapse space-y-1",
                                                head_row: "flex",
                                                head_cell: "text-muted-foreground rounded-md w-9 font-black text-[10px] ",
                                                row: "flex w-full mt-2",
                                                cell: cn(
                                                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-indigo-500/10",
                                                    "[&:has([aria-selected].day-range-end)]:rounded-r-xl",
                                                    "[&:has([aria-selected].day-range-start)]:rounded-l-xl"
                                                ),
                                                day: "h-9 w-9 p-0 font-bold aria-selected:opacity-100 rounded-xl hover:bg-white/10 transition-all text-xs",
                                                day_range_start: "day-range-start bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]",
                                                day_range_end: "day-range-end bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]",
                                                day_selected: "bg-indigo-500 text-white hover:bg-indigo-600 focus:bg-indigo-500 focus:text-white",
                                                day_today: "bg-white/5 border border-white/10 text-white",
                                                day_outside: "text-muted-foreground opacity-20",
                                                day_disabled: "text-muted-foreground opacity-10",
                                                day_range_middle: "aria-selected:bg-indigo-500/10 aria-selected:text-white",
                                                day_hidden: "invisible",
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="bg-white/5 p-4 flex gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 h-11 rounded-2xl text-[10px] font-black border-white/5 hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                    >
                        RESET
                    </Button>
                    <Button
                        size="sm"
                        className="flex-1 h-11 rounded-2xl text-[10px] font-black silver-gradient text-black shadow-xl"
                        onClick={() => setIsOpen(false)}
                    >
                        APPLY SELECTION
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
