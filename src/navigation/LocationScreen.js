import { View,Text,Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY ="5d240e73bdeaa7d6c94bdcd0543d36ec";
import * as Location from 'expo-location';
import SearchScreen from '../screens/SearchScreen';
import { fetchDataFromApi } from '../api.js';
import LocationComponent from "./components/location.js"
import { FlatList } from 'react-native-web';

function LocationScreen({navigation}) {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [data, setData] =  useState({});
    console.log('data', data)
    console.log(data)
    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
        
            setDate(days[day] + ', ' + date+ ' ' + months[month]) 
        
        }, 1000);
    }, [])

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          fetchDataFromApi("40.7128", "-74.0060")
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
       const Apiconst =  fetchDataFromApi(location.coords.latitude, location.coords.longitude);
       const Apiconss = fetchDataFromApi(location.coords.latitude, location.coords.longitude, '')
          .then(data => {
            
            setData(data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    

      })();
    }, [])

  return (
   <View>
    <LocationComponent data={data} time={time} navigation={navigation}/>
   
   </View>
  )
}

export default LocationScreen