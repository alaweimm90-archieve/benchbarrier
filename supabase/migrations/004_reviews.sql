-- Create product_reviews table
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_product_reviews_created_at ON product_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_reviews_verified ON product_reviews(verified_purchase);

-- Create review_votes table for tracking helpful votes
CREATE TABLE IF NOT EXISTS review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES product_reviews(id) ON DELETE CASCADE,
  voter_email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(review_id, voter_email)
);

CREATE INDEX IF NOT EXISTS idx_review_votes_review_id ON review_votes(review_id);

-- Add RLS policies
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews
CREATE POLICY "Anyone can read reviews"
  ON product_reviews
  FOR SELECT
  USING (true);

-- Anyone can create reviews (we'll validate on the server)
CREATE POLICY "Anyone can create reviews"
  ON product_reviews
  FOR INSERT
  WITH CHECK (true);

-- Anyone can read votes
CREATE POLICY "Anyone can read votes"
  ON review_votes
  FOR SELECT
  USING (true);

-- Anyone can vote (one vote per email per review)
CREATE POLICY "Anyone can vote"
  ON review_votes
  FOR INSERT
  WITH CHECK (true);

-- Function to update helpful_count
CREATE OR REPLACE FUNCTION update_review_helpful_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE product_reviews
  SET helpful_count = (
    SELECT COUNT(*) FROM review_votes WHERE review_id = NEW.review_id
  )
  WHERE id = NEW.review_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update helpful_count when vote is added
CREATE TRIGGER update_helpful_count_on_vote
AFTER INSERT ON review_votes
FOR EACH ROW
EXECUTE FUNCTION update_review_helpful_count();

-- Function to calculate average rating for a product
CREATE OR REPLACE FUNCTION get_product_rating(p_product_id TEXT)
RETURNS TABLE (
  average_rating NUMERIC,
  total_reviews INTEGER,
  rating_distribution JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ROUND(AVG(rating)::NUMERIC, 1) as average_rating,
    COUNT(*)::INTEGER as total_reviews,
    jsonb_build_object(
      '5', COUNT(*) FILTER (WHERE rating = 5),
      '4', COUNT(*) FILTER (WHERE rating = 4),
      '3', COUNT(*) FILTER (WHERE rating = 3),
      '2', COUNT(*) FILTER (WHERE rating = 2),
      '1', COUNT(*) FILTER (WHERE rating = 1)
    ) as rating_distribution
  FROM product_reviews
  WHERE product_id = p_product_id;
END;
$$ LANGUAGE plpgsql;

-- Add comments
COMMENT ON TABLE product_reviews IS 'Stores customer reviews for products';
COMMENT ON TABLE review_votes IS 'Tracks helpful votes for reviews';
