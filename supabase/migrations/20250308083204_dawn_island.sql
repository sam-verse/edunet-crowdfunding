/*
  # Initial Schema for Sam Trust Crowdfunding Platform

  1. New Tables
    - `campaigns`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `goal_amount` (numeric)
      - `current_amount` (numeric)
      - `end_date` (timestamptz)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `image_url` (text)
      - `status` (text)

    - `donations`
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, references campaigns)
      - `user_id` (uuid, references auth.users)
      - `amount` (numeric)
      - `created_at` (timestamptz)
      - `message` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for campaign creation and viewing
    - Add policies for donations
*/

-- Create campaigns table
CREATE TABLE campaigns (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    goal_amount numeric NOT NULL CHECK (goal_amount > 0),
    current_amount numeric NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
    end_date timestamptz NOT NULL,
    created_by uuid NOT NULL REFERENCES auth.users(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    image_url text,
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    CONSTRAINT current_amount_less_than_goal CHECK (current_amount <= goal_amount)
);

-- Create donations table
CREATE TABLE donations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id uuid NOT NULL REFERENCES campaigns(id),
    user_id uuid NOT NULL REFERENCES auth.users(id),
    amount numeric NOT NULL CHECK (amount > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    message text
);

-- Enable RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Campaigns policies
CREATE POLICY "Anyone can view campaigns"
    ON campaigns FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Users can create campaigns"
    ON campaigns FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Campaign creators can update their campaigns"
    ON campaigns FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

-- Donations policies
CREATE POLICY "Anyone can view donations"
    ON donations FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Authenticated users can create donations"
    ON donations FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Function to update campaign amount after donation
CREATE OR REPLACE FUNCTION update_campaign_amount()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE campaigns
    SET current_amount = current_amount + NEW.amount
    WHERE id = NEW.campaign_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update campaign amount
CREATE TRIGGER update_campaign_amount_after_donation
    AFTER INSERT ON donations
    FOR EACH ROW
    EXECUTE FUNCTION update_campaign_amount();