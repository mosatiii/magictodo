import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: taskText.trim(), completed: false },
      ]);
      setTaskText('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const renderTask = ({ item }: { item: Task }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.delete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <TouchableOpacity
        onPress={() => toggleTask(item.id)}
        style={styles.task}
      >
        <Text style={item.completed ? styles.completed : undefined}>{item.text}</Text>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add new task"
          value={taskText}
          onChangeText={setTaskText}
          style={styles.input}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  inputRow: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
  },
  task: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  delete: {
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 4,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});
