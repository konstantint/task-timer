export interface TimerState {
  id: string;
  name: string;
  isRunning: boolean;
  startTime: number;
  accumulatedSeconds: number;
}
