import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';
import LocationScreen from './LocationScreen';
import SettingsScreen from './SettingsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import React, { useEffect, useState } from 'react';



const Tab = createMaterialBottomTabNavigator();


function MyTabs() {
  
    const theme = useTheme();
    theme.colors.secondaryContainer = "transperent"
  return (
    <Tab.Navigator
    barStyle={{ backgroundColor: '#9EC9FE' }}
    activeColor="#0E42F2"
    inactiveColor="#000000"
    >
      <Tab.Screen 
      name="Location"
      component={LocationScreen}
      options={{
        tabBarLabel: 'Локация',
        tabBarIcon: ({ color }) => (
            <Entypo name="location-pin" size={24} color={color} />
            ),
      }}
      />
      <Tab.Screen 
      name="Weather" 
      component={HomeScreen}
      barStyle={{ backgroundColor: 'blue' }}
      options={{
        tabBarLabel: 'Погода',
        tabBarIcon: ({ color }) => (
            <Entypo name="light-up" size={24} color={color}/>
            ),
      }}
      />
      <Tab.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Настройки',
        shifting:false,
        tabBarBadge:false,
        tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color="black" />
            ),
      }}
      />
      
    </Tab.Navigator>
  );
}

export default MyTabs