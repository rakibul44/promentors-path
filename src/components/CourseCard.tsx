import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  price: string;
  image: string;
}

const CourseCard = ({
  title,
  instructor,
  rating,
  students,
  duration,
  level,
  price,
  image,
}: CourseCardProps) => {
  const courseId = title.toLowerCase().replace(/[\s\/]+/g, '-');

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/course/${courseId}`}>
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-6">
        <div className="mb-3">
          <Badge variant="secondary">{level}</Badge>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">by {instructor}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({students})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{students}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">{price}</div>
          <Link to={`/course/${courseId}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
