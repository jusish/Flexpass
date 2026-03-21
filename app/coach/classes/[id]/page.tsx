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
    CheckCircle2,
    Clock,
    DollarSign,
    Plus,
    MessageSquare,
    Zap,
    Download,
    BarChart3,
    MoreVertical,
    Star,
    ClipboardList,
    History,
    MapPin,
    Search,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
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

const GROUP_PERFORMANCE = [
    { name: "Week 1", attendance: 85, effort: 70 },
    { name: "Week 2", attendance: 92, effort: 85 },
    { name: "Week 3", attendance: 88, effort: 80 },
    { name: "Week 4", attendance: 95, effort: 90 },
];

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ClassDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { sessions, employees } = useMockStore();
    const resolvedParams = use(params);
    const router = useRouter();

    // UI States
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isAssignOpen, setIsAssignOpen] = useState(false);

    const session = sessions.find(s => s.id === resolvedParams.id) || sessions[0];
    const sessionMembers = employees.slice(0, session.booked);

    // Mock Assignments for Group (User calls them Routings)
    const [groupAssignments] = useState([
        { id: 1, title: "Group Plank Challenge", duration: "7 Days", progress: 65, averageRating: 4.2 },
        { id: 2, title: "Hydration Protocol", duration: "30 Days", progress: 40, averageRating: 3.8 },
    ]);

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
                            <h1 className="text-3xl font-bold tracking-tight text-white mb-0.5">{session.name}</h1>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-bold px-2.5 py-1 rounded-lg  tracking-wider">Active Stream</Badge>
                        </div>
                        <p className="text-muted-foreground text-xs opacity-50 font-medium tracking-wide">
                            {session.partnerName} • {session.day}s at {session.time} • Global ID: {session.id}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-5 border-white/5 bg-white/5 text-xs font-semibold rounded-xl transition-all hover:bg-white/10">
                        <MessageSquare className="w-4 h-4 mr-2" /> Broadcast
                    </Button>
                    <Button className="h-11 px-6 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest shadow-lg" onClick={() => setIsAddUserOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" /> Add Member
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Subscribed Members", val: `${session.booked}/${session.capacity}`, sub: "Node capacity", icon: Users, color: "text-indigo-500" },
                    { label: "Operational Yield", val: `RWF ${session.yield.toLocaleString()}`, sub: "Last session net", icon: DollarSign, color: "text-emerald-500" },
                    { label: "Clinical Rating", val: "4.9/5", sub: "User focus index", icon: Star, color: "text-amber-500" },
                    { label: "Active Routines", val: "2 Protocols", sub: "Active group tasks", icon: Zap, color: "text-sky-500" },
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
                        <TabsTrigger value="schedule" className="h-10 px-8 rounded-lg text-xs font-bold transition-all data-[state=active]:bg-white/5">Schedule</TabsTrigger>
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
                                <h3 className="text-base font-bold text-white tracking-tight ">Session Roster</h3>
                                <p className="text-[10px] text-muted-foreground opacity-40 font-bold  tracking-widest mt-1">Total active node subscribers</p>
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
                                    <TableHead className="text-[10px] font-bold text-muted-foreground h-14  tracking-widest whitespace-nowrap">Enrollment Date</TableHead>
                                    <th className="text-[10px] font-bold text-muted-foreground h-14  tracking-widest text-left whitespace-nowrap">Performance Index</th>
                                    <TableHead className="text-right pr-10 text-[10px] font-bold text-muted-foreground h-14  tracking-widest">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sessionMembers.map((member) => (
                                    <TableRow key={member.id} className="border-white/5 hover:bg-white/2 transition-all group">
                                        <TableCell className="pl-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-10 w-10 border border-white/5 p-0.5 ring-1 ring-white/10 shadow-lg">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                                                    <AvatarFallback className="text-[10px] font-black">{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-white  tracking-tight group-hover:text-primary transition-colors">{member.name}</span>
                                                    <span className="text-[10px] text-muted-foreground opacity-30 font-bold font-sans  tracking-tight">{member.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-[11px] font-bold text-white/40 font-sans tracking-widest">12 MAR 2026</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center -space-x-0.5">
                                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />)}
                                                </div>
                                                <span className="text-[10px] font-bold text-white opacity-40">4.9</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <Badge variant="outline" className="text-[9px] font-bold text-emerald-500 border-none bg-emerald-500/10 px-3 py-1.5 rounded-lg font-sans tracking-widest">NORMAL</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                {/* --- SCHEDULE TAB --- */}
                <TabsContent value="schedule" className="animate-in fade-in duration-500">
                    <Card className="glass-dark border-white/5 rounded-3xl p-10 space-y-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white  tracking-tight">Recurring Stream Cycle</h3>
                                <p className="text-[10px] text-muted-foreground opacity-40 font-bold  tracking-widest mt-1.5">Weekly operational schedule for this node</p>
                            </div>
                            <Button variant="outline" className="h-11 px-6 rounded-xl text-[10px] font-bold border-white/10 bg-white/5  tracking-widest">
                                <Plus className="w-4 h-4 mr-2" /> Modify Window
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-7 gap-6">
                            {WEEK_DAYS.map(day => {
                                const isSessionDay = day === session.day;
                                return (
                                    <div key={day} className="space-y-4">
                                        <div className="text-center py-3 border-b border-white/5 mb-2 bg-white/2 rounded-t-2xl">
                                            <span className="text-[10px] font-bold text-muted-foreground  opacity-40 tracking-widest font-sans">{day.slice(0, 3)}</span>
                                        </div>
                                        <div className="min-h-[160px] space-y-3">
                                            {isSessionDay ? (
                                                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-xl shadow-indigo-500/5 group hover:bg-indigo-500/15 transition-all">
                                                    <p className="text-[10px] font-black text-indigo-400 mb-2 tracking-widest ">{session.time}</p>
                                                    <p className="text-[11px] font-bold text-white  leading-tight tracking-tight">{session.name}</p>
                                                    <div className="mt-4 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                                        <MapPin className="w-3.5 h-3.5 text-white" />
                                                        <span className="text-[9px] font-bold  tracking-widest">Global HQ</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-full min-h-[120px] w-full border border-dashed border-white/5 rounded-2xl flex items-center justify-center opacity-10">
                                                    <span className="text-[10px] font-bold  opacity-20 tracking-widest font-sans">Off</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </TabsContent>

                {/* --- ROUTINES TAB --- (Formerly Assignments) */}
                <TabsContent value="routines" className="animate-in fade-in duration-500">
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white  tracking-tight">Active Group Protocol</h3>
                                <p className="text-[11px] text-muted-foreground opacity-40 font-bold mt-1">Operational tasks and challenges assigned to this node</p>
                            </div>
                            <Button onClick={() => setIsAssignOpen(true)} className="h-11 px-8 rounded-xl text-[10px] font-black silver-gradient text-black  tracking-widest shadow-xl">
                                <Plus className="w-4 h-4 mr-2" /> Provision Routine
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {groupAssignments.map((asg) => (
                                <Card key={asg.id} className="glass-dark border-white/5 rounded-3xl p-10 group hover:border-white/10 transition-all flex flex-col justify-between h-full min-h-[350px]">
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-start">
                                            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 shadow-xl group-hover:scale-110 transition-transform text-indigo-500">
                                                <ClipboardList className="w-6 h-6" />
                                            </div>
                                            <Badge variant="outline" className="text-[10px] font-bold  text-indigo-400 border-none bg-indigo-500/10 px-3 py-1.5 rounded-lg tracking-widest">ACTIVE</Badge>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white  tracking-tight group-hover:text-primary transition-colors">{asg.title}</h4>
                                            <div className="flex items-center gap-6 mt-4 opacity-40">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-[11px] font-bold  tracking-wide">{asg.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-[11px] font-bold  tracking-wide">{session.booked} Nodes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3 pt-6 border-t border-white/5">
                                            <div className="flex justify-between text-[11px] font-bold text-muted-foreground  opacity-40 tracking-widest font-sans">
                                                <span>Aggregate Progress</span>
                                                <span className="text-white opacity-100">{asg.progress}%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${asg.progress}%` }}
                                                    className="h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="w-full h-12 mt-10 rounded-xl text-[10px] font-bold border-white/5 bg-white/5 opacity-50 hover:opacity-100 hover:bg-white/10 transition-all  tracking-widest">
                                        Audit Registry
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* --- FINANCIALS TAB --- */}
                <TabsContent value="financials" className="animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="glass-dark p-10 border-white/5 rounded-3xl space-y-10 flex flex-col justify-between">
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-white  tracking-tight">Yield Performance</h3>
                                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-10">
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground  opacity-40 mb-3 tracking-widest font-sans">Session Yield</p>
                                        <h4 className="text-3xl font-bold text-white tracking-tighter  font-sans">RWF {session.yield.toLocaleString()}</h4>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground  opacity-40 mb-3 tracking-widest font-sans">Cycle Forecast</p>
                                        <h4 className="text-3xl font-bold text-emerald-500 tracking-tighter  font-sans">RWF {(session.yield * 4).toLocaleString()}</h4>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/2 border border-white/5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-bold text-white/30  tracking-widest font-sans">Monthly Target Threshold</span>
                                        <span className="text-[11px] font-black text-emerald-500 font-sans tracking-widest">+18.2%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '70%' }}
                                            className="h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full h-14 mt-12 rounded-xl text-[10px] font-black silver-gradient text-black flex items-center justify-center gap-3  tracking-widest shadow-xl">
                                <FileText className="w-4 h-4" />
                                Generate Ledger Audit
                            </Button>
                        </Card>

                        <Card className="glass-dark p-10 border-white/5 rounded-3xl space-y-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-white  tracking-tight">Overhead Breakdown</h3>
                                <Badge variant="outline" className="text-[10px] font-bold text-rose-400 border-none bg-rose-400/5 rounded-lg px-3 py-1 tracking-widest ">FIXED COST</Badge>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: "Partner Node Fee", val: "RWF 15,000", sub: "Standard session rate" },
                                    { label: "Platform Commission", val: "RWF 5,000", sub: "Operational split" },
                                    { label: "Net Profit Margin", val: "72%", sub: "Yield efficiency index" },
                                ].map((cost, i) => (
                                    <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
                                        <div>
                                            <p className="text-[11px] font-bold text-white/40  font-sans mb-1 tracking-widest">{cost.label}</p>
                                            <p className="text-[10px] text-muted-foreground opacity-30  font-bold font-sans tracking-wide">{cost.sub}</p>
                                        </div>
                                        <span className={cn("text-sm font-bold  tracking-tight", i === 2 ? "text-emerald-500" : "text-white")}>{cost.val}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-center">
                                <p className="text-[11px] font-bold text-indigo-400 tracking-widest ">Node Health: Optimal</p>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* --- ANALYTICS TAB --- */}
                <TabsContent value="analytics" className="animate-in fade-in duration-500">
                    <Card className="glass-dark p-10 border-white/5 rounded-3xl space-y-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white  tracking-tight">Energy & Adherence Trends</h3>
                                <p className="text-[11px] text-muted-foreground opacity-40 font-bold  mt-1.5 tracking-widest">Aggregate effort metrics across sessions</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-indigo-400 shadow-xl">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="h-[350px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={GROUP_PERFORMANCE} margin={{ left: -20, right: 10, top: 0 }}>
                                    <defs>
                                        <linearGradient id="effortColorAdmin" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="attendanceColorAdmin" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                    <Area type="monotone" dataKey="effort" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#effortColorAdmin)" />
                                    <Area type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#attendanceColorAdmin)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-center gap-10 opacity-40 pt-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-black  tracking-widest">Global Effort</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                                <span className="text-[10px] font-black  tracking-widest">Attendance Yield</span>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* MODALS */}
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogContent className="glass-dark border-white/10 max-w-md rounded-[2rem] p-10">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-2xl font-bold text-white  tracking-tight">Enroll New Member</DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-2">Add a new user node to this recurring stream.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-all" />
                            <Input placeholder="Search member directory..." className="h-12 bg-white/5 border-white/5 rounded-xl pl-12 text-xs font-bold  focus:ring-1 focus:ring-white/10 outline-none" />
                        </div>
                        <div className="p-4 rounded-xl border border-white/5 bg-white/2 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 border border-white/5">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Justin`} />
                                    <AvatarFallback>J</AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-bold text-white  tracking-tight">Justin Mugisha</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-8 text-[10px] font-black  tracking-widest text-indigo-400">Add</Button>
                        </div>
                    </div>
                    <DialogFooter className="mt-10">
                        <Button onClick={() => setIsAddUserOpen(false)} className="w-full h-12 rounded-xl text-[10px] font-black tracking-widest silver-gradient text-black ">Close Directory</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
