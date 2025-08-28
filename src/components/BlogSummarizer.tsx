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
  process: "عمل",
  technology: "ٹیکنالوجی",
  "artificial intelligence": "مصنوعی ذہانت",
  "machine learning": "مشین لرننگ",
  data: "ڈیٹا",
  software: "سافٹ ویئر",
  development: "ترقی",
  programming: "پروگرامنگ",
  computer: "کمپیوٹر",
  internet: "انٹرنیٹ",
  website: "ویب سائٹ",
  application: "ایپلیکیشن",
  system: "نظام",
  network: "نیٹ ورک",
  security: "سیکیورٹی",
  business: "کاروبار",
  innovation: "جدت",
  future: "مستقبل",
  digital: "ڈیجیٹل",
  analysis: "تجزیہ",
  research: "تحقیق",
  the: "یہ",
  and: "اور",
  of: "کا",
  to: "کے لیے",
  in: "میں",
  for: "کے لیے",
  with: "کے ساتھ",
  is: "ہے",
  are: "ہیں",
  will: "گا",
  can: "سکتا ہے",
  new: "نیا",
  modern: "جدید",
  advanced: "جدید",
  important: "اہم",
  significant: "اہم",
  major: "بڑا",
  key: "اہم",
  main: "بنیادی",
  primary: "بنیادی",
  effective: "مؤثر",
  successful: "کامیاب",
  popular: "مقبول",
  recent: "حالیہ",
  latest: "تازہ ترین",
  you: "آپ",
  your: "آپ کا",
  we: "ہم",
  our: "ہمارا",
  they: "وہ",
  their: "ان کا",
  he: "وہ",
  she: "وہ",
  it: "یہ",
  this: "یہ",
  that: "وہ",
  there: "وہاں",
  here: "یہاں",
  where: "کہاں",
  when: "جب",
  why: "کیوں",
  how: "کیسے",
  what: "کیا",
  who: "کون",
  which: "کون سا",
  if: "اگر",
  but: "لیکن",
  or: "یا",
  so: "تو",
  because: "کیونکہ",
  although: "اگرچہ",
  while: "جبکہ",
  after: "بعد",
  before: "پہلے",
  during: "دوران",
  until: "تک",
  since: "کی وجہ سے",
  as: "کی طرح",
  like: "کی طرح",
  "such as": "جیسے",
  including: "شامل",
  especially: "خاص طور پر",
  particularly: "خاص طور پر",
  generally: "عمومی طور پر",
  usually: "عام طور پر",
  often: "اکثر",
  sometimes: "کبھی کبھار",
  rarely: "بہت کم",
  never: "کبھی نہیں",
  always: "ہمیشہ",
  every: "ہر",
  all: "سب",
  some: "کچھ",
  many: "بہت سے",
  few: "کچھ",
  several: "کئی",
  most: "زیادہ تر",
  least: "کم از کم",
  more: "زیادہ",
  less: "کم",
  better: "بہتر",
  worse: "بدتر",
  best: "بہترین",
  worst: "بدترین",
  great: "عظیم",
  good: "اچھا",
  bad: "برا",
  excellent: "عمدہ",
  poor: "غریب",
  high: "اونچا",
  low: "نیچا",
  big: "بڑا",
  small: "چھوٹا",
  large: "بڑا",
  short: "چھوٹا",
  long: "لمبا",
  wide: "چوڑا",
  narrow: "تنگ",
  deep: "گہرا",
  shallow: "سطحی",
  heavy: "بھاری",
  light: "ہلکا",
  fast: "تیز",
  slow: "آہستہ",
  easy: "آسان",
  difficult: "مشکل",
  simple: "سادہ",
  complex: "پیچیدہ",
  clear: "صاف",
  confusing: "مبہم",
  interesting: "دلچسپ",
  boring: "بورنگ",
  fun: "مزیدار",
  enjoyable: "لطف اندوز",
  useful: "مفید",
  useless: "بے کار",
  valuable: "قیمتی",
  worthless: "بے قیمت",
  relevant: "متعلقہ",
  irrelevant: "غیر متعلقہ",
  accurate: "صحیح",
  inaccurate: "غلط",
  true: "سچ",
  false: "غلط",
  right: "صحیح",
  wrong: "غلط",
  valid: "معتبر",
  invalid: "غیر معتبر",
  logical: "منطقی",
  illogical: "غیر منطقی",
  solution: "حل",
  problem: "مسئلہ",
  challenge: "چیلنج",
  issue: "مسئلہ",
  question: "سوال",
  answer: "جواب",
  response: "جواب",
  explanation: "وضاحت",
  example: "مثال",
  reality: "حقیقت",
  theory: "نظریہ",
  concept: "تصور",
  idea: "خیال",
  opinion: "رائے",
  belief: "ایمان",
  view: "نقطہ نظر",
  perspective: "نقطہ نظر",
  approach: "طریقہ",
  method: "طریقہ",
  strategy: "حکمت عملی",
  technique: "تکنیک",
  real: "حقیقی",
  virtual: "ورچوئل",
  online: "آن لائن",
  offline: "آف لائن",
  physical: "طبیعی",
  social: "سماجی",
  cultural: "ثقافتی",
  economic: "اقتصادی",
  political: "سیاسی",
  environmental: "ماحولیاتی",
  see: "دیکھنا",
  look: "دیکھنا",
  watch: "دیکھنا",
  read: "پڑھنا",
  write: "لکھنا",
  listen: "سننا",
  hear: "سننا",
  speak: "بولنا",
  talk: "بات کرنا",
  communicate: "رابطہ کرنا",
  share: "بانٹنا",
  connect: "جوڑنا",
  collaborate: "تعاون کرنا",
  create: "تخلیق کرنا",
  build: "بنانا",
  develop: "ترقی دینا",
  improve: "بہتر بنانا",
  enhance: "بڑھانا",
  optimize: "بہتر بنانا",
  simplify: "سادہ بنانا",
  complicate: "پیچیدہ بنانا",
  solve: "حل کرنا",
  fix: "ٹھیک کرنا",
  repair: "مرمت کرنا",
  maintain: "برقرار رکھنا",
  support: "مدد کرنا",
  help: "مدد کرنا",
  assist: "مدد کرنا",
  guide: "رہنمائی کرنا",
  lead: "رہنمائی کرنا",
  follow: "پیروی کرنا",
  inspire: "حوصلہ افزائی کرنا",
  motivate: "حوصلہ افزائی کرنا",
  encourage: "حوصلہ افزائی کرنا",
  teach: "سکھانا",
  learn: "سیکھنا",
  study: "مطالعہ کرنا",
  analyze: "تجزیہ کرنا",
  evaluate: "جانچنا",
  global: "عالمی",
  seek: "تلاش کرنا",
  find: "پانا",
  search: "تلاش",
  full: "مکمل",
  summary: "خلاصہ",
  blog: "بلاگ",
  post: "پوسٹ",
  discover: "دریافت کرنا",
  businesses: "کاروبار",
  "businesses and": "کاروبار اور",
  client: "کلائنٹ",
  clients: "کلائنٹس",
  selling: "فروخت",
  sales: "فروخت",
  monetize: "آمدنی",
  monetization: "آمدنی",
  skills: "مہارتیں",
  by: "کی طرف سے",
  "the best": "بہترین",
  also: "بھی",
  ".": "۔",
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
  // const translateToUrdu = (text: string): string => {
  //   let translatedText = text.toLowerCase();
  //   Object.entries(urduTranslations).forEach(([english, urdu]) => {
  //     const regex = new RegExp(`\\b${english}\\b`, "gi");
  //     translatedText = translatedText.replace(regex, urdu);
  //   });
  //   return translatedText;
  // };
  async function trns(text) {
    toast({
      title: "Translating! Please wait...",
      description: "Translating summary to Urdu...",
      duration: 5000,
    });
    const transUrl = import.meta.env.VITE_webhook_Translate_Url;
    const res = await fetch(transUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      //console.log(data[0].output);
      //const re = document.getElementById("response");
      //re.textContent = data[0].output;
      toast({
        title: "Success",
        description: "Successfully translated to Urdu",
      });
      return data[0].output;
    } else {
      toast({
        title: "Error",
        description: "There was a problem translating to Urdu",
        variant: "destructive",
      });
    }
    //return data[0].output;
  }
  const handleTranslateToUrdu = async () => {
    if (currentSummary) {
      //const translated = translateToUrdu(currentSummary.summary_english);
      const translated = await trns(currentSummary.summary_english); // <-- async call
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
        title: "Success!",
        description: "Summary deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting summary:", error);
      toast({
        title: "Error!",
        description: "There was a problem deleting the summary",
        variant: "destructive",
      });
    }
  };
  const scrapeAndSummarize = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
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
      //n8n call to summarize the content
      const sumUrl = import.meta.env.VITE_webhook_Summary_Url;

      const res = await fetch(sumUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //toDo: "Summarize the following blog content in concise and clear English, focusing on key points and actionable insights.",
          text: scrapedData.content,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to summarize the blog content");
      }
      const data1 = await res.json();

      //summary from n8n
      const outputText = data1[0].output;

      // Save to Supabase (without Urdu translation initially)
      const { data, error } = await supabase
        .from("blog_summaries")
        .insert({
          url: url.trim(),
          title: scrapedData.title,
          original_text: scrapedData.content,
          summary_english: outputText,
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
        title: "Success",
        description: "Blog summarized successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "There was a problem summarizing the blog",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4 py-8">
        <h2 className="text-5xl font-bold gradient-text leading-[1.4] mb-8 animate-pulse">
          Summarize Any Blog
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform lengthy blog posts into concise, actionable summaries with
          AI-powered analysis
        </p>
      </div>

      <Card className="max-w-2xl mx-auto glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 mb-3">
            <Globe className="h-5 w-5 animate-pulse" />
            <span className="animate-bounce">URL Input</span>
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
              className="min-w-[120px] "
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <span className="text-black">Summarize</span>
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
          <CardHeader className="space-y-3">
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
