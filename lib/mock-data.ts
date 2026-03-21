import { addDays, subDays } from "date-fns";

export type UserRole = "CORPORATE_ADMIN" | "PARTNER_ADMIN" | "COACH_ADMIN" | "NUTRITIONIST_ADMIN" | "END_USER";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    companyId?: string;
    partnerId?: string;
}

export interface Company {
    id: string;
    name: string;
    tier: "Silver" | "Gold" | "Platinum";
    employeeCount: number;
    activeUsers: number;
    totalSpent: number;
    location: string;
    industry: string;
}

export interface Partner {
    id: string;
    name: string;
    type: "Gym" | "Pool" | "Tennis" | "Yoga";
    tier: "Classic" | "Silver" | "Gold" | "Platinum";
    visitsCount: number;
    rating: number;
    image: string;
    location: string;
    revenue: number;
    totalVisits: number;
}

export interface Visit {
    id: string;
    userId: string;
    userName: string;
    partnerId: string;
    partnerName: string;
    timestamp: string;
    status: "Completed" | "Pending" | "Flagged";
}

export interface Employee {
    id: string;
    name: string;
    email: string;
    tier: "Silver" | "Gold" | "Platinum";
    visits: number;
    status: "Active" | "Pending" | "Inactive";
    joinDate: string;
    department: string;
    companyId: string;
}

export const MOCK_USER: User = {
    id: "u1",
    name: "Jean Paul",
    email: "jp@bk.rw",
    role: "CORPORATE_ADMIN",
    companyId: "c1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
};

export const MOCK_EMPLOYEES: Employee[] = [
    { id: "e1", name: "Alice Mukana", email: "alice@bk.rw", tier: "Platinum", visits: 24, status: "Active", joinDate: "2026-01-12", department: "Finance", companyId: "c1" },
    { id: "e2", name: "Bob Rwanda", email: "bob@bk.rw", tier: "Gold", visits: 18, status: "Active", joinDate: "2026-01-15", department: "Operations", companyId: "c1" },
    { id: "e3", name: "Cédric Gasana", email: "cedric@bk.rw", tier: "Silver", visits: 12, status: "Inactive", joinDate: "2026-02-02", department: "IT", companyId: "c2" },
    { id: "e4", name: "Dative Umutoni", email: "dative@bk.rw", tier: "Platinum", visits: 31, status: "Active", joinDate: "2026-02-10", department: "Human Resources", companyId: "c2" },
    { id: "e5", name: "Eric Shema", email: "eric@bk.rw", tier: "Gold", visits: 8, status: "Pending", joinDate: "2026-03-01", department: "Customer Success", companyId: "c3" },
];

export const MOCK_COMPANIES: Company[] = [
    { id: "c1", name: "Bank of Kigali", tier: "Platinum", employeeCount: 450, activeUsers: 320, totalSpent: 12500000, location: "Kigali CBD", industry: "Finance" },
    { id: "c2", name: "MTN Rwanda", tier: "Platinum", employeeCount: 600, activeUsers: 510, totalSpent: 18000000, location: "Nyarutarama", industry: "Telecom" },
    { id: "c3", name: "I&M Bank", tier: "Gold", employeeCount: 200, activeUsers: 140, totalSpent: 5600000, location: "Kigali Heights", industry: "Finance" },
];

