import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  type ActiveSession,
  type CompletedSession,
  type DistractionEvent,
  type Settings,
  type StudyMode,
  type StudyPhase,
  type Task,
  type ThemePreference,
} from '@/types';

const STORAGE_NAME = 'foki-store';

const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, value);
  },
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const defaultDurationMinutes = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
};

const initialSettings: Settings = {
  durations: defaultDurationMinutes,
  blocksBeforeLongBreak: 4,
  mode: 'light',
  soundEnabled: true,
  notificationsEnabled: true,
  keepAwakeEnabled: true,
  themePreference: 'system',
};

export interface AppState {
  settings: Settings;
  tasks: Task[];
  activeSession: ActiveSession | null;
  completedSessions: CompletedSession[];
  distractionEvents: DistractionEvent[];
  warningPending: boolean;
  _hasHydrated: boolean;
}

export interface AppActions {
  setHasHydrated: (hydrated: boolean) => void;

  // Settings
  updateDurations: (patch: Partial<Settings['durations']>) => void;
  setBlocksBeforeLongBreak: (value: number) => void;
  setMode: (mode: StudyMode) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setKeepAwakeEnabled: (enabled: boolean) => void;
  setThemePreference: (preference: ThemePreference) => void;
  resetSettings: () => void;

  // Tasks
  addTask: (draft: Pick<Task, 'title' | 'notes' | 'estimatedBlocks'>) => Task;
  updateTask: (id: string, patch: Partial<Pick<Task, 'title' | 'notes' | 'estimatedBlocks'>>) => void;
  deleteTask: (id: string) => void;
  incrementTaskCompletedBlocks: (id: string) => void;

  // Timer / sessions
  startSession: (taskId: string, phaseDurationMs: number, phase: StudyPhase) => void;
  pauseSession: () => void;
  resumeSession: (phaseDurationMs: number) => void;
  stopSession: () => void;
  completeSession: () => void;
  advancePhase: (phaseDurationMs: number, phase: StudyPhase) => void;

  // Distractions
  recordDistraction: () => void;
  returnFromDistraction: () => void;
  clearWarning: () => void;

  // Stats
  getTaskStats: (taskId: string) => { completedSessions: number; totalMinutes: number };
}

export type AppStore = AppState & AppActions;

const resetToInitial = () => {
  const now = Date.now();
  return {
    settings: initialSettings,
    tasks: [],
    activeSession: null,
    completedSessions: [],
    distractionEvents: [],
    warningPending: false,
    _hasHydrated: false,
  };
};

let sessionCounter = 0;
let taskCounter = 0;
let distractionCounter = 0;

