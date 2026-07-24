import { useTheme } from '@/hooks/use-theme';
import { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { ThemedInput } from './themed-input';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { ToDoListItems } from './to-do-list-items';
import { useTranslation } from 'react-i18next';

type ToDoItem = {
  id: string;
  text: string;
};

export default function ToDoList() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState<ToDoItem[]>([]);

  const { t, i18n } = useTranslation();
  const theme = useTheme();

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
    <ThemedView style={{...styles.container, backgroundColor: theme.backgroundElement}}>
      <ThemedText type="title">{t('to-do-list')}</ThemedText>

      <ThemedView style={styles.inputView}>
        <ThemedInput
          style={{...styles.input, outline: 'none'}}
          type='default'
          value={input}
          onChangeText={setInput}
          placeholder={t('add-a-task')}
          returnKeyType="done"
          onSubmitEditing={addItem}
        />
        <Button title={t('add-btn')} onPress={addItem} />
      </ThemedView>

      <FlatList
        style={styles.stFlatList}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ToDoListItems style={styles.listItemWrapper} id={item.id} text={item.text} onDelete={removeItem} />}
        ItemSeparatorComponent={() => <ThemedView style={{...styles.listItemSeparator, backgroundColor: theme.background}} />}
        ListEmptyComponent={<ThemedText>{t('no-items-yet')+'.'}</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stFlatList: {
    marginBottom: 2
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    width: '100%'
  },
  inputView: {
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    padding: 8,
    marginRight: 2,
  },
  listItemWrapper: {
    marginRight: 2,
    backgroundColor: 'transparent',
  },
  listItemSeparator: {
    height: 2,
  },

});
