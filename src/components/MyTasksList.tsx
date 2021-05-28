import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, FlatListProps } from 'react-native';

interface IFlatList {
  dark: boolean;
}

function FlatListHeaderComponent({ dark }: IFlatList) {
  return (
    <View>
      <Text style={[styles.header, { color: dark ? '#FF79C6' : '#3D3D4D' }]}>Minhas tasks</Text>
    </View>
  )
}

interface MyTasksListProps {
  tasks?: {
    id: number;
    title: string;
    done: boolean;
  }[];
  dark: boolean;
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
}

export function MyTasksList({ tasks, onLongPress, onPress, dark }: MyTasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            onPress={() => onPress(item.id)} 
            onLongPress={() => onLongPress(item.id)} 
            style={item.done ? styles.taskButtonDone : styles.taskButton}
          >
            <View 
              testID={`marker-${index}`}
              style={
                item.done ? [styles.taskMarkerDone, 
                  {backgroundColor: dark ? '#FF79C6' : 'rgba(25, 61, 223, 0.1)'}] : 
                  [styles.taskMarker, { borderColor: dark ? '#FF79C6' : '#3D3D4D' }]}
            />
            <Text 
              style={item.done ? [styles.taskTextDone, {color: dark ? '#FF79C6' : '#A09CB1'}] : [styles.taskText, {color: dark ? '#FF79C6' : '#A09CB1'}]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )
      }}
      ListHeaderComponent={<FlatListHeaderComponent dark={dark} />}
      ListHeaderComponentStyle={{
        marginBottom: 20
      }}
      style={{
        marginHorizontal: 24,
        marginTop: 32
      }}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    color: '#3D3D4D',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D3D4D',
    marginRight: 10
  },
  taskText: {
    color: '#3D3D4D',
  },
  taskButtonDone: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(25, 61, 223, 0.1)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#273FAD',
    marginRight: 10
  },
  taskTextDone: {
    color: '#A09CB1',
    textDecorationLine: 'line-through'
  }
})