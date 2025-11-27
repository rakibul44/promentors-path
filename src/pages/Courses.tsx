import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedMentor, setSelectedMentor] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  // Sample course data
  const allCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 12500,
      duration: "12 weeks",
      level: "Beginner",
      price: "$99",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Dr. Michael Chen",
      rating: 4.9,
      students: 8900,
      duration: "10 weeks",
      level: "Intermediate",
      price: "$129",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      category: "Data Science"
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emily Rodriguez",
      rating: 4.7,
      students: 15200,
      duration: "8 weeks",
      level: "Beginner",
      price: "$89",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      category: "Design"
    },
    {
      id: 4,
      title: "Machine Learning A-Z",
      instructor: "Dr. Michael Chen",
      rating: 4.9,
      students: 10500,
      duration: "16 weeks",
      level: "Advanced",
      price: "$149",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      category: "Data Science"
    },
    {
      id: 5,
      title: "Mobile App Development with React Native",
      instructor: "Sarah Johnson",
      rating: 4.6,
      students: 7800,
      duration: "10 weeks",
      level: "Intermediate",
      price: "$119",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      category: "Mobile Development"
    },
    {
      id: 6,
      title: "Digital Marketing Strategy",
      instructor: "David Park",
      rating: 4.8,
      students: 9200,
      duration: "6 weeks",
      level: "Beginner",
      price: "$79",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      category: "Marketing"
    }
  ];

  // Filter courses
  const filteredCourses = allCourses.filter((course) => {
    // Category filter
    if (selectedCategory !== "all") {
      const categoryMap: { [key: string]: string } = {
        web: "Web Development",
        data: "Data Science",
        design: "Design",
        mobile: "Mobile Development",
        marketing: "Marketing"
      };
      if (course.category !== categoryMap[selectedCategory]) return false;
    }

    // Level filter
    if (selectedLevel !== "all" && course.level.toLowerCase() !== selectedLevel) return false;

    // Mentor filter
    if (selectedMentor !== "all") {
      const mentorMap: { [key: string]: string } = {
        sarah: "Sarah Johnson",
        michael: "Dr. Michael Chen",
        emily: "Emily Rodriguez",
        david: "David Park"
      };
      if (course.instructor !== mentorMap[selectedMentor]) return false;
    }

    // Duration filter
    if (selectedDuration !== "all") {
      const weeks = parseInt(course.duration);
      if (selectedDuration === "short" && weeks > 6) return false;
      if (selectedDuration === "medium" && (weeks < 7 || weeks > 12)) return false;
      if (selectedDuration === "long" && weeks < 13) return false;
    }

    return true;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.students - a.students;
    } else if (sortBy === "newest") {
      return b.id - a.id;
    } else if (sortBy === "trending") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Explore Our Courses
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Learn from industry experts and transform your career with our comprehensive courses
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Sort Section */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Filters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full lg:w-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Skill Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedMentor} onValueChange={setSelectedMentor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Mentors</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Dr. Michael Chen</SelectItem>
                    <SelectItem value="emily">Emily Rodriguez</SelectItem>
                    <SelectItem value="david">David Park</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Duration</SelectItem>
                    <SelectItem value="short">1-6 weeks</SelectItem>
                    <SelectItem value="medium">7-12 weeks</SelectItem>
                    <SelectItem value="long">13+ weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {sortedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No courses found matching your filters. Try adjusting your selection.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Get Full Access — Subscribe Now
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Unlock unlimited access to all courses, mentorship sessions, and exclusive content
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                Subscribe Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;