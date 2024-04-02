import { View,Text,Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY ="5d240e73bdeaa7d6c94bdcd0543d36ec";
import * as Location from 'expo-location';
import SearchScreen from '../screens/SearchScreen';

function LocationScreen({navigation}) {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [data, setData] =  useState({});

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
        fetchDataFromApi(location.coords.latitude, location.coords.longitude);
      })();
    }, [])
  
    const fetchDataFromApi = (latitude, longitude) => {
      if(latitude && longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
  
        // console.log(data)
        console.log(data)
        setData(data)
        })
      }
      
    }
  return (
    <View style={{
      paddingVertical:80,
      paddingHorizontal:12
    }}>
        <Text style={{
          color:'#1B6BB1',
          fontSize:20,
          fontWeight:"400",
          marginBottom:16,
          
        }}
        onPress={() => navigation.navigate('Search', { data1: data })}
        >Add</Text>
        <Text style={{
          fontWeight:500,
          fontSize:40,
          fontWeight:"500"
        }}>Location</Text>
        <View style={{
           backgroundColor:'#121212',
           borderRadius:20,
           width:351,
           height:73,
           padding:8,
           paddingHorizontal:32,
           flexDirection:'row',
           justifyContent:'space-between',
           alignItems:'center'

        }}>
            <View style={{
                 
                }}>
                <Text style={{
                  color:"white",
                  fontSize:24,

                }}
                >{data.name ? data.name : ""}</Text>
                <Text style={{
                  fontSize:20,
                  fontWeight:200,
                  color:'white'
                }}
                >{time}</Text>
            </View>
            <FontAwesome5 name="location-arrow" size={24} color="#1A41C3" />
        </View>
    </View>
  )
}

export default LocationScreen