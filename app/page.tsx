"use client";

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
              <h1 className="text-lg font-semibold">Home Control</h1>
              <p className="text-xs text-muted-foreground">{devices.length} devices · {summary.online} online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-8">
        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Power Usage</p>
              <p className="text-lg font-bold">{summary.powerUsage}W</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15">
              <ArrowUpDown className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Online</p>
              <p className="text-lg font-bold text-green-500">{summary.online}</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/15">
              <ArrowUpDown className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Offline</p>
              <p className="text-lg font-bold text-red-500">{summary.offline}</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15">
              <Power className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-lg font-bold text-amber-500">{summary.active}</p>
            </div>
          </Card>
        </div>

        {/* Device grid */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Devices</h2>
          <Button variant="ghost" size="sm">
            <ArrowUpDown className="mr-1.5 h-3.5 w-3.5" />
            Sort
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      </main>
    </div>
  );
}

function DeviceCard({ device }: { device: (typeof devices)[number] }) {
  const toggleDevice = (id: string) => {
    console.log("Toggle device", id);
  };

  return (
    <Card className="group relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              device.status === "online" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
            }`}
          >
            {typeIcon[device.type] || <Plug className="h-5 w-5" />}
          </div>
          <div>
            <p className="font-medium">{device.name}</p>
            <p className="text-xs text-muted-foreground">{device.room}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              device.status === "online" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-xs text-muted-foreground">{device.status}</span>
        </div>
      </div>

      {/* Type-specific controls */}
      {device.type === "thermostat" && "temperature" in device && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{device.temperature}°F</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => console.log("Decrease temp", device.id)}
            >
              –
            </Button>
            <span className="w-8 text-center text-xs tabular-nums">{device.targetTemp ?? device.temperature}°</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => console.log("Increase temp", device.id)}
            >
              +
            </Button>
          </div>
        </div>
      )}

      {device.type === "light" && "brightness" in device && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Brightness</span>
            <span>{device.brightness}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${device.brightness}%` }}
            />
          </div>
        </div>
      )}

      {device.type === "ac" && "temperature" in device && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <Snowflake className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium">{device.temperature}°F</span>
          </div>
          <span className="text-xs text-muted-foreground">Cooling</span>
        </div>
      )}

      {/* Power toggle */}
      <div className="mt-4 flex justify-end">
        <Button
          variant={device.status === "online" ? "default" : "outline"}
          size="sm"
          onClick={() => toggleDevice(device.id)}
          className="gap-1.5"
        >
          <Power className="h-3.5 w-3.5" />
          {device.status === "online" ? "Turn Off" : "Turn On"}
        </Button>
      </div>
    </Card>
  );
}
