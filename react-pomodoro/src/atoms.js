import { atom } from 'recoil';

export const timerState = atom({
  key: 'timerState',
  default: 25 * 60, // 25 minutes in seconds
});

export const roundState = atom({
  key: 'roundState',
  default: 0,
});

export const totalRoundsState = atom({
  key: 'totalRoundsState',
  default: 4,
});

export const goalState = atom({
  key: 'goalState',
  default: 0,
});

export const totalGoalsState = atom({
  key: 'totalGoalsState',
  default: 12,
});

export const isRunningState = atom({
  key: 'isRunningState',
  default: false,
});
