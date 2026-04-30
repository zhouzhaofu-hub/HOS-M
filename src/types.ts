export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface RobotStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'charging';
  battery: number;
  location: string;
}

export interface HealthData {
  heartRate: number;
  bloodOxygen: number;
  temperature: number;
  complianceRating: number;
}

export interface Message {
  id: string;
  type: 'alert' | 'health' | 'log' | 'system';
  title: string;
  content: string;
  time: string;
}
