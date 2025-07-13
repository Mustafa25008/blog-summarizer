import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Globe, FileText, Languages, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
interface BlogSummary {
  id: string;
  url: string;
  title: string;
  original_text: string;
  summary_english: string;
  summary_urdu: string;
  created_at: string;
}
const urduTranslations: Record<string, string> = {
  technology: "ٹیکنالوجی",
  "artificial intelligence": "مصنوعی ذہانت",
  "machine learning": "مشین لرننگ",
  "data": "ڈیٹا",
  "software": "سافٹ ویئر",
  "development": "ترقی",
  "programming": "پروگرامنگ",
  "computer": "کمپیوٹر",
  "internet": "انٹرنیٹ",
  "website": "ویب سائٹ",
  "application": "ایپلیکیشن",
  "system": "نظام",
  "network": "نیٹ ورک",
  "security": "سیکیورٹی",
  "business": "کاروبار",
  "innovation": "جدت",
  "future": "مستقبل",
  "digital": "ڈیجیٹل",
  "analysis": "تجزیہ",
  "research": "تحقیق",
  "the": "یہ",
  "and": "اور",
  "of": "کا",
  "to": "کے لیے",
  "in": "میں",
  "for": "کے لیے",
  "with": "کے ساتھ",
  "is": "ہے",
  "are": "ہیں",
  "will": "گا",
  "can": "سکتا ہے",
  "new": "نیا",
  "modern": "جدید",
  "advanced": "جدید",
  "important": "اہم",
  "significant": "اہم",
  "major": "بڑا",
  "key": "اہم",
  "main": "بنیادی",
  "primary": "بنیادی",
  "effective": "مؤثر",
  "successful": "کامیاب",
  "popular": "مقبول",
  "recent": "حالیہ",
  "latest": "تازہ ترین",
  "you": "آپ",
  "your": "آپ کا",
  "we": "ہم",
  "our": "ہمارا",
  "they": "وہ",
  "their": "ان کا",
  "he": "وہ",
  "she": "وہ",
  "it": "یہ",
  "this": "یہ",
  "that": "وہ",
  "there": "وہاں",
  "here": "یہاں",
  "where": "کہاں",
  "when": "جب",
  "why": "کیوں",
  "how": "کیسے",
  "what": "کیا",
  "who": "کون",
  "which": "کون سا",
  "if": "اگر",
  "but": "لیکن",
  "or": "یا",
  "so": "تو",
  "because": "کیونکہ",
  "although": "اگرچہ",
  "while": "جبکہ",
  "after": "بعد",
  "before": "پہلے",
  "during": "دوران",
  "until": "تک",
  "since": "کی وجہ سے",
  "as": "کی طرح",
  "like": "کی طرح",
  "such as": "جیسے",
  "including": "شامل",
  "especially": "خاص طور پر",
  "particularly": "خاص طور پر",
  "generally": "عمومی طور پر",
  "usually": "عام طور پر",
  "often": "اکثر",
  "sometimes": "کبھی کبھار",
  "rarely": "بہت کم",
  "never": "کبھی نہیں",
  "always": "ہمیشہ",
  "every": "ہر",
  "all": "سب",
  "some": "کچھ",
  'many': "بہت سے",
  "few": "کچھ",
  "several": "کئی",
  "most": "زیادہ تر",
  "least": "کم از کم",
  "more": "زیادہ",
  "less": "کم",
  "better": "بہتر",
  "worse": "بدتر",
  "best": "بہترین",
  "worst": "بدترین",
  "great": "عظیم",
  "good": "اچھا",
  "bad": "برا",
  "excellent": "عمدہ",
  "poor": "غریب",
  "high": "اونچا",
  'low': "نیچا",
  "big": "بڑا",
  "small": "چھوٹا",
  "large": "بڑا",
  "short": "چھوٹا",
  "long": "لمبا",
  "wide": "چوڑا",
  "narrow": "تنگ",
  "deep": "گہرا",
  "shallow": "سطحی",
  "heavy": "بھاری",
  "light": "ہلکا",
  "fast": "تیز",
  "slow": "آہستہ",
  "easy": "آسان",
  "difficult": "مشکل",
  "simple": "سادہ",
  "complex": "پیچیدہ",
  "clear": "صاف",
  "confusing": "مبہم",
  "interesting": "دلچسپ",
  "boring": "بورنگ",
  "fun": "مزیدار",
  "enjoyable": "لطف اندوز",
  "useful": "مفید",
  "useless": "بے کار",
  'valuable': "قیمتی",
  "worthless": "بے قیمت",
};
export const BlogSummarizer = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<BlogSummary | null>(
    null
  );
  const [recentSummaries, setRecentSummaries] = useState<BlogSummary[]>([]);
  const [showUrduTranslation, setShowUrduTranslation] = useState(false);
  const [urduTranslation, setUrduTranslation] = useState("");
  const translateToUrdu = (text: string): string => {
    let translatedText = text.toLowerCase();
    Object.entries(urduTranslations).forEach(([english, urdu]) => {
      const regex = new RegExp(`\\b${english}\\b`, "gi");
      translatedText = translatedText.replace(regex, urdu);
    });
    return translatedText;
  };
  const simulateAISummary = (text: string): string => {
    const sentences = text.split(".").filter((s) => s.trim().length > 20);
    const keywords = [
      "technology",
      "artificial intelligence",
      "data",
      "software",
      "business",
      "innovation",
    ];
    const importantSentences = sentences
      .filter((sentence) =>
        keywords.some((keyword) => sentence.toLowerCase().includes(keyword))
      )
      .slice(0, 3);
    if (importantSentences.length === 0) {
      return sentences.slice(0, 3).join(". ") + ".";
    }
    return importantSentences.join(". ") + ".";
  };
  const handleTranslateToUrdu = () => {
    if (currentSummary) {
      const translated = translateToUrdu(currentSummary.summary_english);
      setUrduTranslation(translated);
      setShowUrduTranslation(true);
    }
  };
  const deleteSummary = async (summaryId: string) => {
    try {
      const { error } = await supabase
        .from("blog_summaries")
        .delete()
        .eq("id", summaryId);
      if (error) throw error;

      // Remove from local state
      setRecentSummaries((prev) => prev.filter((s) => s.id !== summaryId));

      // If current summary is deleted, clear it
      if (currentSummary?.id === summaryId) {
        setCurrentSummary(null);
        setShowUrduTranslation(false);
        setUrduTranslation("");
      }
      toast({
        title: "کامیابی",
        description: "خلاصہ کامیابی سے ڈیلیٹ ہو گیا",
      });
    } catch (error) {
      console.error("Error deleting summary:", error);
      toast({
        title: "خرابی",
        description: "خلاصہ ڈیلیٹ کرنے میں مسئلہ",
        variant: "destructive",
      });
    }
  };
  const scrapeAndSummarize = async () => {
    if (!url.trim()) {
      toast({
        title: "خرابی",
        description: "براہ کرم ایک درست URL داخل کریں",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      // Call the scraping edge function
      const scrapeResponse = await fetch(
        "https://zzmizuhgrpjmlsshcwku.supabase.co/functions/v1/scrape-blog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6bWl6dWhncnBqbWxzc2hjd2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMTI5NzUsImV4cCI6MjA2Nzc4ODk3NX0.K0HbmeWzNwFY6mABfxLNl0egBvrsjeYz9gXXGUe1p80`,
          },
          body: JSON.stringify({
            url: url.trim(),
          }),
        }
      );
      if (!scrapeResponse.ok) {
        throw new Error("Failed to scrape the blog content");
      }
      const scrapedData = await scrapeResponse.json();
      if (scrapedData.error) {
        throw new Error(scrapedData.error);
      }

      // Generate summary
      const englishSummary = simulateAISummary(scrapedData.content);

      // Save to Supabase (without Urdu translation initially)
      const { data, error } = await supabase
        .from("blog_summaries")
        .insert({
          url: url.trim(),
          title: scrapedData.title,
          original_text: scrapedData.content,
          summary_english: englishSummary,
          summary_urdu: null,
        })
        .select()
        .single();
      if (error) throw error;
      setCurrentSummary(data);

      // Fetch recent summaries
      const { data: recent } = await supabase
        .from("blog_summaries")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(5);
      if (recent) setRecentSummaries(recent);
      toast({
        title: "کامیابی",
        description: "بلاگ کامیابی سے خلاصہ ہو گیا",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "خرابی",
        description: "بلاگ خلاصہ کرنے میں مسئلہ",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4 py-8">
        <h2 className="text-5xl font-bold gradient-text leading-[1.4] mb-8">Summarize Any Blog</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform lengthy blog posts into concise, actionable summaries with
          AI-powered analysis
        </p>
      </div>

      <Card className="max-w-2xl mx-auto glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            URL Input
          </CardTitle>
          <CardDescription>
            Paste the blog URL you want to summarize
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com/blog-post"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={scrapeAndSummarize}
              disabled={loading}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Summarize"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentSummary && (
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {currentSummary.title}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">{currentSummary.url}</Badge>
                <Badge variant="outline">
                  {new Date(currentSummary.created_at).toLocaleDateString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  English Summary
                </h3>
                <Textarea
                  value={currentSummary.summary_english}
                  readOnly
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Urdu Summary / اردو خلاصہ
                  </h3>
                  <Button
                    onClick={handleTranslateToUrdu}
                    variant="outline"
                    size="sm"
                    disabled={!currentSummary?.summary_english}
                  >
                    Translate to Urdu
                  </Button>
                </div>
                {showUrduTranslation && (
                  <Textarea
                    value={urduTranslation}
                    readOnly
                    className="min-h-[100px] text-right"
                    dir="rtl"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {recentSummaries.length > 0 && (
        <Card className="max-w-4xl mx-auto glass-card">
          <CardHeader>
            <CardTitle>Recent Summaries</CardTitle>
            <CardDescription>
              Previously processed blog summaries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSummaries.map((summary) => (
                <div
                  key={summary.id}
                  className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => setCurrentSummary(summary)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{summary.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {summary.url}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {new Date(summary.created_at).toLocaleDateString()}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSummary(summary.id);
                        }}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
