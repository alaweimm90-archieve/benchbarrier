-- BenchBarrier Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  total_amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
  shipping_address JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  stripe_product_id TEXT,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL, -- in cents
  total_price INTEGER NOT NULL, -- in cents
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student verifications table
CREATE TABLE IF NOT EXISTS student_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verification_code TEXT,
  verification_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team orders table
CREATE TABLE IF NOT EXISTS team_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_phone TEXT,
  quantity INTEGER NOT NULL,
  product_ids TEXT[] NOT NULL,
  total_amount INTEGER NOT NULL, -- in cents
  status TEXT DEFAULT 'pending', -- pending, quoted, approved, completed
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_student_verifications_email ON student_verifications(email);
CREATE INDEX IF NOT EXISTS idx_team_orders_email ON team_orders(contact_email);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Orders: Users can only read their own orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Order items: Users can only read items from their own orders
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  USING (
    order_id IN (
      SELECT id FROM orders 
      WHERE customer_email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Student verifications: Users can only read their own verification
CREATE POLICY "Users can view their own verification"
  ON student_verifications FOR SELECT
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Team orders: Users can only read their own team orders
CREATE POLICY "Users can view their own team orders"
  ON team_orders FOR SELECT
  USING (contact_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Service role can do everything (bypass RLS)
-- This is automatically handled by using the service_role key

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_verifications_updated_at
  BEFORE UPDATE ON student_verifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_orders_updated_at
  BEFORE UPDATE ON team_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
