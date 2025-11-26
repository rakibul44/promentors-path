import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Star, Clock, Users, PlayCircle, Lock, CheckCircle } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(0);

  // Sample course data (in production, fetch based on id)
  const course = {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    instructorTitle: "Senior Full-Stack Developer at Google",
    instructorBio: "Sarah has over 10 years of experience in web development and has taught over 50,000 students worldwide.",
    rating: 4.8,
    students: 12500,
    duration: "12 weeks",
    level: "Beginner",
    price: "$99",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    category: "Web Development",
    description: "Master web development from scratch with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB through hands-on projects and real-world applications.",
    whatYouLearn: [
      "Build responsive websites with HTML5 and CSS3",
      "Master modern JavaScript ES6+ features",
      "Create dynamic web apps with React.js",
      "Develop backend APIs with Node.js and Express",
      "Work with MongoDB and database design",
      "Deploy full-stack applications to production"
    ],
    lessons: [
      { id: 1, title: "Introduction to Web Development", duration: "15:30", free: true, completed: false },
      { id: 2, title: "Setting Up Your Development Environment", duration: "22:45", free: true, completed: false },
      { id: 3, title: "HTML Fundamentals", duration: "45:20", free: false, completed: false },
      { id: 4, title: "CSS Styling Basics", duration: "38:15", free: false, completed: false },
      { id: 5, title: "Responsive Design with Flexbox", duration: "52:30", free: false, completed: false },
      { id: 6, title: "CSS Grid Layout", duration: "41:10", free: false, completed: false },
      { id: 7, title: "JavaScript Variables and Data Types", duration: "35:40", free: false, completed: false },
      { id: 8, title: "Functions and Scope", duration: "48:25", free: false, completed: false },
      { id: 9, title: "DOM Manipulation", duration: "55:15", free: false, completed: false },
      { id: 10, title: "ES6+ Features", duration: "62:30", free: false, completed: false }
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  };

  const relatedCourses = [
    {
      id: 2,
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 8500,
      duration: "8 weeks",
      level: "Advanced",
      price: "$129",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      instructor: "Michael Chen",
      rating: 4.7,
      students: 9200,
      duration: "10 weeks",
      level: "Intermediate",
      price: "$99",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Full-Stack JavaScript",
      instructor: "Emily Rodriguez",
      rating: 4.8,
      students: 11000,
      duration: "14 weeks",
      level: "Intermediate",
      price: "$149",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop"
    }
  ];

  const currentLesson = course.lessons[selectedLesson];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Course Banner */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in">
                <Badge variant="secondary" className="mb-4">{course.level}</Badge>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-6 mb-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                      alt={course.instructor}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">{course.instructorTitle}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm mb-6 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-muted-foreground">({course.students.toLocaleString()} students)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">{course.price}</div>
                  <Button size="lg" className="gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Enroll Now
                  </Button>
                </div>
              </div>

              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="w-20 h-20 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Video & Description */}
              <div className="lg:col-span-2 space-y-8">
                {/* Video Player */}
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-black relative">
                      {currentLesson.free ? (
                        <iframe
                          src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                          title={currentLesson.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                          <Lock className="w-16 h-16 text-muted-foreground" />
                          <p className="text-muted-foreground">Subscribe to unlock this lesson</p>
                          <Button className="gap-2">
                            <PlayCircle className="w-5 h-5" />
                            Subscribe Now
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{currentLesson.title}</h3>
                        {currentLesson.free ? (
                          <Badge variant="secondary" className="gap-1">
                            <PlayCircle className="w-3 h-3" />
                            Free Preview
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <Lock className="w-3 h-3" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Duration: {currentLesson.duration}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs for Description and What You'll Learn */}
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="learn">What You'll Learn</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="space-y-4 mt-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">About This Course</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {course.description}
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-4">
                        This comprehensive course takes you from beginner to professional web developer. 
                        You'll learn by building real projects and get hands-on experience with modern 
                        web technologies used by top companies worldwide.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="learn" className="space-y-4 mt-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                      <ul className="space-y-3">
                        {course.whatYouLearn.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="instructor" className="space-y-4 mt-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                        alt={course.instructor}
                        className="w-20 h-20 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{course.instructor}</h3>
                        <p className="text-muted-foreground mb-3">{course.instructorTitle}</p>
                        <p className="text-muted-foreground leading-relaxed">{course.instructorBio}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Column - Lessons List */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {course.lessons.length} lessons • {course.duration}
                    </p>
                    
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                      {course.lessons.map((lesson, index) => (
                        <button
                          key={lesson.id}
                          onClick={() => lesson.free && setSelectedLesson(index)}
                          className={`w-full text-left p-3 rounded-lg transition-all hover:bg-muted/50 ${
                            selectedLesson === index ? 'bg-muted' : ''
                          } ${!lesson.free ? 'opacity-60' : ''}`}
                          disabled={!lesson.free}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="mt-1">
                                {lesson.completed ? (
                                  <CheckCircle className="w-4 h-4 text-success" />
                                ) : lesson.free ? (
                                  <PlayCircle className="w-4 h-4 text-primary" />
                                ) : (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm line-clamp-2">{lesson.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{lesson.duration}</p>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <Button className="w-full gap-2" size="lg">
                        <PlayCircle className="w-5 h-5" />
                        Subscribe to Watch All
                      </Button>
                      <p className="text-xs text-center text-muted-foreground mt-3">
                        Get unlimited access to all lessons
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Courses */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} {...relatedCourse} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetails;