import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import TodoPage from './Pages/todo';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TodoPage listTitle={'Groceries'}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
