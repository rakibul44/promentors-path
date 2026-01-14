import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MentorCard from "@/components/MentorCard";
import CourseCard from "@/components/CourseCard";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import CallToAction from "@/components/CallToAction";
import NewsFeed from "@/components/NewsFeed";
import Footer from "@/components/Footer";

const featuredMentors = [
  {
    name: "Khondoker Nabi",
    title: "Teaching Fellow at Harvard University",
    expertise: ["Data Science", "Public Health", "Medical School"],
    rating: 5.0,
    students: 5420,
    image: "https://res.cloudinary.com/dgf17pou8/image/upload/v1768422147/IMG_5732_-_Khondoker_Nazmoon_Nabi_lmax7g.jpg",
  },
  {
    name: "Chowdhury Rafeed Rahman",
    title: "Scientist at Genome Institute of Singapore, A*STAR",
    expertise: ["Bioinformatics", "Machine Learning", "Data Science"],
    rating: 5.0,
    students: 5420,
    image: "https://res.cloudinary.com/dgf17pou8/image/upload/v1768426765/pic_2_p7b4p6.jpg",
  },
];

const featuredCourses = [
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
    title: "Machine Learning & AI Fundamentals",
    instructor: "Sarah Martinez",
    rating: 4.8,
    students: 8900,
    duration: "35 hours",
    level: "Intermediate",
    price: "$59.99",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
  },
  {
    title: "UX/UI Design Masterclass",
    instructor: "David Kim",
    rating: 5.0,
    students: 6700,
    duration: "28 hours",
    level: "All Levels",
    price: "$44.99",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Featured Mentors Section */}
      <section className="py-20" id="mentors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Mentors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn from industry experts with real-world experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMentors.map((mentor, index) => (
              <MentorCard key={index} {...mentor} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-secondary/50" id="courses">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular courses designed for your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <NewsFeed />
      <Testimonials />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
