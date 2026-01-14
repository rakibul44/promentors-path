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

// Mentor data
const mentorData = {
  "khondoker-nabi": {
    id: 1,
    name: "Khondoker Nabi",
    title: "Teaching Fellow at Harvard University",
    expertise: ["Data Science", "Public Health", "Medical School"],
    rating: 5.0,
    students: 5420,
    image: "https://res.cloudinary.com/dgf17pou8/image/upload/v1768422147/IMG_5732_-_Khondoker_Nazmoon_Nabi_lmax7g.jpg",
    bio: "I'm a PhD candidate in Biostatistics at Harvard T.H. Chan School of Public Health and a data scientist at Dana-Farber Cancer Institute, where I contribute to advancing clinical and methodological research. I'm also serving as a Head Teaching Fellow at Harvard. I am also acting as a Vice President of the Harvard Bangladeshi Students' Association, blending scholarship, mentorship, and community leadership.",
    location: "Boston, USA",
    experience: "7 years",
    mentorships: ["Public health, data science, biosciences, biostatistics, mathematics and medical research"],
    responseTime: "Within 2 hours",
    courses: [
      {
        title: "Foundations in R & Data Science",
        instructor: "Khondoker Nabi",
        rating: 5.0,
        students: 500,
        duration: "40 hours",
        level: "Beginner to Intermediate",
        price: "$49.99",
        image: "https://res.cloudinary.com/dgf17pou8/image/upload/v1768422147/IMG_5732_-_Khondoker_Nazmoon_Nabi_lmax7g.jpg",
      },
      {
        title: "Modeling and ML - Advanced",
        instructor: "Khondoker Nabi",
        rating: 5.0,
        students: 300,
        duration: "25 hours",
        level: "Advanced",
        price: "$69.99",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      }
    ]
  },
  "chowdhury-rafeed-rahman": {
    id: 2,
    name: "Chowdhury Rafeed Rahman",
    title: "Scientist at Genome Institute of Singapore, A*STAR",
    expertise: ["Bioinformatics", "Machine Learning", "Research Methodology", "Data Science", "Fitness and muscle building", "Swimming"],
    rating: 5.0,
    students: 5420,
    image: "https://res.cloudinary.com/dgf17pou8/image/upload/v1768426765/pic_2_p7b4p6.jpg",
    bio: "I believe blaming yourself from your own problems rather than blaming the world. It is called self-accountability. The only thing you have full control over is how you choose to spend your 24 hours. You may not be able to control the world, but you can certainly control who you choose to become.",
    location: "Singapore",
    experience: "7 years",
    mentorships: ["Public health, data science, biosciences, biostatistics, mathematics and medical research"],
    responseTime: "Within 2 hours",
    courses: [
      {
        title: "Foundations in R & Data Science",
        instructor: "Chowdhury Rafeed Rahman",
        rating: 5.0,
        students: 400,
        duration: "40 hours",
        level: "Beginner to Intermediate",
        price: "$49.99",
        image: "https://res.cloudinary.com/dgf17pou8/image/upload/v1768426765/pic_2_p7b4p6.jpg",
      },
      {
        title: "Bioinformatics",
        instructor: "Chowdhury Rafeed Rahman",
        rating: 5.0,
        students: 250,
        duration: "25 hours",
        level: "Advanced",
        price: "$69.99",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
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
                  {mentor.students.toLocaleString()} students mentored
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
