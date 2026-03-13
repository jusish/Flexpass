"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Store, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AuthChoicePage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow - Silver SATIN */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-white/3 blur-[150px] rounded-full -z-10" />

            <div className="w-full max-w-2xl relative z-10">
                <Link href="/" className="inline-flex items-center text-[10px] font-black text-muted-foreground hover:text-white transition-all mb-8 group uppercase tracking-[0.2em] opacity-40 hover:opacity-100">
                    <ArrowLeft className="mr-2 w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Terminal
                </Link>

                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black mb-2 tracking-tighter text-glow-silver"
                    >
                        Access Portal
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1"
                    >
                        Secure biometric verification required
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/auth/login/corporate">
                            <Card className="glass-dark p-8 h-full border-white/5 cursor-pointer hover:border-white/10 transition-all group rounded-2xl satin-card relative overflow-hidden">
                                <div className="absolute inset-0 silver-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity" />
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:silver-gradient group-hover:text-black transition-all border border-white/10 shadow-xl border-glow-silver">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-black mb-2 uppercase tracking-tighter group-hover:text-glow-silver transition-all">Corporate</h2>
                                <p className="text-muted-foreground text-[11px] leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                                    Manage organization-wide wellness administration and HR analytics.
                                </p>
                                <div className="mt-8 flex items-center text-primary text-[10px] font-black uppercase tracking-widest group-hover:text-glow-silver">
                                    Identity Verification <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link href="/auth/login/partner">
                            <Card className="glass-dark p-8 h-full border-white/5 cursor-pointer hover:border-white/10 transition-all group rounded-2xl satin-card relative overflow-hidden">
                                <div className="absolute inset-0 silver-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity" />
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:silver-gradient group-hover:text-black transition-all border border-white/10 shadow-xl border-glow-silver">
                                    <Store className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-black mb-2 uppercase tracking-tighter group-hover:text-glow-silver transition-all">Partner</h2>
                                <p className="text-muted-foreground text-[11px] leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                                    Manage facility operational settings and member check-in validation.
                                </p>
                                <div className="mt-8 flex items-center text-primary text-[10px] font-black uppercase tracking-widest group-hover:text-glow-silver">
                                    Partner Dashboard <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
