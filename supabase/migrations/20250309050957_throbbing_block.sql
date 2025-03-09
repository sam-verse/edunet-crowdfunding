/*
  # Add Trust Features and Statistics

  1. New Tables
    - `trust_features`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon_name` (text)
      - `created_at` (timestamp)

    - `donation_stats`
      - `id` (uuid, primary key)
      - `total_donors` (integer)
      - `total_amount` (numeric)
      - `total_campaigns` (integer)
      - `countries_reached` (integer)
      - `last_updated` (timestamp)

  2. Security
    - Enable RLS on new tables
    - Add policies for read access
*/

-- Trust Features Table
CREATE TABLE IF NOT EXISTS trust_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trust_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view trust features"
  ON trust_features
  FOR SELECT
  TO public
  USING (true);

-- Donation Stats Table
CREATE TABLE IF NOT EXISTS donation_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_donors integer NOT NULL DEFAULT 0,
  total_amount numeric NOT NULL DEFAULT 0,
  total_campaigns integer NOT NULL DEFAULT 0,
  countries_reached integer NOT NULL DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

ALTER TABLE donation_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view donation stats"
  ON donation_stats
  FOR SELECT
  TO public
  USING (true);

-- Insert initial trust features
INSERT INTO trust_features (title, description, icon_name) VALUES
  ('Bank-Level Security', 'Your donations are protected with enterprise-grade encryption and security measures', 'shield'),
  ('Verified Campaigns', 'Every campaign undergoes a thorough verification process', 'check-circle'),
  ('Transparent Impact', 'Track the real-time impact of your donations', 'pie-chart'),
  ('24/7 Support', 'Our dedicated team is always here to help', 'headphones'),
  ('Instant Updates', 'Get immediate notifications about campaign progress', 'bell'),
  ('Global Reach', 'Support causes from around the world', 'globe');

-- Insert initial donation stats
INSERT INTO donation_stats (
  total_donors,
  total_amount,
  total_campaigns,
  countries_reached
) VALUES (
  1250,
  750000,
  85,
  12
);