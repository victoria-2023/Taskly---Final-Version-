
import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Briefcase } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const user = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      joinedDate: new Date().toISOString().split("T")[0],
      stats: {
        totalTasks: 0,
        completedTasks: 0,
        studyHours: 0,
        streak: 0,
      },
    };

    localStorage.setItem("taskly_user", JSON.stringify(user));
    localStorage.setItem("taskly_authenticated", "true");

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">T</span>
          </div>
          <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
            Welcome to Taskly
          </CardTitle>
          <p className="text-slate-600">
            Your personal productivity companion for managing tasks and achieving goals
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Alex Johnson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`h-11 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. alex@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`h-11 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="role" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Role
              </Label>
              <Input
                id="role"
                type="text"
                placeholder="e.g. Student, Professional"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="h-11"
              />
              <p className="text-xs text-slate-500 mt-1">
                Optional - helps us personalize your experience
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold shadow-lg"
            >
              Get Started
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">📚</div>
                <div className="text-xs text-slate-600">Manage Tasks</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">📅</div>
                <div className="text-xs text-slate-600">Schedule Events</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">📊</div>
                <div className="text-xs text-slate-600">Track Progress</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
