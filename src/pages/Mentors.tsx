import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MentorCard from "@/components/MentorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mentorsData = [
  {
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist at Google",
    expertise: ["Machine Learning", "Python", "AI"],
    rating: 4.9,
    students: 2340,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
  },
  {
    name: "Prof. Michael Chen",
    title: "Full Stack Developer & Tech Lead",
    expertise: ["React", "Node.js", "AWS"],
    rating: 4.8,
    students: 1890,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "UX Design Director at Apple",
    expertise: ["UI/UX Design", "Figma", "Design Systems"],
    rating: 4.9,
    students: 3120,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
  },
  {
    name: "Dr. James Wilson",
    title: "Blockchain Architect",
    expertise: ["Blockchain", "Smart Contracts", "Web3"],
    rating: 4.7,
    students: 1560,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    name: "Prof. Lisa Anderson",
    title: "Cybersecurity Expert",
    expertise: ["Security", "Penetration Testing", "Cloud Security"],
    rating: 4.8,
    students: 2100,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
  {
    name: "Dr. David Kumar",
    title: "Mobile Development Lead",
    expertise: ["React Native", "iOS", "Android"],
    rating: 4.9,
    students: 2750,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
];

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("all");

  // Get all unique expertise areas
  const allExpertise = useMemo(() => {
    const expertise = new Set<string>();
    mentorsData.forEach((mentor) => {
      mentor.expertise.forEach((skill) => expertise.add(skill));
    });
    return Array.from(expertise).sort();
  }, []);

  // Filter mentors based on search and expertise
  const filteredMentors = useMemo(() => {
    return mentorsData.filter((mentor) => {
      const matchesSearch =
        searchQuery === "" ||
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesExpertise =
        selectedExpertise === "all" ||
        mentor.expertise.includes(selectedExpertise);

      return matchesSearch && matchesExpertise;
    });
  }, [searchQuery, selectedExpertise]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Find Your Perfect Mentor
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with industry experts and experienced professionals who can guide you
                on your learning journey
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-card rounded-lg shadow-lg p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by name or course..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Expertise Filter */}
                <div className="w-full md:w-64">
                  <Select
                    value={selectedExpertise}
                    onValueChange={setSelectedExpertise}
                  >
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Expertise</SelectItem>
                      {allExpertise.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters Button */}
                {(searchQuery || selectedExpertise !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedExpertise("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Active Filters Display */}
              {(searchQuery || selectedExpertise !== "all") && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="secondary">
                      Search: {searchQuery}
                    </Badge>
                  )}
                  {selectedExpertise !== "all" && (
                    <Badge variant="secondary">
                      Expertise: {selectedExpertise}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mentors Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            {filteredMentors.length > 0 ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Showing {filteredMentors.length} of {mentorsData.length} mentors
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMentors.map((mentor, index) => (
                    <MentorCard key={index} {...mentor} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-2">No mentors found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedExpertise("all");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Mentors;
