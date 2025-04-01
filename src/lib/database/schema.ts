// Database Schema Types

// Properties
export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  pricePerNight: number;
  cleaningFee: number;
  images: string[];
  amenities: string[];
  active: boolean;
  status?: "B2B" | "N/R" | "b2b";
  doorCode?: string;
  wifiPassword?: string;
  wifiStatus?: "on" | "off";
  createdAt: string;
  updatedAt: string;
}

// Rooms (for inventory tracking)
export interface Room {
  id: string;
  propertyId: string;
  name: string;
  type: string; // bedroom, bathroom, kitchen, etc.
  description: string;
  count?: number; // Number of rooms of this type
  image?: string; // Image URL for the room
  createdAt: string;
  updatedAt: string;
}

// Bookings
export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  specialRequests: string;
  earlyCheckIn?: boolean;
  lateCheckOut?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tasks
export interface Task {
  id: string;
  propertyId: string;
  roomId?: string;
  assignedToId?: string; // Team member ID
  title: string;
  description: string;
  type: "cleaning" | "maintenance" | "inspection" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "completed" | "overdue";
  dueDate: string;
  completedAt?: string;
  completionNotes?: string;
  verificationPhotos?: string[];
  createdAt: string;
  updatedAt: string;
}

// Inventory Items
export interface InventoryItem {
  id: string;
  propertyId: string;
  roomId: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  condition: "excellent" | "good" | "fair" | "poor" | "needs-replacement";
  purchaseDate?: string;
  purchasePrice?: number;
  replacementValue: number;
  photos?: string[];
  notes?: string;
  lastInspectionDate?: string;
  lastCleanedDate?: string;
  needsMaintenance?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Team Members
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "cleaner" | "maintenance" | "property_manager" | "admin" | "inspector";
  active: boolean;
  hourlyRate?: number;
  startDate: string;
  documents?: string[];
  notes?: string;
  profileImage?: string;
  availability?: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// Team Schedule
export interface TeamSchedule {
  id: string;
  teamMemberId: string;
  propertyId: string;
  taskId?: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  notes?: string;
  recurring?: boolean;
  recurrencePattern?: "daily" | "weekly" | "biweekly" | "monthly";
  createdAt: string;
  updatedAt: string;
}

// Invoices
export interface Invoice {
  id: string;
  bookingId?: string;
  propertyId: string;
  guestName: string;
  guestEmail: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  notes?: string;
  taxRate?: number;
  taxAmount?: number;
  discountAmount?: number;
  discountType?: "percentage" | "fixed";
  createdAt: string;
  updatedAt: string;
}

// Invoice Line Items
export interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  itemType?: "accommodation" | "service" | "extra" | "discount" | "tax";
  createdAt: string;
  updatedAt: string;
}

// Payments
export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: "credit_card" | "bank_transfer" | "cash" | "paypal" | "other";
  transactionId?: string;
  notes?: string;
  refunded?: boolean;
  refundAmount?: number;
  refundDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Expenses
export interface Expense {
  id: string;
  propertyId?: string;
  category: string;
  vendor: string;
  amount: number;
  date: string;
  description: string;
  receiptUrl?: string;
  reimbursable: boolean;
  status: "pending" | "approved" | "reimbursed" | "rejected";
  paidBy?: "company_card" | "bank_transfer" | "reimbursement" | "cash";
  paidTo?: string;
  createdAt: string;
  updatedAt: string;
}

// Financial Reports
export interface FinancialReport {
  id: string;
  title: string;
  type: "revenue" | "expenses" | "occupancy" | "tax" | "profit_loss";
  dateRange: {
    startDate: string;
    endDate: string;
  };
  propertyId?: string;
  data: any; // Report data structure will vary based on type
  createdAt: string;
  updatedAt: string;
}

// Property Photos
export interface PropertyPhoto {
  id: string;
  propertyId: string;
  url: string;
  category: string; // e.g., "Living Room", "Kitchen", "Bedroom", etc.
  description?: string;
  isPrimary?: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

// User
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "property_manager" | "cleaner" | "maintenance" | "inspector";
  phone?: string;
  address?: string;
  profileImage?: string;
  lastLoginAt?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// User Preferences
export interface UserPreference {
  id: string;
  userId: string;
  language?: string;
  timezone?: string;
  notificationPreferences?: {
    email: boolean;
    tasks: boolean;
    bookings: boolean;
    marketing: boolean;
  };
  theme?: "light" | "dark";
  createdAt: string;
  updatedAt: string;
}
