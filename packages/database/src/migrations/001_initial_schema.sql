-- 🇿🇼 Nyuchi Platform - Initial Database Schema
-- "I am because we are" - Ubuntu philosophy embedded in data structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('user', 'contributor', 'moderator', 'admin');
CREATE TYPE listing_status AS ENUM ('draft', 'pending', 'approved', 'rejected', 'published');
CREATE TYPE content_status AS ENUM ('draft', 'submitted', 'reviewing', 'approved', 'rejected', 'published');
CREATE TYPE verification_status AS ENUM ('none', 'pending', 'approved', 'rejected');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing', 'incomplete');

-- ============================================================================
-- PROFILES TABLE (extends auth.users)
-- ============================================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company TEXT,
  country TEXT,
  role user_role DEFAULT 'user' NOT NULL,
  ubuntu_score INTEGER DEFAULT 0 NOT NULL,
  contribution_count INTEGER DEFAULT 0 NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Indexes
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_ubuntu_score ON public.profiles(ubuntu_score DESC);
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- ============================================================================
-- DIRECTORY LISTINGS TABLE
-- ============================================================================
CREATE TABLE public.directory_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  category TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  description TEXT NOT NULL,
  contact_info JSONB DEFAULT '{}'::jsonb,
  media_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  status listing_status DEFAULT 'pending' NOT NULL,
  verification_status verification_status DEFAULT 'none' NOT NULL,
  verification_fee_paid BOOLEAN DEFAULT FALSE,
  reviewed_by UUID REFERENCES public.profiles(id),
  view_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS policies for directory listings
ALTER TABLE public.directory_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published listings"
  ON public.directory_listings FOR SELECT
  USING (status = 'published');

CREATE POLICY "Users can view own listings"
  ON public.directory_listings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create listings"
  ON public.directory_listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON public.directory_listings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Moderators can view all listings"
  ON public.directory_listings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'admin')
    )
  );

CREATE POLICY "Moderators can update all listings"
  ON public.directory_listings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'admin')
    )
  );

-- Indexes
CREATE INDEX idx_directory_user_id ON public.directory_listings(user_id);
CREATE INDEX idx_directory_status ON public.directory_listings(status);
CREATE INDEX idx_directory_category ON public.directory_listings(category);
CREATE INDEX idx_directory_country ON public.directory_listings(country);
CREATE INDEX idx_directory_verification ON public.directory_listings(verification_status);

-- ============================================================================
-- CONTENT SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE public.content_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured_image_url TEXT,
  status content_status DEFAULT 'draft' NOT NULL,
  reviewed_by UUID REFERENCES public.profiles(id),
  published_at TIMESTAMPTZ,
  ubuntu_points_awarded INTEGER DEFAULT 0 NOT NULL,
  view_count INTEGER DEFAULT 0 NOT NULL,
  ai_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS policies for content submissions
ALTER TABLE public.content_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published content"
  ON public.content_submissions FOR SELECT
  USING (status = 'published');

CREATE POLICY "Users can view own submissions"
  ON public.content_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions"
  ON public.content_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
  ON public.content_submissions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Moderators can view all submissions"
  ON public.content_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'admin')
    )
  );

CREATE POLICY "Moderators can update all submissions"
  ON public.content_submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'admin')
    )
  );

-- Indexes
CREATE INDEX idx_content_user_id ON public.content_submissions(user_id);
CREATE INDEX idx_content_status ON public.content_submissions(status);
CREATE INDEX idx_content_slug ON public.content_submissions(slug);
CREATE INDEX idx_content_category ON public.content_submissions(category);
CREATE INDEX idx_content_published_at ON public.content_submissions(published_at DESC);

-- Full-text search index
CREATE INDEX idx_content_search ON public.content_submissions 
  USING GIN(to_tsvector('english', title || ' ' || content));

