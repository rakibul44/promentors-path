import { UserPlus, BookOpen, GraduationCap, Award } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds and tell us about your learning goals and interests",
  },
  {
    icon: BookOpen,
    title: "Choose Your Course",
    description: "Browse our library of expert-led courses and select the perfect fit for you",
  },
  {
    icon: GraduationCap,
    title: "Learn with Mentors",
    description: "Get personalized guidance from industry professionals throughout your journey",
  },
  {
    icon: Award,
    title: "Achieve Your Goals",
    description: "Complete courses, earn certificates, and advance your career with confidence",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary/50" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your learning journey in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                <step.icon className="w-8 h-8" />
              </div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary/10 -z-10"></div>
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary/20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
