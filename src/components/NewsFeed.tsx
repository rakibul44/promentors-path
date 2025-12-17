import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Newspaper, Calendar } from "lucide-react";

interface NewsPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

const NewsFeed = () => {
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
      .order("created_at", { ascending: false })
      .limit(6);

    if (data && !error) {
      setPosts(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse h-8 w-48 bg-muted rounded mx-auto mb-4"></div>
            <div className="animate-pulse h-4 w-64 bg-muted rounded mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-secondary/30" id="news">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Newspaper className="h-4 w-4" />
            <span className="text-sm font-medium">Latest Updates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">News & Announcements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest from ProMentorsYou
          </p>
        </div>

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
      </div>
    </section>
  );
};

export default NewsFeed;
