import { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { ThemedInput } from './themed-input';
import { ToDoListItems } from './to-do-list-items';

type ToDoItem = {
  id: string;
  text: string;
};

export default function ToDoList() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState<ToDoItem[]>([]);

  const addItem = useCallback(() => {
    if (!input.trim()) return;

    const randomId = Math.floor((Math.random() * 100) * 1000).toString();
    setItems((prev) => [...prev, { id: randomId, text: input.trim() }]);
    setInput('');
  }, [input]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">To Do</ThemedText>

      <ThemedView style={styles.row}>
        <ThemedInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add a task"
          returnKeyType="done"
          onSubmitEditing={addItem}
        />
        <Button title="Add" onPress={addItem} />
      </ThemedView>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ToDoListItems id={item.id} text={item.text} onDelete={removeItem} />}
        ListEmptyComponent={<ThemedText>No items yet.</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 8,
  },

});
