import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/navigation/BottomTab';
import SearchScreen from './src/screens/SearchScreen';
import { weatherConditions } from './src/navigation/WeatherConditions';
const API_KEY = "5d240e73bdeaa7d6c94bdcd0543d36ec";

const Stack = createNativeStackNavigator();


export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Gettig Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(json => {
        
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }

  render() {
    const {isLoading,weatherCondition,temperature} = this.state;
    console.log(weatherCondition)
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
       weather={weatherCondition}
       
     />
     </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
