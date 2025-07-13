import { HeartPulse, Code, Zap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="glass-card border-t mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold gradient-text mb-4">
              AI Blog Summarizer
            </h3>
            <p className="text-muted-foreground text-sm">
              Powered by advanced AI to deliver accurate and concise blog summaries 
              in Urdu language.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Features
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Instant web scraping</li>
              <li>• AI-powered summarization</li>
              <li>• Translate to Urdu support</li>
              <li>• History management</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              Technology
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• React & TypeScript</li>
              <li>• Supabase Backend</li>
              <li>• Tailwind CSS</li>
              <li>• Edge Functions</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-white text-sm text-muted-foreground flex items-center justify-center gap-2">
            &copy; {new Date().getFullYear()} Blog Summarizer. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};