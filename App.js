import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/navigation/BottomTab';
import SearchScreen from './src/screens/SearchScreen';
import { weatherConditions } from './src/navigation/WeatherConditions';
const API_KEY = "5d240e73bdeaa7d6c94bdcd0543d36ec";

const Stack = createNativeStackNavigator();


function App () {
  
    return(
    <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen
        name='Botttom'
        component={BottomTab}
        options={{headerShown:false}}
      />
     <Stack.Screen
       name="Search"
       component={SearchScreen}
     />
     </Stack.Navigator>
    </NavigationContainer>
    );
  }
export default App
