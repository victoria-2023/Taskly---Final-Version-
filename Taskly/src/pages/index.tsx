import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { Task, ScheduleEvent } from "@/types";
import { storage } from "@/lib/storage";
import { initialTasks, initialEvents } from "@/lib/mockData";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("Alex");

  useEffect(() => {
    setMounted(true);
    setTasks(storage.getTasks());
    setEvents(storage.getEvents());
    
    const storedUser = localStorage.getItem("taskly_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.name.split(" ")[0]);
    }
  }, []);

  if (!mounted) return null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todayEvents = events.filter((e) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" });
    return e.day === today;
  });

  const totalStudyHours = todayEvents
    .filter((e) => e.category === "study")
    .reduce((acc, e) => {
      const [startHour] = e.startTime.split(":").map(Number);
      const [endHour] = e.endTime.split(":").map(Number);
      return acc + (endHour - startHour);
    }, 0);

  const upcomingTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4);

  const nextDeadline = upcomingTasks[0];
  const daysUntilDeadline = nextDeadline
    ? Math.ceil((new Date(nextDeadline.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "study":
        return "bg-blue-100 text-blue-700";
      case "work":
        return "bg-green-100 text-green-700";
      case "personal":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDayIndex = new Date().getDay();
  const adjustedIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-1">{getGreeting()}, {userName}!</h2>
        <p className="text-slate-600">Here's your productivity overview for today.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Tasks Completed</CardTitle>
            <CheckCircle2 className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{completionRate}%</div>
            <Progress value={completionRate} className="mt-2 h-2" />
            <p className="text-xs text-slate-500 mt-2">
              {completedTasks} of {totalTasks} tasks completed this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Study Hours Today</CardTitle>
            <Clock className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalStudyHours}h</div>
            <p className="text-xs text-green-600 mt-2">+1.2h from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Next Deadline</CardTitle>
            <CalendarIcon className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{daysUntilDeadline} days</div>
            <p className="text-xs text-slate-500 mt-2">
              {nextDeadline ? nextDeadline.title.substring(0, 25) + "..." : "No upcoming tasks"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-slate-900">{task.title}</h4>
                    <Badge className={`${getCategoryColor(task.category)} text-xs`}>
                      {task.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">Due: {task.dueDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => {
                const dayEvents = events.filter((e) => e.day === day);
                const isToday = index === adjustedIndex;

                return (
                  <div key={day} className="text-center">
                    <div className={`text-xs font-medium mb-2 ${isToday ? "text-teal-600" : "text-slate-600"}`}>
                      {day}
                    </div>
                    <div className={`text-xl font-bold mb-1 ${isToday ? "text-teal-600" : "text-slate-900"}`}>
                      {index + 2}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event, i) => (
                        <div
                          key={i}
                          className={`text-xs px-1 py-0.5 rounded ${
                            event.category === "study"
                              ? "bg-blue-100 text-blue-700"
                              : event.category === "work"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {event.startTime.substring(0, 5)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
