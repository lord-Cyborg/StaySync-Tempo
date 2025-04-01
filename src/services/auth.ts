// Authentication service for the Property Management System
// This is a mock implementation that would be replaced with actual authentication service

import { db } from "@/lib/database";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "property_manager" | "cleaner" | "maintenance" | "inspector";
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Mock user storage
const users: Record<string, { user: User; password: string }> = {
  "admin@example.com": {
    user: {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    password: "password",
  },
};

export const auth = {
  // Register a new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Check if user already exists
    if (users[data.email]) {
      return {
        success: false,
        message: "User with this email already exists",
      };
    }

    // Create new user
    const newUser: User = {
      id: Object.keys(users).length + 1 + "",
      email: data.email,
      name: data.name,
      role: "property_manager", // Default role for new users
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store user
    users[data.email] = {
      user: newUser,
      password: data.password,
    };

    // Create user preferences
    await db.createUserPreference({
      userId: newUser.id,
      language: "en",
      timezone: "UTC",
      notificationPreferences: {
        email: true,
        tasks: true,
        bookings: true,
        marketing: false,
      },
      theme: "light",
    });

    // Store user in localStorage (in a real app, use a token)
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      }),
    );

    return {
      success: true,
      user: newUser,
    };
  },

  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    const userRecord = users[data.email];

    if (!userRecord || userRecord.password !== data.password) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Store user in localStorage (in a real app, use a token)
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: userRecord.user.email,
        name: userRecord.user.name,
        role: userRecord.user.role,
      }),
    );

    return {
      success: true,
      user: userRecord.user,
    };
  },

  // Logout user
  logout: async (): Promise<void> => {
    localStorage.removeItem("user");
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem("user");
    if (!userJson) return null;

    try {
      const userData = JSON.parse(userJson);
      const userRecord = users[userData.email];
      return userRecord ? userRecord.user : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem("user") !== null;
  },
};
