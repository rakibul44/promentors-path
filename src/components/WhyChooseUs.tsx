import { Award, Users, BookOpen, TrendingUp, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Learn from industry professionals with years of real-world experience",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Courses",
    description: "Access a wide range of courses designed for practical skill development",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "95% of our students report career advancement within 6 months",
  },
  {
    icon: Award,
    title: "Certified Programs",
    description: "Earn recognized certificates that boost your professional credibility",
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Your data is protected with enterprise-grade security measures",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to course materials",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose ProMentorsYou</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who trust us for their learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-lg bg-card hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Payment Protected</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Privacy Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
