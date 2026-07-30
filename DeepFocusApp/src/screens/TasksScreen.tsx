import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, ListItem, Text, useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { RootStackParamList } from '@/navigation/types';
import { useAppStore } from '@/store/useAppStore';

type RootStackNavigation = StackNavigationProp<RootStackParamList>;

export function TasksScreen() {
  const navigation = useNavigation<RootStackNavigation>();
  const { theme } = useTheme();

  const tasks = useAppStore((state) => state.tasks);
  const activeSession = useAppStore((state) => state.activeSession);
  const deleteTask = useAppStore((state) => state.deleteTask);

  const taskBlocked = activeSession != null;

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text h3 style={{ color: theme.colors.black }}>
          Tasks
        </Text>
        <Button
          title="Add"
          type="solid"
          onPress={() => navigation.navigate('TaskEditor')}
          disabled={taskBlocked}
          icon={<Ionicons name="add" size={16} color="white" />}
        />
      </View>

      {taskBlocked ? (
        <Card>
          <Text style={{ color: theme.colors.grey5 }}>
            Task blocking active. End current study session to add or remove tasks.
          </Text>
        </Card>
      ) : null}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Card>
            <Text style={{ color: theme.colors.grey5 }}>No tasks yet. Add your first study task.</Text>
          </Card>
        }
        renderItem={({ item }) => (
          <ListItem bottomDivider containerStyle={styles.itemContainer}>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>
                {item.completedBlocks}/{item.estimatedBlocks} focus blocks
              </ListItem.Subtitle>
            </ListItem.Content>
            <Button
              type="clear"
              icon={<Ionicons name="trash-outline" size={20} color={theme.colors.error} />}
              disabled={taskBlocked}
              onPress={() => {
                Alert.alert('Delete task?', `Remove ${item.title}?`, [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteTask(item.id),
                  },
                ]);
              }}
            />
          </ListItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  list: {
    gap: 10,
    paddingBottom: 24,
  },
  itemContainer: {
    borderRadius: 12,
    marginBottom: 8,
  },
});
