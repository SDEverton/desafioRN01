import React, { useState } from 'react';
import { Alert, View } from 'react-native';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dark, setDark] = useState(false);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.length !== 0) {
    setTasks(oldTask => 
      [
        ...oldTask, 
        {
          id: new Date().getTime(),
          title: newTaskTitle, 
          done: false
        }
      ]
    )
    } else {
      Alert.alert('Atenção', 'A tarefa deve possuir um título!')
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const task = tasks.findIndex(task => task.id === id)
    tasks[task].done = tasks[task].done === true ? false : true;
    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTask => oldTask.filter(task => task.id !== id));
  }

  function handleDarkMode() {
    setDark(!dark);
  }

  return (
    <View style={{ backgroundColor: dark ? '#1F1F1F' : '#fff', flex: 1 }}>
      <Header onPress={handleDarkMode} dark={dark} />

      <TodoInput addTask={handleAddTask} dark={dark} />

      <MyTasksList 
        dark={dark}
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </View>
  )
}