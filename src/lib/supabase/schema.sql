-- Create tables for Property Management System

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT,
  description TEXT,
  bedrooms INTEGER,
  bathrooms NUMERIC,
  max_guests INTEGER,
  price_per_night NUMERIC,
  cleaning_fee NUMERIC,
  images JSONB,
  amenities JSONB,
  active BOOLEAN DEFAULT true,
  status TEXT,
  door_code TEXT,
  wifi_password TEXT,
  wifi_status TEXT,
  rating NUMERIC,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  description TEXT,
  count INTEGER,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  check_in_date TIMESTAMP WITH TIME ZONE,
  check_out_date TIMESTAMP WITH TIME ZONE,
  number_of_guests INTEGER,
  total_price NUMERIC,
  status TEXT,
  special_requests TEXT,
  early_check_in BOOLEAN,
  late_check_out BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT,
  phone TEXT,
  address TEXT,
  profile_image TEXT,
  last_login_at TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT,
  active BOOLEAN DEFAULT true,
  hourly_rate NUMERIC,
  start_date TIMESTAMP WITH TIME ZONE,
  documents JSONB,
  notes TEXT,
  profile_image TEXT,
  availability JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
  assigned_to_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT,
  priority TEXT,
  status TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  completion_notes TEXT,
  verification_photos JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory Items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  quantity INTEGER,
  condition TEXT,
  purchase_date TIMESTAMP WITH TIME ZONE,
  purchase_price NUMERIC,
  replacement_value NUMERIC,
  last_inspection_date TIMESTAMP WITH TIME ZONE,
  warranty_info TEXT,
  serial_number TEXT,
  notes TEXT,
  images JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Schedules table
CREATE TABLE IF NOT EXISTS team_schedules (
  id UUID PRIMARY KEY,
  team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  status TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  guest_name TEXT,
  guest_email TEXT,
  issue_date TIMESTAMP WITH TIME ZONE,
  due_date TIMESTAMP WITH TIME ZONE,
  total_amount NUMERIC,
  status TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoice Line Items table
CREATE TABLE IF NOT EXISTS invoice_line_items (
  id UUID PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT,
  quantity INTEGER,
  unit_price NUMERIC,
  amount NUMERIC,
  item_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  amount NUMERIC,
  payment_date TIMESTAMP WITH TIME ZONE,
  payment_method TEXT,
  transaction_id TEXT,
  notes TEXT,
  refunded BOOLEAN DEFAULT false,
  refund_amount NUMERIC,
  refund_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  category TEXT,
  vendor TEXT,
  amount NUMERIC,
  date TIMESTAMP WITH TIME ZONE,
  description TEXT,
  receipt_url TEXT,
  reimbursable BOOLEAN DEFAULT false,
  status TEXT,
  paid_by TEXT,
  paid_to TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial Reports table
CREATE TABLE IF NOT EXISTS financial_reports (
  id UUID PRIMARY KEY,
  title TEXT,
  type TEXT,
  date_range JSONB,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property Photos table
CREATE TABLE IF NOT EXISTS property_photos (
  id UUID PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT,
  category TEXT,
  description TEXT,
  is_primary BOOLEAN DEFAULT false,
  "order" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  language TEXT,
  timezone TEXT,
  notification_preferences JSONB,
  theme TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
