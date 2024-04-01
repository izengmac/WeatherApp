import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/navigation/BottomTab';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab></BottomTab>
    </NavigationContainer>
  );
}
