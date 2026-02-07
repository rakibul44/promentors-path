import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import AdminRoleManager from "@/components/admin/AdminRoleManager";
import AdminPaymentsDashboard from "@/components/admin/AdminPaymentsDashboard";
import AdminMentorProgress from "@/components/admin/AdminMentorProgress";
import {
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  Calendar,
  Building2,
  BarChart3,
  Check,
  X,
  Loader2,
  Plus,
  ShieldCheck,
  Newspaper,
  Trash2,
  TrendingUp,
} from "lucide-react";

interface Mentor {
  id: string;
  full_name: string;
  email: string;
  expertise: string | null;
  avatar_url: string | null;
  status: string;
  created_at: string;
}

interface Course {
  id: string;
  title: string;
  category: string | null;
  status: string;
  price: number;
  mentor_id: string | null;
  created_at: string;
  mentors?: { full_name: string } | null;
}

interface Booking {
  id: string;
  mentor_id: string;
  session_type: string;
  scheduled_at: string;
  status: string;
  mentors: { full_name: string } | null;
}

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string | null;
  created_at: string;
  course_id: string | null;
}

interface Partnership {
  id: string;
  name: string;
  type: string;
  status: string;
  website_url: string | null;
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: "admin" | "moderator" | "user" | "mentor";
}

