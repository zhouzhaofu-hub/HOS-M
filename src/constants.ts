import { User, RobotStatus, HealthData, Message } from './types';

export const MOCK_USER: User = {
  id: '20260422',
  name: '大壮',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
  role: '超级管理员'
};

export const MOCK_ROBOT: RobotStatus = {
  id: 'JH-2026-A1-001',
  name: '智护助手小壮',
  status: 'online',
  battery: 84,
  location: '客厅 • 电视柜旁'
};

export const MOCK_HEALTH: HealthData = {
  heartRate: 72,
  bloodOxygen: 98,
  temperature: 36.6,
  complianceRating: 88
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'alert',
    title: '跌倒告警：实时检测',
    content: '机器人在客厅检测到张大爷发生疑似跌倒动作，已自动开启第一视角监控并触发全屋告警。',
    time: '10:24'
  },
  {
    id: '2',
    type: 'health',
    title: '用药依从性日报',
    content: '昨日用药任务已全部完成。张大爷精神状态良好，已记录至周报中。',
    time: '08:05'
  },
  {
    id: '3',
    type: 'log',
    title: '晚间巡检完成',
    content: '全屋巡检未发现安全隐患。门窗已锁，当前室温 24℃，空气质量优。',
    time: '昨天 22:30'
  }
];
