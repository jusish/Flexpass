"use client";

import { useState, useCallback, useEffect } from "react";
import { 
    MOCK_USER, 
    MOCK_VISITS, 
    MOCK_PARTNERS, 
    MOCK_COMPANIES, 
    MOCK_EMPLOYEES, 
    MOCK_COACHES,
    MOCK_NUTRITIONISTS,
    MOCK_CLASS_SESSIONS,
    MOCK_PROGRAMS,
    MOCK_ASSIGNMENTS,
    MOCK_ROUTINES,
    type User, 
    type Visit, 
    type Partner, 
    type Company, 
    type Employee,
    type Coach,
    type Nutritionist,
    type ClassSession,
    type Program,
    type Assignment,
    type Routine
} from "./mock-data";

export function useMockStore() {
    const [user, setUser] = useState<User | null>(null);
    const [visits, setVisits] = useState<Visit[]>(MOCK_VISITS);
    const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
    const [companyPlan, setCompanyPlan] = useState<"Silver" | "Gold" | "Platinum">("Gold");
    const [partners] = useState<Partner[]>(MOCK_PARTNERS);
    const [companies] = useState<Company[]>(MOCK_COMPANIES);
    const [coaches, setCoaches] = useState<Coach[]>(MOCK_COACHES);
    const [nutritionists, setNutritionists] = useState<Nutritionist[]>(MOCK_NUTRITIONISTS);
    const [sessions, setSessions] = useState<ClassSession[]>(MOCK_CLASS_SESSIONS);
    const [programs, setPrograms] = useState<Program[]>(MOCK_PROGRAMS);
    const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
    const [routines, setRoutines] = useState<Routine[]>(MOCK_ROUTINES);

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

    // Assignment CRUD
    const addAssignment = useCallback((assignment: Omit<Assignment, "id" | "dailyLogs" | "progress">) => {
        const newAssignment: Assignment = {
            ...assignment,
            id: `asgn-${Date.now()}`,
            progress: 0,
            dailyLogs: [],
        };
        setAssignments((prev) => [newAssignment, ...prev]);
        return newAssignment;
    }, []);

    const updateAssignment = useCallback((id: string, updates: Partial<Assignment>) => {
        setAssignments((prev) => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    }, []);

    const addDailyLog = useCallback((assignmentId: string, log: { date: string; rating: number; review: string }) => {
        setAssignments((prev) => prev.map(a => {
            if (a.id === assignmentId) {
                const newLogs = [...a.dailyLogs, log];
                // Recalculate progress based on days completed vs duration
                const distinctDates = new Set(newLogs.map(l => l.date)).size;
                const newProgress = Math.min(Math.round((distinctDates / a.durationDays) * 100), 100);
                return { ...a, dailyLogs: newLogs, progress: newProgress };
            }
            return a;
        }));
    }, []);

    // Routine CRUD
    const addRoutine = useCallback((routine: Omit<Routine, "id">) => {
        const newRoutine: Routine = { ...routine, id: `rout-${Date.now()}` };
        setRoutines((prev) => [newRoutine, ...prev]);
        return newRoutine;
    }, []);

    const updateRoutine = useCallback((id: string, updates: Partial<Routine>) => {
        setRoutines((prev) => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    }, []);

    // Session CRUD
    const addSession = useCallback((session: Omit<ClassSession, "id" | "booked" | "yield">) => {
        const newSession: ClassSession = { 
            ...session, 
            id: `CLS-${Date.now()}`,
            booked: 0,
            yield: 0 
        };
        setSessions((prev) => [newSession, ...prev]);
        return newSession;
    }, []);

    const updateSession = useCallback((id: string, updates: Partial<ClassSession>) => {
        setSessions((prev) => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    }, []);

    // Program CRUD
    const addProgram = useCallback((program: Omit<Program, "id" | "patients" | "successRate">) => {
        const newProgram: Program = { 
            ...program, 
            id: `PROG-${Date.now()}`,
            patients: 0,
            successRate: 0 
        };
        setPrograms((prev) => [newProgram, ...prev]);
        return newProgram;
    }, []);

    const updateProgram = useCallback((id: string, updates: Partial<Program>) => {
        setPrograms((prev) => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }, []);

    return {
        user,
        visits,
        employees,
        partners,
        companies,
        coaches,
        nutritionists,
        sessions,
        programs,
        assignments,
        routines,
        companyPlan,
        login,
        logout,
        updatePlan,
        addVisit,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addAssignment,
        updateAssignment,
        addDailyLog,
        addRoutine,
        updateRoutine,
        addSession,
        updateSession,
        addProgram,
        updateProgram,
    };
}
