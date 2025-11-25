import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Calendar,
  Check,
  Trash2,
} from "lucide-react";
import { Notification } from "@/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedNotifs = localStorage.getItem("taskly_notifications");
    if (storedNotifs) {
      setNotifications(JSON.parse(storedNotifs));
    } else {
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "deadline",
          title: "Assignment Due Soon",
          message: "Math Assignment is due in 2 days",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false,
          link: "/tasks",
        },
        {
          id: "2",
          type: "achievement",
          title: "Achievement Unlocked!",
          message: "You completed 10 tasks this week",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          read: false,
        },
        {
          id: "3",
          type: "task",
          title: "Task Completed",
          message: "You marked 'Complete Practice Problems' as done",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          read: true,
        },
        {
          id: "4",
          type: "reminder",
          title: "Study Session Starting",
          message: "Your Math study session starts in 30 minutes",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          read: true,
          link: "/scheduler",
        },
        {
          id: "5",
          type: "deadline",
          title: "Upcoming Deadline",
          message: "Project Presentation is due in 5 days",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          read: true,
          link: "/tasks",
        },
      ];
      setNotifications(mockNotifications);
      localStorage.setItem("taskly_notifications", JSON.stringify(mockNotifications));
    }
  }, []);

  if (!mounted) return null;

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    localStorage.setItem("taskly_notifications", JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("taskly_notifications", JSON.stringify(updated));
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("taskly_notifications", JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("taskly_notifications", JSON.stringify([]));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "task":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "deadline":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "achievement":
        return <Trophy className="w-5 h-5 text-yellow-600" />;
      case "reminder":
        return <Calendar className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "task":
        return "bg-green-100 text-green-700";
      case "deadline":
        return "bg-red-100 text-red-700";
      case "achievement":
        return "bg-yellow-100 text-yellow-700";
      case "reminder":
        return "bg-blue-100 text-blue-700";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Notifications</h2>
          <div className="text-slate-600">
            Stay updated with your tasks and achievements
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-500 text-white">{unreadCount} unread</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAll} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All ({notifications.length})
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("unread")}
        >
          Unread ({unreadCount})
        </Button>
        <Button
          variant={filter === "read" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("read")}
        >
          Read ({notifications.length - unreadCount})
        </Button>
      </div>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No notifications</h3>
              <p className="text-slate-500">You're all caught up!</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`${!notif.read ? "border-l-4 border-l-blue-500 bg-blue-50" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getIcon(notif.type)}</div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">{notif.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
                      </div>
                      <Badge className={`${getTypeColor(notif.type)} text-xs`}>
                        {notif.type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {formatTimestamp(notif.timestamp)}
                      </span>

                      <div className="flex gap-2">
                        {!notif.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notif.id)}
                            className="text-xs"
                          >
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notif.id)}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-600">
              Notifications are cleared after 30 days automatically
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
