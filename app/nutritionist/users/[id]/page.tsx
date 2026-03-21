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
    Apple,
    Plus,
    ShieldCheck,
    Scale,
    Timer,
    Utensils,
    HeartPulse,
    CheckCircle2,
    MessageSquare,
    ArrowUpRight,
    Search,
    Download,
    Coffee,
    Zap,
    History,
    MoreVertical,
    Star,
    MapPin,
    CreditCard,
    ArrowRight,
    DollarSign,
    Clock,
    Flame,
    ClipboardList
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
import { MOCK_INVOICES } from "@/lib/mock-data";

const ADHERENCE_DATA = [
    { name: "Mon", rate: 95 },
    { name: "Tue", rate: 88 },
    { name: "Wed", rate: 92 },
    { name: "Thu", rate: 85 },
    { name: "Fri", rate: 98 },
    { name: "Sat", rate: 80 },
    { name: "Sun", rate: 75 },
];

const COMPOSITION_DATA = [
    { name: "Jan", weight: 82, fat: 22 },
    { name: "Feb", weight: 80.5, fat: 21.2 },
    { name: "Mar", weight: 79.2, fat: 20.5 },
];

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MEAL_PLAN = {
    Monday: [
        { type: "Breakfast", title: "Oatmeal with Blueberries", items: "1 cup oats, 1/2 cup berries, honey", cals: "350 kcal", protein: "12g" },
        { type: "Lunch", title: "Grilled Chicken Salad", items: "150g Chicken, Mixed Greens, Vinaigrette", cals: "450 kcal", protein: "35g" },
        { type: "Snack", title: "Greek Yogurt", items: "150g Plain Yogurt, Almonds", cals: "180 kcal", protein: "15g" },
        { type: "Dinner", title: "Baked Salmon & Asparagus", items: "200g Salmon, 10ct Asparagus", cals: "520 kcal", protein: "40g" },
    ],
    Wednesday: [
        { type: "Breakfast", title: "Scrambled Eggs & Avocado", items: "3 Eggs, 1/2 Avocado, 1 slice toast", cals: "420 kcal", protein: "24g" },
        { type: "Lunch", title: "Quinoa & Roasted Veggies", items: "1 cup Quinoa, Broccoli, Carrots", cals: "380 kcal", protein: "14g" },
        { type: "Dinner", title: "Lean Beef Stir-fry", items: "150g Beef, Peppers, Mushrooms", cals: "480 kcal", protein: "32g" },
    ]
};

