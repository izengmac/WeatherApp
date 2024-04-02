import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/navigation/BottomTab';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
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
