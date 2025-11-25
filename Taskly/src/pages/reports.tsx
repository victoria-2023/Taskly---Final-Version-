import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Clock, BarChart3 } from "lucide-react";
import { Task, ScheduleEvent, WeeklyReflection, DailyProductivity, CategoryTime, WeeklyTrend } from "@/types";
import { storage } from "@/lib/storage";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ReportsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [reflections, setReflections] = useState<WeeklyReflection[]>([]);
  const [mounted, setMounted] = useState(false);
  const [newReflection, setNewReflection] = useState({
    achievements: "",
    improvements: "",
  });

  useEffect(() => {
    setMounted(true);
    setTasks(storage.getTasks());
    setEvents(storage.getEvents());
    setReflections(storage.getReflections());
  }, []);

  if (!mounted) return null;

  const calculateCategoryTime = (): CategoryTime[] => {
    const categoryHours: Record<string, number> = {
      study: 0,
      work: 0,
      personal: 0,
    };

    events.forEach((event) => {
      const [startHour] = event.startTime.split(":").map(Number);
      const [endHour] = event.endTime.split(":").map(Number);
      const duration = endHour - startHour;
      categoryHours[event.category] = (categoryHours[event.category] || 0) + duration;
    });

    return [
      { category: "Study", hours: categoryHours.study, color: "#3B82F6" },
      { category: "Work", hours: categoryHours.work, color: "#10B981" },
      { category: "Personal", hours: categoryHours.personal, color: "#F59E0B" },
    ];
  };

  const calculateDailyProductivity = (): DailyProductivity[] => {
    return [
      { day: "Mon", hours: 10 },
      { day: "Tue", hours: 8 },
      { day: "Wed", hours: 11 },
      { day: "Thu", hours: 9 },
      { day: "Fri", hours: 7 },
      { day: "Sat", hours: 6 },
      { day: "Sun", hours: 5 },
    ];
  };

  const calculateWeeklyTrends = (): WeeklyTrend[] => {
    return [
      { week: "Week 1", studyHours: 20, workHours: 18, personalHours: 8 },
      { week: "Week 2", studyHours: 26, workHours: 20, personalHours: 10 },
      { week: "Week 3", studyHours: 30, workHours: 22, personalHours: 14 },
      { week: "Week 4", studyHours: 28, workHours: 24, personalHours: 12 },
    ];
  };

  const saveReflection = () => {
    if (!newReflection.achievements && !newReflection.improvements) return;

    const reflection: WeeklyReflection = {
      id: Date.now().toString(),
      weekStart: new Date().toISOString().split("T")[0],
      achievements: newReflection.achievements,
      improvements: newReflection.improvements,
      createdAt: new Date().toISOString(),
    };

    const updatedReflections = [...reflections, reflection];
    setReflections(updatedReflections);
    storage.saveReflections(updatedReflections);

    setNewReflection({ achievements: "", improvements: "" });
  };

  const categoryData = calculateCategoryTime();
  const dailyData = calculateDailyProductivity();
  const weeklyData = calculateWeeklyTrends();

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalHours = categoryData.reduce((sum, cat) => sum + cat.hours, 0);
  const avgDaily = (dailyData.reduce((sum, day) => sum + day.hours, 0) / dailyData.length).toFixed(1);
  const weekChange = weeklyData.length > 1 
    ? ((weeklyData[weeklyData.length - 1].studyHours - weeklyData[weeklyData.length - 2].studyHours) / weeklyData[weeklyData.length - 2].studyHours * 100).toFixed(0)
    : "+0";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Reports & Reflection</h2>
        <p className="text-slate-600">Track your progress and reflect on your productivity journey.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Study Hours</CardTitle>
            <BookOpen className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalHours}h</div>
            <p className="text-xs text-green-600 mt-1">+1.5h from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Tasks Completed</CardTitle>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{completedTasks}</div>
            <p className="text-xs text-green-600 mt-1">+8% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg. Daily Focus</CardTitle>
            <Clock className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{avgDaily}h</div>
            <p className="text-xs text-slate-500 mt-1">-0.5h from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Productivity Score</CardTitle>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">87%</div>
            <p className="text-xs text-green-600 mt-1">+4.8% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Hours Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.category}: ${entry.hours}h`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="hours"
                  nameKey="category"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}h`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {categoryData.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">{item.category}</div>
                    <div className="text-xs text-slate-500">{item.hours}h</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: "12px" }} />
                <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="hours" fill="#14B8A6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>4-Week Productivity Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" style={{ fontSize: "12px" }} />
              <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="personalHours"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: "#F59E0B", r: 4 }}
                name="Personal Hours"
              />
              <Line
                type="monotone"
                dataKey="studyHours"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", r: 4 }}
                name="Study Hours"
              />
              <Line
                type="monotone"
                dataKey="workHours"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", r: 4 }}
                name="Work Hours"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-700">Weekly Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                What went well this week?
              </label>
              <Textarea
                placeholder="Reflect on your achievements and positive moments..."
                value={newReflection.achievements}
                onChange={(e) =>
                  setNewReflection({ ...newReflection, achievements: e.target.value })
                }
                className="min-h-[100px] resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                What can you improve?
              </label>
              <Textarea
                placeholder="Think about areas for growth and future goals..."
                value={newReflection.improvements}
                onChange={(e) =>
                  setNewReflection({ ...newReflection, improvements: e.target.value })
                }
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>
          <Button onClick={saveReflection} className="bg-blue-600 hover:bg-blue-700">
            Save Reflection
          </Button>

          {reflections.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-3">Previous Reflections</h4>
              <div className="space-y-3">
                {reflections.slice(-3).reverse().map((reflection) => (
                  <div key={reflection.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {new Date(reflection.weekStart).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-slate-700 mb-1">Achievements:</div>
                        <p className="text-slate-600">{reflection.achievements}</p>
                      </div>
                      <div>
                        <div className="font-medium text-slate-700 mb-1">Improvements:</div>
                        <p className="text-slate-600">{reflection.improvements}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardContent className="p-6 text-center">
          <p className="text-slate-700 italic text-lg mb-2">
            "Success is the sum of small efforts repeated day in and day out."
          </p>
          <p className="text-slate-500 text-sm">— Robert Collier</p>
        </CardContent>
      </Card>
    </div>
  );
}
