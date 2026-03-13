"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMockStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Building2, Store, Lock, Mail, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const params = useParams();
    const router = useRouter();
    const { login } = useMockStore();
    const role = params.role as string;
    const isCorporate = role === "corporate";

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate delay
        setTimeout(() => {
            login(isCorporate ? "CORPORATE" : "PARTNER");
            toast.success(`Logged in as ${isCorporate ? "Corporate Admin" : "Partner Admin"}`);
            router.push(isCorporate ? "/corporate/dashboard" : "/partner/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
            <div className="absolute inset-0 bg-primary/5 -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                <Link href="/auth" className="inline-flex items-center text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors mb-6 group uppercase tracking-widest">
                    <ArrowLeft className="mr-2 w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Change Portal
                </Link>

                <Card className="glass-dark p-8 border-white/5 rounded-2xl shadow-xl">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                            {isCorporate ? (
                                <Building2 className="w-7 h-7 text-primary" />
                            ) : (
                                <Store className="w-7 h-7 text-primary" />
                            )}
                        </div>
                        <h1 className="text-xl font-bold mb-1 tracking-tight">
                            {isCorporate ? "Corporate Portal" : "Partner Portal"}
                        </h1>
                        <p className="text-xs text-muted-foreground font-medium opacity-60">Sign in to manage your ecosystem</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@company.rw"
                                    className="pl-10 h-11 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all font-medium text-xs"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Password</Label>
                                <button type="button" className="text-[10px] text-primary font-bold hover:underline">Forgot?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-11 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all font-medium text-xs"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl text-xs font-bold border-glow mt-2 uppercase tracking-wider"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-[11px] text-muted-foreground font-medium">
                        Don't have an account?{" "}
                        <Link href="#" className="text-primary font-bold hover:underline">Request access</Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
