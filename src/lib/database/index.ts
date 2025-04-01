// Database service for the Property Management System
// This is a mock implementation that would be replaced with actual database calls

import { v4 as uuidv4 } from "uuid";
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
  User,
} from "./schema";

// Mock data storage
let properties: Property[] = [];
let rooms: Room[] = [];
let bookings: Booking[] = [];
let tasks: Task[] = [];
let inventoryItems: InventoryItem[] = [];
let teamMembers: TeamMember[] = [];
let teamSchedules: TeamSchedule[] = [];
let invoices: Invoice[] = [];
let invoiceLineItems: InvoiceLineItem[] = [];
let payments: Payment[] = [];
let expenses: Expense[] = [];
let financialReports: FinancialReport[] = [];
let propertyPhotos: PropertyPhoto[] = [];
let users: User[] = [];
let userPreferences: UserPreference[] = [];

// Initialize with some sample data
const initializeDatabase = () => {
  // Sample users
  users = [
    {
      id: uuidv4(),
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  // Sample properties
  const property1: Property = {
    id: uuidv4(),
    name: "Seaside Villa",
    address: "123 Ocean Drive",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    country: "USA",
    description: "Beautiful beachfront property with stunning ocean views",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 250,
    cleaningFee: 100,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    amenities: ["WiFi", "Pool", "Beach Access", "Air Conditioning"],
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const property2: Property = {
    id: uuidv4(),
    name: "Mountain Retreat",
    address: "456 Pine Road",
    city: "Aspen",
    state: "CO",
    zipCode: "81611",
    country: "USA",
    description: "Cozy cabin in the mountains with fireplace and hot tub",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    pricePerNight: 180,
    cleaningFee: 75,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80",
    ],
    amenities: ["WiFi", "Fireplace", "Hot Tub", "Hiking Trails"],
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  properties = [property1, property2];

  // Sample rooms for property1
  rooms = [
    {
      id: uuidv4(),
      propertyId: property1.id,
      name: "Master Bedroom",
      type: "bedroom",
      description: "Large bedroom with king bed and en-suite bathroom",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      propertyId: property1.id,
      name: "Guest Bedroom 1",
      type: "bedroom",
      description: "Bedroom with queen bed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      propertyId: property1.id,
      name: "Kitchen",
      type: "kitchen",
      description: "Fully equipped kitchen with modern appliances",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      propertyId: property1.id,
      name: "Living Room",
      type: "living",
      description: "Spacious living room with ocean view",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Sample bookings
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 14);
  const threeWeeksFromNow = new Date(today);
  threeWeeksFromNow.setDate(today.getDate() + 21);

  bookings = [
    {
      id: uuidv4(),
      propertyId: property1.id,
      guestName: "John Smith",
      guestEmail: "john.smith@example.com",
      guestPhone: "555-123-4567",
      checkInDate: nextWeek.toISOString(),
      checkOutDate: twoWeeksFromNow.toISOString(),
      numberOfGuests: 4,
      totalPrice: 1750,
      status: "confirmed",
      specialRequests: "Early check-in if possible",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      propertyId: property2.id,
      guestName: "Jane Doe",
      guestEmail: "jane.doe@example.com",
      guestPhone: "555-987-6543",
      checkInDate: twoWeeksFromNow.toISOString(),
      checkOutDate: threeWeeksFromNow.toISOString(),
      numberOfGuests: 2,
      totalPrice: 1335,
      status: "confirmed",
      specialRequests: "Pet-friendly accommodations",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Sample team members
  teamMembers = [
    {
      id: uuidv4(),
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "555-111-2222",
      role: "cleaner",
      active: true,
      hourlyRate: 25,
      startDate: new Date(2022, 1, 15).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "555-333-4444",
      role: "maintenance",
      active: true,
      hourlyRate: 30,
      startDate: new Date(2021, 6, 10).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "555-555-6666",
      role: "property_manager",
      active: true,
      hourlyRate: 40,
      startDate: new Date(2020, 3, 5).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Sample tasks
  tasks = [
    {
      id: uuidv4(),
      propertyId: property1.id,
      assignedToId: teamMembers[0].id,
      title: "Clean after checkout",
      description: "Full cleaning of property after guest checkout",
      type: "cleaning",
      priority: "high",
      status: "pending",
      dueDate: twoWeeksFromNow.toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      propertyId: property1.id,
      roomId: rooms[2].id, // Kitchen
      assignedToId: teamMembers[1].id,
      title: "Fix leaking faucet",
      description: "Kitchen sink faucet is leaking and needs repair",
      type: "maintenance",
      priority: "medium",
      status: "in-progress",
      dueDate: nextWeek.toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      propertyId: property2.id,
      assignedToId: teamMembers[2].id,
      title: "Property inspection",
      description: "Quarterly inspection of property condition",
      type: "inspection",
      priority: "medium",
      status: "pending",
      dueDate: threeWeeksFromNow.toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Sample inventory items
  inventoryItems = [
    {
      id: uuidv4(),
      propertyId: property1.id,
      roomId: rooms[0].id, // Master Bedroom
      name: "King Bed",
      description: "King size bed with memory foam mattress",
      category: "Furniture",
      quantity: 1,
      condition: "excellent",
      purchaseDate: new Date(2022, 1, 10).toISOString(),
      purchasePrice: 1200,
      replacementValue: 1500,
      lastInspectionDate: new Date(2023, 1, 10).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      propertyId: property1.id,
      roomId: rooms[2].id, // Kitchen
      name: "Coffee Maker",
      description: "Stainless steel drip coffee maker",
      category: "Appliances",
      quantity: 1,
      condition: "good",
      purchaseDate: new Date(2022, 3, 15).toISOString(),
      purchasePrice: 80,
      replacementValue: 100,
      lastInspectionDate: new Date(2023, 3, 15).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      propertyId: property1.id,
      roomId: rooms[3].id, // Living Room
      name: "Sofa",
      description: "Sectional sofa with pull-out bed",
      category: "Furniture",
      quantity: 1,
      condition: "good",
      purchaseDate: new Date(2021, 6, 20).toISOString(),
      purchasePrice: 1500,
      replacementValue: 1800,
      lastInspectionDate: new Date(2023, 0, 5).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Sample invoices and line items
  const invoice1 = {
    id: uuidv4(),
    bookingId: bookings[0].id,
    propertyId: property1.id,
    guestName: "John Smith",
    guestEmail: "john.smith@example.com",
    issueDate: new Date().toISOString(),
    dueDate: nextWeek.toISOString(),
    totalAmount: 1750,
    status: "sent",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  invoices = [invoice1];

  invoiceLineItems = [
    {
      id: uuidv4(),
      invoiceId: invoice1.id,
      description: "Accommodation (7 nights)",
      quantity: 7,
      unitPrice: 250,
      amount: 1750,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      invoiceId: invoice1.id,
      description: "Cleaning Fee",
      quantity: 1,
      unitPrice: 100,
      amount: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Sample payments
  payments = [
    {
      id: uuidv4(),
      invoiceId: invoice1.id,
      amount: 1750,
      paymentDate: new Date().toISOString(),
      paymentMethod: "credit_card",
      transactionId: "txn_123456789",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Sample expenses
  expenses = [
    {
      id: uuidv4(),
      propertyId: property1.id,
      category: "Maintenance",
      vendor: "Home Depot",
      amount: 125.5,
      date: new Date(2023, 2, 15).toISOString(),
      description: "Purchased materials for bathroom repair",
      reimbursable: false,
      status: "approved",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      propertyId: property2.id,
      category: "Supplies",
      vendor: "Amazon",
      amount: 75.25,
      date: new Date(2023, 3, 10).toISOString(),
      description: "Purchased cleaning supplies",
      reimbursable: false,
      status: "approved",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

// Initialize the database
initializeDatabase();

// Database service functions
export const db = {
  // Users
  getUsers: () => Promise.resolve([...users]),
  getUserById: (id: string) =>
    Promise.resolve(users.find((u) => u.id === id) || null),
  getUserByEmail: (email: string) =>
    Promise.resolve(users.find((u) => u.email === email) || null),
  createUser: (user: Omit<User, "id" | "createdAt" | "updatedAt">) => {
    const newUser: User = {
      ...user,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(newUser);
    return Promise.resolve(newUser);
  },
  updateUser: (id: string, user: Partial<User>) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return Promise.resolve(null);

    users[index] = {
      ...users[index],
      ...user,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(users[index]);
  },
  deleteUser: (id: string) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return Promise.resolve(false);

    users.splice(index, 1);
    return Promise.resolve(true);
  },

  // Properties
  getProperties: () => Promise.resolve([...properties]),
  getPropertyById: (id: string) =>
    Promise.resolve(properties.find((p) => p.id === id) || null),
  createProperty: (
    property: Omit<Property, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newProperty: Property = {
      ...property,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    properties.push(newProperty);
    return Promise.resolve(newProperty);
  },
  updateProperty: (id: string, property: Partial<Property>) => {
    const index = properties.findIndex((p) => p.id === id);
    if (index === -1) return Promise.resolve(null);

    properties[index] = {
      ...properties[index],
      ...property,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(properties[index]);
  },
  deleteProperty: (id: string) => {
    const index = properties.findIndex((p) => p.id === id);
    if (index === -1) return Promise.resolve(false);

    properties.splice(index, 1);
    return Promise.resolve(true);
  },

  // Rooms
  getRooms: (propertyId?: string) => {
    if (propertyId) {
      return Promise.resolve(rooms.filter((r) => r.propertyId === propertyId));
    }
    return Promise.resolve([...rooms]);
  },
  getRoomById: (id: string) =>
    Promise.resolve(rooms.find((r) => r.id === id) || null),
  createRoom: (room: Omit<Room, "id" | "createdAt" | "updatedAt">) => {
    const newRoom: Room = {
      ...room,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    rooms.push(newRoom);
    return Promise.resolve(newRoom);
  },
  updateRoom: (id: string, room: Partial<Room>) => {
    const index = rooms.findIndex((r) => r.id === id);
    if (index === -1) return Promise.resolve(null);

    rooms[index] = {
      ...rooms[index],
      ...room,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(rooms[index]);
  },
  deleteRoom: (id: string) => {
    const index = rooms.findIndex((r) => r.id === id);
    if (index === -1) return Promise.resolve(false);

    rooms.splice(index, 1);
    return Promise.resolve(true);
  },

  // Bookings
  getBookings: (propertyId?: string, status?: string) => {
    let filteredBookings = [...bookings];

    if (propertyId) {
      filteredBookings = filteredBookings.filter(
        (b) => b.propertyId === propertyId,
      );
    }

    if (status) {
      filteredBookings = filteredBookings.filter((b) => b.status === status);
    }

    return Promise.resolve(filteredBookings);
  },
  getBookingById: (id: string) =>
    Promise.resolve(bookings.find((b) => b.id === id) || null),
  createBooking: (booking: Omit<Booking, "id" | "createdAt" | "updatedAt">) => {
    const newBooking: Booking = {
      ...booking,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    return Promise.resolve(newBooking);
  },
  updateBooking: (id: string, booking: Partial<Booking>) => {
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return Promise.resolve(null);

    bookings[index] = {
      ...bookings[index],
      ...booking,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(bookings[index]);
  },
  deleteBooking: (id: string) => {
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return Promise.resolve(false);

    bookings.splice(index, 1);
    return Promise.resolve(true);
  },

  // Tasks
  getTasks: (propertyId?: string, assignedToId?: string, status?: string) => {
    let filteredTasks = [...tasks];

    if (propertyId) {
      filteredTasks = filteredTasks.filter((t) => t.propertyId === propertyId);
    }

    if (assignedToId) {
      filteredTasks = filteredTasks.filter(
        (t) => t.assignedToId === assignedToId,
      );
    }

    if (status) {
      filteredTasks = filteredTasks.filter((t) => t.status === status);
    }

    return Promise.resolve(filteredTasks);
  },
  getTaskById: (id: string) =>
    Promise.resolve(tasks.find((t) => t.id === id) || null),
  createTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return Promise.resolve(newTask);
  },
  updateTask: (id: string, task: Partial<Task>) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return Promise.resolve(null);

    tasks[index] = {
      ...tasks[index],
      ...task,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(tasks[index]);
  },
  deleteTask: (id: string) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return Promise.resolve(false);

    tasks.splice(index, 1);
    return Promise.resolve(true);
  },

  // Inventory Items
  getInventoryItems: (propertyId?: string, roomId?: string) => {
    let filteredItems = [...inventoryItems];

    if (propertyId) {
      filteredItems = filteredItems.filter((i) => i.propertyId === propertyId);
    }

    if (roomId) {
      filteredItems = filteredItems.filter((i) => i.roomId === roomId);
    }

    return Promise.resolve(filteredItems);
  },
  getInventoryItemById: (id: string) =>
    Promise.resolve(inventoryItems.find((i) => i.id === id) || null),
  createInventoryItem: (
    item: Omit<InventoryItem, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newItem: InventoryItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inventoryItems.push(newItem);
    return Promise.resolve(newItem);
  },
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => {
    const index = inventoryItems.findIndex((i) => i.id === id);
    if (index === -1) return Promise.resolve(null);

    inventoryItems[index] = {
      ...inventoryItems[index],
      ...item,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(inventoryItems[index]);
  },
  deleteInventoryItem: (id: string) => {
    const index = inventoryItems.findIndex((i) => i.id === id);
    if (index === -1) return Promise.resolve(false);

    inventoryItems.splice(index, 1);
    return Promise.resolve(true);
  },

  // Team Members
  getTeamMembers: (role?: string) => {
    if (role) {
      return Promise.resolve(teamMembers.filter((tm) => tm.role === role));
    }
    return Promise.resolve([...teamMembers]);
  },
  getTeamMemberById: (id: string) =>
    Promise.resolve(teamMembers.find((tm) => tm.id === id) || null),
  createTeamMember: (
    member: Omit<TeamMember, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newMember: TeamMember = {
      ...member,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    teamMembers.push(newMember);
    return Promise.resolve(newMember);
  },
  updateTeamMember: (id: string, member: Partial<TeamMember>) => {
    const index = teamMembers.findIndex((tm) => tm.id === id);
    if (index === -1) return Promise.resolve(null);

    teamMembers[index] = {
      ...teamMembers[index],
      ...member,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(teamMembers[index]);
  },
  deleteTeamMember: (id: string) => {
    const index = teamMembers.findIndex((tm) => tm.id === id);
    if (index === -1) return Promise.resolve(false);

    teamMembers.splice(index, 1);
    return Promise.resolve(true);
  },

  // Team Schedules
  getTeamSchedules: (teamMemberId?: string, propertyId?: string) => {
    let filteredSchedules = [...teamSchedules];

    if (teamMemberId) {
      filteredSchedules = filteredSchedules.filter(
        (ts) => ts.teamMemberId === teamMemberId,
      );
    }

    if (propertyId) {
      filteredSchedules = filteredSchedules.filter(
        (ts) => ts.propertyId === propertyId,
      );
    }

    return Promise.resolve(filteredSchedules);
  },
  getTeamScheduleById: (id: string) =>
    Promise.resolve(teamSchedules.find((ts) => ts.id === id) || null),
  createTeamSchedule: (
    schedule: Omit<TeamSchedule, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newSchedule: TeamSchedule = {
      ...schedule,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    teamSchedules.push(newSchedule);
    return Promise.resolve(newSchedule);
  },
  updateTeamSchedule: (id: string, schedule: Partial<TeamSchedule>) => {
    const index = teamSchedules.findIndex((ts) => ts.id === id);
    if (index === -1) return Promise.resolve(null);

    teamSchedules[index] = {
      ...teamSchedules[index],
      ...schedule,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(teamSchedules[index]);
  },
  deleteTeamSchedule: (id: string) => {
    const index = teamSchedules.findIndex((ts) => ts.id === id);
    if (index === -1) return Promise.resolve(false);

    teamSchedules.splice(index, 1);
    return Promise.resolve(true);
  },

  // Invoices
  getInvoices: (propertyId?: string, status?: string) => {
    let filteredInvoices = [...invoices];

    if (propertyId) {
      filteredInvoices = filteredInvoices.filter(
        (i) => i.propertyId === propertyId,
      );
    }

    if (status) {
      filteredInvoices = filteredInvoices.filter((i) => i.status === status);
    }

    return Promise.resolve(filteredInvoices);
  },
  getInvoiceById: (id: string) =>
    Promise.resolve(invoices.find((i) => i.id === id) || null),
  createInvoice: (invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    invoices.push(newInvoice);
    return Promise.resolve(newInvoice);
  },
  updateInvoice: (id: string, invoice: Partial<Invoice>) => {
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) return Promise.resolve(null);

    invoices[index] = {
      ...invoices[index],
      ...invoice,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(invoices[index]);
  },
  deleteInvoice: (id: string) => {
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) return Promise.resolve(false);

    invoices.splice(index, 1);
    return Promise.resolve(true);
  },

  // Invoice Line Items
  getInvoiceLineItems: (invoiceId: string) => {
    return Promise.resolve(
      invoiceLineItems.filter((ili) => ili.invoiceId === invoiceId),
    );
  },
  getInvoiceLineItemById: (id: string) =>
    Promise.resolve(invoiceLineItems.find((ili) => ili.id === id) || null),
  createInvoiceLineItem: (
    lineItem: Omit<InvoiceLineItem, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newLineItem: InvoiceLineItem = {
      ...lineItem,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    invoiceLineItems.push(newLineItem);
    return Promise.resolve(newLineItem);
  },
  updateInvoiceLineItem: (id: string, lineItem: Partial<InvoiceLineItem>) => {
    const index = invoiceLineItems.findIndex((ili) => ili.id === id);
    if (index === -1) return Promise.resolve(null);

    invoiceLineItems[index] = {
      ...invoiceLineItems[index],
      ...lineItem,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(invoiceLineItems[index]);
  },
  deleteInvoiceLineItem: (id: string) => {
    const index = invoiceLineItems.findIndex((ili) => ili.id === id);
    if (index === -1) return Promise.resolve(false);

    invoiceLineItems.splice(index, 1);
    return Promise.resolve(true);
  },

  // Payments
  getPayments: (invoiceId?: string) => {
    if (invoiceId) {
      return Promise.resolve(payments.filter((p) => p.invoiceId === invoiceId));
    }
    return Promise.resolve([...payments]);
  },
  getPaymentById: (id: string) =>
    Promise.resolve(payments.find((p) => p.id === id) || null),
  createPayment: (payment: Omit<Payment, "id" | "createdAt" | "updatedAt">) => {
    const newPayment: Payment = {
      ...payment,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    payments.push(newPayment);
    return Promise.resolve(newPayment);
  },
  updatePayment: (id: string, payment: Partial<Payment>) => {
    const index = payments.findIndex((p) => p.id === id);
    if (index === -1) return Promise.resolve(null);

    payments[index] = {
      ...payments[index],
      ...payment,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(payments[index]);
  },
  deletePayment: (id: string) => {
    const index = payments.findIndex((p) => p.id === id);
    if (index === -1) return Promise.resolve(false);

    payments.splice(index, 1);
    return Promise.resolve(true);
  },

  // Expenses
  getExpenses: (propertyId?: string, category?: string) => {
    let filteredExpenses = [...expenses];

    if (propertyId) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.propertyId === propertyId,
      );
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.category === category,
      );
    }

    return Promise.resolve(filteredExpenses);
  },
  getExpenseById: (id: string) =>
    Promise.resolve(expenses.find((e) => e.id === id) || null),
  createExpense: (expense: Omit<Expense, "id" | "createdAt" | "updatedAt">) => {
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expenses.push(newExpense);
    return Promise.resolve(newExpense);
  },
  updateExpense: (id: string, expense: Partial<Expense>) => {
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) return Promise.resolve(null);

    expenses[index] = {
      ...expenses[index],
      ...expense,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(expenses[index]);
  },
  deleteExpense: (id: string) => {
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) return Promise.resolve(false);

    expenses.splice(index, 1);
    return Promise.resolve(true);
  },

  // Financial Reports
  getFinancialReports: (propertyId?: string, type?: string) => {
    let filteredReports = [...financialReports];

    if (propertyId) {
      filteredReports = filteredReports.filter(
        (r) => r.propertyId === propertyId,
      );
    }

    if (type) {
      filteredReports = filteredReports.filter((r) => r.type === type);
    }

    return Promise.resolve(filteredReports);
  },
  getFinancialReportById: (id: string) =>
    Promise.resolve(financialReports.find((r) => r.id === id) || null),
  createFinancialReport: (
    report: Omit<FinancialReport, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newReport: FinancialReport = {
      ...report,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    financialReports.push(newReport);
    return Promise.resolve(newReport);
  },
  updateFinancialReport: (id: string, report: Partial<FinancialReport>) => {
    const index = financialReports.findIndex((r) => r.id === id);
    if (index === -1) return Promise.resolve(null);

    financialReports[index] = {
      ...financialReports[index],
      ...report,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(financialReports[index]);
  },
  deleteFinancialReport: (id: string) => {
    const index = financialReports.findIndex((r) => r.id === id);
    if (index === -1) return Promise.resolve(false);

    financialReports.splice(index, 1);
    return Promise.resolve(true);
  },

  // Property Photos
  getPropertyPhotos: (propertyId: string, category?: string) => {
    let filteredPhotos = propertyPhotos.filter(
      (p) => p.propertyId === propertyId,
    );

    if (category) {
      filteredPhotos = filteredPhotos.filter((p) => p.category === category);
    }

    return Promise.resolve(filteredPhotos);
  },
  getPropertyPhotoById: (id: string) =>
    Promise.resolve(propertyPhotos.find((p) => p.id === id) || null),
  createPropertyPhoto: (
    photo: Omit<PropertyPhoto, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newPhoto: PropertyPhoto = {
      ...photo,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    propertyPhotos.push(newPhoto);
    return Promise.resolve(newPhoto);
  },
  updatePropertyPhoto: (id: string, photo: Partial<PropertyPhoto>) => {
    const index = propertyPhotos.findIndex((p) => p.id === id);
    if (index === -1) return Promise.resolve(null);

    propertyPhotos[index] = {
      ...propertyPhotos[index],
      ...photo,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(propertyPhotos[index]);
  },
  deletePropertyPhoto: (id: string) => {
    const index = propertyPhotos.findIndex((p) => p.id === id);
    if (index === -1) return Promise.resolve(false);

    propertyPhotos.splice(index, 1);
    return Promise.resolve(true);
  },

  // User Preferences
  getUserPreference: (userId: string) =>
    Promise.resolve(userPreferences.find((p) => p.userId === userId) || null),
  createUserPreference: (
    preference: Omit<UserPreference, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newPreference: UserPreference = {
      ...preference,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    userPreferences.push(newPreference);
    return Promise.resolve(newPreference);
  },
  updateUserPreference: (
    userId: string,
    preference: Partial<UserPreference>,
  ) => {
    const index = userPreferences.findIndex((p) => p.userId === userId);
    if (index === -1) return Promise.resolve(null);

    userPreferences[index] = {
      ...userPreferences[index],
      ...preference,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(userPreferences[index]);
  },
  deleteUserPreference: (userId: string) => {
    const index = userPreferences.findIndex((p) => p.userId === userId);
    if (index === -1) return Promise.resolve(false);

    userPreferences.splice(index, 1);
    return Promise.resolve(true);
  },

  // Utility functions
  resetDatabase: () => {
    properties = [];
    rooms = [];
    bookings = [];
    tasks = [];
    inventoryItems = [];
    teamMembers = [];
    teamSchedules = [];
    invoices = [];
    invoiceLineItems = [];
    payments = [];
    expenses = [];
    financialReports = [];
    propertyPhotos = [];
    users = [];
    userPreferences = [];

    initializeDatabase();
    return Promise.resolve(true);
  },
};
