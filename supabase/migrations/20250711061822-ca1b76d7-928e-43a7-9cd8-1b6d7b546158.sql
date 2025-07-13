-- Create table for storing blog summaries
CREATE TABLE public.blog_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  original_text TEXT,
  summary_english TEXT,
  summary_urdu TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_summaries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public blog summarizer)
CREATE POLICY "Blog summaries are viewable by everyone" 
ON public.blog_summaries 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert blog summaries" 
ON public.blog_summaries 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_summaries_updated_at
  BEFORE UPDATE ON public.blog_summaries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();