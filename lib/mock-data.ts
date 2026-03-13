import { addDays, subDays } from "date-fns";

export type UserRole = "CORPORATE_ADMIN" | "PARTNER_ADMIN" | "END_USER";

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
}

export interface Partner {
    id: string;
    name: string;
    type: "Gym" | "Pool" | "Tennis" | "Yoga";
    tier: "Classic" | "Silver" | "Gold" | "Platinum";
    visitsCount: number;
    rating: number;
    image: string;
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
    { id: "e1", name: "Alice Mukana", email: "alice@bk.rw", tier: "Platinum", visits: 24, status: "Active", joinDate: "2026-01-12", department: "Finance" },
    { id: "e2", name: "Bob Rwanda", email: "bob@bk.rw", tier: "Gold", visits: 18, status: "Active", joinDate: "2026-01-15", department: "Operations" },
    { id: "e3", name: "Cédric Gasana", email: "cedric@bk.rw", tier: "Silver", visits: 12, status: "Inactive", joinDate: "2026-02-02", department: "IT" },
    { id: "e4", name: "Dative Umutoni", email: "dative@bk.rw", tier: "Platinum", visits: 31, status: "Active", joinDate: "2026-02-10", department: "Human Resources" },
    { id: "e5", name: "Eric Shema", email: "eric@bk.rw", tier: "Gold", visits: 8, status: "Pending", joinDate: "2026-03-01", department: "Customer Success" },
];

export const MOCK_COMPANIES: Company[] = [
    { id: "c1", name: "Bank of Kigali", tier: "Platinum", employeeCount: 450, activeUsers: 320, totalSpent: 12500000 },
    { id: "c2", name: "MTN Rwanda", tier: "Platinum", employeeCount: 600, activeUsers: 510, totalSpent: 18000000 },
    { id: "c3", name: "I&M Bank", tier: "Gold", employeeCount: 200, activeUsers: 140, totalSpent: 5600000 },
];

export const MOCK_PARTNERS: Partner[] = [
    { id: "p1", name: "Waka Fitness", type: "Gym", tier: "Platinum", visitsCount: 1240, rating: 4.8, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&h=300&auto=format&fit=crop" },
    { id: "p2", name: "Cercle Sportif", type: "Tennis", tier: "Platinum", visitsCount: 850, rating: 4.6, image: "https://images.unsplash.com/photo-1595435063851-697966f3629e?q=80&w=400&h=300&auto=format&fit=crop" },
    { id: "p3", name: "Mindful Yoga", type: "Yoga", tier: "Gold", visitsCount: 420, rating: 4.9, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&h=300&auto=format&fit=crop" },
    { id: "p4", name: "Kigali Arena Gym", type: "Gym", tier: "Silver", visitsCount: 2100, rating: 4.4, image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400&h=300&auto=format&fit=crop" },
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
