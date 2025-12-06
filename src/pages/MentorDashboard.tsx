import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, BookOpen, Users, Link as LinkIcon, Plus, Edit, Trash2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const MentorDashboard = () => {
  const { toast } = useToast();
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, date: "2024-01-20", time: "10:00 AM - 11:00 AM", type: "1-on-1", status: "available" },
    { id: 2, date: "2024-01-20", time: "2:00 PM - 3:00 PM", type: "Group", status: "booked" },
    { id: 3, date: "2024-01-21", time: "11:00 AM - 12:00 PM", type: "1-on-1", status: "available" },
  ]);

  const [bookedSessions, setBookedSessions] = useState([
    { id: 1, student: "John Doe", date: "2024-01-20", time: "2:00 PM", type: "Group", topic: "Career Guidance", meetingLink: "" },
    { id: 2, student: "Jane Smith", date: "2024-01-22", time: "10:00 AM", type: "1-on-1", topic: "Resume Review", meetingLink: "https://zoom.us/j/123456" },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, title: "Web Development Fundamentals", lessons: 12, students: 45, status: "Published" },
    { id: 2, title: "Advanced React Patterns", lessons: 8, students: 32, status: "Draft" },
  ]);

  const [newSlot, setNewSlot] = useState({ date: "", startTime: "", endTime: "", type: "1-on-1" });
  const [meetingLink, setMeetingLink] = useState("");
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const handleAddTimeSlot = () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const slot = {
      id: timeSlots.length + 1,
      date: newSlot.date,
      time: `${newSlot.startTime} - ${newSlot.endTime}`,
      type: newSlot.type,
      status: "available"
    };
    setTimeSlots([...timeSlots, slot]);
    setNewSlot({ date: "", startTime: "", endTime: "", type: "1-on-1" });
    toast({ title: "Time slot added successfully!" });
  };

  const handleDeleteSlot = (id: number) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
    toast({ title: "Time slot removed" });
  };

  const handleAddMeetingLink = (sessionId: number) => {
    setBookedSessions(bookedSessions.map(session => 
      session.id === sessionId ? { ...session, meetingLink } : session
    ));
    setMeetingLink("");
    setSelectedSession(null);
    toast({ title: "Meeting link added successfully!" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mentor Dashboard</h1>
          <p className="text-muted-foreground">Manage your sessions, courses, and availability</p>
        </div>

        <Tabs defaultValue="availability" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="availability" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Availability</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Sessions</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Meetings</span>
            </TabsTrigger>
          </TabsList>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Time Slot
                </CardTitle>
                <CardDescription>Set your available times for mentorship sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSlot.date}
                      onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Session Type</Label>
                    <Select value={newSlot.type} onValueChange={(value) => setNewSlot({ ...newSlot, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-on-1">1-on-1</SelectItem>
                        <SelectItem value="Group">Group Session</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddTimeSlot} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Slot
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Time Slots</CardTitle>
                <CardDescription>Manage your available time slots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{slot.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{slot.time}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          slot.type === "1-on-1" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
                        }`}>
                          {slot.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          slot.status === "available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {slot.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSlot(slot.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booked Sessions</CardTitle>
                <CardDescription>View and manage your upcoming mentorship sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookedSessions.map((session) => (
                    <div key={session.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-medium">{session.student}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              session.type === "1-on-1" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
                            }`}>
                              {session.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.time}
                            </span>
                          </div>
                          <p className="text-sm"><strong>Topic:</strong> {session.topic}</p>
                          {session.meetingLink && (
                            <p className="text-sm text-primary flex items-center gap-1">
                              <LinkIcon className="w-3 h-3" />
                              <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {session.meetingLink}
                              </a>
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {!session.meetingLink && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedSession(session.id)}>
                                  <LinkIcon className="w-4 h-4 mr-2" />
                                  Add Link
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add Meeting Link</DialogTitle>
                                  <DialogDescription>
                                    Add the meeting link for your session with {session.student}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="meetingLink">Meeting URL</Label>
                                    <Input
                                      id="meetingLink"
                                      placeholder="https://zoom.us/j/..."
                                      value={meetingLink}
                                      onChange={(e) => setMeetingLink(e.target.value)}
                                    />
                                  </div>
                                  <Button onClick={() => handleAddMeetingLink(session.id)} className="w-full">
                                    Save Link
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Button variant="outline" size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Start Session
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Courses</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>Add a new course to your teaching portfolio</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseTitle">Course Title</Label>
                      <Input id="courseTitle" placeholder="Enter course title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="courseDescription">Description</Label>
                      <Textarea id="courseDescription" placeholder="Describe your course..." rows={4} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="programming">Programming</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="level">Skill Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Course Thumbnail</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                    <Button className="w-full">Create Course</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{course.lessons} Lessons</span>
                          <span>{course.students} Students</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            course.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {course.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Lesson
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Lesson</DialogTitle>
                              <DialogDescription>Add a new lesson to {course.title}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="lessonTitle">Lesson Title</Label>
                                <Input id="lessonTitle" placeholder="Enter lesson title" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lessonDescription">Description</Label>
                                <Textarea id="lessonDescription" placeholder="Describe this lesson..." rows={3} />
                              </div>
                              <div className="space-y-2">
                                <Label>Video Upload</Label>
                                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                                  <Video className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                                  <p className="text-sm text-muted-foreground">Upload lesson video</p>
                                  <p className="text-xs text-muted-foreground">MP4, WebM up to 500MB</p>
                                </div>
                              </div>
                              <Button className="w-full">Add Lesson</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Meeting Links Management
                </CardTitle>
                <CardDescription>Add and manage meeting links for your sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookedSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{session.student} - {session.topic}</p>
                        <p className="text-sm text-muted-foreground">{session.date} at {session.time}</p>
                        {session.meetingLink ? (
                          <p className="text-sm text-primary">{session.meetingLink}</p>
                        ) : (
                          <p className="text-sm text-yellow-600">No meeting link added</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Paste meeting link..."
                          className="w-64"
                          value={selectedSession === session.id ? meetingLink : ""}
                          onChange={(e) => {
                            setSelectedSession(session.id);
                            setMeetingLink(e.target.value);
                          }}
                        />
                        <Button 
                          onClick={() => handleAddMeetingLink(session.id)}
                          disabled={selectedSession !== session.id || !meetingLink}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default MentorDashboard;
