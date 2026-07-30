import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { useAppStore } from '@/store/useAppStore';

export function TaskEditorScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const addTask = useAppStore((state) => state.addTask);

  const [title, setTitle] = useState('');
  const [estimatedBlocks, setEstimatedBlocks] = useState('1');

  const onSave = () => {
    const cleanTitle = title.trim();
    const parsedBlocks = Number.parseInt(estimatedBlocks, 10);

    if (cleanTitle.length < 2) {
      Alert.alert('Title too short', 'Use at least 2 characters.');
      return;
    }

    addTask({
      title: cleanTitle,
      notes: '',
      estimatedBlocks: Number.isFinite(parsedBlocks) ? Math.max(1, parsedBlocks) : 1,
    });

    navigation.goBack();
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.black }]}>Create study task</Text>

      <Input label="Task title" value={title} onChangeText={setTitle} placeholder="Ex: Review biology chapter 4" />
      <Input
        label="Estimated focus blocks"
        keyboardType="number-pad"
        value={estimatedBlocks}
        onChangeText={setEstimatedBlocks}
      />

      <Button title="Save Task" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
});
