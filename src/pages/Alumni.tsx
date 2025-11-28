import { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AlumniCard from "@/components/AlumniCard";

// Mock alumni data
const alumniData = [
  {
    id: 1,
    name: "Sarah Ahmed",
    university: "University of Dhaka",
    department: "Computer Science",
    passingYear: 2020,
    profession: "Software Engineer",
    company: "Google",
    country: "USA",
    city: "Mountain View",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Rakib Hassan",
    university: "BUET",
    department: "Electrical Engineering",
    passingYear: 2019,
    profession: "Data Scientist",
    company: "Microsoft",
    country: "UK",
    city: "London",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Nadia Islam",
    university: "North South University",
    department: "Business Administration",
    passingYear: 2021,
    profession: "Product Manager",
    company: "Amazon",
    country: "Canada",
    city: "Toronto",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Tanvir Rahman",
    university: "University of Dhaka",
    department: "Economics",
    passingYear: 2018,
    profession: "Financial Analyst",
    company: "Goldman Sachs",
    country: "Singapore",
    city: "Singapore",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Farzana Khan",
    university: "BUET",
    department: "Computer Science",
    passingYear: 2020,
    profession: "Machine Learning Engineer",
    company: "Meta",
    country: "USA",
    city: "San Francisco",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Imran Hossain",
    university: "North South University",
    department: "Marketing",
    passingYear: 2022,
    profession: "Marketing Manager",
    company: "Unilever",
    country: "Bangladesh",
    city: "Dhaka",
    image: "/placeholder.svg",
  },
];

const Alumni = () => {
  const [searchName, setSearchName] = useState("");
  const [filterUniversity, setFilterUniversity] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [filterProfession, setFilterProfession] = useState("all");
  const [filterCountry, setFilterCountry] = useState("all");

  // Extract unique values for dropdowns
  const universities = ["all", ...new Set(alumniData.map((a) => a.university))];
  const departments = ["all", ...new Set(alumniData.map((a) => a.department))];
  const years = ["all", ...new Set(alumniData.map((a) => a.passingYear.toString()))];
  const professions = ["all", ...new Set(alumniData.map((a) => a.profession))];
  const countries = ["all", ...new Set(alumniData.map((a) => a.country))];

  // Filter alumni based on all criteria
  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesName = alumni.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesUniversity = filterUniversity === "all" || alumni.university === filterUniversity;
    const matchesDepartment = filterDepartment === "all" || alumni.department === filterDepartment;
    const matchesYear = filterYear === "all" || alumni.passingYear.toString() === filterYear;
    const matchesProfession = filterProfession === "all" || alumni.profession === filterProfession;
    const matchesCountry = filterCountry === "all" || alumni.country === filterCountry;

    return matchesName && matchesUniversity && matchesDepartment && matchesYear && matchesProfession && matchesCountry;
  });

  const handleClearFilters = () => {
    setSearchName("");
    setFilterUniversity("all");
    setFilterDepartment("all");
    setFilterYear("all");
    setFilterProfession("all");
    setFilterCountry("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Alumni Network
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with our successful alumni working at top companies worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          {/* Name Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* University Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                University
              </label>
              <Select value={filterUniversity} onValueChange={setFilterUniversity}>
                <SelectTrigger>
                  <SelectValue placeholder="All Universities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  {universities.slice(1).map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Department
              </label>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.slice(1).map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Passing Year
              </label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.slice(1).map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Profession Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Profession
              </label>
              <Select value={filterProfession} onValueChange={setFilterProfession}>
                <SelectTrigger>
                  <SelectValue placeholder="All Professions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Professions</SelectItem>
                  {professions.slice(1).map((prof) => (
                    <SelectItem key={prof} value={prof}>
                      {prof}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Country
              </label>
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.slice(1).map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleClearFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredAlumni.length}</span> alumni
          </p>
        </div>

        {/* Alumni Grid */}
        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No alumni found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Alumni;
