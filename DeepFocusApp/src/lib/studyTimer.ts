import type { Settings, StudyPhase } from '@/types';

export function phaseDurationMs(settings: Settings, phase: StudyPhase = 'focus') {
  switch (phase) {
    case 'shortBreak':
      return settings.durations.shortBreakMinutes * 60_000;
    case 'longBreak':
      return settings.durations.longBreakMinutes * 60_000;
    case 'focus':
    default:
      return settings.durations.focusMinutes * 60_000;
  }
}

export function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