-- ============================================================================
-- UBUNTU CONTRIBUTIONS TABLE
-- ============================================================================
CREATE TABLE public.ubuntu_contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  contribution_type TEXT NOT NULL,
  contribution_details TEXT,
  ubuntu_points_earned INTEGER NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS policies for ubuntu contributions
ALTER TABLE public.ubuntu_contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own contributions"
  ON public.ubuntu_contributions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert contributions"
  ON public.ubuntu_contributions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all contributions"
  ON public.ubuntu_contributions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Indexes
CREATE INDEX idx_ubuntu_user_id ON public.ubuntu_contributions(user_id);
CREATE INDEX idx_ubuntu_type ON public.ubuntu_contributions(contribution_type);
CREATE INDEX idx_ubuntu_created_at ON public.ubuntu_contributions(created_at DESC);

-- ============================================================================
-- VERIFICATION REQUESTS TABLE
-- ============================================================================
CREATE TABLE public.verification_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES public.directory_listings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  payment_status TEXT DEFAULT 'pending' NOT NULL,
  payment_amount DECIMAL(10,2) DEFAULT 10.00 NOT NULL,
  documents JSONB,
  status TEXT DEFAULT 'pending' NOT NULL,
  reviewed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS policies
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own verification requests"
  ON public.verification_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create verification requests"
  ON public.verification_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Moderators can view all verification requests"
  ON public.verification_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'admin')
    )
  );

CREATE POLICY "Moderators can update verification requests"
  ON public.verification_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'admin')
    )
  );

-- Indexes
CREATE INDEX idx_verification_user_id ON public.verification_requests(user_id);
CREATE INDEX idx_verification_listing_id ON public.verification_requests(listing_id);
CREATE INDEX idx_verification_status ON public.verification_requests(status);

-- ============================================================================
-- PRODUCT SUBSCRIPTIONS TABLE
-- ============================================================================
CREATE TABLE public.product_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_slug TEXT NOT NULL,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  plan_name TEXT NOT NULL,
  billing_cycle TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status subscription_status DEFAULT 'active' NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS policies
ALTER TABLE public.product_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON public.product_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
  ON public.product_subscriptions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Indexes
CREATE INDEX idx_subscriptions_user_id ON public.product_subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON public.product_subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON public.product_subscriptions(status);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_directory_updated_at BEFORE UPDATE ON public.directory_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON public.content_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verification_updated_at BEFORE UPDATE ON public.verification_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.product_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment Ubuntu score
CREATE OR REPLACE FUNCTION increment_ubuntu_score(user_id UUID, points INTEGER)
RETURNS public.profiles AS $$
DECLARE
  updated_profile public.profiles;
BEGIN
  UPDATE public.profiles
  SET 
    ubuntu_score = ubuntu_score + points,
    contribution_count = contribution_count + 1,
    updated_at = NOW()
  WHERE id = user_id
  RETURNING * INTO updated_profile;
  
  RETURN updated_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get top contributors
CREATE OR REPLACE FUNCTION get_top_contributors(row_limit INTEGER DEFAULT 50)
RETURNS TABLE(user_id UUID, total_points BIGINT, contribution_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    uc.user_id,
    SUM(uc.ubuntu_points_earned)::BIGINT as total_points,
    COUNT(*)::BIGINT as contribution_count
  FROM public.ubuntu_contributions uc
  GROUP BY uc.user_id
  ORDER BY total_points DESC
  LIMIT row_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE public.profiles IS 'User profiles - Ubuntu: I am because we are';
COMMENT ON TABLE public.directory_listings IS 'Community directory - Always free access';
COMMENT ON TABLE public.content_submissions IS 'Community content - Share knowledge freely';
COMMENT ON TABLE public.ubuntu_contributions IS 'Track Ubuntu philosophy in action';
COMMENT ON TABLE public.verification_requests IS 'Verification process - Trust through transparency';
COMMENT ON TABLE public.product_subscriptions IS 'Product subscriptions - Synchronized with Stripe';
