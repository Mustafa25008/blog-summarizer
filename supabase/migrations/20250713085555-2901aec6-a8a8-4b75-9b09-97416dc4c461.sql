-- Add DELETE policy for blog summaries so users can delete their summaries
CREATE POLICY "Anyone can delete blog summaries" 
ON public.blog_summaries 
FOR DELETE 
USING (true);