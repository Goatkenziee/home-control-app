import { Device, DashboardSummary } from "./types";

export const devices: Device[] = [
  {
    id: "thermostat-1",
    name: "Living Room Thermostat",
    type: "thermostat",
    room: "Living Room",
    status: "online",
    power: 15,
    temperature: 72,
    targetTemp: 70,
    mode: "cool",
  },
  {
    id: "light-1",
    name: "Ceiling Lights",
    type: "light",
    room: "Kitchen",
    status: "online",
    power: 40,
    brightness: 80,
    color: "warm",
  },
  {
    id: "light-2",
    name: "Desk Lamp",
    type: "light",
    room: "Office",
    status: "online",
    power: 10,
    brightness: 45,
    color: "daylight",
  },
  {
    id: "plug-1",
    name: "Coffee Maker",
    type: "plug",
    room: "Kitchen",
    status: "offline",
    power: 0,
    consumption: 800,
  },
  {
    id: "fan-1",
    name: "Bedroom Fan",
    type: "fan",
    room: "Master Bedroom",
    status: "online",
    power: 55,
    speed: 2,
  },
  {
    id: "ac-1",
    name: "Window AC",
    type: "ac",
    room: "Bedroom",
    status: "online",
    power: 1200,
    temperature: 68,
    mode: "cool",
  },
  {
    id: "sensor-1",
    name: "Front Door Sensor",
    type: "sensor",
    room: "Entryway",
    status: "online",
    power: 0.1,
    value: 1,
    unit: "closed",
  },
  {
    id: "thermostat-2",
    name: "Upstairs Thermostat",
    type: "thermostat",
    room: "Upstairs Hall",
    status: "offline",
    power: 0,
    temperature: 75,
    targetTemp: 72,
    mode: "cool",
  },
  {
    id: "light-3",
    name: "Porch Light",
    type: "light",
    room: "Outside",
    status: "online",
    power: 15,
    brightness: 100,
    color: "warm",
  },
];

export function getDashboardSummary(): DashboardSummary {
  const online = devices.filter((d) => d.status === "online").length;
  const offline = devices.filter((d) => d.status === "offline").length;
  const active = devices.filter((d) => d.status === "online" && d.power > 0).length;
  const powerUsage = devices.reduce((sum, d) => sum + d.power, 0);
  return { total: devices.length, online, offline, active, powerUsage };
}
