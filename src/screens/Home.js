import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AlumnList } from '../components/AlumnList';


export function Home() {

  return (
    <SafeAreaView style={styles.container}>
      <AlumnList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    width: '100%',
    backgroundColor: '#18191A',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
