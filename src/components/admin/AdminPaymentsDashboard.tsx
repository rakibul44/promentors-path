import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string | null;
  created_at: string;
  course_id: string | null;
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
}

interface Course {
  id: string;
  title: string;
  mentor_id: string | null;
  price: number;
  mentors?: { full_name: string } | null;
}

interface Mentor {
  id: string;
  full_name: string;
  email: string;
}

interface AdminPaymentsDashboardProps {
  payments: Payment[];
  profiles: Profile[];
  courses: Course[];
  mentors: Mentor[];
}

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    completed: "default",
    pending: "secondary",
    failed: "destructive",
    refunded: "outline",
    due: "destructive",
  };
  return <Badge variant={variants[status] || "secondary"} className="capitalize">{status}</Badge>;
};

const AdminPaymentsDashboard = ({ payments, profiles, courses, mentors }: AdminPaymentsDashboardProps) => {
  const getProfileName = (userId: string) => {
    const profile = profiles.find((p) => p.user_id === userId);
    return profile?.full_name || profile?.email || "Unknown";
  };

  const getMentorName = (mentorId: string | null) => {
    if (!mentorId) return "-";
    const mentor = mentors.find((m) => m.id === mentorId);
    return mentor?.full_name || "-";
  };

  const getCourseName = (courseId: string | null) => {
    if (!courseId) return "-";
    const course = courses.find((c) => c.id === courseId);
    return course?.title || "-";
  };

  const getCourseMentor = (courseId: string | null) => {
    if (!courseId) return null;
    const course = courses.find((c) => c.id === courseId);
    return course?.mentor_id || null;
  };

  // Calculate stats
  const completedPayments = payments.filter((p) => p.status === "completed");
  const pendingPayments = payments.filter((p) => p.status === "pending");
  const totalRevenue = completedPayments.reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + Number(p.amount), 0);

  // Group payments by mentor (through courses)
  const mentorEarnings = mentors.map((mentor) => {
    const mentorCourseIds = courses
      .filter((c) => c.mentor_id === mentor.id)
      .map((c) => c.id);
    const mentorPayments = completedPayments.filter(
      (p) => p.course_id && mentorCourseIds.includes(p.course_id)
    );
    const totalEarned = mentorPayments.reduce((sum, p) => sum + Number(p.amount), 0);
    const pendingMentorPayments = pendingPayments.filter(
      (p) => p.course_id && mentorCourseIds.includes(p.course_id)
    );
    const pendingEarned = pendingMentorPayments.reduce((sum, p) => sum + Number(p.amount), 0);
    return {
      ...mentor,
      totalEarned,
      pendingEarned,
      totalTransactions: mentorPayments.length,
    };
  });

  // Student due payments (pending)
  const studentDues = pendingPayments.map((p) => ({
    ...p,
    studentName: getProfileName(p.user_id),
    courseName: getCourseName(p.course_id),
    mentorName: getMentorName(getCourseMentor(p.course_id)),
  }));

  return (
    <div className="space-y-6">
      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">৳{totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">৳{pendingAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Pending Dues</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedPayments.length}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <CreditCard className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingPayments.length}</p>
              <p className="text-xs text-muted-foreground">Due Payments</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="mentor-earnings">Mentor Earnings</TabsTrigger>
          <TabsTrigger value="student-dues">Student Dues</TabsTrigger>
        </TabsList>

        {/* All Payments */}
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                All Payment Transactions
              </CardTitle>
              <CardDescription>Complete payment history across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{getProfileName(payment.user_id)}</TableCell>
                      <TableCell>{getCourseName(payment.course_id)}</TableCell>
                      <TableCell className="font-semibold">
                        {payment.currency} {Number(payment.amount).toLocaleString()}
                      </TableCell>
                      <TableCell className="capitalize">{payment.payment_method || "-"}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                  {payments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No payments found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mentor Earnings */}
        <TabsContent value="mentor-earnings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Mentor Earnings
              </CardTitle>
              <CardDescription>Revenue breakdown per mentor from course payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mentor</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Earned</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Transactions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mentorEarnings.map((mentor) => (
                    <TableRow key={mentor.id}>
                      <TableCell className="font-medium">{mentor.full_name}</TableCell>
                      <TableCell>{mentor.email}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ৳{mentor.totalEarned.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-yellow-600">
                        ৳{mentor.pendingEarned.toLocaleString()}
                      </TableCell>
                      <TableCell>{mentor.totalTransactions}</TableCell>
                    </TableRow>
                  ))}
                  {mentorEarnings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No mentor earnings data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Dues */}
        <TabsContent value="student-dues">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Student Due Payments
              </CardTitle>
              <CardDescription>Pending and overdue student payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Mentor</TableHead>
                    <TableHead>Amount Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentDues.map((due) => (
                    <TableRow key={due.id}>
                      <TableCell className="font-medium">{due.studentName}</TableCell>
                      <TableCell>{due.courseName}</TableCell>
                      <TableCell>{due.mentorName}</TableCell>
                      <TableCell className="font-semibold text-destructive">
                        {due.currency} {Number(due.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(due.status)}</TableCell>
                      <TableCell>{new Date(due.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                  {studentDues.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No pending dues — all payments are up to date!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPaymentsDashboard;
