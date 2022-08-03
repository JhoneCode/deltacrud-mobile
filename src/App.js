import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'

import { useFonts, Inter_600SemiBold, inter_700bold } from '@expo-google-fonts/inter';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import { Register } from './screens/Register';
import { Home } from './screens/Home';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  useFonts({
    inter_700bold,
    Inter_600SemiBold,
  });


  return(
    <NavigationContainer>
      <StatusBar  style='auto' />
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Cadastro') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4c46c8',
          tabBarInactiveTintColor: '#eeeeee',
          headerStyle: {
            backgroundColor: '#3e3e3e',
          },
          headerRight: () => {
            return(
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20, color: '#eeeeee', fontFamily: 'Inter_600SemiBold', }}>Delta</Text>
                <Text style={{fontSize: 20, color: '#4c46c8', marginRight: 12, fontFamily: 'inter_700bold', fontWeight: 'bold'}}>CRUD</Text>
              </View>
            )
          },
          headerTintColor:'#4c46c8',
          tabBarStyle: {
            backgroundColor: '#18191A',
            borderTopWidth: 0,
          },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Cadastro' component={Register} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}


