export type DeviceType = "thermostat" | "light" | "plug" | "fan" | "ac" | "sensor";
export type DeviceStatus = "online" | "offline";

export interface BaseDevice {
  id: string;
  name: string;
  type: DeviceType;
  room: string;
  status: DeviceStatus;
  power: number;
}

export interface ThermostatDevice extends BaseDevice {
  type: "thermostat";
  temperature: number;
  targetTemp: number;
  mode: "heat" | "cool" | "auto" | "off";
}

export interface LightDevice extends BaseDevice {
  type: "light";
  brightness: number;
  color: string;
}

export interface PlugDevice extends BaseDevice {
  type: "plug";
  consumption: number;
}

export interface FanDevice extends BaseDevice {
  type: "fan";
  speed: number;
}

export interface ACDevice extends BaseDevice {
  type: "ac";
  temperature: number;
  mode: "cool" | "heat" | "auto" | "off";
}

export interface SensorDevice extends BaseDevice {
  type: "sensor";
  value: number;
  unit: string;
}

export type Device = ThermostatDevice | LightDevice | PlugDevice | FanDevice | ACDevice | SensorDevice;

export interface DashboardSummary {
  total: number;
  online: number;
  offline: number;
  active: number;
  powerUsage: number;
}
