import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { devices, getDashboardSummary } from "@/lib/mock-data";
import {
  Thermometer,
  Lightbulb,
  Plug,
  Fan,
  Snowflake,
  Wifi,
  Zap,
  HomeIcon,
  ArrowUpDown,
  Clock,
  Settings,
  RefreshCw,
  Power,
} from "lucide-react";

const typeIcon: Record<string, React.ReactNode> = {
  thermostat: <Thermometer className="h-5 w-5" />,
  light: <Lightbulb className="h-5 w-5" />,
  plug: <Plug className="h-5 w-5" />,
  fan: <Fan className="h-5 w-5" />,
  ac: <Snowflake className="h-5 w-5" />,
  sensor: <Wifi className="h-5 w-5" />,
};

export default function Home() {
  const summary = getDashboardSummary();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
              <HomeIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Home Control</h1>
              <p className="text-xs text-muted-foreground">{summary.onlineDevices} devices online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-8">
        {/* Energy Summary */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Today</span>
            </div>
            <p className="text-2xl font-bold">{summary.energy.today.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">kWh</span></p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">This Week</span>
            </div>
            <p className="text-2xl font-bold">{summary.energy.week.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">kWh</span></p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">This Month</span>
            </div>
            <p className="text-2xl font-bold">{summary.energy.month.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">kWh</span></p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <span className="text-xs font-medium uppercase tracking-wide">Cost Today</span>
            </div>
            <p className="text-2xl font-bold">${summary.energy.costToday.toFixed(2)}</p>
          </Card>
        </section>

        {/* Rooms */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Rooms</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {summary.rooms.map((room) => (
              <button
                key={room.id}
                className="flex shrink-0 items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm hover:border-primary/50 transition"
              >
                <span>{room.icon}</span>
                <span>{room.name}</span>
                <span className="text-muted-foreground">{room.deviceCount}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Devices */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Devices</h2>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <ArrowUpDown className="h-3.5 w-3.5" />
              Sort
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <Card key={device.id} className="p-4 flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    device.isOn ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {typeIcon[device.type] || <Plug className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{device.name}</p>
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        device.status === "online" ? "bg-green-500" : device.status === "error" ? "bg-red-500" : "bg-muted-foreground"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {device.room} · {device.isOn ? "On" : "Off"}
                    {device.power ? ` · ${device.power}W` : ""}
                  </p>
                  {device.thermostatSettings && (
                    <div className="mt-2 flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Thermometer className="h-3.5 w-3.5 text-orange-400" />
                        {device.thermostatSettings.currentTemp}°F
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="flex items-center gap-1">
                        <ArrowUpDown className="h-3.5 w-3.5 text-blue-400" />
                        {device.thermostatSettings.targetTemp}°F
                      </span>
                      <span className="text-xs text-muted-foreground uppercase">{device.thermostatSettings.mode}</span>
                    </div>
                  )}
                  {device.type === "light" && device.brightness !== undefined && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${device.brightness}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">{device.brightness}%</span>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 shrink-0 ${device.isOn ? "text-primary" : "text-muted-foreground"}`}
                >
                  <Power className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
