-- Create news_posts table for social media updates
CREATE TABLE public.news_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can view published posts
CREATE POLICY "Anyone can view published posts"
ON public.news_posts
FOR SELECT
USING (published = true);

-- Admins can manage all posts
CREATE POLICY "Admins can manage all posts"
ON public.news_posts
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_news_posts_updated_at
BEFORE UPDATE ON public.news_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();