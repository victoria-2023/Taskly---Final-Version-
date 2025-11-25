
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User as UserIcon,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  Target,
  Flame,
  Edit,
} from "lucide-react";
import { User } from "@/types";
import { storage } from "@/lib/storage";

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    role: "Student",
    joinedDate: "2024-01-15",
    stats: {
      totalTasks: 48,
      completedTasks: 32,
      studyHours: 156,
      streak: 7,
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("taskly_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const tasks = storage.getTasks();
      const completedTasks = tasks.filter((t) => t.completed).length;
      
      setUser({
        ...userData,
        stats: {
          totalTasks: tasks.length,
          completedTasks,
          studyHours: userData.stats?.studyHours || 0,
          streak: userData.stats?.streak || 0,
        },
      });
    }
  }, []);

  if (!mounted) return null;

  const saveProfile = () => {
    localStorage.setItem("taskly_user", JSON.stringify(user));
    setIsEditing(false);
  };

  const achievements = [
    { id: 1, name: "First Task", icon: "🎯", earned: true },
    { id: 2, name: "10 Tasks Completed", icon: "⭐", earned: true },
    { id: 3, name: "7-Day Streak", icon: "🔥", earned: true },
    { id: 4, name: "100 Study Hours", icon: "📚", earned: true },
    { id: 5, name: "50 Tasks Completed", icon: "🏆", earned: false },
    { id: 6, name: "30-Day Streak", icon: "💎", earned: false },
  ];

  const completionRate = Math.round((user.stats.completedTasks / user.stats.totalTasks) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Profile</h2>
        <p className="text-slate-600">Manage your account and view your achievements</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserIcon className="w-12 h-12 text-white" />
              </div>

              {isEditing ? (
                <div className="space-y-3 text-left">
                  <div>
                    <Label htmlFor="name" className="text-xs">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-xs">
                      Role
                    </Label>
                    <Input
                      id="role"
                      value={user.role}
                      onChange={(e) => setUser({ ...user, role: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={saveProfile} className="flex-1">
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{user.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-slate-600 mb-1">
                    <Mail className="w-3 h-3" />
                    <span>{user.email}</span>
                  </div>
                  <Badge className="mb-3">{user.role}</Badge>
                  <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-4">
                    <Calendar className="w-3 h-3" />
                    <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="w-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-700 font-medium">Total Tasks</span>
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-900">{user.stats.totalTasks}</div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-700 font-medium">Completed</span>
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-900">{user.stats.completedTasks}</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-700 font-medium">Study Hours</span>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-900">{user.stats.studyHours}h</div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-orange-700 font-medium">Current Streak</span>
                  <Flame className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-900">{user.stats.streak} days</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Completion Rate</span>
                <span className="text-sm font-bold text-slate-900">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-3" />
              <p className="text-xs text-slate-500 mt-2">
                Keep up the great work! You're on track to reach your goals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`text-center p-4 rounded-lg border-2 ${
                  achievement.earned
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-slate-50 border-slate-200 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-medium text-slate-700">{achievement.name}</p>
                {achievement.earned && (
                  <Badge className="mt-2 bg-yellow-500 text-white text-xs">Earned</Badge>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <p className="text-sm text-center text-slate-700">
              <strong>Next Achievement:</strong> Complete 50 tasks to unlock "Task Master" 🏆
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
