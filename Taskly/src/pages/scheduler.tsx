
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, AlertTriangle, Lightbulb, Clock } from "lucide-react";
import { ScheduleEvent } from "@/types";
import { storage } from "@/lib/storage";
import { initialEvents } from "@/lib/mockData";

export default function SchedulerPage() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    day: "Mon" as "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun",
    startTime: "",
    endTime: "",
    category: "study" as "study" | "work" | "personal",
  });

  useEffect(() => {
    setMounted(true);
    const storedEvents = storage.getEvents();
    
    if (storedEvents.length === 0) {
      storage.saveEvents(initialEvents);
      setEvents(initialEvents);
    } else {
      setEvents(storedEvents);
    }
  }, []);

  if (!mounted) return null;

  const detectConflicts = (newEvent: Omit<ScheduleEvent, "id" | "type">) => {
    const conflicts: ScheduleEvent[] = [];
    
    events.forEach((event) => {
      if (event.day === newEvent.day && event.type === "scheduled") {
        const newStart = parseInt(newEvent.startTime.replace(":", ""));
        const newEnd = parseInt(newEvent.endTime.replace(":", ""));
        const existingStart = parseInt(event.startTime.replace(":", ""));
        const existingEnd = parseInt(event.endTime.replace(":", ""));

        if (
          (newStart >= existingStart && newStart < existingEnd) ||
          (newEnd > existingStart && newEnd <= existingEnd) ||
          (newStart <= existingStart && newEnd >= existingEnd)
        ) {
          conflicts.push(event);
        }
      }
    });

    return conflicts;
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.startTime || !newEvent.endTime) {
      alert("Please fill in all required fields");
      return;
    }

    if (newEvent.startTime >= newEvent.endTime) {
      alert("End time must be after start time");
      return;
    }

    const conflicts = detectConflicts(newEvent);
    
    const event: ScheduleEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      day: newEvent.day,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      category: newEvent.category,
      type: conflicts.length > 0 ? "conflict" : "scheduled",
    };

    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    storage.saveEvents(updatedEvents);

    setNewEvent({ title: "", day: "Mon", startTime: "", endTime: "", category: "study" });
    setShowAddForm(false);
  };

  const allConflicts = events.filter((e) => e.type === "conflict");

  const smartSuggestions = [
    { day: "Mon", time: "18:00-20:00", reason: "Free time for focused study" },
    { day: "Wed", time: "09:00-11:00", reason: "Morning productivity peak" },
    { day: "Fri", time: "14:00-16:00", reason: "End of week review session" },
    { day: "Sat", time: "10:00-12:00", reason: "Weekend intensive study" },
  ];

  const timeSlots = Array.from({ length: 12 }, (_, i) => 8 + i);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getEventForSlot = (day: string, hour: number) => {
    return events.filter((event) => {
      if (event.day !== day) return false;
      const [startHour] = event.startTime.split(":").map(Number);
      const [endHour] = event.endTime.split(":").map(Number);
      return hour >= startHour && hour < endHour;
    });
  };

  const getCategoryStyle = (category: string, type: string) => {
    if (type === "conflict") {
      return "bg-red-100 border-red-300 text-red-800";
    }
    if (type === "suggested") {
      return "bg-yellow-50 border-yellow-200 text-yellow-800";
    }
    
    switch (category) {
      case "study":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "work":
        return "bg-green-100 border-green-300 text-green-800";
      case "personal":
        return "bg-purple-100 border-purple-300 text-purple-800";
      default:
        return "bg-slate-100 border-slate-300 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Smart Scheduler</h2>
        <p className="text-slate-600">Plan your week with intelligent scheduling suggestions.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock size={20} />
            {showAddForm ? "Add Work Shift" : "Weekly Schedule"}
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            variant={showAddForm ? "outline" : "default"}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus size={16} className="mr-2" />
            {showAddForm ? "Cancel" : "Add Shift"}
          </Button>
        </CardHeader>

        {showAddForm && (
          <CardContent className="border-b border-slate-200 pb-6">
            <div className="grid grid-cols-5 gap-4">
              <Select
                value={newEvent.day}
                onValueChange={(value: any) => setNewEvent({ ...newEvent, day: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="time"
                placeholder="Start Time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
              />

              <Input
                type="time"
                placeholder="End Time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
              />

              <Input
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />

              <Select
                value={newEvent.category}
                onValueChange={(value: any) => setNewEvent({ ...newEvent, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={addEvent} className="mt-4 bg-teal-600 hover:bg-teal-700">
              Add Shift
            </Button>
          </CardContent>
        )}
      </Card>

      {allConflicts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <AlertTriangle size={20} />
              Scheduling Conflicts Detected:
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allConflicts.map((conflict) => (
              <p key={conflict.id} className="text-sm text-red-700">
                {conflict.day} {conflict.startTime}-{conflict.endTime}: {conflict.title} overlaps with existing event
              </p>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center gap-2">
            <Lightbulb size={20} />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {smartSuggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
                <div className="flex-1">
                  <div className="font-semibold text-yellow-900 mb-1">
                    {suggestion.day} {suggestion.time}
                  </div>
                  <p className="text-sm text-yellow-700">{suggestion.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-600 w-20">
                    Time
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-600"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((hour) => (
                  <tr key={hour}>
                    <td className="border border-slate-200 p-2 text-xs text-slate-500 text-center bg-slate-50">
                      {hour.toString().padStart(2, "0")}:00
                    </td>
                    {days.map((day) => {
                      const slotEvents = getEventForSlot(day, hour);
                      
                      return (
                        <td key={day} className="border border-slate-200 p-1 align-top h-16 relative">
                          {slotEvents.map((event, idx) => {
                            const [startHour] = event.startTime.split(":").map(Number);
                            
                            if (startHour === hour) {
                              const [endHour] = event.endTime.split(":").map(Number);
                              const duration = endHour - startHour;
                              
                              return (
                                <div
                                  key={idx}
                                  className={`absolute left-1 right-1 border rounded p-1 text-xs ${getCategoryStyle(
                                    event.category,
                                    event.type
                                  )}`}
                                  style={{
                                    height: `${duration * 64 - 4}px`,
                                    top: "2px",
                                  }}
                                >
                                  <div className="font-semibold truncate">{event.title}</div>
                                  <div className="text-xs opacity-80">
                                    {event.startTime}-{event.endTime}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-6 mt-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
              <span className="text-slate-600">Study</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-slate-600">Work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
              <span className="text-slate-600">Personal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded"></div>
              <span className="text-slate-600">Suggested</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span className="text-slate-600">Conflict</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
