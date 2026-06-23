"use client";

import { Device, Room, Scene, Schedule, PowerState, FilterType, SortOption } from "./types";

const STORAGE_KEY = "smarthome_devices";
const ROOMS_KEY = "smarthome_rooms";
const SCENES_KEY = "smarthome_scenes";
const SCHEDULES_KEY = "smarthome_schedules";

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, data: unknown) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// ── Default rooms ──
const defaultRooms: Room[] = [
  { id: "living-room", name: "Living Room", icon: "sofa", deviceCount: 0 },
  { id: "bedroom", name: "Bedroom", icon: "bed", deviceCount: 0 },
  { id: "kitchen", name: "Kitchen", icon: "cooking-pot", deviceCount: 0 },
  { id: "office", name: "Office", icon: "monitor", deviceCount: 0 },
  { id: "bathroom", name: "Bathroom", icon: "shower-head", deviceCount: 0 },
  { id: "garage", name: "Garage", icon: "car", deviceCount: 0 },
  { id: "outdoor", name: "Outdoor", icon: "tree", deviceCount: 0 },
];

// ── Seed devices ──
const seedDevices: Device[] = [
  { id: "d1", name: "Ceiling Light", type: "light", room: "living-room", status: "online", isOn: true, power: 9, brightness: 80, color: "#FFFFFF", lastSeen: new Date().toISOString(), ipAddress: "192.168.1.101", manufacturer: "Philips" },
  { id: "d2", name: "Floor Lamp", type: "light", room: "living-room", status: "online", isOn: false, power: 7, brightness: 60, color: "#FFE4B5", lastSeen: new Date().toISOString(), ipAddress: "192.168.1.102", manufacturer: "IKEA" },
  { id: "d3", name: "Smart Plug - TV", type: "plug", room: "living-room", status: "online", isOn: true, power: 120, lastSeen: new Date().toISOString(), ipAddress: "192.168.1.103", manufacturer: "TP-Link" },
  { id: "d4", name: "Bedside Lamp", type: "light", room: "bedroom", status: "online", isOn: false, power: 5, brightness: 40, color: "#FFFACD", lastSeen: new Date().toISOString(), ipAddress: "192.168.1.104", manufacturer: "Philips" },
  { id: "d5", name: "Air Purifier", type: "plug", room: "bedroom", status: "online", isOn: true, power: 45, lastSeen: new Date().toISOString(), ipAddress: "192.168.1.105", manufacturer: "Dyson" },
  { id: "d6", name: "Overhead Light", type: "light", room: "kitchen", status: "online", isOn: true, power: 12, brightness: 100, color: "#FFFFFF", lastSeen: new Date().toISOString(), ipAddress: "192.168.1.106", manufacturer: "Philips" },
  { id: "d7", name: "Coffee Maker", type: "plug", room: "kitchen", status: "offline", isOn: false, power: 0, lastSeen: new Date(Date.now() - 86400000).toISOString(), ipAddress: "192.168.1.107", manufacturer: "Keurig" },
  { id: "d8", name: "Desk Lamp", type: "light", room: "office", status: "online", isOn: true, power: 6, brightness: 75, color: "#E0F0FF", lastSeen: new Date().toISOString(), ipAddress: "192.168.1.108", manufacturer: "Xiaomi" },
  { id: "d9", name: "Monitor Power", type: "plug", room: "office", status: "online", isOn: true, power: 65, lastSeen: new Date().toISOString(), ipAddress: "192.168.1.109", manufacturer: "TP-Link" },
  { id: "d10", name: "Bathroom Heater", type: "switch", room: "bathroom", status: "online", isOn: false, power: 0, lastSeen: new Date().toISOString(), ipAddress: "192.168.1.110", manufacturer: "Generic" },
  { id: "d11", name: "Garage Door", type: "switch", room: "garage", status: "online", isOn: false, power: 0, lastSeen: new Date().toISOString(), ipAddress: "192.168.1.111", manufacturer: "Chamberlain" },
  { id: "d12", name: "Garden Lights", type: "light", room: "outdoor", status: "online", isOn: true, power: 15, brightness: 50, color: "#FFF8DC", lastSeen: new Date().toISOString(), ipAddress: "192.168.1.112", manufacturer: "Philips" },
  { id: "d13", name: "Living Room AC", type: "thermostat", room: "living-room", status: "online", isOn: true, power: 3500, temperature: 22, targetTemp: 24, lastSeen: new Date().toISOString(), ipAddress: "192.168.1.113", manufacturer: "Daikin" },
  { id: "d14", name: "Ceiling Fan", type: "fan", room: "living-room", status: "online", isOn: false, power: 0, level: 60, lastSeen: new Date().toISOString(), ipAddress: "192.168.1.114", manufacturer: "Hunter" },
  { id: "d15", name: "Motion Sensor", type: "sensor", room: "living-room", status: "online", isOn: true, power: 1, lastSeen: new Date().toISOString(), ipAddress: "192.168.1.115", manufacturer: "Aqara" },
];

