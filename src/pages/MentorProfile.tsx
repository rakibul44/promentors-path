import { useParams } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MentorSchedule from "@/components/MentorSchedule";
import CourseCard from "@/components/CourseCard";
import { Link } from "react-router-dom";

// Mock data - in a real app, this would come from an API
const mentorData = {
  "dr-james-wilson": {
    name: "Dr. James Wilson",
    title: "Senior Software Architect",
    expertise: ["JavaScript", "React", "System Design", "Node.js", "Cloud Architecture"],
    rating: 4.9,
    students: 5420,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    bio: "With over 15 years of experience in software development, I've led teams at major tech companies and helped thousands of students transition into successful tech careers. My passion is teaching practical, real-world skills that make you job-ready.",
    location: "San Francisco, USA",
    experience: "15+ years",
    sessions: 1200,
    responseTime: "Within 2 hours",
    courses: [
      {
        title: "Complete Web Development Bootcamp",
        instructor: "Dr. James Wilson",
        rating: 4.9,
        students: 12500,
        duration: "40 hours",
        level: "Beginner",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
      },
      {
        title: "Advanced React Patterns",
        instructor: "Dr. James Wilson",
        rating: 4.8,
        students: 3200,
        duration: "25 hours",
        level: "Advanced",
        price: "$69.99",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
      }
    ]
  },
  "sarah-martinez": {
    name: "Sarah Martinez",
    title: "AI/ML Research Scientist",
    expertise: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "Data Science"],
    rating: 4.8,
    students: 3890,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah2",
    bio: "AI researcher and educator passionate about making machine learning accessible. I've published research papers and worked on cutting-edge AI projects at leading tech companies.",
    location: "Boston, USA",
    experience: "10+ years",
    sessions: 850,
    responseTime: "Within 3 hours",
    courses: [
      {
        title: "Machine Learning & AI Fundamentals",
        instructor: "Sarah Martinez",
        rating: 4.8,
        students: 8900,
        duration: "35 hours",
        level: "Intermediate",
        price: "$59.99",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
      }
    ]
  },
  "david-kim": {
    name: "David Kim",
    title: "Lead UX Designer",
    expertise: ["UI/UX", "Figma", "User Research", "Design Systems", "Prototyping"],
    rating: 5.0,
    students: 4120,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "Award-winning designer with a track record of creating user-centered products. I believe great design is about solving problems, not just making things look pretty.",
    location: "London, UK",
    experience: "12+ years",
    sessions: 980,
    responseTime: "Within 1 hour",
    courses: [
      {
        title: "UX/UI Design Masterclass",
        instructor: "David Kim",
        rating: 5.0,
        students: 6700,
        duration: "28 hours",
        level: "All Levels",
        price: "$44.99",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
      }
    ]
  }
};

const MentorProfile = () => {
  const { id } = useParams();
  const mentor = id ? mentorData[id as keyof typeof mentorData] : null;

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Mentor Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Mentor Header */}
        <div className="bg-card rounded-lg p-8 mb-8 shadow-lg border">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{mentor.title}</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-semibold">{mentor.rating}</span>
                  <span className="text-muted-foreground ml-1">
                    ({mentor.students.toLocaleString()} students)
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {mentor.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {mentor.experience}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {mentor.sessions} sessions completed
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground mb-4">{mentor.bio}</p>
              
              <div className="text-sm text-muted-foreground">
                ⚡ Typically responds {mentor.responseTime}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="schedule">Schedule & Booking</TabsTrigger>
            <TabsTrigger value="courses">Courses ({mentor.courses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <MentorSchedule mentorName={mentor.name} />
          </TabsContent>

          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentor.courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default MentorProfile;
