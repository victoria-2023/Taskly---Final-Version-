import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Trash2, Edit, CheckCircle2, Calendar, Flag } from "lucide-react";
import { Task, Subtask } from "@/types";
import { storage } from "@/lib/storage";
import { initialTasks } from "@/lib/mockData";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [newTask, setNewTask] = useState({
    title: "",
    category: "study" as "study" | "work" | "personal",
    priority: "medium" as "high" | "medium" | "low",
    dueDate: "",
  });

  useEffect(() => {
    setMounted(true);
    const storedTasks = storage.getTasks();
    
    if (storedTasks.length === 0) {
      storage.saveTasks(initialTasks);
      setTasks(initialTasks);
    } else {
      setTasks(storedTasks);
    }
  }, []);

  if (!mounted) return null;

  const addTask = () => {
    if (!newTask.title || !newTask.dueDate) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      category: newTask.category,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      completed: false,
      progress: 0,
      subtasks: [],
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);

    setNewTask({ title: "", category: "study", priority: "medium", dueDate: "" });
    setShowAddForm(false);
  };

  const toggleTaskComplete = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
            progress: !task.completed ? 100 : task.progress,
          }
        : task
    );
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        const completedCount = updatedSubtasks.filter((st) => st.completed).length;
        const progress = Math.round((completedCount / updatedSubtasks.length) * 100);

        return {
          ...task,
          subtasks: updatedSubtasks,
          progress: updatedSubtasks.length > 0 ? progress : 0,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "study":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "work":
        return "bg-green-100 text-green-700 border-green-200";
      case "personal":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const filteredTasks = filterCategory === "all"
    ? tasks
    : tasks.filter((task) => task.category === filterCategory);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Task Manager</h2>
        <p className="text-slate-600">Organize and track your tasks efficiently.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            {showAddForm ? "Add New Task" : "Tasks"}
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            variant={showAddForm ? "outline" : "default"}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus size={16} className="mr-2" />
            {showAddForm ? "Cancel" : "Add New Task"}
          </Button>
        </CardHeader>

        {showAddForm && (
          <CardContent className="border-b border-slate-200 pb-6">
            <div className="grid grid-cols-4 gap-4">
              <Input
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="col-span-1"
              />
              
              <Select
                value={newTask.category}
                onValueChange={(value: "study" | "work" | "personal") =>
                  setNewTask({ ...newTask, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />

              <Select
                value={newTask.priority}
                onValueChange={(value: "high" | "medium" | "low") =>
                  setNewTask({ ...newTask, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={addTask} className="mt-4 bg-teal-600 hover:bg-teal-700">
              Add Task
            </Button>
          </CardContent>
        )}

        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <Filter size={16} className="text-slate-500" />
            <span className="text-sm text-slate-600">Filter by:</span>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="study">Study</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="border-l-4 border-l-teal-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskComplete(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h4
                          className={`font-semibold text-slate-900 mb-2 ${
                            task.completed ? "line-through text-slate-400" : ""
                          }`}
                        >
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`${getCategoryColor(task.category)} text-xs border`}>
                            {task.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Calendar size={12} />
                            {task.dueDate}
                          </div>
                          <Badge className={`${getPriorityColor(task.priority)} text-xs border`}>
                            <Flag size={10} className="mr-1" />
                            {task.priority} priority
                          </Badge>
                        </div>

                        {task.subtasks.length > 0 && (
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                              <span>Progress</span>
                              <span>
                                {task.subtasks.filter((st) => st.completed).length} of{" "}
                                {task.subtasks.length} completed
                              </span>
                            </div>
                            <Progress value={task.progress} className="h-2 mb-3" />
                            
                            {task.subtasks.map((subtask) => (
                              <div key={subtask.id} className="flex items-center gap-2 pl-4">
                                <Checkbox
                                  checked={subtask.completed}
                                  onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                                  className="w-4 h-4"
                                />
                                <span
                                  className={`text-sm ${
                                    subtask.completed
                                      ? "line-through text-slate-400"
                                      : "text-slate-700"
                                  }`}
                                >
                                  {subtask.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit size={14} className="text-slate-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <CheckCircle2 size={48} className="mx-auto mb-4 opacity-20" />
                <p>No tasks found. Add your first task to get started!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