export const generateTaskId = () => `task_${Date.now()}_${taskCounter++}`;
export const generateSessionId = () => `session_${Date.now()}_${sessionCounter++}`;
export const generateDistractionId = () => `distraction_${Date.now()}_${distractionCounter++}`;

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...resetToInitial(),

      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),

      // Settings actions
      updateDurations: (patch) =>
        set((state) => ({
          settings: {
            ...state.settings,
            durations: { ...state.settings.durations, ...patch },
          },
        })),
      setBlocksBeforeLongBreak: (value) =>
        set((state) => ({
          settings: { ...state.settings, blocksBeforeLongBreak: value },
        })),
      setMode: (mode) => set((state) => ({ settings: { ...state.settings, mode } })),
      setSoundEnabled: (enabled) =>
        set((state) => ({ settings: { ...state.settings, soundEnabled: enabled } })),
      setNotificationsEnabled: (enabled) =>
        set((state) => ({ settings: { ...state.settings, notificationsEnabled: enabled } })),
      setKeepAwakeEnabled: (enabled) =>
        set((state) => ({ settings: { ...state.settings, keepAwakeEnabled: enabled } })),
      setThemePreference: (preference) =>
        set((state) => ({ settings: { ...state.settings, themePreference: preference } })),
      resetSettings: () => set((state) => ({ settings: initialSettings })),

      // Task actions
      addTask: (draft) => {
        const now = Date.now();
        const task: Task = {
          id: generateTaskId(),
          title: draft.title,
          notes: draft.notes ?? '',
          estimatedBlocks: Math.max(1, draft.estimatedBlocks),
          completedBlocks: 0,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ tasks: [task, ...state.tasks] }));
        return task;
      },
      updateTask: (id, patch) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...patch,
                  updatedAt: Date.now(),
                }
              : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      incrementTaskCompletedBlocks: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completedBlocks: task.completedBlocks + 1, updatedAt: Date.now() }
              : task
          ),
        })),

      // Timer / session actions
      startSession: (taskId, phaseDurationMs, phase) => {
        const session: ActiveSession = {
          id: generateSessionId(),
          taskId,
          phase,
          blockNumber: 1,
          endAt: Date.now() + phaseDurationMs,
          pausedAccumMs: 0,
          status: 'running',
          phaseDurationMs,
        };
        set({ activeSession: session, warningPending: false });
      },
      pauseSession: () =>
        set((state) => {
          if (state.activeSession == null || state.activeSession.status !== 'running')
            return state;
          const elapsed = state.activeSession.phaseDurationMs - (state.activeSession.endAt - Date.now());
          return {
            activeSession: {
              ...state.activeSession,
              status: 'paused',
              pausedAccumMs: state.activeSession.pausedAccumMs + Math.max(0, elapsed),
            },
          };
        }),
      resumeSession: (phaseDurationMs) =>
        set((state) => {
          if (state.activeSession == null || state.activeSession.status !== 'paused')
            return state;
          return {
            activeSession: {
              ...state.activeSession,
              status: 'running',
              endAt: Date.now() + phaseDurationMs,
              phaseDurationMs,
            },
          };
        }),
      stopSession: () => set({ activeSession: null, warningPending: false }),
      completeSession: () =>
        set((state) => {
          if (state.activeSession == null) return state;
          const completed: CompletedSession = {
            id: state.activeSession.id,
            taskId: state.activeSession.taskId,
            phase: state.activeSession.phase,
            blockNumber: state.activeSession.blockNumber,
            durationMs: state.activeSession.phaseDurationMs,
            startedAt: state.activeSession.endAt - state.activeSession.phaseDurationMs,
            completedAt: Date.now(),
            distractionCount: state.distractionEvents.filter(
              (d) => d.sessionId === state.activeSession!.id
            ).length,
          };
          return {
            completedSessions: [completed, ...state.completedSessions],
            activeSession: null,
            warningPending: false,
          };
        }),
      advancePhase: (phaseDurationMs, phase) =>
        set((state) => {
          if (state.activeSession == null) return state;
          const blockNumber = state.activeSession.blockNumber + (phase === 'focus' ? 1 : 0);
          return {
            activeSession: {
              ...state.activeSession,
              phase,
              blockNumber,
              endAt: Date.now() + phaseDurationMs,
              phaseDurationMs,
              status: 'running',
            },
          };
        }),

      // Distraction actions
      recordDistraction: () =>
        set((state) => {
          if (state.activeSession == null) return state;
          const event: DistractionEvent = {
            id: generateDistractionId(),
            sessionId: state.activeSession.id,
            leftAt: Date.now(),
          };
          return {
            distractionEvents: [event, ...state.distractionEvents],
            warningPending: true,
          };
        }),
      returnFromDistraction: () =>
        set((state) => {
          const event = state.distractionEvents.find(
            (d) => d.sessionId === state.activeSession?.id && d.returnedAt == null
          );
          if (event == null) return state;
          return {
            distractionEvents: state.distractionEvents.map((d) =>
              d.id === event.id ? { ...d, returnedAt: Date.now() } : d
            ),
          };
        }),
      clearWarning: () => set({ warningPending: false }),

      // Stats
      getTaskStats: (taskId) => {
        const sessions = get().completedSessions.filter((s) => s.taskId === taskId);
        const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMs / 60000, 0);
        return { completedSessions: sessions.length, totalMinutes };
      },
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        settings: state.settings,
        tasks: state.tasks,
        activeSession: state.activeSession,
        completedSessions: state.completedSessions,
        distractionEvents: state.distractionEvents,
        warningPending: state.warningPending,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error == null && state != null) {
            state.setHasHydrated(true);
          } else {
            state?.setHasHydrated(true);
          }
        };
      },
    }
  )
);

export const useHydrated = () => useAppStore((state) => state._hasHydrated);
