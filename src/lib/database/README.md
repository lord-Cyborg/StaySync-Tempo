# Property Management System Database

## Overview

This directory contains the database schema and data access layer for the Property Management System. The current implementation uses an in-memory database with mock data for development purposes. In a production environment, this would be replaced with a real database connection (e.g., PostgreSQL, MongoDB, or a cloud-based solution like Supabase or Firebase).

## Structure

- `schema.ts`: Contains TypeScript interfaces defining the database schema
- `index.ts`: Implements the data access layer with CRUD operations for all entities
- `hooks.ts`: Provides React hooks for easy data access in components

## Entities

1. **Properties**: Rental properties with details like address, amenities, etc.
2. **Rooms**: Individual rooms within properties for inventory tracking
3. **Bookings**: Guest reservations with check-in/out dates
4. **Tasks**: Maintenance and cleaning tasks assigned to team members
5. **Inventory Items**: Furniture, appliances, and other items in properties
6. **Team Members**: Staff who manage properties and perform tasks
7. **Team Schedules**: Work schedules for team members
8. **Invoices**: Bills sent to guests
9. **Invoice Line Items**: Individual charges on invoices
10. **Payments**: Payment records for invoices
11. **Expenses**: Costs associated with property management

## Usage

### Data Access Layer

```typescript
import { db } from '@/lib/database';

// Examples:
const properties = await db.getProperties();
const booking = await db.getBookingById('some-id');
const newTask = await db.createTask({ ... });
```

### React Hooks

```typescript
import { useProperties, useBookings, useTasks } from '@/lib/database/hooks';

function MyComponent() {
  // Get all properties
  const { data: properties, loading, error } = useProperties();
  
  // Get bookings for a specific property
  const { data: bookings } = useBookings('property-id');
  
  // Get tasks assigned to a team member
  const { data: tasks } = useTasks(undefined, 'team-member-id');
  
  // ...
}
```

## Production Implementation

To implement this with a real database:

1. Replace the mock data storage with actual database connections
2. Update the CRUD operations to use the appropriate database client
3. Add proper error handling and transaction support
4. Implement authentication and authorization

Possible implementations:

- **SQL Database**: PostgreSQL or MySQL with an ORM like Prisma
- **NoSQL Database**: MongoDB with Mongoose
- **Backend as a Service**: Supabase, Firebase, or AWS Amplify
