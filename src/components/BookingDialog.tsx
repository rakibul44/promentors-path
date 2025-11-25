import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  type: "1-on-1" | "group";
  available: boolean;
  spotsLeft?: number;
}

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  slot: TimeSlot | null;
  mentorName: string;
}

const BookingDialog = ({ isOpen, onClose, slot, mentorName }: BookingDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goals: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send data to a backend
    toast({
      title: "Booking Request Submitted!",
      description: `Your ${slot?.type} session with ${mentorName} has been requested. You'll receive a confirmation email shortly.`,
    });

    // Reset form and close dialog
    setFormData({ name: "", email: "", phone: "", goals: "" });
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      month: "long", 
      day: "numeric",
      year: "numeric"
    });
  };

  if (!slot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Mentorship Session</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a session with {mentorName}
          </DialogDescription>
        </DialogHeader>

        {/* Session Details */}
        <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{formatDate(slot.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{slot.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {slot.type === "1-on-1" ? (
              <><User className="w-4 h-4 text-muted-foreground" /><span className="font-medium">1-on-1 Session</span></>
            ) : (
              <><Users className="w-4 h-4 text-muted-foreground" /><span className="font-medium">Group Session</span></>
            )}
          </div>
          {slot.type === "group" && slot.spotsLeft && (
            <p className="text-sm text-muted-foreground">
              {slot.spotsLeft} spots remaining
            </p>
          )}
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <Label htmlFor="goals">Session Goals (Optional)</Label>
            <Textarea
              id="goals"
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              placeholder="What would you like to focus on during this session?"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
