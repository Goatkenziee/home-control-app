export type DeviceType = "light" | "plug" | "switch" | "thermostat" | "fan" | "ac" | "sensor";
export type DeviceStatus = "online" | "offline" | "error";
export type PowerState = "on" | "off";

export interface ThermostatSettings {
  mode: "heat" | "cool" | "auto" | "off";
  currentTemp: number;
  targetTemp: number;
  humidity?: number;
  fanMode?: "auto" | "on" | "circulate";
  scheduleEnabled?: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: string;
  status: DeviceStatus;
  isOn: boolean;
  power?: number; // wattage
  brightness?: number;       // 0–100 for dimmable lights
  color?: string;            // hex color for smart bulbs
  temperature?: number;      // for thermostat
  targetTemp?: number;
  level?: number;            // 0–100 for fan speed
  lastSeen: string;          // ISO timestamp
  ipAddress?: string;
  manufacturer?: string;
  thermostatSettings?: ThermostatSettings;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  deviceCount: number;
}

export interface Scene {
  id: string;
  name: string;
  icon: string;
  deviceStates: { deviceId: string; power: PowerState; brightness?: number; color?: string }[];
}

export interface Schedule {
  id: string;
  name: string;
  deviceId: string;
  action: "on" | "off";
  time: string; // HH:MM
  days: number[]; // 0=Sun, 1=Mon...
  active: boolean;
}

export interface EnergyUsage {
  today: number;
  week: number;
  month: number;
  costToday: number;
  costMonth: number;
}

export interface DashboardSummary {
  onlineDevices: number;
  totalDevices: number;
  activeDevices: number;
  energy: EnergyUsage;
  rooms: Room[];
}

export type SortOption = "name" | "room" | "type" | "status";
export type FilterType = DeviceType | "all";
