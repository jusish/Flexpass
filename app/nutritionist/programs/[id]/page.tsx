"use client";

import React, { use, useState } from "react";
import { useMockStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Users,
    TrendingUp,
    Activity,
    ChevronLeft,
    Apple,
    CheckCircle2,
    Plus,
    FileText,
    MessageSquare,
    Zap,
    HeartPulse,
    ClipboardList,
    Clock,
    MoreVertical,
    Target,
    ArrowRight,
    DollarSign,
    PieChart,
    Search,
    Calendar,
    Utensils,
    Scale,
    Download
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
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

const SUCCESS_DATA = [
    { name: "Week 1", rate: 72 },
    { name: "Week 2", rate: 78 },
    { name: "Week 3", rate: 82 },
    { name: "Week 4", rate: 88 },
];

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PROGRAM_MEAL_PLAN = {
    Monday: [
        { type: "Breakfast", title: "Fiber-Rich Oats", cals: "320 kcal" },
        { type: "Lunch", title: "Lean Protein Salad", cals: "450 kcal" },
        { type: "Dinner", title: "Steamed Fish & Veg", cals: "480 kcal" },
    ],
    Wednesday: [
        { type: "Breakfast", title: "Smoothie Bowl", cals: "280 kcal" },
        { type: "Lunch", title: "Chicken & Quinoa", cals: "510 kcal" },
        { type: "Dinner", title: "Lentil Soup", cals: "420 kcal" },
    ]
};

export default function ProgramDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { programs, employees } = useMockStore();
    const resolvedParams = use(params);
    const router = useRouter();
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

    const program = programs.find(p => p.id === resolvedParams.id) || programs[0];
    const programPatients = employees.slice(0, Math.min(program.patients, 8));

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full border border-white/5 hover:bg-white/5 w-11 h-11"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight text-white mb-0.5">{program.name}</h1>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-bold px-2.5 py-1 rounded-lg  tracking-wider">Clinical Program</Badge>
                        </div>
                        <p className="text-muted-foreground text-xs opacity-50 font-medium tracking-wide">
                            Focus: {program.focus} • {program.patients} Registered Members • Protocol ID: {program.id}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => setIsEnrollModalOpen(true)} className="h-11 px-6 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest shadow-lg">
                        <Plus className="w-4 h-4 mr-2" /> Enroll Member
                    </Button>
                    <Button variant="outline" className="h-11 px-5 border-white/5 bg-white/5 text-xs font-semibold rounded-xl transition-all hover:bg-white/10">
                        <Download className="w-4 h-4 mr-2" /> Export Protocol
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Completion Average", val: `${program.successRate}%`, sub: "Global compliance rate", icon: TrendingUp, color: "text-emerald-500" },
                    { label: "Protocol Duration", val: "12 Weeks", sub: "Clinical cycle window", icon: Clock, color: "text-indigo-500" },
                    { label: "Weekly Adherence", val: "92.4%", sub: "Node aggregate sync", icon: CheckCircle2, color: "text-amber-500" },
                    { label: "Aggregate Yield", val: "RWF 4.2M", sub: "Annualized projection", icon: DollarSign, color: "text-sky-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2.5 bg-white/5 border border-white/5 rounded-xl shadow-inner group-hover:scale-110 transition-transform", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-40  mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tight text-white">{stat.val}</h3>
                        <p className="text-[10px] text-muted-foreground opacity-30 mt-3 font-medium">{stat.sub}</p>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="members" className="w-full space-y-8">
                <div className="overflow-x-auto">
                    <TabsList className="bg-black/40 border border-white/5 p-1 h-12 rounded-xl inline-flex min-w-full md:min-w-0">
                        <TabsTrigger value="members" className="h-10 px-8 rounded-lg text-xs font-bold transition-all data-[state=active]:bg-white/5">Members</TabsTrigger>
                        <TabsTrigger value="routines" className="h-10 px-8 rounded-lg text-xs font-bold transition-all data-[state=active]:bg-white/5">Routines</TabsTrigger>
                        <TabsTrigger value="financials" className="h-10 px-8 rounded-lg text-xs font-bold transition-all data-[state=active]:bg-white/5">Financials</TabsTrigger>
                        <TabsTrigger value="analytics" className="h-10 px-8 rounded-lg text-xs font-bold transition-all data-[state=active]:bg-white/5">Analytics</TabsTrigger>
                    </TabsList>
                </div>

                {/* --- MEMBERS TAB --- */}
                <TabsContent value="members" className="animate-in fade-in duration-500">
                    <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-8 border-b border-white/5 bg-white/2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-bold text-white tracking-tight ">Program Directory</h3>
                                <p className="text-[10px] text-muted-foreground opacity-40 font-bold  tracking-widest mt-1">Active nodes assigned to this protocol</p>
                            </div>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all" />
                                <Input placeholder="Find member..." className="h-10 w-64 bg-black/40 border-white/5 rounded-xl pl-10 text-[10px] font-bold  tracking-widest outline-none focus:ring-0" />
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5 hover:bg-transparent bg-white/1">
                                    <TableHead className="text-[10px] font-bold text-muted-foreground h-14 pl-10  tracking-widest">Active Member</TableHead>
                                    <TableHead className="text-[10px] font-bold text-muted-foreground h-14  tracking-widest whitespace-nowrap text-center">Institutional Node</TableHead>
                                    <th className="text-[10px] font-bold text-muted-foreground h-14  tracking-widest text-left whitespace-nowrap pl-10">Compliance Index</th>
                                    <TableHead className="text-right pr-10 text-[10px] font-bold text-muted-foreground h-14  tracking-widest">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {programPatients.map((patient) => (
                                    <TableRow key={patient.id} className="border-white/5 hover:bg-white/2 transition-all group">
                                        <TableCell className="pl-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-10 w-10 border border-white/5 p-0.5 ring-1 ring-white/10 shadow-lg">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} />
                                                    <AvatarFallback className="text-[10px] font-black">{patient.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-white  tracking-tight group-hover:text-primary transition-colors">{patient.name}</span>
                                                    <span className="text-[10px] text-muted-foreground opacity-30 font-bold font-sans  tracking-tight">{patient.id}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-xs font-bold text-white/40  tracking-widest">Waka Fitness HQ</span>
                                        </TableCell>
                                        <TableCell className="pl-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '84%' }}
                                                        className="h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-emerald-500 font-sans tabular-nums tracking-widest">84%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => router.push(`/nutritionist/users/${patient.id}`)}
                                                className="h-9 px-4 rounded-xl text-[10px] font-bold border border-white/5 bg-white/5 opacity-50 hover:opacity-100  tracking-widest transition-all"
                                            >
                                                Audit File
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                {/* --- ROUTINES TAB --- (Formerly Meal Routine) */}
                <TabsContent value="routines" className="animate-in fade-in duration-500">
                    <Card className="glass-dark border-white/5 rounded-3xl p-10 space-y-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white  tracking-tight">Active Dietary Protocol</h3>
                                <p className="text-[10px] text-muted-foreground opacity-40 font-bold  tracking-widest mt-1.5">Weekly meal guidelines for the entire program stream</p>
                            </div>
                            <Button variant="outline" className="h-11 px-6 rounded-xl text-[10px] font-bold border-white/10 bg-white/5  tracking-widest transition-all hover:bg-white/10">
                                <Plus className="w-4 h-4 mr-2" /> Modify Routine
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-7 gap-6">
                            {WEEK_DAYS.map(day => {
                                const meals = (PROGRAM_MEAL_PLAN as any)[day] || [];
                                return (
                                    <div key={day} className="space-y-4">
                                        <div className="text-center py-3 border-b border-white/5 mb-2 bg-white/2 rounded-t-2xl">
                                            <span className="text-[10px] font-bold text-muted-foreground  opacity-40 tracking-widest font-sans">{day.slice(0, 3)}</span>
                                        </div>
                                        <div className="min-h-[160px] space-y-3">
                                            {meals.length > 0 ? meals.map((meal: any, idx: number) => (
                                                <div key={idx} className="p-4 rounded-2xl border border-white/5 bg-white/5 group hover:bg-white/10 transition-all cursor-pointer shadow-xl shadow-black/20">
                                                    <p className="text-[9px] font-bold text-indigo-400  mb-2 tracking-tight">{meal.type}</p>
                                                    <p className="text-[10px] font-bold text-white  leading-tight tracking-tight mb-3">{meal.title}</p>
                                                    <div className="flex justify-between items-center opacity-30 transition-opacity group-hover:opacity-100">
                                                        <span className="text-[8px] font-bold text-white/40  tracking-widest">{meal.cals}</span>
                                                        <Plus className="w-2.5 h-2.5" />
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="h-full min-h-[120px] w-full border border-dashed border-white/5 rounded-2xl flex items-center justify-center opacity-10">
                                                    <span className="text-[10px] font-bold  opacity-20 tracking-widest font-sans">Off Cycle</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </TabsContent>

                {/* --- FINANCIALS TAB --- */}
                <TabsContent value="financials" className="animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: "Aggregate Yield", val: "RWF 14.8M", color: "text-emerald-500", trend: "+12.4%" },
                            { label: "Cycle Run Rate", val: "RWF 1.2M", color: "text-indigo-500", trend: "Stable" },
                            { label: "Node Service Fee", val: "RWF 35,000", color: "text-amber-500", trend: "Fixed" },
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark p-8 border-white/5 rounded-3xl satin-card group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner", stat.color)}>
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <span className={cn("text-[9px] font-bold tracking-widest  px-2 py-0.5 rounded-lg bg-white/2", i === 0 ? "text-emerald-400" : (i === 1 ? "text-indigo-400" : "text-amber-400"))}>{stat.trend}</span>
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground  opacity-40 mb-2 tracking-widest font-sans">{stat.label}</p>
                                <h4 className="text-2xl font-bold text-white tracking-tighter  font-sans tabular-nums">{stat.val}</h4>
                            </Card>
                        ))}
                    </div>

                    <Card className="mt-8 glass-dark p-10 border-white/5 rounded-3xl space-y-10 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-white  tracking-tight">Financial Audit Trail</h3>
                            <p className="text-[10px] text-muted-foreground opacity-40 font-bold  tracking-widest mt-1.5">Consolidated invoicing and operational dues for this program</p>
                        </div>
                        <Button className="h-12 px-8 rounded-xl text-[10px] font-black silver-gradient text-black  tracking-widest shadow-xl">
                            <FileText className="w-4 h-4 mr-2" /> View Ledgers
                        </Button>
                    </Card>
                </TabsContent>

                {/* --- ANALYTICS TAB --- */}
                <TabsContent value="analytics" className="animate-in fade-in duration-500">
                    <Card className="glass-dark p-10 border-white/5 rounded-3xl space-y-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white  tracking-tight">Institutional Compliance Trend</h3>
                                <p className="text-[10px] text-muted-foreground opacity-40 font-bold  mt-1.5 tracking-widest">Aggregate adherence yield across all nodes</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shadow-xl">
                                <Activity className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="h-[350px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={SUCCESS_DATA} margin={{ left: -20, right: 10, top: 0 }}>
                                    <defs>
                                        <linearGradient id="programYieldAdmin" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                    <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#programYieldAdmin)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-center gap-10 opacity-40 pt-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-black  tracking-widest">Aggregate compliance</span>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* ENROLL MEMBER MODAL */}
            <Dialog open={isEnrollModalOpen} onOpenChange={setIsEnrollModalOpen}>
                <DialogContent className="glass-dark border-white/10 max-w-md rounded-[2.5rem] p-10">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-2xl font-bold text-white  tracking-tight">Active Enrollment</DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-2">Provision a new user node for the {program.name} protocol.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 pt-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground  opacity-40 ml-1">Search Registry</label>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all" />
                                <input placeholder="ENTER NAME OR NODE ID..." className="w-full h-12 bg-white/5 border-white/5 rounded-xl px-12 text-xs font-bold text-white  tracking-widest outline-none focus:ring-1 focus:ring-white/10 placeholder:opacity-20" />
                            </div>
                        </div>
                        <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20 flex items-center gap-4 shadow-xl shadow-emerald-500/5">
                            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/20">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-emerald-500 font-bold  tracking-widest leading-relaxed">
                                Automated node sync active. member will be notified post-execution.
                            </p>
                        </div>
                    </div>
                    <DialogFooter className="mt-10 sm:justify-between items-center gap-4">
                        <Button variant="ghost" onClick={() => setIsEnrollModalOpen(false)} className="text-[10px] font-bold  tracking-widest text-muted-foreground opacity-40 hover:opacity-100 order-2 sm:order-1">Abort</Button>
                        <Button className="h-12 px-10 rounded-xl text-[10px] font-black silver-gradient text-black  tracking-widest order-1 sm:order-2 shadow-xl shadow-white/5">Confirm Sync</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
