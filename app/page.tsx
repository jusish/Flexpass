"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  ChevronRight
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden text-sm">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/wordmark-on-dark.svg"
              alt="FlexPass"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#portals" className="hover:text-primary transition-colors">Portals</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
          </div>
          <Button asChild className="rounded-full px-6 h-9 text-xs font-medium">
            <Link href="/auth">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-6">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-10 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/5 text-primary text-[10px] font-semibold uppercase tracking-wide mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              Modern Fitness Ecosystem
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-7xl font-semibold tracking-tight mb-6 max-w-4xl leading-[1.1]">
              Elevate Your <span className="text-primary font-bold">Corporate</span> Wellness Journey
            </motion.h1>

            <motion.p variants={fadeIn} className="text-sm md:text-base text-muted-foreground max-w-xl mb-10 leading-relaxed opacity-80">
              The national fitness management platform that aggregates Rwanda's finest wellness services into a single digital ecosystem. One membership, total flexibility.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild className="rounded-xl h-12 px-8 text-sm font-semibold border-glow">
                <Link href="/auth">
                  Launch Platform <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="rounded-xl h-12 px-8 text-sm glass border border-white/5 opacity-70 hover:opacity-100">
                Explore Partners
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Partners", value: "50+" },
            { label: "Corporate Clients", value: "120+" },
            { label: "Monthly Visits", value: "15k+" },
            { label: "User Satisfaction", value: "98%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl text-center border border-white/5"
            >
              <div className="text-2xl md:text-3xl font-semibold text-primary/80 mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold opacity-60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portals Selection */}
      <section id="portals" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight">Our Portals</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto opacity-70">
              Specialized interfaces designed for every stakeholder in the ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Corporate Portal */}
            <motion.div whileHover={{ y: -5 }} className="group">
              <Card className="glass-dark p-8 h-full border-white/5 rounded-2xl relative overflow-hidden transition-all group-hover:border-primary/20">
                <div className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Corporate HR Portal</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed opacity-70">
                  Manage institutional wellness programs with real-time employee tracking, enrollment automation, and consolidated digital invoicing.
                </p>
                <ul className="space-y-3 mb-8 text-muted-foreground text-[13px] opacity-60">
                  <li className="flex items-center gap-2 font-medium"><ChevronRight className="w-4 h-4 text-primary/50" /> Utilization Tracking</li>
                  <li className="flex items-center gap-2 font-medium"><ChevronRight className="w-4 h-4 text-primary/50" /> Enrollment Automation</li>
                  <li className="flex items-center gap-2 font-medium"><ChevronRight className="w-4 h-4 text-primary/50" /> Data Analytics</li>
                </ul>
                <Button variant="link" asChild className="p-0 text-sm font-semibold group-hover:translate-x-1 transition-transform h-auto">
                  <Link href="/auth">Access Portal <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </Card>
            </motion.div>

            {/* Partner Portal */}
            <motion.div whileHover={{ y: -5 }} className="group">
              <Card className="glass-dark p-8 h-full border-white/5 rounded-2xl relative overflow-hidden transition-all group-hover:border-primary/20">
                <div className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Partner Dashboard</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed opacity-70">
                  The ultimate hub for gym owners and facility managers. Track visitor activity, optimize operations, and reach more subscribers.
                </p>
                <ul className="space-y-3 mb-8 text-muted-foreground text-[13px] opacity-60">
                  <li className="flex items-center gap-2 font-medium"><ChevronRight className="w-4 h-4 text-primary/50" /> Check-in Verification</li>
                  <li className="flex items-center gap-2 font-medium"><ChevronRight className="w-4 h-4 text-primary/50" /> Visit Heatmaps</li>
                  <li className="flex items-center gap-2 font-medium"><ChevronRight className="w-4 h-4 text-primary/50" /> Settlement Reports</li>
                </ul>
                <Button variant="link" asChild className="p-0 text-sm font-semibold group-hover:translate-x-1 transition-transform h-auto">
                  <Link href="/auth">Access Portal <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 glass">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <Image
              src="/logos/wordmark-on-dark.svg"
              alt="FlexPass Logo"
              width={120}
              height={36}
              className="h-9 w-auto object-contain opacity-80"
            />
          </div>
          <p className="text-muted-foreground text-[10px] opacity-60 font-medium">
            © 2026 OneFit Rwanda Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] text-muted-foreground font-medium opacity-70">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
