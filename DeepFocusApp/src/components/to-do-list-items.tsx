import { memo, useCallback } from 'react';
import { Button, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type ToDoListItemsProps = {
  id: string;
  text: string;
  onDelete: (id: string) => void;
};

export const ToDoListItems = memo(function ToDoListItems({ id, text, onDelete }: ToDoListItemsProps) {
  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <ThemedView style={styles.item}>
      <ThemedText style={styles.itemText}>{text}</ThemedText>
      <Button title="Remove" onPress={handleDelete} />
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 8,
  },
  itemText: {
    flex: 1,
  },
});
