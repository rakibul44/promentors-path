import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Newspaper, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface NewsPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

const News = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (data && !error) {
      setPosts(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Newspaper className="h-4 w-4" />
                <span className="text-sm font-medium">Latest Updates</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">News & Announcements</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest from ProMentorsYou
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="animate-pulse">
                      <div className="aspect-video bg-muted"></div>
                      <CardHeader className="pb-2">
                        <div className="h-4 w-24 bg-muted rounded mb-2"></div>
                        <div className="h-6 w-full bg-muted rounded"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 w-full bg-muted rounded mb-2"></div>
                        <div className="h-4 w-3/4 bg-muted rounded"></div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No News Yet</h3>
                <p className="text-muted-foreground">Check back later for updates!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                  <Card 
                    key={post.id} 
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {post.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(post.created_at), "MMM dd, yyyy")}</span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {post.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
