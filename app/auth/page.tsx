"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, ArrowLeft, Zap, Apple, Dumbbell, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AuthChoicePage() {
    const portals = [
        {
            name: "Corporate",
            desc: "Institutional wellness Hub",
            icon: Building2,
            role: "corporate",
            color: "text-indigo-400"
        },
        {
            name: "Partner",
            desc: "Facility management Hub",
            icon: Dumbbell,
            role: "partner",
            color: "text-emerald-400"
        },
        {
            name: "Coach",
            desc: "Training & client logs",
            icon: Zap,
            role: "coach",
            color: "text-amber-400"
        },
        {
            name: "Nutritionist",
            desc: "Health & diet analytics",
            icon: Apple,
            role: "nutritionist",
            color: "text-rose-400"
        }
    ];

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Minimal Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-white/1 blur-[100px] rounded-full -z-10" />

            <div className="w-full max-w-3xl relative z-10">
                <div className="flex flex-col items-center mb-12 px-4 text-center">
                    <Link href="/" className="inline-flex items-center text-[9px] font-bold text-muted-foreground hover:text-white transition-opacity mb-8 group uppercase tracking-widest opacity-30 hover:opacity-100 italic">
                        <ArrowLeft className="mr-2 w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Exit Application
                    </Link>

                    <Image
                        src="/logos/wordmark-on-dark.svg"
                        alt="FlexPass"
                        width={120}
                        height={36}
                        className="h-8 w-auto object-contain opacity-70 mb-8"
                        priority
                    />

                    <h1 className="text-xl font-bold tracking-tight text-white mb-2 font-sans">Select Access Node</h1>
                    <p className="text-muted-foreground text-[10px] opacity-40 font-medium uppercase tracking-[0.2em] font-sans">Identify your operational role to continue</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
                    {portals.map((portal, i) => (
                        <motion.div
                            key={portal.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link href={`/auth/login/${portal.role}`}>
                                <Card className="glass-dark px-6 py-4 border-white/5 cursor-pointer hover:border-white/20 transition-all group rounded-xl relative overflow-hidden flex items-center gap-5 satin-card border-glow">
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white-[0.01] transition-colors" />

                                    <div className={cn(
                                        "w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 border border-white/5 shadow-inner",
                                        portal.color
                                    )}>
                                        <portal.icon className="w-5 h-5 shadow-2xl shadow-white/10" />
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-sm font-bold text-white mb-0.5 font-sans leading-none">{portal.name}</h2>
                                        <p className="text-[10px] text-muted-foreground opacity-40 font-medium group-hover:opacity-70 transition-opacity font-sans">
                                            {portal.desc}
                                        </p>
                                    </div>

                                    <ChevronRight className="w-3.5 h-3.5 text-white/10 group-hover:text-primary transition-all group-hover:translate-x-1" />
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center text-[9px] text-muted-foreground opacity-20 font-bold uppercase tracking-[0.35em] font-sans">
                    Enterprise Security Standard 2.4.1
                </div>
            </div>
        </div>
    );
}
