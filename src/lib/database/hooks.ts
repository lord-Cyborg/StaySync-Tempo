// React hooks for database access
import { useState, useEffect } from "react";
import { db } from ".";
import {
  Property,
  Room,
  Booking,
  Task,
  InventoryItem,
  TeamMember,
  TeamSchedule,
  Invoice,
  InvoiceLineItem,
  Payment,
  Expense,
  FinancialReport,
  PropertyPhoto,
  UserPreference,
} from "./schema";

// Generic hook for fetching data
function useFetch<T>(fetchFn: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchFn()
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

// Properties
export function useProperties() {
  return useFetch<Property[]>(() => db.getProperties());
}

export function useProperty(id: string | undefined) {
  return useFetch<Property | null>(
    () => (id ? db.getPropertyById(id) : Promise.resolve(null)),
    [id],
  );
}

// Rooms
export function useRooms(propertyId?: string) {
  return useFetch<Room[]>(() => db.getRooms(propertyId), [propertyId]);
}

export function useRoom(id: string | undefined) {
  return useFetch<Room | null>(
    () => (id ? db.getRoomById(id) : Promise.resolve(null)),
    [id],
  );
}

// Bookings
export function useBookings(propertyId?: string, status?: string) {
  return useFetch<Booking[]>(
    () => db.getBookings(propertyId, status),
    [propertyId, status],
  );
}

export function useBooking(id: string | undefined) {
  return useFetch<Booking | null>(
    () => (id ? db.getBookingById(id) : Promise.resolve(null)),
    [id],
  );
}

// Tasks
export function useTasks(
  propertyId?: string,
  assignedToId?: string,
  status?: string,
) {
  return useFetch<Task[]>(
    () => db.getTasks(propertyId, assignedToId, status),
    [propertyId, assignedToId, status],
  );
}

export function useTask(id: string | undefined) {
  return useFetch<Task | null>(
    () => (id ? db.getTaskById(id) : Promise.resolve(null)),
    [id],
  );
}

// Inventory Items
export function useInventoryItems(propertyId?: string, roomId?: string) {
  return useFetch<InventoryItem[]>(
    () => db.getInventoryItems(propertyId, roomId),
    [propertyId, roomId],
  );
}

export function useInventoryItem(id: string | undefined) {
  return useFetch<InventoryItem | null>(
    () => (id ? db.getInventoryItemById(id) : Promise.resolve(null)),
    [id],
  );
}

// Team Members
export function useTeamMembers(role?: string) {
  return useFetch<TeamMember[]>(() => db.getTeamMembers(role), [role]);
}

export function useTeamMember(id: string | undefined) {
  return useFetch<TeamMember | null>(
    () => (id ? db.getTeamMemberById(id) : Promise.resolve(null)),
    [id],
  );
}

// Team Schedules
export function useTeamSchedules(teamMemberId?: string, propertyId?: string) {
  return useFetch<TeamSchedule[]>(
    () => db.getTeamSchedules(teamMemberId, propertyId),
    [teamMemberId, propertyId],
  );
}

export function useTeamSchedule(id: string | undefined) {
  return useFetch<TeamSchedule | null>(
    () => (id ? db.getTeamScheduleById(id) : Promise.resolve(null)),
    [id],
  );
}

// Invoices
export function useInvoices(propertyId?: string, status?: string) {
  return useFetch<Invoice[]>(
    () => db.getInvoices(propertyId, status),
    [propertyId, status],
  );
}

export function useInvoice(id: string | undefined) {
  return useFetch<Invoice | null>(
    () => (id ? db.getInvoiceById(id) : Promise.resolve(null)),
    [id],
  );
}

// Invoice Line Items
export function useInvoiceLineItems(invoiceId: string | undefined) {
  return useFetch<InvoiceLineItem[]>(
    () => (invoiceId ? db.getInvoiceLineItems(invoiceId) : Promise.resolve([])),
    [invoiceId],
  );
}

// Payments
export function usePayments(invoiceId?: string) {
  return useFetch<Payment[]>(() => db.getPayments(invoiceId), [invoiceId]);
}

export function usePayment(id: string | undefined) {
  return useFetch<Payment | null>(
    () => (id ? db.getPaymentById(id) : Promise.resolve(null)),
    [id],
  );
}

// Expenses
export function useExpenses(propertyId?: string, category?: string) {
  return useFetch<Expense[]>(
    () => db.getExpenses(propertyId, category),
    [propertyId, category],
  );
}

export function useExpense(id: string | undefined) {
  return useFetch<Expense | null>(
    () => (id ? db.getExpenseById(id) : Promise.resolve(null)),
    [id],
  );
}

// Financial Reports
export function useFinancialReports(propertyId?: string, type?: string) {
  return useFetch<FinancialReport[]>(
    () => db.getFinancialReports(propertyId, type),
    [propertyId, type],
  );
}

export function useFinancialReport(id: string | undefined) {
  return useFetch<FinancialReport | null>(
    () => (id ? db.getFinancialReportById(id) : Promise.resolve(null)),
    [id],
  );
}

// Property Photos
export function usePropertyPhotos(propertyId: string, category?: string) {
  return useFetch<PropertyPhoto[]>(
    () => db.getPropertyPhotos(propertyId, category),
    [propertyId, category],
  );
}

export function usePropertyPhoto(id: string | undefined) {
  return useFetch<PropertyPhoto | null>(
    () => (id ? db.getPropertyPhotoById(id) : Promise.resolve(null)),
    [id],
  );
}

// User Preferences
export function useUserPreference(userId: string) {
  return useFetch<UserPreference | null>(
    () => db.getUserPreference(userId),
    [userId],
  );
}
