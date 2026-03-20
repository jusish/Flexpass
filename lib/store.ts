"use client";

import { useState, useCallback, useEffect } from "react";
import { MOCK_USER, MOCK_VISITS, MOCK_PARTNERS, MOCK_COMPANIES, MOCK_EMPLOYEES, type User, type Visit, type Partner, type Company, type Employee } from "./mock-data";

export function useMockStore() {
    const [user, setUser] = useState<User | null>(null);
    const [visits, setVisits] = useState<Visit[]>(MOCK_VISITS);
    const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
    const [companyPlan, setCompanyPlan] = useState<"Silver" | "Gold" | "Platinum">("Gold");
    const [partners] = useState<Partner[]>(MOCK_PARTNERS);
    const [companies] = useState<Company[]>(MOCK_COMPANIES);

    // Initialize from localStorage to persist "auth" state
    useEffect(() => {
        const savedUser = localStorage.getItem("flexpass_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        const savedPlan = localStorage.getItem("flexpass_plan");
        if (savedPlan) {
            setCompanyPlan(savedPlan as any);
        }
    }, []);

    const login = useCallback((role: "CORPORATE" | "PARTNER" | "COACH" | "NUTRITIONIST") => {
        const roleEnumMap: Record<string, User["role"]> = {
            CORPORATE: "CORPORATE_ADMIN",
            PARTNER: "PARTNER_ADMIN",
            COACH: "COACH_ADMIN",
            NUTRITIONIST: "NUTRITIONIST_ADMIN"
        };
        const mockUser: User = {
            ...MOCK_USER,
            role: roleEnumMap[role] || "CORPORATE_ADMIN",
            id: role.toLowerCase() + "_1",
        };
        setUser(mockUser);
        localStorage.setItem("flexpass_user", JSON.stringify(mockUser));
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("flexpass_user");
    }, []);

    const updatePlan = useCallback((plan: "Silver" | "Gold" | "Platinum") => {
        setCompanyPlan(plan);
        localStorage.setItem("flexpass_plan", plan);
    }, []);

    const addVisit = useCallback((visit: Omit<Visit, "id" | "timestamp">) => {
        const newVisit: Visit = {
            ...visit,
            id: `v${Date.now()}`,
            timestamp: new Date().toISOString(),
        };
        setVisits((prev) => [newVisit, ...prev]);
    }, []);

    const addEmployee = useCallback((employee: Omit<Employee, "id" | "visits" | "joinDate">) => {
        const newEmployee: Employee = {
            ...employee,
            id: `e${Date.now()}`,
            visits: 0,
            joinDate: new Date().toISOString().split('T')[0],
        };
        setEmployees((prev) => [newEmployee, ...prev]);
        return newEmployee;
    }, []);

    const updateEmployee = useCallback((id: string, updates: Partial<Employee>) => {
        setEmployees((prev) => prev.map(emp => emp.id === id ? { ...emp, ...updates } : emp));
    }, []);

    const deleteEmployee = useCallback((id: string) => {
        setEmployees((prev) => prev.filter(emp => emp.id !== id));
    }, []);

    return {
        user,
        visits,
        employees,
        partners,
        companies,
        companyPlan,
        login,
        logout,
        updatePlan,
        addVisit,
        addEmployee,
        updateEmployee,
        deleteEmployee,
    };
}
