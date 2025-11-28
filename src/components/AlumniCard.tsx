import { MapPin, Briefcase, GraduationCap, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AlumniCardProps {
  alumni: {
    id: number;
    name: string;
    university: string;
    department: string;
    passingYear: number;
    profession: string;
    company: string;
    country: string;
    city: string;
    image: string;
  };
}

const AlumniCard = ({ alumni }: AlumniCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={alumni.image} alt={alumni.name} />
            <AvatarFallback className="text-xl">{getInitials(alumni.name)}</AvatarFallback>
          </Avatar>

          {/* Name */}
          <h3 className="text-xl font-bold text-foreground mb-2">{alumni.name}</h3>

          {/* Current Position */}
          <div className="flex items-center gap-2 text-primary mb-4">
            <Briefcase className="h-4 w-4" />
            <span className="font-medium">{alumni.profession}</span>
          </div>

          {/* Company Badge */}
          <Badge variant="secondary" className="mb-4">
            {alumni.company}
          </Badge>

          {/* Details */}
          <div className="w-full space-y-2 text-sm text-muted-foreground">
            {/* Education */}
            <div className="flex items-start gap-2">
              <GraduationCap className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-foreground">{alumni.university}</p>
                <p>{alumni.department}</p>
              </div>
            </div>

            {/* Graduation Year */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>Class of {alumni.passingYear}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>
                {alumni.city}, {alumni.country}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlumniCard;
