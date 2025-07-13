import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      throw new Error('URL is required');
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      throw new Error('Invalid URL format');
    }

    console.log(`Scraping URL: ${url}`);

    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    if (!doc) {
      throw new Error('Failed to parse HTML');
    }

    // Extract title
    let title = doc.querySelector('title')?.textContent?.trim() || '';
    
    // Try meta og:title as fallback
    if (!title) {
      title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim() || '';
    }

    // Extract main content
    let content = '';
    
    // Try different content selectors in order of preference
    const contentSelectors = [
      'article',
      '.post-content',
      '.entry-content', 
      '.content',
      '.post-body',
      '.article-content',
      'main',
      '.container',
      'body'
    ];

    for (const selector of contentSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        content = element.textContent || '';
        break;
      }
    }

    // Clean up the content
    content = content
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n+/g, ' ') // Replace newlines with space
      .trim();

    // If content is too short, try to get more text from paragraphs
    if (content.length < 200) {
      const paragraphs = Array.from(doc.querySelectorAll('p'))
        .map(p => p.textContent?.trim())
        .filter(text => text && text.length > 50)
        .join(' ');
      
      if (paragraphs.length > content.length) {
        content = paragraphs;
      }
    }

    // Limit content length to prevent huge payloads
    if (content.length > 5000) {
      content = content.substring(0, 5000) + '...';
    }

    if (!content || content.length < 50) {
      throw new Error('Could not extract meaningful content from the webpage');
    }

    return new Response(
      JSON.stringify({ 
        title: title || 'Untitled',
        content: content,
        url: url
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to scrape content'
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});