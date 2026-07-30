/**
 * Brand note:
 * Working app name: Foki (displayed name).
 * Alternatives considered: FocusFlip, FocusLedger, StudyHat.
 */

export type ThemePreference = 'system' | 'light' | 'dark';
export type StudyMode = 'light' | 'strict';
export type StudyPhase = 'focus' | 'shortBreak' | 'longBreak';
export type SessionStatus = 'running' | 'paused' | 'completed' | 'aborted';

export interface Task {
  id: string;
  title: string;
  notes?: string;
  estimatedBlocks: number;
  completedBlocks: number;
  createdAt: number;
  updatedAt: number;
}

export interface Durations {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
}

export interface Settings {
  durations: Durations;
  blocksBeforeLongBreak: number;
  mode: StudyMode;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  keepAwakeEnabled: boolean;
  themePreference: ThemePreference;
}

export interface DistractionEvent {
  id: string;
  sessionId: string;
  leftAt: number;
  returnedAt?: number;
}

export interface CompletedSession {
  id: string;
  taskId: string;
  phase: StudyPhase;
  blockNumber: number;
  durationMs: number;
  startedAt: number;
  completedAt: number;
  distractionCount: number;
}

export interface ActiveSession {
  id: string;
  taskId: string;
  phase: StudyPhase;
  blockNumber: number;
  /** Wall-clock timestamp by which the current phase should finish. */
  endAt: number;
  /** Total milliseconds already spent paused before the current resume. */
  pausedAccumMs: number;
  status: SessionStatus;
  /** Snapshot of the full phase duration (ms) used when this phase started. */
  phaseDurationMs: number;
}

export interface AppStateSnapshot {
  activeSession: ActiveSession | null;
  warningPending: boolean;
}
