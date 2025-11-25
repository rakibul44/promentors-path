import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, User } from "lucide-react";
import BookingDialog from "./BookingDialog";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  type: "1-on-1" | "group";
  available: boolean;
  spotsLeft?: number;
}

interface MentorScheduleProps {
  mentorName: string;
}

const MentorSchedule = ({ mentorName }: MentorScheduleProps) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Mock schedule data
  const schedule: TimeSlot[] = [
    { id: "1", date: "2025-12-01", time: "10:00 AM - 11:00 AM", type: "1-on-1", available: true },
    { id: "2", date: "2025-12-01", time: "2:00 PM - 3:00 PM", type: "group", available: true, spotsLeft: 3 },
    { id: "3", date: "2025-12-02", time: "9:00 AM - 10:00 AM", type: "1-on-1", available: true },
    { id: "4", date: "2025-12-02", time: "11:00 AM - 12:00 PM", type: "1-on-1", available: false },
    { id: "5", date: "2025-12-03", time: "3:00 PM - 4:00 PM", type: "group", available: true, spotsLeft: 5 },
    { id: "6", date: "2025-12-03", time: "5:00 PM - 6:00 PM", type: "1-on-1", available: true },
    { id: "7", date: "2025-12-04", time: "10:00 AM - 11:00 AM", type: "group", available: true, spotsLeft: 2 },
    { id: "8", date: "2025-12-04", time: "1:00 PM - 2:00 PM", type: "1-on-1", available: true },
  ];

  const handleBooking = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setIsBookingOpen(true);
  };

  const groupedSchedule = schedule.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Available Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedSchedule).map(([date, slots]) => (
                <div key={date}>
                  <h3 className="font-semibold text-lg mb-3">{formatDate(date)}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {slots.map((slot) => (
                      <Card 
                        key={slot.id} 
                        className={`${
                          slot.available 
                            ? "hover:border-primary transition-colors cursor-pointer" 
                            : "opacity-60"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{slot.time}</span>
                            </div>
                            <Badge 
                              variant={slot.type === "1-on-1" ? "default" : "secondary"}
                            >
                              {slot.type === "1-on-1" ? (
                                <><User className="w-3 h-3 mr-1" />1-on-1</>
                              ) : (
                                <><Users className="w-3 h-3 mr-1" />Group</>
                              )}
                            </Badge>
                          </div>
                          
                          {slot.type === "group" && slot.spotsLeft && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {slot.spotsLeft} spots left
                            </p>
                          )}
                          
                          <Button 
                            className="w-full" 
                            disabled={!slot.available}
                            onClick={() => handleBooking(slot)}
                          >
                            {slot.available ? "Book Session" : "Fully Booked"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Session Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                1-on-1 Mentorship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get personalized guidance tailored to your specific goals and challenges. 
                Perfect for deep-dive discussions and career advice.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">60 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">$75/session</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Group Mentorship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn alongside peers in small groups. Great for networking and 
                collaborative problem-solving sessions.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">90 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">$45/session</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Group Size:</span>
                  <span className="font-medium">Max 5 students</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BookingDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        slot={selectedSlot}
        mentorName={mentorName}
      />
    </>
  );
};

export default MentorSchedule;
