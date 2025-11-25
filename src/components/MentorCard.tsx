import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface MentorCardProps {
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  students: number;
  image: string;
}

const MentorCard = ({ name, title, expertise, rating, students, image }: MentorCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{title}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="ml-1 text-sm font-medium">{rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({students.toLocaleString()} students)
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {expertise.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        
        <Button className="w-full" variant="outline">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
