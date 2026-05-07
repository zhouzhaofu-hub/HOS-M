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
    id: '4',
    type: 'alert',
    title: '关键预警：生命体征异常',
    content: '非接触式监测显示张大爷心率（48 BPM）与呼吸频率（10 次/分）显著低于正常阈值，请立即确认主人状态。',
    time: '09:42'
  },
  {
    id: '2',
    type: 'prompt',
    title: '用药依从性日报',
    content: '昨日用药任务已全部完成。张大爷精神状态良好，已记录至周报中。',
    time: '08:05'
  },
  {
    id: '3',
    type: 'info',
    title: '晚间巡检完成',
    content: '全屋巡检未发现安全隐患。门窗已锁，当前室温 24℃，空气质量优。',
    time: '昨天 22:30'
  },
  {
    id: '5',
    type: 'info',
    title: '系统软件更新成功',
    content: '智护OS 1.0.0 稳定版已成功安装。本次更新优化了低光环境下的视觉算法，提升了跟随稳定性。',
    time: '昨天 15:45'
  },
  {
    id: '6',
    type: 'prompt',
    title: '血压监测提醒',
    content: '上午 10:00 监测到血压 128/84，略高于平均值。建议主人多喝水并保持静坐。',
    time: '2026-05-04 10:15'
  }
];
