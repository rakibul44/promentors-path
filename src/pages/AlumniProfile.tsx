import { useParams, Link } from "react-router-dom";
import { MapPin, Briefcase, GraduationCap, Calendar, Mail, Linkedin, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock alumni data (should match Alumni.tsx data)
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
    bio: "Passionate software engineer with expertise in cloud computing and distributed systems. I love mentoring students and helping them navigate their tech careers.",
    email: "sarah.ahmed@example.com",
    linkedin: "linkedin.com/in/sarahahmed",
    skills: ["Python", "Go", "Kubernetes", "Cloud Architecture", "System Design"],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Google",
        period: "2022 - Present",
        description: "Leading cloud infrastructure projects for Google Cloud Platform"
      },
      {
        title: "Software Engineer",
        company: "Microsoft",
        period: "2020 - 2022",
        description: "Developed microservices for Azure platform"
      }
    ],
    achievements: [
      "Published 5 research papers on distributed systems",
      "Spoke at Google I/O 2023",
      "Mentored 20+ students into FAANG companies"
    ]
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
    bio: "Data scientist specializing in machine learning and AI. Helping organizations leverage data for better decision making.",
    email: "rakib.hassan@example.com",
    linkedin: "linkedin.com/in/rakibhassan",
    skills: ["Machine Learning", "Python", "TensorFlow", "Data Analysis", "AI"],
    experience: [
      {
        title: "Senior Data Scientist",
        company: "Microsoft",
        period: "2021 - Present",
        description: "Leading ML initiatives for Microsoft Azure AI"
      },
      {
        title: "Data Scientist",
        company: "Amazon",
        period: "2019 - 2021",
        description: "Built recommendation systems for e-commerce"
      }
    ],
    achievements: [
      "Developed ML models serving 10M+ users",
      "Won Microsoft Hackathon 2022",
      "Published book on practical machine learning"
    ]
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
    bio: "Product manager passionate about building customer-centric products. I bridge the gap between business and technology.",
    email: "nadia.islam@example.com",
    linkedin: "linkedin.com/in/nadiaislam",
    skills: ["Product Strategy", "Agile", "User Research", "Data Analytics", "Roadmapping"],
    experience: [
      {
        title: "Senior Product Manager",
        company: "Amazon",
        period: "2023 - Present",
        description: "Managing AWS product portfolio"
      },
      {
        title: "Product Manager",
        company: "Shopify",
        period: "2021 - 2023",
        description: "Led merchant dashboard redesign project"
      }
    ],
    achievements: [
      "Launched 3 successful products with 1M+ users",
      "Increased customer satisfaction by 40%",
      "Named Rising Star PM by Product School"
    ]
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
    bio: "Financial analyst with expertise in investment banking and portfolio management. Helping clients achieve their financial goals.",
    email: "tanvir.rahman@example.com",
    linkedin: "linkedin.com/in/tanvirrahman",
    skills: ["Financial Modeling", "Investment Analysis", "Risk Management", "Excel", "Bloomberg Terminal"],
    experience: [
      {
        title: "Senior Financial Analyst",
        company: "Goldman Sachs",
        period: "2020 - Present",
        description: "Managing investment portfolios for institutional clients"
      },
      {
        title: "Financial Analyst",
        company: "JP Morgan",
        period: "2018 - 2020",
        description: "Conducted market research and financial modeling"
      }
    ],
    achievements: [
      "Managed $500M+ investment portfolio",
      "CFA Level III candidate",
      "Published in Financial Times"
    ]
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
    bio: "ML engineer working on cutting-edge AI systems. Passionate about making AI more accessible and ethical.",
    email: "farzana.khan@example.com",
    linkedin: "linkedin.com/in/farzanakhan",
    skills: ["Deep Learning", "PyTorch", "Computer Vision", "NLP", "MLOps"],
    experience: [
      {
        title: "ML Engineer",
        company: "Meta",
        period: "2022 - Present",
        description: "Building AI models for Instagram recommendation systems"
      },
      {
        title: "ML Research Engineer",
        company: "OpenAI",
        period: "2020 - 2022",
        description: "Researched large language models"
      }
    ],
    achievements: [
      "Published 8 ML research papers",
      "Contributed to PyTorch core library",
      "Speaker at NeurIPS 2023"
    ]
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
    bio: "Marketing professional with a focus on brand strategy and digital marketing. Helping brands connect with their audiences.",
    email: "imran.hossain@example.com",
    linkedin: "linkedin.com/in/imranhossain",
    skills: ["Digital Marketing", "Brand Strategy", "SEO", "Content Marketing", "Analytics"],
    experience: [
      {
        title: "Marketing Manager",
        company: "Unilever",
        period: "2023 - Present",
        description: "Leading digital marketing campaigns across South Asia"
      },
      {
        title: "Marketing Executive",
        company: "Coca-Cola",
        period: "2022 - 2023",
        description: "Managed social media marketing initiatives"
      }
    ],
    achievements: [
      "Grew brand engagement by 200%",
      "Won Best Digital Campaign Award 2023",
      "Managed $2M+ marketing budget"
    ]
  },
];

const AlumniProfile = () => {
  const { id } = useParams();
  const alumni = alumniData.find((a) => a.id === Number(id));

  if (!alumni) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Alumni Not Found</h1>
            <Link to="/alumni">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Alumni
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link to="/alumni">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Alumni
          </Button>
        </Link>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <Avatar className="h-32 w-32">
                <AvatarImage src={alumni.image} alt={alumni.name} />
                <AvatarFallback className="text-3xl">{getInitials(alumni.name)}</AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-2">{alumni.name}</h1>
                
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Briefcase className="h-5 w-5" />
                  <span className="text-xl font-medium">{alumni.profession}</span>
                </div>

                <Badge variant="secondary" className="mb-4 text-base px-4 py-1">
                  {alumni.company}
                </Badge>

                <p className="text-muted-foreground mb-6 max-w-2xl">{alumni.bio}</p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4">
                  <a href={`mailto:${alumni.email}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Mail className="h-4 w-4" />
                    {alumni.email}
                  </a>
                  <a href={`https://${alumni.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-foreground">{alumni.university}</p>
                  <p className="text-sm text-muted-foreground">{alumni.department}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-foreground">Class of {alumni.passingYear}</p>
                  <p className="text-sm text-muted-foreground">Graduation Year</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-foreground">{alumni.city}, {alumni.country}</p>
                  <p className="text-sm text-muted-foreground">Current Location</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {alumni.experience.map((exp, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                    {index < alumni.experience.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {alumni.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {alumni.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Connect Card */}
            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Interested in connecting? Reach out via email or LinkedIn!
                </p>
                <Button className="w-full" asChild>
                  <a href={`mailto:${alumni.email}`}>Send Email</a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`https://${alumni.linkedin}`} target="_blank" rel="noopener noreferrer">
                    View LinkedIn
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AlumniProfile;