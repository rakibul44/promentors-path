import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  CreditCard, 
  Award, 
  Settings, 
  Play, 
  Download, 
  Clock, 
  Video,
  CheckCircle,
  Star,
  ArrowRight,
  Edit,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");

  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      mentor: "Sarah Johnson",
      progress: 65,
      lastWatched: "Module 5: React Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      totalLessons: 48,
      completedLessons: 31
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      mentor: "Michael Chen",
      progress: 30,
      lastWatched: "Module 2: User Research",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
      totalLessons: 36,
      completedLessons: 11
    },
    {
      id: 3,
      title: "Data Science with Python",
      mentor: "Emily Davis",
      progress: 10,
      lastWatched: "Module 1: Introduction",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      totalLessons: 52,
      completedLessons: 5
    }
  ];

  // Mock data for booked mentors
  const bookedMentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Full-Stack Development",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      sessionsCompleted: 3,
      nextSession: "Dec 8, 2025 - 3:00 PM"
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "UI/UX Design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      sessionsCompleted: 1,
      nextSession: "Dec 10, 2025 - 5:00 PM"
    }
  ];

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      type: "1-on-1 Mentorship",
      mentor: "Sarah Johnson",
      date: "Dec 8, 2025",
      time: "3:00 PM - 4:00 PM",
      topic: "React Advanced Patterns"
    },
    {
      id: 2,
      type: "Group Session",
      mentor: "Michael Chen",
      date: "Dec 10, 2025",
      time: "5:00 PM - 6:30 PM",
      topic: "Design Systems Workshop"
    },
    {
      id: 3,
      type: "1-on-1 Mentorship",
      mentor: "Emily Davis",
      date: "Dec 12, 2025",
      time: "2:00 PM - 3:00 PM",
      topic: "Python for Data Analysis"
    }
  ];

  // Mock data for certificates
  const certificates = [
    {
      id: 1,
      course: "JavaScript Fundamentals",
      completedDate: "Nov 15, 2025",
      credentialId: "CERT-JS-2025-001"
    },
    {
      id: 2,
      course: "HTML & CSS Mastery",
      completedDate: "Oct 28, 2025",
      credentialId: "CERT-HTML-2025-002"
    }
  ];

  // Mock subscription data
  const subscription = {
    plan: "Pro",
    status: "Active",
    renewalDate: "Jan 5, 2026",
    price: "$29/month",
    features: [
      "Unlimited course access",
      "5 mentorship sessions/month",
      "Certificate downloads",
      "Priority support"
    ]
  };

  // Mock user profile
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+880 1234567890",
    location: "Dhaka, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {profile.name.split(' ')[0]}!</h1>
              <p className="text-muted-foreground">Continue your learning journey</p>
            </div>
          </div>
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary">
            <Star className="w-4 h-4 mr-1" /> {subscription.plan} Member
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                <p className="text-xs text-muted-foreground">Enrolled Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{certificates.length}</p>
                <p className="text-xs text-muted-foreground">Certificates</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{bookedMentors.length}</p>
                <p className="text-xs text-muted-foreground">Active Mentors</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Calendar className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingSessions.length}</p>
                <p className="text-xs text-muted-foreground">Upcoming Sessions</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 h-auto bg-transparent p-0">
            <TabsTrigger value="courses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 py-3">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">My Courses</span>
            </TabsTrigger>
            <TabsTrigger value="mentors" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 py-3">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">My Mentors</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 py-3">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 py-3">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 py-3">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Certificates</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 py-3">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Continue Learning</h2>
              <Link to="/courses">
                <Button variant="outline" size="sm">
                  Browse More Courses <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 h-32 md:h-auto">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">by {course.mentor}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Play className="w-4 h-4" />
                            <span>Last watched: {course.lastWatched}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                              <span className="font-medium text-primary">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                        <Button className="md:self-center">
                          <Play className="w-4 h-4 mr-2" /> Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Mentors Tab */}
          <TabsContent value="mentors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Mentors</h2>
              <Link to="/mentors">
                <Button variant="outline" size="sm">
                  Find More Mentors <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {bookedMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{mentor.specialty}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Video className="w-4 h-4 text-primary" />
                            {mentor.sessionsCompleted} sessions completed
                          </span>
                        </div>
                        <div className="mt-3 p-3 bg-secondary/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Next Session</p>
                          <p className="text-sm font-medium">{mentor.nextSession}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button variant="outline" className="flex-1">View Profile</Button>
                      <Button className="flex-1">Book Session</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-2">{session.type}</Badge>
                          <h3 className="font-semibold">{session.topic}</h3>
                          <p className="text-sm text-muted-foreground">with {session.mentor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">{session.date}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {session.time}
                          </p>
                        </div>
                        <Button>Join Session</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <h2 className="text-xl font-semibold">Subscription Plan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{subscription.plan} Plan</CardTitle>
                      <CardDescription>Your current subscription</CardDescription>
                    </div>
                    <Badge className="bg-green-500">{subscription.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">{subscription.price}</div>
                  <div className="space-y-2">
                    {subscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Next renewal: <span className="font-medium text-foreground">{subscription.renewalDate}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upgrade Your Plan</CardTitle>
                  <CardDescription>Get more features with Premium</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">$49/month</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Everything in Pro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Unlimited mentorship sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">1-on-1 career coaching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Exclusive webinars</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Upgrade to Premium</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <h2 className="text-xl font-semibold">Your Certificates</h2>
            {certificates.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                          <Award className="w-8 h-8 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{cert.course}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Completed on {cert.completedDate}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Credential ID: {cert.credentialId}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <Button variant="outline" className="flex-1">
                          View Certificate
                        </Button>
                        <Button className="flex-1">
                          <Download className="w-4 h-4 mr-2" /> Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Complete a course to earn your first certificate!
                </p>
                <Link to="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Password & Security</CardTitle>
                    <CardDescription>Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button variant="outline">Update Password</Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="w-full">
                      <Edit className="w-4 h-4 mr-2" /> Change Photo
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Contact Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{profile.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