interface NewsPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isModerator, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  // New partnership form
  const [newPartnership, setNewPartnership] = useState({
    name: "",
    type: "university" as "university" | "company" | "organization",
    website_url: "",
    description: "",
  });
  const [isAddingPartnership, setIsAddingPartnership] = useState(false);

  // New news post form
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image_url: "",
  });
  const [isAddingPost, setIsAddingPost] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (!authLoading && user && !isAdmin && !isModerator) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, isAdmin, isModerator, authLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin || isModerator) {
      fetchData();
    }
  }, [isAdmin, isModerator]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mentorsRes, coursesRes, bookingsRes, paymentsRes, partnershipsRes, profilesRes, newsRes, rolesRes] =
        await Promise.all([
          supabase.from("mentors").select("*").order("created_at", { ascending: false }),
          supabase.from("courses").select("*, mentors(full_name)").order("created_at", { ascending: false }),
          supabase.from("bookings").select("*, mentors(full_name)").order("scheduled_at", { ascending: false }),
          supabase.from("payments").select("*").order("created_at", { ascending: false }),
          supabase.from("partnerships").select("*").order("created_at", { ascending: false }),
          supabase.from("profiles").select("*").order("created_at", { ascending: false }),
          supabase.from("news_posts").select("*").order("created_at", { ascending: false }),
          supabase.from("user_roles").select("*"),
        ]);

      if (mentorsRes.data) setMentors(mentorsRes.data);
      if (coursesRes.data) setCourses(coursesRes.data);
      if (bookingsRes.data) setBookings(bookingsRes.data);
      if (paymentsRes.data) setPayments(paymentsRes.data);
      if (partnershipsRes.data) setPartnerships(partnershipsRes.data);
      if (profilesRes.data) setProfiles(profilesRes.data);
      if (newsRes.data) setNewsPosts(newsRes.data);
      if (rolesRes.data) setUserRoles(rolesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const updateMentorStatus = async (mentorId: string, status: string) => {
    const { error } = await supabase.from("mentors").update({ status }).eq("id", mentorId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Mentor ${status === "approved" ? "approved" : "rejected"}.` });
      fetchData();
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Booking ${status}.` });
      fetchData();
    }
  };

  const updateCourseStatus = async (courseId: string, status: string) => {
    const { error } = await supabase.from("courses").update({ status }).eq("id", courseId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Course ${status}.` });
      fetchData();
    }
  };

  const addPartnership = async () => {
    setIsAddingPartnership(true);
    const { error } = await supabase.from("partnerships").insert([newPartnership]);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Partnership added successfully." });
      setNewPartnership({ name: "", type: "university", website_url: "", description: "" });
      fetchData();
    }
    setIsAddingPartnership(false);
  };

  const addNewsPost = async () => {
    setIsAddingPost(true);
    const { error } = await supabase.from("news_posts").insert([{
      ...newPost,
      published: true,
      author_id: user?.id,
    }]);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "News post published successfully." });
      setNewPost({ title: "", content: "", image_url: "" });
      fetchData();
    }
    setIsAddingPost(false);
  };

  const togglePostPublished = async (postId: string, published: boolean) => {
    const { error } = await supabase.from("news_posts").update({ published: !published }).eq("id", postId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Post ${!published ? "published" : "unpublished"}.` });
      fetchData();
    }
  };

  const deleteNewsPost = async (postId: string) => {
    const { error } = await supabase.from("news_posts").delete().eq("id", postId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Post deleted." });
      fetchData();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
      published: "default",
      draft: "secondary",
      archived: "outline",
      completed: "default",
      cancelled: "destructive",
      active: "default",
      inactive: "secondary",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  // Analytics calculations
  const totalUsers = profiles.length;
  const totalMentors = mentors.filter((m) => m.status === "approved").length;
  const totalCourses = courses.filter((c) => c.status === "published").length;
  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const pendingMentors = mentors.filter((m) => m.status === "pending").length;
  const pendingDues = payments.filter((p) => p.status === "pending").length;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your platform, roles, payments & progress</p>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalUsers}</p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalMentors}</p>
                <p className="text-xs text-muted-foreground">Mentors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalCourses}</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">৳{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold">{pendingBookings}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{pendingMentors}</p>
                <p className="text-xs text-muted-foreground">Awaiting</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-destructive/30">
            <CardContent className="p-4 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{pendingDues}</p>
                <p className="text-xs text-muted-foreground">Due Payments</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="partnerships">Partners</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          {/* Roles Tab */}
          <TabsContent value="roles">
            <AdminRoleManager
              profiles={profiles}
              userRoles={userRoles}
              onRefresh={fetchData}
            />
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <AdminPaymentsDashboard
              payments={payments}
              profiles={profiles}
              courses={courses}
              mentors={mentors}
            />
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <AdminMentorProgress
              mentors={mentors}
              courses={courses}
              bookings={bookings}
              payments={payments}
            />
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Mentor Applications
                </CardTitle>
                <CardDescription>Review and approve mentor applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Expertise</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mentors.map((mentor) => (
                      <TableRow key={mentor.id}>
                        <TableCell className="font-medium">{mentor.full_name}</TableCell>
                        <TableCell>{mentor.email}</TableCell>
                        <TableCell>{mentor.expertise || "-"}</TableCell>
                        <TableCell>{getStatusBadge(mentor.status)}</TableCell>
                        <TableCell>
                          {mentor.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="default" onClick={() => updateMentorStatus(mentor.id, "approved")}>
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => updateMentorStatus(mentor.id, "rejected")}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {mentors.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No mentors found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Management
                </CardTitle>
                <CardDescription>Manage all courses on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.category || "-"}</TableCell>
                        <TableCell>{course.mentors?.full_name || "-"}</TableCell>
                        <TableCell>৳{Number(course.price).toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(course.status)}</TableCell>
                        <TableCell>
                          <Select value={course.status} onValueChange={(value) => updateCourseStatus(course.id, value)}>
                            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                    {courses.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No courses found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking Management
                </CardTitle>
                <CardDescription>Approve or cancel mentorship bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.mentors?.full_name || "-"}</TableCell>
                        <TableCell className="capitalize">{booking.session_type}</TableCell>
                        <TableCell>{new Date(booking.scheduled_at).toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          {booking.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="default" onClick={() => updateBookingStatus(booking.id, "approved")}>
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {bookings.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No bookings found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partnerships Tab */}
          <TabsContent value="partnerships">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Partnerships
                    </CardTitle>
                    <CardDescription>Manage university and company partnerships</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button><Plus className="h-4 w-4 mr-2" />Add Partnership</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Add New Partnership</DialogTitle></DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="partner-name">Name</Label>
                          <Input id="partner-name" value={newPartnership.name} onChange={(e) => setNewPartnership({ ...newPartnership, name: e.target.value })} placeholder="Partnership name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="partner-type">Type</Label>
                          <Select value={newPartnership.type} onValueChange={(value: "university" | "company" | "organization") => setNewPartnership({ ...newPartnership, type: value })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="university">University</SelectItem>
                              <SelectItem value="company">Company</SelectItem>
                              <SelectItem value="organization">Organization</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="partner-website">Website URL</Label>
                          <Input id="partner-website" value={newPartnership.website_url} onChange={(e) => setNewPartnership({ ...newPartnership, website_url: e.target.value })} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="partner-description">Description</Label>
                          <Textarea id="partner-description" value={newPartnership.description} onChange={(e) => setNewPartnership({ ...newPartnership, description: e.target.value })} placeholder="Brief description..." />
                        </div>
                        <Button className="w-full" onClick={addPartnership} disabled={!newPartnership.name || isAddingPartnership}>
                          {isAddingPartnership ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Add Partnership
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnerships.map((partnership) => (
                      <TableRow key={partnership.id}>
                        <TableCell className="font-medium">{partnership.name}</TableCell>
                        <TableCell className="capitalize">{partnership.type}</TableCell>
                        <TableCell>
                          {partnership.website_url ? (
                            <a href={partnership.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Visit</a>
                          ) : "-"}
                        </TableCell>
                        <TableCell>{getStatusBadge(partnership.status)}</TableCell>
                      </TableRow>
                    ))}
                    {partnerships.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">No partnerships found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Newspaper className="h-5 w-5" />
                      News & Updates
                    </CardTitle>
                    <CardDescription>Manage your social media and platform updates</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button><Plus className="h-4 w-4 mr-2" />Add Post</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Create News Post</DialogTitle></DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="post-title">Title</Label>
                          <Input id="post-title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} placeholder="Post title" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="post-content">Content</Label>
                          <Textarea id="post-content" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} placeholder="Write your post content..." rows={4} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="post-image">Image URL (optional)</Label>
                          <Input id="post-image" value={newPost.image_url} onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })} placeholder="https://..." />
                        </div>
                        <Button className="w-full" onClick={addNewsPost} disabled={!newPost.title || !newPost.content || isAddingPost}>
                          {isAddingPost ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Publish Post
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newsPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium max-w-[150px] truncate">{post.title}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{post.content}</TableCell>
                        <TableCell>
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => togglePostPublished(post.id, post.published)}>
                              {post.published ? "Unpublish" : "Publish"}
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteNewsPost(post.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {newsPosts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No news posts found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