// ── Store ──
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export const store = {
  subscribe(fn: () => void) {
    listeners.push(fn);
    return () => { listeners = listeners.filter((l) => l !== fn); };
  },

  // ── Devices ──
  getDevices(): Device[] {
    let devices = loadJSON<Device[]>(STORAGE_KEY, []);
    if (devices.length === 0) {
      devices = seedDevices;
      saveJSON(STORAGE_KEY, devices);
    }
    return devices;
  },

  updateDevice(id: string, patch: Partial<Device>) {
    const devices = this.getDevices();
    const idx = devices.findIndex((d) => d.id === id);
    if (idx === -1) return;
    devices[idx] = { ...devices[idx], ...patch, lastSeen: new Date().toISOString() };
    saveJSON(STORAGE_KEY, devices);
    notify();
  },

  togglePower(id: string) {
    const devices = this.getDevices();
    const d = devices.find((x) => x.id === id);
    if (!d) return;
    this.updateDevice(id, { isOn: !d.isOn });
  },

  addDevice(device: Device) {
    const devices = this.getDevices();
    devices.push(device);
    saveJSON(STORAGE_KEY, devices);
    notify();
  },

  removeDevice(id: string) {
    const devices = this.getDevices().filter((d) => d.id !== id);
    saveJSON(STORAGE_KEY, devices);
    notify();
  },

  // ── Rooms ──
  getRooms(): Room[] {
    return loadJSON<Room[]>(ROOMS_KEY, defaultRooms);
  },

  addRoom(room: Room) {
    const rooms = this.getRooms();
    rooms.push(room);
    saveJSON(ROOMS_KEY, rooms);
    notify();
  },

  // ── Scenes ──
  getScenes(): Scene[] {
    return loadJSON<Scene[]>(SCENES_KEY, []);
  },

  addScene(scene: Scene) {
    const scenes = this.getScenes();
    scenes.push(scene);
    saveJSON(SCENES_KEY, scenes);
    notify();
  },

  removeScene(id: string) {
    const scenes = this.getScenes().filter((s) => s.id !== id);
    saveJSON(SCENES_KEY, scenes);
    notify();
  },

  activateScene(id: string) {
    const scenes = this.getScenes();
    const scene = scenes.find((s) => s.id === id);
    if (!scene) return;
    const devices = this.getDevices();
    for (const state of scene.deviceStates) {
      const device = devices.find((d) => d.id === state.deviceId);
      if (!device) continue;
      Object.assign(device, {
        isOn: state.power === "on",
        brightness: state.brightness ?? device.brightness,
        color: state.color ?? device.color,
      });
    }
    saveJSON(STORAGE_KEY, devices);
    notify();
  },

  // ── Schedules ──
  getSchedules(): Schedule[] {
    return loadJSON<Schedule[]>(SCHEDULES_KEY, []);
  },

  addSchedule(schedule: Schedule) {
    const schedules = this.getSchedules();
    schedules.push(schedule);
    saveJSON(SCHEDULES_KEY, schedules);
    notify();
  },

  removeSchedule(id: string) {
    const schedules = this.getSchedules().filter((s) => s.id !== id);
    saveJSON(SCHEDULES_KEY, schedules);
    notify();
  },

  toggleSchedule(id: string) {
    const schedules = this.getSchedules();
    const s = schedules.find((x) => x.id === id);
    if (!s) return;
    s.active = !s.active;
    saveJSON(SCHEDULES_KEY, schedules);
    notify();
  },
};
