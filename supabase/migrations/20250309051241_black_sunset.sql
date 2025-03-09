/*
  # Add Impact Areas Table

  1. New Tables
    - `impact_areas`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on new table
    - Add policy for read access
*/

CREATE TABLE IF NOT EXISTS impact_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE impact_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view impact areas"
  ON impact_areas
  FOR SELECT
  TO public
  USING (true);

-- Insert initial impact areas
INSERT INTO impact_areas (title, description, image_url) VALUES
  (
    'Children''s Education',
    'Empowering the next generation through quality education. Our initiatives have helped over 10,000 children access better learning opportunities and resources.',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80'
  ),
  (
    'Healthcare Access',
    'Supporting communities with essential medical care and cancer awareness programs. We''ve facilitated treatment for 5,000+ patients in need.',
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b98?auto=format&fit=crop&q=80'
  ),
  (
    'Food Security',
    'Fighting hunger through sustainable food programs. Our network has provided over 1 million meals to families facing food insecurity.',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80'
  ),
  (
    'Rural Development',
    'Building stronger communities through infrastructure and skill development. We''ve transformed 100+ villages with sustainable development projects.',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80'
  );