import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Star, Clock, Users, CheckCircle, CreditCard } from "lucide-react";

const Enroll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Sample course data (in production, fetch based on id)
  const course = {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12500,
    duration: "12 weeks",
    level: "Beginner",
    price: "$99",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Enrollment Successful!",
        description: "You've been enrolled in the course. Check your email for details.",
      });
      navigate(`/course/${id}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8">Enroll in Course</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enrollment Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input id="firstName" required placeholder="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input id="lastName" required placeholder="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" required placeholder="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div className="space-y-4 pt-6 border-t">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Payment Information
                        </h3>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input 
                            id="cardNumber" 
                            required 
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input id="expiry" required placeholder="MM/YY" maxLength={5} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input id="cvv" required placeholder="123" maxLength={4} />
                          </div>
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="flex items-start gap-2 pt-4">
                        <Checkbox 
                          id="terms" 
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm cursor-pointer">
                          I agree to the terms and conditions and understand that this purchase is non-refundable
                        </Label>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : `Enroll Now - ${course.price}`}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>

                      <div className="flex items-center gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <h4 className="font-semibold mb-2">This course includes:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Lifetime access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Certificate of completion</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Direct mentor support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Downloadable resources</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-primary">{course.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Enroll;
