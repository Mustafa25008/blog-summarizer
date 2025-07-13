import { Bot, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="glass-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="h-8 w-8 text-primary" />
              <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text animate-pulse">
                AI Blog Summarizer
              </h1>
              <p className="text-sm text-muted-foreground">
                Transform any blog into concise summaries
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};