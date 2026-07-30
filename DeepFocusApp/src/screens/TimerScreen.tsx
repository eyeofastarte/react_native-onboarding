import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Button, Card, Text, useTheme } from '@rneui/themed';

import { useSessionCountdown } from '@/hooks/useSessionCountdown';
import { formatRemaining, phaseDurationMs } from '@/lib/studyTimer';
import { useAppStore } from '@/store/useAppStore';

export function TimerScreen() {
  const { theme } = useTheme();
  const tasks = useAppStore((state) => state.tasks);
  const settings = useAppStore((state) => state.settings);
  const startSession = useAppStore((state) => state.startSession);
  const stopSession = useAppStore((state) => state.stopSession);
  const completeSession = useAppStore((state) => state.completeSession);
  const incrementTaskCompletedBlocks = useAppStore((state) => state.incrementTaskCompletedBlocks);

  const { activeSession, remainingMs, isRunning } = useSessionCountdown();
  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeSession?.taskId),
    [activeSession?.taskId, tasks]
  );

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(tasks[0]?.id ?? null);
  const completedGuardRef = useRef<string | null>(null);

  useEffect(() => {
    if (tasks.length === 0) {
      setSelectedTaskId(null);
      return;
    }

    const stillExists = selectedTaskId != null && tasks.some((task) => task.id === selectedTaskId);
    if (!stillExists) {
      setSelectedTaskId(tasks[0].id);
    }
  }, [selectedTaskId, tasks]);

  useEffect(() => {
    if (!isRunning || activeSession == null || remainingMs > 0) return;
    if (completedGuardRef.current === activeSession.id) return;

    completedGuardRef.current = activeSession.id;
    incrementTaskCompletedBlocks(activeSession.taskId);
    completeSession();
    Alert.alert('Session complete', 'Nice work. Focus block finished.');
  }, [activeSession, completeSession, incrementTaskCompletedBlocks, isRunning, remainingMs]);

  const onStart = () => {
    if (selectedTaskId == null) {
      Alert.alert('Task required', 'Create and select a task before starting the timer.');
      return;
    }

    const durationMs = phaseDurationMs(settings, 'focus');
    startSession(selectedTaskId, durationMs, 'focus');
    Alert.alert('Focus mode started', 'If you leave Foki, you will get a focus warning.');
  };

  const onStop = () => {
    stopSession();
  };

  return (
    <ScrollView style={[styles.screen, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <Text h2 style={{ color: theme.colors.black }}>
        Foki
      </Text>
      <Text style={{ color: theme.colors.grey5 }}>Deep focus for one task at a time.</Text>

      <Card>
        <Text style={[styles.phase, { color: theme.colors.grey5 }]}>
          {isRunning ? 'FOCUS SESSION' : 'READY'}
        </Text>
        <Text style={[styles.timer, { color: theme.colors.black }]}>
          {isRunning ? formatRemaining(remainingMs) : `${settings.durations.focusMinutes}:00`}
        </Text>

        <View style={styles.row}>
          {!isRunning ? (
            <Button title="Start Session" onPress={onStart} disabled={selectedTaskId == null} />
          ) : (
            <Button title="End Session" color="error" onPress={onStop} />
          )}
        </View>

        <Text style={{ color: theme.colors.grey5, marginTop: 10 }}>
          Task: {activeTask?.title ?? tasks.find((task) => task.id === selectedTaskId)?.title ?? 'None selected'}
        </Text>
      </Card>

      <Card>
        <View style={styles.taskHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.black }]}>Task Queue</Text>
          {isRunning && <Badge value="Blocked while studying" status="warning" />}
        </View>

        {tasks.length === 0 ? (
          <Text style={{ color: theme.colors.grey5 }}>No tasks yet. Add one in Tasks tab.</Text>
        ) : (
          <View style={styles.taskList}>
            {tasks.map((task) => {
              const selected = selectedTaskId === task.id;
              const locked = isRunning && activeSession?.taskId !== task.id;
              return (
                <Pressable
                  key={task.id}
                  onPress={() => !isRunning && setSelectedTaskId(task.id)}
                  disabled={isRunning}
                  style={[
                    styles.taskItem,
                    {
                      borderColor: selected ? theme.colors.primary : theme.colors.greyOutline,
                      backgroundColor: locked ? theme.colors.grey0 : theme.colors.white,
                      opacity: locked ? 0.65 : 1,
                    },
                  ]}>
                  <Text style={{ color: theme.colors.black, fontWeight: selected ? '700' : '500' }}>
                    {task.title}
                  </Text>
                  <Text style={{ color: theme.colors.grey5, fontSize: 12 }}>
                    {task.completedBlocks}/{task.estimatedBlocks} blocks
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  phase: {
    textAlign: 'center',
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '700',
  },
  timer: {
    textAlign: 'center',
    fontSize: 52,
    fontWeight: '800',
    marginVertical: 8,
  },
  row: {
    alignItems: 'center',
    marginTop: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  taskList: {
    gap: 10,
  },
  taskItem: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
});
