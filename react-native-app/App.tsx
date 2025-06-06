import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import DrawerContent from './components/DrawerContent';
import RecorderScreen from './components/RecorderScreen';
import TodoScreen from './components/TodoScreen';
import Header from './components/Header';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Tab.Screen
        name="Recorder"
        component={RecorderScreen}
        options={{ tabBarLabel: 'Recorder' }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{ tabBarLabel: 'Todo' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
          >
            <Drawer.Screen name="Home" component={Tabs} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
