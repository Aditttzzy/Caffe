
-- Definisi Tabel Orders untuk Supabase (PostgreSQL)
-- Gunakan SQL ini di SQL Editor Supabase

-- Tabel produk untuk menyimpan data kopi
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  category VARCHAR(100),
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel pesanan
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL, -- Bisa UUID jika menggunakan auth
  items JSONB NOT NULL, -- Menyimpan array item pesanan
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_id VARCHAR(255),
  shipping_address JSONB, -- Menyimpan informasi pengiriman
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indeks untuk mempercepat pencarian pesanan
CREATE INDEX orders_user_id_idx ON orders(user_id);
CREATE INDEX orders_status_idx ON orders(status);

-- Fungsi trigger untuk update timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk update timestamp pada tabel orders
CREATE TRIGGER set_orders_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Row Level Security (RLS) untuk orders
-- Aktifkan RLS pada tabel orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: User hanya bisa melihat pesanan mereka sendiri
CREATE POLICY "Users can view their own orders"
ON orders FOR SELECT
USING (user_id = auth.uid());

-- Policy: Insert untuk semua user (termasuk guest)
CREATE POLICY "Anyone can create orders"
ON orders FOR INSERT
WITH CHECK (true);
