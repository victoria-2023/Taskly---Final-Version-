
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Calendar, Palette, Database, Shield } from "lucide-react";
import { Settings } from "@/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    theme: "light",
    notifications: {
      email: true,
      push: true,
      deadlineReminders: true,
      dailySummary: false,
    },
    preferences: {
      weekStartDay: "Mon",
      timeFormat: "12h",
      defaultTaskCategory: "study",
    },
  });
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedSettings = localStorage.getItem("taskly_settings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  if (!mounted) return null;

  const saveSettings = () => {
    localStorage.setItem("taskly_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateNotification = (key: keyof Settings["notifications"], value: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    });
  };

  const updatePreference = <K extends keyof Settings["preferences"]>(
    key: K,
    value: Settings["preferences"][K]
  ) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Settings</h2>
        <p className="text-slate-600">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notif" className="text-sm font-medium">
                  Email Notifications
                </Label>
                <p className="text-xs text-slate-500">Receive updates via email</p>
              </div>
              <Switch
                id="email-notif"
                checked={settings.notifications.email}
                onCheckedChange={(checked) => updateNotification("email", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notif" className="text-sm font-medium">
                  Push Notifications
                </Label>
                <p className="text-xs text-slate-500">Browser push notifications</p>
              </div>
              <Switch
                id="push-notif"
                checked={settings.notifications.push}
                onCheckedChange={(checked) => updateNotification("push", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="deadline-notif" className="text-sm font-medium">
                  Deadline Reminders
                </Label>
                <p className="text-xs text-slate-500">Get notified before deadlines</p>
              </div>
              <Switch
                id="deadline-notif"
                checked={settings.notifications.deadlineReminders}
                onCheckedChange={(checked) => updateNotification("deadlineReminders", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-summary" className="text-sm font-medium">
                  Daily Summary
                </Label>
                <p className="text-xs text-slate-500">Daily productivity report</p>
              </div>
              <Switch
                id="daily-summary"
                checked={settings.notifications.dailySummary}
                onCheckedChange={(checked) => updateNotification("dailySummary", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-600" />
              <CardTitle>Appearance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme" className="text-sm font-medium mb-2 block">
                Theme
              </Label>
              <Select
                value={settings.theme}
                onValueChange={(value: "light" | "dark" | "system") =>
                  setSettings({ ...settings, theme: value })
                }
              >
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 mt-1">Choose your preferred theme</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">Preview:</p>
              <div className="flex gap-2">
                <div className="w-16 h-16 rounded bg-white border-2 border-slate-200 flex items-center justify-center">
                  <span className="text-xs text-slate-600">Light</span>
                </div>
                <div className="w-16 h-16 rounded bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
                  <span className="text-xs text-white">Dark</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <CardTitle>Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="week-start" className="text-sm font-medium mb-2 block">
                Week Starts On
              </Label>
              <Select
                value={settings.preferences.weekStartDay}
                onValueChange={(value: "Mon" | "Sun") => updatePreference("weekStartDay", value)}
              >
                <SelectTrigger id="week-start">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mon">Monday</SelectItem>
                  <SelectItem value="Sun">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="time-format" className="text-sm font-medium mb-2 block">
                Time Format
              </Label>
              <Select
                value={settings.preferences.timeFormat}
                onValueChange={(value: "12h" | "24h") => updatePreference("timeFormat", value)}
              >
                <SelectTrigger id="time-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (2:00 PM)</SelectItem>
                  <SelectItem value="24h">24-hour (14:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="default-category" className="text-sm font-medium mb-2 block">
                Default Task Category
              </Label>
              <Select
                value={settings.preferences.defaultTaskCategory}
                onValueChange={(value: "study" | "work" | "personal") =>
                  updatePreference("defaultTaskCategory", value)
                }
              >
                <SelectTrigger id="default-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-orange-600" />
              <CardTitle>Data Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Export Your Data</h4>
              <p className="text-xs text-slate-500 mb-3">
                Download all your tasks and schedule events
              </p>
              <Button variant="outline" className="w-full">
                Export Data (JSON)
              </Button>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <h4 className="text-sm font-medium mb-2 text-red-600">Danger Zone</h4>
              <p className="text-xs text-slate-500 mb-3">
                Permanently delete all your data from this device
              </p>
              <Button variant="destructive" className="w-full">
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Privacy & Security</p>
              <p className="text-xs text-blue-700">Your data is stored locally on your device</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
            Learn More
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={saveSettings} className="bg-blue-600 hover:bg-blue-700">
          {saved ? "✓ Saved!" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