export default function NutritionistMemberDetails({ params }: { params: Promise<{ id: string }> }) {
    const { employees } = useMockStore();
    const resolvedParams = use(params);
    const router = useRouter();
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const [selectedMeal, setSelectedMeal] = useState<any>(null);
    const [isMealModalOpen, setIsMealModalOpen] = useState(false);

    const member = employees.find(e => e.id === resolvedParams.id) || employees[0];

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
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-bold px-2 py-0.5 rounded-lg  tracking-wider">Premium Client</Badge>
                        </div>
                        <p className="text-muted-foreground text-xs opacity-50 font-medium">
                            Partner: Waka Fitness • Member ID: {member.id} • {member.email}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-10 px-4 border-white/5 bg-white/5 text-xs font-semibold rounded-xl transition-all">
                        <MessageSquare className="w-4 h-4 mr-2" /> Message
                    </Button>
                    <Button onClick={() => setIsAssignModalOpen(true)} className="h-10 px-6 rounded-xl text-xs font-bold silver-gradient text-black  tracking-widest">
                        <Plus className="w-4 h-4 mr-2" /> Assign Protocol
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
                                <ShieldCheck className="w-4 h-4 text-black" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">{member.name}</h2>
                            <p className="text-[10px] font-semibold text-muted-foreground  opacity-40 mt-1.5 tracking-widest">Kigali, Rwanda</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {[
                            { label: "Current Weight", val: "79.2 KG", sub: "-2.1kg Cycle", icon: Scale, color: "text-emerald-500" },
                            { label: "Body Fat %", val: "20.5%", sub: "-0.8% Trend", icon: HeartPulse, color: "text-indigo-500" },
                            { label: "Target Weight", val: "72.0 KG", sub: "Goal weight", icon: Activity, color: "text-amber-500" },
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

                    <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-bold border-white/5 bg-white/5 text-muted-foreground opacity-60 hover:opacity-100  tracking-widest transition-all">
                        <Download className="w-4 h-4 mr-2" /> Export Nutrition File
                    </Button>
                </Card>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    <Tabs defaultValue="overview" className="w-full space-y-8">
                        <div className="overflow-x-auto">
                            <TabsList className="bg-black/40 border border-white/5 p-1 h-12 rounded-xl inline-flex min-w-full md:min-w-0">
                                <TabsTrigger value="overview" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Overview</TabsTrigger>
                                <TabsTrigger value="meal-plan" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Meal Plan</TabsTrigger>
                                <TabsTrigger value="schedule" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Schedule</TabsTrigger>
                                <TabsTrigger value="composition" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Composition</TabsTrigger>
                                <TabsTrigger value="financials" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Financials</TabsTrigger>
                                <TabsTrigger value="analytics" className="h-10 px-6 rounded-lg text-xs font-bold data-[state=active]:bg-white/5 transition-all">Analytics</TabsTrigger>
                            </TabsList>
                        </div>

                        {/* --- OVERVIEW TAB --- */}
                        <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="glass-dark p-8 border-white/5 rounded-2xl space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-white  tracking-tight flex items-center gap-3 font-sans">
                                            <Activity className="w-4 h-4 text-emerald-500" /> Adherence Trend
                                        </h3>
                                        <Badge variant="outline" className="text-[9px] font-bold border-white/5 opacity-40  tracking-widest px-2.5 py-1 rounded-lg">Last 7 Days</Badge>
                                    </div>
                                    <div className="h-[220px] w-full mt-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={ADHERENCE_DATA} margin={{ left: -20, right: 10, top: 0 }}>
                                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} domain={[0, 100]} />
                                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                                <Bar dataKey="rate" fill="#10b981" radius={[6, 6, 0, 0]} barSize={28} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>

                                <Card className="glass-dark p-8 border-white/5 rounded-2xl space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-white  tracking-tight flex items-center gap-3 font-sans">
                                            <Flame className="w-4 h-4 text-amber-500" /> Metabolic Summary
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: "BMR Performance", val: "1,850 kcal/day" },
                                            { label: "TDEE Average", val: "2,400 kcal/day" },
                                            { label: "Daily Protein", val: "160g / day" },
                                            { label: "Hydration Status", val: "3.5L / day" },
                                        ].map((m, i) => (
                                            <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/2 border border-white/5 transition-all hover:bg-white/5">
                                                <span className="text-[10px] font-bold text-white/30  tracking-widest font-sans">{m.label}</span>
                                                <span className="text-xs font-bold text-white  tracking-tight opacity-80">{m.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* --- MEAL PLAN TAB --- */}
                        <TabsContent value="meal-plan" className="space-y-6 animate-in fade-in duration-500">
                            <Card className="glass-dark border-white/5 rounded-2xl p-8 sm:p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-base font-bold text-white tracking-tight">Active Nutritional Protocol</h3>
                                        <Badge variant="outline" className="text-[9px] font-bold  text-emerald-400 border-none bg-emerald-400/5 px-3 py-1">Operational</Badge>
                                    </div>
                                    <Button className="h-10 px-6 rounded-xl text-[10px] font-bold silver-gradient text-black  tracking-widest">
                                        <Plus className="w-4 h-4 mr-2" /> Modify Diet
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
                                    {WEEK_DAYS.map(day => {
                                        const meals = (MEAL_PLAN as any)[day] || [];
                                        return (
                                            <div key={day} className="space-y-4">
                                                <div className="text-center py-3 border-b border-white/5 mb-2 bg-white/2 rounded-t-xl">
                                                    <span className="text-[10px] font-bold text-muted-foreground  opacity-40 tracking-widest font-sans">{day.slice(0, 3)}</span>
                                                </div>
                                                <div className="min-h-[160px] space-y-3">
                                                    {meals.length > 0 ? meals.map((meal: any, idx: number) => (
                                                        <div
                                                            key={idx}
                                                            className="p-4 rounded-xl border border-white/5 bg-white/5 group hover:bg-white/10 transition-all cursor-pointer"
                                                            onClick={() => {
                                                                setSelectedMeal(meal);
                                                                setIsMealModalOpen(true);
                                                            }}
                                                        >
                                                            <div className="flex justify-between items-center mb-2">
                                                                <p className="text-[9px] font-bold text-indigo-400  tracking-tight">{meal.type}</p>
                                                            </div>
                                                            <p className="text-[10px] font-bold text-white  leading-tight tracking-tight mb-3">{meal.title}</p>
                                                            <div className="flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                                                                <span className="text-[8px] font-bold  tracking-widest">{meal.cals}</span>
                                                                <span className="text-[8px] font-bold  text-emerald-500">View</span>
                                                            </div>
                                                        </div>
                                                    )) : (
                                                        <div className="h-full min-h-[100px] w-full border border-dashed border-white/5 rounded-xl flex items-center justify-center opacity-10">
                                                            <span className="text-[9px] font-bold  tracking-widest font-sans">Off</span>
                                                        </div>
                                                    )}
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

                        {/* --- SCHEDULE TAB --- */}
                        <TabsContent value="schedule" className="space-y-8 animate-in fade-in duration-500">
                            <Card className="glass-dark border-white/5 rounded-2xl p-8 sm:p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-base font-bold text-white  tracking-tight">Clinical Check-ins</h3>
                                    <Button onClick={() => { }} className="h-10 px-6 rounded-xl text-[10px] font-bold silver-gradient text-black  tracking-widest">
                                        <Plus className="w-4 h-4 mr-2" /> Book Advisory Slot
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { date: "Tomorrow, 09:00 AM", title: "Metabolic Review", status: "Confirmed", icon: Zap, color: "text-amber-500" },
                                        { date: "Next Friday, 02:00 PM", title: "Monthly Assessment", status: "Upcoming", icon: Calendar, color: "text-indigo-500" },
                                    ].map((meeting, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/2 border border-white/5 group hover:bg-white/5 transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className={cn("p-3 rounded-xl bg-white/5 border border-white/5", meeting.color)}>
                                                    <meeting.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white  tracking-tight">{meeting.title}</p>
                                                    <p className="text-[10px] text-muted-foreground opacity-40 font-bold  tracking-widest mt-1.5">{meeting.date}</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] font-bold  border-none bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg">
                                                {meeting.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </TabsContent>

                        {/* --- COMPOSITION TAB --- */}
                        <TabsContent value="composition" className="space-y-8 animate-in fade-in duration-500">
                            <Card className="glass-dark p-10 border-white/5 rounded-2xl space-y-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-white  tracking-tight flex items-center gap-3">
                                            <Scale className="w-4 h-4 text-indigo-500" /> Mass Yield Analysis
                                        </h3>
                                        <p className="text-[10px] text-muted-foreground opacity-30  tracking-widest mt-1.5 font-bold font-sans">Compositional history over time</p>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={COMPOSITION_DATA} margin={{ left: -20, right: 10, top: 0 }}>
                                            <defs>
                                                <linearGradient id="compositionColorAdmin" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                            <Area type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#compositionColorAdmin)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* --- FINANCIALS TAB --- */}
                        <TabsContent value="financials" className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Lifetime Yield", val: "RWF 1,840,000", icon: DollarSign, color: "text-emerald-500", trend: "+15.2%" },
                                    { label: "Accrued Dues", val: "RWF 45,000", icon: Clock, color: "text-amber-500", trend: "Balanced" },
                                    { label: "Service Tier", val: "Premium Nutri", icon: CreditCard, color: "text-indigo-500", trend: "Active" },
                                ].map((stat, i) => (
                                    <Card key={i} className="glass-dark p-6 border-white/5 rounded-2xl satin-card">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={cn("p-2 rounded-lg bg-white/5 border border-white/5", stat.color)}>
                                                <stat.icon className="w-4 h-4" />
                                            </div>
                                            <span className={cn("text-[9px] font-bold  tracking-widest px-2 py-0.5 rounded-lg bg-white/1", i === 2 ? "text-indigo-400" : (stat.trend.startsWith("+") ? "text-emerald-400" : "text-amber-400"))}>{stat.trend}</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-muted-foreground  opacity-40 mb-1 font-sans tracking-widest">{stat.label}</p>
                                        <h4 className="text-xl font-bold text-white tracking-tight">{stat.val}</h4>
                                    </Card>
                                ))}
                            </div>

                            <Card className="glass-dark border-white/5 rounded-2xl overflow-hidden mt-8">
                                <div className="p-8 border-b border-white/5 bg-white/2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-base font-bold text-white tracking-tight ">billing history</h3>
                                        <p className="text-[10px] text-muted-foreground opacity-40 font-bold  tracking-widest mt-1">Audit trail for clinical services</p>
                                    </div>
                                    <Button variant="ghost" className="h-10 px-6 rounded-xl text-[10px] font-bold border border-white/5 bg-white/5 opacity-60 hover:opacity-100  tracking-widest">
                                        <History className="w-4 h-4 mr-2" /> View Ledgers
                                    </Button>
                                </div>
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 border-b border-white/5 text-muted-foreground">
                                                <th className="px-10 py-5 text-left text-[10px] font-bold  tracking-widest font-sans">Reference ID</th>
                                                <th className="px-10 py-5 text-left text-[10px] font-bold  tracking-widest font-sans">Service Model</th>
                                                <th className="px-10 py-5 text-left text-[10px] font-bold  tracking-widest font-sans">Amount</th>
                                                <th className="px-10 py-5 text-right pr-10 text-[10px] font-bold  tracking-widest font-sans">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MOCK_INVOICES.map((inv) => (
                                                <tr key={inv.id} className="border-b border-white/5 hover:bg-white/2 transition-colors group">
                                                    <td className="px-10 py-6 whitespace-nowrap">
                                                        <span className="text-[11px] font-bold text-white/30 font-sans tracking-widest">{inv.id}</span>
                                                    </td>
                                                    <td className="px-10 py-6 whitespace-nowrap">
                                                        <span className="text-xs font-bold text-white  tracking-tight opacity-70">Monthly Review</span>
                                                    </td>
                                                    <td className="px-10 py-6 whitespace-nowrap">
                                                        <span className="text-xs font-bold text-white  tracking-tight">RWF {inv.amount}</span>
                                                    </td>
                                                    <td className="px-10 py-6 text-right whitespace-nowrap pr-10">
                                                        <Badge variant="outline" className={cn(
                                                            "text-[9px] font-bold  border-none px-3 py-1.5 rounded-lg font-sans tracking-widest",
                                                            inv.status === "Paid" ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"
                                                        )}>
                                                            {inv.status}
                                                        </Badge>
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
                            <Card className="glass-dark p-10 border-white/5 rounded-2xl space-y-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-white  tracking-tight flex items-center gap-3">
                                            <TrendingUp className="w-4 h-4 text-indigo-500" /> Nutritional Integrity
                                        </h3>
                                        <p className="text-[10px] text-muted-foreground opacity-30  tracking-widest mt-1.5 font-bold font-sans">Adherence accuracy across cycles</p>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={ADHERENCE_DATA} margin={{ left: -20, right: 10, top: 0 }}>
                                            <defs>
                                                <linearGradient id="integrityColor" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                            <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#integrityColor)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* MODALS */}
            {/* Same logic but with improved rounding handles in components directly */}
        </div>
    );
}
