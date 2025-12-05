/*
  # Create transactions table
  
  1. New Tables
    - `transactions`
      - `id` (uuid, primary key)
      - `type` (text, either 'expense' or 'income')
      - `amount` (numeric, the transaction amount)
      - `date` (date, transaction date)
      - `description` (text, transaction description)
      - `category` (text, transaction category)
      - `month` (text, YYYY-MM format for quick filtering)
      - `created_at` (timestamp)
*/

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('expense', 'income')),
  amount numeric NOT NULL CHECK (amount > 0),
  date date NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  month text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS transactions_month_idx ON transactions(month);
CREATE INDEX IF NOT EXISTS transactions_date_idx ON transactions(date);
CREATE INDEX IF NOT EXISTS transactions_type_idx ON transactions(type);
CREATE INDEX IF NOT EXISTS transactions_category_idx ON transactions(category);