export const MOCK_PARTNERS: Partner[] = [
    { id: "p1", name: "Waka Fitness", type: "Gym", tier: "Platinum", visitsCount: 1240, rating: 4.8, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&h=300&auto=format&fit=crop", location: "Kigali CBD", revenue: 2400000, totalVisits: 1240 },
    { id: "p2", name: "Cercle Sportif", type: "Tennis", tier: "Platinum", visitsCount: 850, rating: 4.6, image: "https://images.unsplash.com/photo-1595435063851-697966f3629e?q=80&w=400&h=300&auto=format&fit=crop", location: "Kigali Heights", revenue: 1800000, totalVisits: 850 },
    { id: "p3", name: "Mindful Yoga", type: "Yoga", tier: "Gold", visitsCount: 420, rating: 4.9, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&h=300&auto=format&fit=crop", location: "Kimihurura", revenue: 950000, totalVisits: 420 },
    { id: "p4", name: "Kigali Arena Gym", type: "Gym", tier: "Silver", visitsCount: 2100, rating: 4.4, image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400&h=300&auto=format&fit=crop", location: "Remera", revenue: 4200000, totalVisits: 2100 },
];

export const MOCK_VISITS: Visit[] = Array.from({ length: 50 }).map((_, i) => ({
    id: `v${i}`,
    userId: `u${(i % 10) + 1}`,
    userName: ["Alice Mukana", "Bob Rwanda", "Cédric Gasana", "Dative Umutoni", "Eric Shema"][i % 5],
    partnerId: MOCK_PARTNERS[i % 4].id,
    partnerName: MOCK_PARTNERS[i % 4].name,
    timestamp: subDays(new Date(), i % 7).toISOString(),
    status: i % 15 === 0 ? "Flagged" : "Completed",
}));
export interface Assignment {
    id: string;
    title: string;
    description: string;
    durationDays: number;
    startDate: string;
    status: "Active" | "Completed" | "Pending";
    progress: number;
    coachId: string;
    memberId: string;
    routineId?: string;
    dailyLogs: {
        date: string;
        rating: number;
        review: string;
    }[];
}

export interface RoutineItem {
    time: string;
    activity: string;
    type: "Meal" | "Workout" | "Rest" | "Medication" | "Other";
    details?: string;
}

export interface Routine {
    id: string;
    userId: string;
    creatorId: string;
    name: string;
    category: "Nutrition" | "Strength" | "Yoga" | "Recovery";
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    description: string;
    schedule: {
        day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
        items: RoutineItem[];
    }[];
}

export interface Coach {
    id: string;
    name: string;
    email: string;
    specialty: string;
    rating: number;
    experience: string;
    activeMembers: number;
    totalSessions: number;
    revenue: number;
    avatar: string;
    status: "Active" | "Inactive";
    adherenceRate: number;
}

export interface Nutritionist {
    id: string;
    name: string;
    email: string;
    specialty: string;
    rating: number;
    activeClients: number;
    adherenceRate: number;
    revenue: number;
    avatar: string;
    status: "Active" | "Inactive";
}

export interface ClassSession {
    id: string;
    name: string;
    coachId: string;
    partnerId: string;
    partnerName: string;
    day: string;
    time: string;
    duration: string;
    capacity: number;
    booked: number;
    yield: number;
    status: "Active" | "Ready" | "Fully Operational" | "Closed";
    description: string;
}

export interface Program {
    id: string;
    name: string;
    nutritionistId: string;
    focus: string;
    patients: number;
    successRate: number;
    status: "Clinical" | "Active" | "Experimental";
    description: string;
}

export const MOCK_COACHES: Coach[] = [
    { 
        id: "coach-1", 
        name: "Coach Kagabo", 
        email: "kagabo@onefit.rw", 
        specialty: "High Intensity Tactical (HIT)", 
        rating: 4.9, 
        experience: "8 Years", 
        activeMembers: 45, 
        totalSessions: 1240, 
        revenue: 2400000,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kagabo",
        status: "Active",
        adherenceRate: 92
    },
    { 
        id: "coach-2", 
        name: "Sonia Umutoni", 
        email: "sonia@onefit.rw", 
        specialty: "Yoga & Flexibility", 
        rating: 4.8, 
        experience: "5 Years", 
        activeMembers: 32, 
        totalSessions: 850, 
        revenue: 1800000,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sonia",
        status: "Active",
        adherenceRate: 88
    },
];

export const MOCK_NUTRITIONISTS: Nutritionist[] = [
    { 
        id: "nutri-1", 
        name: "Dr. Sarah Pierre", 
        email: "sarah@onefit.rw", 
        specialty: "Metabolic Reset", 
        rating: 4.9, 
        activeClients: 52, 
        adherenceRate: 94, 
        revenue: 3200000,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        status: "Active" 
    },
];

export const MOCK_CLASS_SESSIONS: ClassSession[] = [
    {
        id: "CLS-001",
        name: "Morning Blast HIITS",
        coachId: "coach-1",
        partnerId: "p1",
        partnerName: "Waka Fitness HQ",
        day: "Monday",
        time: "08:00 AM",
        duration: "60 min",
        capacity: 20,
        booked: 12,
        yield: 24000,
        status: "Active",
        description: "Intense cardio and strength circuit for early birds."
    },
    {
        id: "CLS-002",
        name: "Strength Protocol",
        coachId: "coach-1",
        partnerId: "p2",
        partnerName: "Cercle Sportif",
        day: "Wednesday",
        time: "10:30 AM",
        duration: "90 min",
        capacity: 15,
        booked: 8,
        yield: 16000,
        status: "Ready",
        description: "Heavy lifting focused on compound movements."
    }
];

export const MOCK_PROGRAMS: Program[] = [
    {
        id: "PRO-42",
        name: "Keto Intensive Protocol",
        nutritionistId: "nutri-1",
        focus: "Metabolic Reset",
        patients: 42,
        successRate: 94,
        status: "Clinical",
        description: "A strict ketogenic approach for rapid metabolic correction."
    }
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
    {
        id: "asgn-1",
        title: "10k Daily Steps Challenge",
        description: "Ensure you reach 10,000 steps every day to improve cardiovascular health.",
        durationDays: 30,
        startDate: "2026-03-01",
        status: "Active",
        progress: 65,
        coachId: "coach-1",
        memberId: "e1",
        dailyLogs: [
            { date: "2026-03-20", rating: 5, review: "Completed easily!" },
            { date: "2026-03-19", rating: 4, review: "A bit tired but made it." }
        ]
    }
];

export const MOCK_ROUTINES: Routine[] = [
    {
        id: "rout-1",
        userId: "e1",
        creatorId: "nutri-1",
        name: "Standard Weight Loss Meal Plan",
        category: "Nutrition",
        difficulty: "Intermediate",
        description: "A balanced nutritional approach focusing on caloric deficit and high protein intake.",
        schedule: [
            {
                day: "Monday",
                items: [
                    { time: "07:00 AM", activity: "Breakfast", type: "Meal", details: "Oatmeal with berries" },
                    { time: "10:00 AM", activity: "Snack", type: "Meal", details: "Almonds (15)" },
                    { time: "01:00 PM", activity: "Lunch", type: "Meal", details: "Grilled chicken salad" },
                    { time: "07:00 PM", activity: "Dinner", type: "Meal", details: "Baked fish and veggies" }
                ]
            }
        ]
    }
];

export interface Invoice {
    id: string;
    date: string;
    period: string;
    amount: string;
    status: "Paid" | "Pending" | "Overdue";
}

export const MOCK_INVOICES: Invoice[] = [
    { id: "INV-2026-001", date: "2026-03-01", period: "March 2026", amount: "RWF 1,250,000", status: "Pending" },
    { id: "INV-2026-002", date: "2026-02-01", period: "February 2026", amount: "RWF 1,250,000", status: "Overdue" },
    { id: "INV-2026-003", date: "2026-01-01", period: "January 2026", amount: "RWF 850,000", status: "Paid" },
    { id: "INV-2025-012", date: "2025-12-01", period: "December 2025", amount: "RWF 850,000", status: "Paid" },
    { id: "INV-2025-011", date: "2025-11-01", period: "November 2025", amount: "RWF 600,000", status: "Paid" },
    { id: "INV-2025-010", date: "2025-10-01", period: "October 2025", amount: "RWF 600,000", status: "Paid" },
];
