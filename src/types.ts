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

export interface ServiceOwner {
  id: string;
  name: string;
  avatar: string;
  age: number;
  bloodType: string;
  phone: string;
  address: string;
  medicalHistory: string;
  medicalRecord: string;
  isDefault: boolean;
}

export interface Message {
  id: string;
  type: 'alert' | 'health' | 'log' | 'system';
  title: string;
  content: string;
  time: string;
}
