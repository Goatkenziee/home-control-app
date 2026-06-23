export type DeviceType = "thermostat" | "light" | "plug" | "switch" | "fan" | "ac" | "sensor";

export type DeviceStatus = "online" | "offline" | "error";

export type HvacMode = "heat" | "cool" | "auto" | "off";

export interface ThermostatSettings {
  targetTemp: number;
  currentTemp: number;
  humidity: number;
  mode: HvacMode;
  fanMode: "auto" | "on" | "circulate";
  scheduleEnabled: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  room: string;
  isOn: boolean;
  power?: number; // watts
  lastSeen: string;
  thermostatSettings?: ThermostatSettings;
  brightness?: number; // 0-100 for lights
  color?: string; // hex for smart lights
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  deviceCount: number;
}

export interface EnergyStats {
  today: number; // kWh
  week: number;
  month: number;
  costToday: number;
  costMonth: number;
}

export interface DashboardSummary {
  totalDevices: number;
  onlineDevices: number;
  activeDevices: number;
  energy: EnergyStats;
  rooms: Room[];
}
