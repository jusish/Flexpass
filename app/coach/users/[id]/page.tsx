"use client";

import React, { use, useState } from "react";
import { useMockStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Users,
    Calendar,
    TrendingUp,
    Activity,
    ChevronLeft,
    Plus,
    CheckCircle2,
    Clock,
    DollarSign,
    ClipboardList,
    Dumbbell,
    Zap,
    History,
    MoreVertical,
    Star,
    MessageSquare,
    ChevronRight,
    Search,
    Download,
    Coffee,
    ArrowUpRight,
    MapPin,
    CreditCard,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_INVOICES } from "@/lib/mock-data";

const PROGRESS_DATA = [
    { name: "Week 1", score: 65, attendance: 100 },
    { name: "Week 2", score: 72, attendance: 80 },
    { name: "Week 3", score: 85, attendance: 100 },
    { name: "Week 4", score: 78, attendance: 90 },
];

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function CoachMemberDetails({ params }: { params: Promise<{ id: string }> }) {
    const { employees } = useMockStore();
    const resolvedParams = use(params);
    const router = useRouter();

    // UI States
    const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
    const [isAddRoutineOpen, setIsAddRoutineOpen] = useState(false);
    const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);

    const member = employees.find(e => e.id === resolvedParams.id) || employees[0];

    // Mock Assignments
    const [assignments] = useState([
        { id: 1, title: "10k Daily Steps", duration: "7 Days", progress: 80, status: "Active", color: "text-emerald-500", rating: 4.5 },
        { id: 2, title: "Morning Stretch", duration: "14 Days", progress: 100, status: "Completed", color: "text-blue-500", rating: 5.0 },
        { id: 3, title: "Protein Goal", duration: "30 Days", progress: 45, status: "Under Review", color: "text-indigo-400", rating: 3.2 },
    ]);

    // Mock Schedule/Routine Data
    const scheduleItems = [
        { day: "Monday", items: [{ time: "08:00 AM", title: "HIIT Session", type: "Class" }] },
        { day: "Wednesday", items: [{ time: "05:00 PM", title: "Weight Training", type: "Personal" }] },
        { day: "Friday", items: [{ time: "08:00 AM", title: "HIIT Session", type: "Class" }] },
    ];

    const routineItems = [
        { day: "Monday", items: [{ time: "07:00 AM", title: "Oatmeal + Fruits", type: "Meal" }, { time: "10:00 PM", title: "8h Sleep", type: "Habit" }] },
        { day: "Tuesday", items: [{ time: "07:00 AM", title: "Eggs + Avocado", type: "Meal" }, { time: "06:00 PM", title: "Home Workout", type: "Self" }] },
        { day: "Wednesday", items: [{ time: "07:00 AM", title: "Smoothie Bowl", type: "Meal" }] },
        { day: "Thursday", items: [{ time: "07:00 AM", title: "Pancakes", type: "Meal" }] },
        { day: "Friday", items: [{ time: "07:00 AM", title: "Oatmeal", type: "Meal" }] },
        { day: "Saturday", items: [{ time: "09:00 AM", title: "Cheat Meal", type: "Meal" }] },
        { day: "Sunday", items: [{ time: "08:00 PM", title: "Meal Prep", type: "Habit" }] },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full border border-white/5 hover:bg-white/5 w-10 h-10"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight text-white mb-0.5">{member.name}</h1>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-bold px-2 py-0.5 rounded-lg  tracking-wider">Active Member</Badge>
                        </div>
                        <p className="text-muted-foreground text-xs opacity-50 font-medium">
                            Member ID: {member.id} • {member.email}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-10 px-4 border-white/5 bg-white/5 text-xs font-semibold rounded-xl transition-all">
                        <MessageSquare className="w-4 h-4 mr-2" /> Message
                    </Button>
                    <Button className="h-10 px-6 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest">
                        Export Data
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Profile Card */}
                <Card className="lg:col-span-1 glass-dark border-white/5 rounded-2xl p-8 h-fit space-y-10">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="relative">
                            <Avatar className="h-32 w-32 border border-white/5 p-1 ring-1 ring-white/10 shadow-2xl">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                                <AvatarFallback className="text-3xl font-bold">{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-2 right-2 h-7 w-7 bg-emerald-500 rounded-xl border-2 border-black flex items-center justify-center shadow-lg">
                                <CheckCircle2 className="w-4 h-4 text-black" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">{member.name}</h2>
                            <p className="text-[10px] font-semibold text-muted-foreground  opacity-40 mt-1.5 tracking-widest">Kigali, Rwanda</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {[
                            { label: "Attendance", val: "94%", sub: "Recent cycle", icon: Calendar, color: "text-emerald-500" },
                            { label: "Completion", val: "88%", sub: "Assigned tasks", icon: ClipboardList, color: "text-indigo-500" },
                            { label: "Engagement", val: "4.8", sub: "Member rating", icon: Star, color: "text-amber-500" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <item.icon className={cn("w-3.5 h-3.5 opacity-40", item.color)} />
                                    <span className="text-[10px] font-bold text-muted-foreground  opacity-40 tracking-widest font-sans">{item.label}</span>
                                </div>
                                <div className="flex items-end justify-between border-b border-white/5 pb-2">
                                    <span className="text-2xl font-bold text-white tracking-tight">{item.val}</span>
                                    <span className={cn("text-[10px] font-bold  tracking-tight", item.color)}>{item.sub}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-5 rounded-2xl bg-white/2 border border-white/5 space-y-3">
                        <p className="text-[10px] font-bold text-muted-foreground  opacity-30 text-center tracking-widest mb-2 font-sans">Administrative Controls</p>
                        <Button variant="ghost" className="w-full h-10 text-[10px] font-bold transition-all hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl  tracking-widest">Record Payment</Button>
                        <Button variant="ghost" className="w-full h-10 text-[10px] font-bold transition-all hover:bg-rose-500/10 hover:text-rose-500 rounded-xl  tracking-widest opacity-40 hover:opacity-100">Pause Membership</Button>
                    </div>
                </Card>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    <Tabs defaultValue="overview" className="w-full space-y-8">
                        <div className="overflow-x-auto">
                            <TabsList className="bg-black/40 border border-white/5 p-1 h-12 rounded-xl inline-flex min-w-full md:min-w-0">
                                <TabsTrigger value="overview" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Overview</TabsTrigger>
                                <TabsTrigger value="schedule" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Schedule</TabsTrigger>
                                <TabsTrigger value="routines" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Routines</TabsTrigger>
                                <TabsTrigger value="assignments" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Assignments</TabsTrigger>
                                <TabsTrigger value="financials" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Financials</TabsTrigger>
                                <TabsTrigger value="analytics" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Analytics</TabsTrigger>
                            </TabsList>
                        </div>

                        {/* --- OVERVIEW TAB --- */}
                        <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="glass-dark p-8 border-white/5 rounded-2xl space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-white  tracking-tight flex items-center gap-2 font-sans">
                                            <Activity className="w-4 h-4 text-emerald-500" /> Recent Activity
                                        </h3>
                                        <Badge variant="outline" className="text-[9px] font-bold border-white/5 opacity-40  tracking-widest px-2.5 py-1 rounded-lg">Last 72h</Badge>
                                    </div>
                                    <div className="space-y-5">
                                        {[
                                            { label: "Today", task: "HIIT Session @ 08:00 AM", status: "Completed", icon: CheckCircle2, color: "text-emerald-500" },
                                            { label: "Yesterday", task: "Morning Stretch Assignment", status: "Missed", icon: Zap, color: "text-rose-500/60" },
                                            { label: "Mar 18", task: "Weight Training Protocol", status: "Completed", icon: CheckCircle2, color: "text-emerald-500" },
                                        ].map((act, i) => (
                                            <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/2 border border-white/5 transition-all hover:bg-white/5">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn("p-2 rounded-lg bg-white/5", act.color)}>
                                                        <act.icon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-white/30  tracking-widest font-sans">{act.label}</p>
                                                        <p className="text-xs font-bold text-white mt-1">{act.task}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className={cn("text-[9px] font-bold  tracking-tight border-none bg-white/5 px-2.5 py-1", act.color)}>
                                                    {act.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                <Card className="glass-dark p-8 border-white/5 rounded-2xl space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-white  tracking-tight flex items-center gap-2 font-sans">
                                            Private Member Notes
                                        </h3>
                                        <Plus className="w-4 h-4 text-indigo-500 cursor-pointer" />
                                    </div>
                                    <div className="p-5 rounded-2xl bg-white/2 border border-white/5 min-h-[160px] flex flex-col justify-between">
                                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                            "Patient is showing strong dedication to HIIT cycles but struggles with evening routine consistency. Recommended adjusting protein intake to 1.8g/kg. Next review in 5 days."
                                        </p>
                                        <p className="text-[9px] font-bold text-white/20  tracking-widest mt-6 font-sans">Verified entry • 2 days ago</p>
                                    </div>
                                    <Button className="w-full h-11 rounded-xl text-[10px] font-bold silver-gradient text-black  tracking-widest">Update Observations</Button>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* --- SCHEDULE TAB --- */}
                        <TabsContent value="schedule" className="space-y-6 animate-in fade-in duration-500">
                            <Card className="glass-dark border-white/5 rounded-2xl p-8 sm:p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-base font-bold text-white">Weekly Training Schedule</h3>
                                        <Badge variant="outline" className="text-[9px] font-bold  text-indigo-400 border-none bg-indigo-400/5 px-3 py-1">Operational</Badge>
                                    </div>
                                    <Button className="h-10 px-6 rounded-xl text-[10px] font-bold silver-gradient text-black  tracking-widest" onClick={() => setIsAddSessionOpen(true)}>
                                        <Plus className="w-4 h-4 mr-2" /> Add Training Slot
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
                                    {WEEK_DAYS.map(day => {
                                        const dayItems = scheduleItems.find(s => s.day === day)?.items || [];
                                        return (
                                            <div key={day} className="space-y-4">
                                                <div className="text-center py-3 border-b border-white/5 mb-2 bg-white/2 rounded-t-xl">
                                                    <span className="text-[10px] font-bold text-muted-foreground  opacity-40 tracking-widest font-sans">{day.slice(0, 3)}</span>
                                                </div>
                                                <div className="min-h-[120px] space-y-3">
                                                    {dayItems.length > 0 ? dayItems.map((item, idx) => (
                                                        <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                                                            <p className="text-[9px] font-bold text-indigo-400 mb-2  font-sans tracking-tight">{item.time}</p>
                                                            <p className="text-[11px] font-bold text-white leading-tight  tracking-tight">{item.title}</p>
                                                        </div>
                                                    )) : (
                                                        <div className="h-full min-h-[80px] w-full border border-dashed border-white/5 rounded-xl flex items-center justify-center opacity-10">
                                                            <span className="text-[9px] font-bold  tracking-widest font-sans">Free</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </TabsContent>

                        {/* --- ROUTINES TAB --- */}
                        <TabsContent value="routines" className="space-y-6 animate-in fade-in duration-500">
                            <Card className="glass-dark border-white/5 rounded-2xl p-8 sm:p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-base font-bold text-white">Daily Behavioral Routines</h3>
                                        <Badge variant="outline" className="text-[9px] font-bold  text-emerald-400 border-none bg-emerald-400/5 px-3 py-1">Active</Badge>
                                    </div>
                                    <Button onClick={() => setIsAddRoutineOpen(true)} className="h-10 px-6 rounded-xl text-[10px] font-bold silver-gradient text-black  tracking-widest">
                                        <Plus className="w-4 h-4 mr-2" /> Design Routine
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
                                    {WEEK_DAYS.map(day => {
                                        const dayRoutines = routineItems.find(r => r.day === day)?.items || [];
                                        return (
                                            <div key={day} className="space-y-4">
                                                <div className="text-center py-3 border-b border-white/5 mb-2 bg-white/2 rounded-t-xl">
                                                    <span className="text-[10px] font-bold text-muted-foreground  opacity-40 tracking-widest font-sans">{day.slice(0, 3)}</span>
                                                </div>
                                                <div className="min-h-[160px] space-y-3">
                                                    {dayRoutines.map((item, idx) => (
                                                        <div key={idx} className="p-3.5 rounded-xl border border-white/5 bg-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <p className="text-[8px] font-bold text-white/30 font-sans">{item.time}</p>
                                                                <div className="opacity-20 group-hover:opacity-100 transition-opacity">
                                                                    {item.type === "Meal" ? <Coffee className="w-3 h-3 text-emerald-500" /> : <Dumbbell className="w-3 h-3 text-indigo-500" />}
                                                                </div>
                                                            </div>
                                                            <p className="text-[10px] font-bold text-white  tracking-tight leading-tight">{item.title}</p>
                                                        </div>
                                                    ))}
                                                    <Button variant="ghost" className="w-full h-10 rounded-xl border border-dashed border-white/5 hover:border-white/20 transition-all opacity-10 hover:opacity-100 p-0">
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </TabsContent>

                        {/* --- ASSIGNMENTS TAB --- */}
                        <TabsContent value="assignments" className="space-y-10 animate-in fade-in duration-500">
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-white tracking-tight">Active Assignments</h3>
                                        <p className="text-xs text-muted-foreground opacity-40 font-medium  tracking-widest mt-1">Managed tasks and goal tracking</p>
                                    </div>
                                    <Button onClick={() => setIsAddAssignmentOpen(true)} className="h-11 px-8 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest">
                                        <Plus className="w-4 h-4 mr-2" /> Create New Assignment
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {assignments.map((asg) => (
                                        <Card key={asg.id} className="glass-dark border-white/5 rounded-2xl p-8 group hover:border-white/10 transition-all flex flex-col justify-between space-y-10">
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-start">
                                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                                        <ClipboardList className="w-6 h-6 text-indigo-500" />
                                                    </div>
                                                    <Badge variant="outline" className={cn("text-[9px] font-bold  border-none bg-white/5 px-3 py-1 rounded-lg", asg.color)}>
                                                        {asg.status}
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white tracking-tight">{asg.title}</h4>
                                                    <div className="flex items-center gap-4 mt-3 pb-2">
                                                        <div className="flex items-center gap-2 opacity-30">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span className="text-[10px] font-bold  tracking-widest font-sans">{asg.duration}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 bg-amber-500/5 px-2 py-1 rounded-lg">
                                                            <Star className="w-3 h-3 text-amber-500" />
                                                            <span className="text-[10px] font-bold text-amber-500/80">{asg.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2.5">
                                                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground  opacity-40 font-sans tracking-widest">
                                                        <span>Cycle Progress</span>
                                                        <span className="text-white opacity-100">{asg.progress}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <div className={cn("h-full rounded-full transition-all duration-1000", asg.progress === 100 ? "bg-emerald-500" : "bg-indigo-500")} style={{ width: `${asg.progress}%` }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-bold border-white/5 bg-white/5 text-muted-foreground opacity-60 hover:opacity-100  tracking-widest transition-all">
                                                Analyze Performance
                                            </Button>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* --- FINANCIALS TAB --- */}
                        <TabsContent value="financials" className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Lifetime Value", val: "RWF 2,450,000", icon: DollarSign, color: "text-emerald-500", trend: "+12.5%" },
                                    { label: "Pending Dues", val: "RWF 120,000", icon: Clock, color: "text-amber-500", trend: "-2.1%" },
                                    { label: "Plan Tier", val: "Pro Elite", icon: CreditCard, color: "text-indigo-500", trend: "Active" },
                                ].map((stat, i) => (
                                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={cn("p-2 rounded-lg bg-white/5 border border-white/5", stat.color)}>
                                                <stat.icon className="w-4 h-4" />
                                            </div>
                                            <span className={cn("text-[9px] font-bold  tracking-widest px-2 py-0.5 rounded-lg bg-white/1", i === 2 ? "text-indigo-400" : (stat.trend.startsWith("+") ? "text-emerald-400" : "text-rose-400"))}>{stat.trend}</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-muted-foreground  opacity-40 mb-1 font-sans tracking-widest">{stat.label}</p>
                                        <h4 className="text-xl font-bold text-white tracking-tight">{stat.val}</h4>
                                    </Card>
                                ))}
                            </div>

                            <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden mt-8">
                                <div className="p-8 border-b border-white/5 bg-white/2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-base font-bold text-white tracking-tight ">Invoicing Registry</h3>
                                        <p className="text-[10px] text-muted-foreground opacity-40 font-bold  tracking-widest mt-1">Detailed payment history and ledger</p>
                                    </div>
                                    <Button variant="ghost" className="h-10 px-6 rounded-xl text-[10px] font-bold border border-white/5 bg-white/5 opacity-60 hover:opacity-100  tracking-widest">
                                        <Search className="w-4 h-4 mr-2" /> Search Ledger
                                    </Button>
                                </div>
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 border-b border-white/5 text-muted-foreground">
                                                <th className="px-10 py-5 text-left text-[10px] font-bold  tracking-widest font-sans">Reference ID</th>
                                                <th className="px-10 py-5 text-left text-[10px] font-bold  tracking-widest font-sans">Billing Period</th>
                                                <th className="px-10 py-5 text-left text-[10px] font-bold  tracking-widest font-sans">Amount</th>
                                                <th className="px-10 py-5 text-right pr-10 text-[10px] font-bold  tracking-widest font-sans">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MOCK_INVOICES.map((inv) => (
                                                <tr key={inv.id} className="border-b border-white/5 hover:bg-white/2 transition-colors group">
                                                    <td className="px-10 py-6 whitespace-nowrap">
                                                        <span className="text-[11px] font-bold text-white/40 font-sans tracking-widest">{inv.id}</span>
                                                    </td>
                                                    <td className="px-10 py-6 whitespace-nowrap">
                                                        <span className="text-xs font-bold text-white  tracking-tight opacity-70">{inv.period}</span>
                                                    </td>
                                                    <td className="px-10 py-6 whitespace-nowrap">
                                                        <span className="text-xs font-bold text-white  tracking-tight">{inv.amount}</span>
                                                    </td>
                                                    <td className="px-10 py-6 text-right whitespace-nowrap pr-10">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <Badge variant="outline" className={cn(
                                                                "text-[9px] font-bold  border-none px-3 py-1.5 rounded-lg font-sans tracking-widest",
                                                                inv.status === "Paid" ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"
                                                            )}>
                                                                {inv.status}
                                                            </Badge>
                                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white/5">
                                                                <ArrowRight className="w-4 h-4 text-white/40" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* --- ANALYTICS TAB --- */}
                        <TabsContent value="analytics" className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="glass-dark p-10 border-white/5 rounded-2xl space-y-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold text-white  tracking-tight flex items-center gap-3">
                                                <TrendingUp className="w-4 h-4 text-indigo-500" /> Success Metrics
                                            </h3>
                                            <p className="text-[10px] text-muted-foreground opacity-30  tracking-widest mt-1.5 font-bold font-sans">Behavioral performance tracking</p>
                                        </div>
                                    </div>
                                    <div className="h-[280px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={PROGRESS_DATA} margin={{ left: -20, right: 10, top: 0 }}>
                                                <defs>
                                                    <linearGradient id="scoreColorAdmin" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#scoreColorAdmin)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>

                                <Card className="glass-dark p-10 border-white/5 rounded-2xl space-y-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold text-white  tracking-tight flex items-center gap-3">
                                                <Activity className="w-4 h-4 text-emerald-500" /> Attendance Yield
                                            </h3>
                                            <p className="text-[10px] text-muted-foreground opacity-30  tracking-widest mt-1.5 font-bold font-sans">Operational presence registry</p>
                                        </div>
                                    </div>
                                    <div className="h-[280px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={PROGRESS_DATA} margin={{ left: -20, right: 10, top: 0 }}>
                                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                                <Bar dataKey="attendance" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
