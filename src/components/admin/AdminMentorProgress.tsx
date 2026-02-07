import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, BookOpen, Users, TrendingUp } from "lucide-react";

interface Mentor {
  id: string;
  full_name: string;
  email: string;
  expertise: string | null;
  avatar_url: string | null;
  status: string;
}

interface Course {
  id: string;
  title: string;
  mentor_id: string | null;
  status: string;
  price: number;
}

interface Booking {
  id: string;
  mentor_id: string;
  status: string;
  session_type: string;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  course_id: string | null;
}

interface AdminMentorProgressProps {
  mentors: Mentor[];
  courses: Course[];
  bookings: Booking[];
  payments: Payment[];
}

const AdminMentorProgress = ({ mentors, courses, bookings, payments }: AdminMentorProgressProps) => {
  const approvedMentors = mentors.filter((m) => m.status === "approved");

  const getMentorStats = (mentorId: string) => {
    const mentorCourses = courses.filter((c) => c.mentor_id === mentorId);
    const publishedCourses = mentorCourses.filter((c) => c.status === "published");
    const mentorBookings = bookings.filter((b) => b.mentor_id === mentorId);
    const completedSessions = mentorBookings.filter((b) => b.status === "completed" || b.status === "approved");
    const pendingSessions = mentorBookings.filter((b) => b.status === "pending");
    
    const mentorCourseIds = mentorCourses.map((c) => c.id);
    const mentorPayments = payments
      .filter((p) => p.course_id && mentorCourseIds.includes(p.course_id) && p.status === "completed");
    const totalEarnings = mentorPayments.reduce((sum, p) => sum + Number(p.amount), 0);

    // Activity score (0-100): combination of courses, sessions, and earnings
    const courseScore = Math.min(publishedCourses.length * 20, 40);
    const sessionScore = Math.min(completedSessions.length * 5, 30);
    const earningScore = Math.min(totalEarnings / 100, 30);
    const activityScore = Math.round(courseScore + sessionScore + earningScore);

    return {
      totalCourses: mentorCourses.length,
      publishedCourses: publishedCourses.length,
      totalSessions: mentorBookings.length,
      completedSessions: completedSessions.length,
      pendingSessions: pendingSessions.length,
      totalEarnings,
      activityScore: Math.min(activityScore, 100),
    };
  };

  // Summary stats
  const totalApproved = approvedMentors.length;
  const totalPublished = courses.filter((c) => c.status === "published").length;
  const totalSessions = bookings.length;
  const completedSessions = bookings.filter((b) => b.status === "completed" || b.status === "approved").length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalApproved}</p>
              <p className="text-xs text-muted-foreground">Active Mentors</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalPublished}</p>
              <p className="text-xs text-muted-foreground">Published Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalSessions}</p>
              <p className="text-xs text-muted-foreground">Total Sessions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedSessions}</p>
              <p className="text-xs text-muted-foreground">Completed Sessions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentor Progress Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Mentor Progress & Performance
          </CardTitle>
          <CardDescription>Track mentor activity, courses, sessions, and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentor</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedMentors.map((mentor) => {
                const stats = getMentorStats(mentor.id);
                return (
                  <TableRow key={mentor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={mentor.avatar_url || undefined} alt={mentor.full_name} />
                          <AvatarFallback className="text-xs">
                            {mentor.full_name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{mentor.full_name}</p>
                          <p className="text-xs text-muted-foreground">{mentor.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{mentor.expertise || "-"}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{stats.publishedCourses}</span>
                        <span className="text-muted-foreground"> / {stats.totalCourses}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="text-xs">{stats.completedSessions} done</Badge>
                          {stats.pendingSessions > 0 && (
                            <Badge variant="secondary" className="text-xs">{stats.pendingSessions} pending</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">
                        ৳{stats.totalEarnings.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 min-w-[100px]">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Activity</span>
                          <span className="font-medium">{stats.activityScore}%</span>
                        </div>
                        <Progress value={stats.activityScore} className="h-2" />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {approvedMentors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No approved mentors yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMentorProgress;
