import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { LoadingScreen } from './LoadingScreen';
import {
  useFonts,
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';


export function CantConnect({ refresh, refreshing }) {

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>{!refreshing ?
    <View style={styles.container}>
      <MaterialIcons style={styles.icon}size={48} name='error'/>
      <Text style={styles.text}>Não encontramos nenhum aluno, confira sua conexão com a internet ou vá para a guia de cadastro</Text>
      <TouchableOpacity 
        style={styles.buttonReload}
        onPress={refresh}
      >
        <Text style={styles.text}>Recarregar</Text>
      </TouchableOpacity>
    </View>
    : null}</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  text : {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#3e3e3e',
    textAlign: 'center',
  },
  icon: {
    color: '#3e3e3e'
  },
  buttonReload: {
    backgroundColor: '#797ef6',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 5,
  }
})


