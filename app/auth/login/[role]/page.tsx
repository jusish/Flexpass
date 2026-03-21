"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMockStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Building2, Store, Lock, Mail, ArrowLeft, Loader2, Zap, Apple } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const params = useParams();
    const router = useRouter();
    const { login } = useMockStore();
    const role = (params.role as string) || "corporate";

    const roleConfigs: Record<string, { title: string; icon: any; placeholder: string; redirect: string; loginType: "CORPORATE" | "PARTNER" | "COACH" | "NUTRITIONIST" }> = {
        corporate: {
            title: "Corporate Portal",
            icon: Building2,
            placeholder: "hr@company.rw",
            redirect: "/corporate/dashboard",
            loginType: "CORPORATE"
        },
        partner: {
            title: "Partner Portal",
            icon: Store,
            placeholder: "manager@facility.rw",
            redirect: "/partner/dashboard",
            loginType: "PARTNER"
        },
        coach: {
            title: "Coach Portal",
            icon: Zap,
            placeholder: "coach@flexpass.rw",
            redirect: "/coach",
            loginType: "COACH"
        },
        nutritionist: {
            title: "Nutrition Portal",
            icon: Apple,
            placeholder: "dr@diet.rw",
            redirect: "/nutritionist",
            loginType: "NUTRITIONIST"
        }
    };

    const config = roleConfigs[role] || roleConfigs.corporate;

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate delay
        setTimeout(() => {
            login(config.loginType);
            toast.success(`Welcome to the ${config.title}`);
            router.push(config.redirect);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-white/5 blur-[150px] rounded-full -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm relative z-10"
            >
                <Link href="/auth" className="inline-flex items-center text-[10px] font-bold text-muted-foreground hover:text-white transition-colors mb-6 group  tracking-widest opacity-50 hover:opacity-100">
                    <ArrowLeft className="mr-2 w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Change Access Node
                </Link>

                <Card className="glass-dark p-8 border-white/5 rounded-2xl shadow-2xl relative overflow-hidden satin-card">
                    <div className="absolute inset-0 silver-gradient opacity-[0.02]" />

                    <div className="text-center mb-8 relative z-10">
                        <div className="flex flex-col items-center mb-10">
                            <Image
                                src="/logos/wordmark-on-dark.svg"
                                alt="FlexPass"
                                width={140}
                                height={42}
                                className="h-8 w-auto object-contain opacity-80"
                                priority
                            />
                        </div>
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-xl group-hover:scale-110 transition-transform">
                            <config.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h1 className="text-xl font-bold mb-1 tracking-tight text-white">{config.title}</h1>
                        <p className="text-[10px] text-muted-foreground font-medium opacity-40  tracking-widest">Sign in to your operational vault</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-bold  tracking-[0.2em] opacity-40 ml-1">Identity Tag</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={config.placeholder}
                                    className="pl-11 h-12 bg-white/5 border-white/5 rounded-xl focus:border-white/20 transition-all font-medium text-xs text-white"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <Label htmlFor="password" className="text-[10px] font-bold  tracking-[0.2em] opacity-40">Security Key</Label>
                                <button type="button" className="text-[10px] text-primary font-bold hover:underline opacity-60 hover:opacity-100  tracking-widest">Recover</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-11 h-12 bg-white/5 border-white/5 rounded-xl focus:border-white/20 transition-all font-medium text-xs text-white"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl text-xs font-bold border-glow mt-4  tracking-[0.2em] silver-gradient text-black"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying Node...
                                </>
                            ) : (
                                "Initiate Access"
                            )}
                        </Button>
                    </form>

                    <div className="mt-10 text-center text-[10px] text-muted-foreground font-medium opacity-40 hover:opacity-100 transition-opacity">
                        Unauthorized access is strictly monitored.
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
