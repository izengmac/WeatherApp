import React, { useCallback, useEffect, useState,useRef } from 'react';
import { View, Text, Image,TextInput,StyleSheet, Button} from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from './WeatherConditions';
import PropTypes from 'prop-types';
import { fetchDataFromApi } from '../api';
import {debounce} from 'lodash'

const API_KEY = '7ada4c6a1f4922f74e2893378a54776b';

const clothingItems = [
  { name: "Тяжелое пальто", image: require('../assets/coat.png') },
  { name: "Легкая куртка", image: require('../assets/jacket copy.png') },
  { name: "футболка", image: require('../assets/t-shirt.png') },
  { name: "легкая одежда", image: require('../assets/feather.png') },
  { name: "Свитер", image: require('../assets/sweater.png') },
  { name: "Джинсы", image: require('../assets/jeans.png') },
  { name: "Платье", image: require('../assets/dress.png') },
  { name: "Юбка", image: require('../assets/skirt.png') },
  { name: "Шорты", image: require('../assets/shorts.png') },
  { name: "Летнее платье", image: require('../assets/dress (1).png') },
];

const WeatherItem = ({ city, tempvalue, windspeed, title, windspeedvalue, humidityvalue, typeweather,unity}) => {
  console.log(typeof typeweather)
  
  return (
    <View style={{
      backgroundColor: "#7899EA",
      width: 370,
      height: 117,
      borderRadius: 16,
      flexDirection: 'row',
      paddingBottom: 10,
      paddingVertical: 10,
      marginBottom: 16,
      paddingHorizontal: 20

    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        borderRightColor: 'black',
        borderRightWidth: 1,
        marginRight: 4,

      }}>
        <Text style={{
          fontSize: 18,
          color: 'white'
        }}>{city}</Text>
        <Text style={{
          fontSize: 36,
          color: 'white',
          flexDirection: 'row',
          alignItems: 'flex-start'
        }}>
          <Text style={{
            fontSize: 36,
            color: 'white'
          }}>{tempvalue}{`\u00B0`}</Text>
         
        </Text>
        <Text style={{
          fontSize: 14,
          color: 'white'
        }}>{windspeed} {windspeedvalue} м/с | {title} {humidityvalue}{unity}</Text>
      </View>
      <View>
        <View style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <MaterialCommunityIcons
          size={72}
          name={weatherConditions[typeweather]?.icon || ''}
          color={'#fff'}
        />
         
        </View>
      </View>
    </View>
  )
};

const ClothingRecommendation = ({ temperature, weather }) => {
  const [recommendedClothes, setRecommendedClothes] = useState([]);

  useEffect(() => {
    setRecommendedClothes(getRecommendedClothes(temperature, weather));
  }, [temperature, weather]);

  const getRecommendedClothes = (temp, weather) => {
    if (weather === 'Rain') {
      return [clothingItems[1], clothingItems[5], clothingItems[6], clothingItems[7]]; // Light Jacket, Jeans, Dress Shirt, Skirt (Rainy weather)
    } else if (temp < 0) {
      return [clothingItems[0], clothingItems[4], clothingItems[5]]; // Heavy Coat, Sweater, Jeans
    } else if (temp >= 0 && temp < 5) {
      return [clothingItems[0], clothingItems[4], clothingItems[5]]; // Heavy Coat, Sweater, Jeans
    } else if (temp >= 5 && temp < 10) {
      return [clothingItems[1], clothingItems[4], clothingItems[5]]; // Light Jacket, Sweater, Jeans
    } else if (temp >= 10 && temp < 15) {
      return [clothingItems[1], clothingItems[4], clothingItems[6]];// Light Jacket, Sweater, Dress Shirt, Jeans
    } else if (temp >= 15 && temp < 20) {
      return [clothingItems[2], clothingItems[4], clothingItems[6]]; // T-Shirt and Shorts, Sweater, Dress Shirt, Skirt
    } else if (temp >= 20 && temp < 25) {
      return [clothingItems[2], clothingItems[4], clothingItems[7]]; // T-Shirt and Shorts, Sweater, Skirt, Shorts
    } else if (temp >= 25 && temp < 30) {
      return [clothingItems[2], clothingItems[8], clothingItems[9]]; // T-Shirt and Shorts, Shorts, Summer Dress
    } else {
      return [clothingItems[3]]; // Light Clothes
    }
  };

  return (
    <View style={{
       justifyContent:'',
       width:'100%',
        height:'80%',
       backgroundColor:'white',
       borderTopLeftRadius:32,
       borderTopRightRadius:32,
       paddingVertical:12
       
       }} >

      {recommendedClothes.map((item, index) => (
        <View key={index}  style={{ alignItems: 'center',flexDirection:'row',justifyContent:'space-around',marginBottom:6}}>
            <Image source={item.image} style={{ width: 100, height: 100}} />
          <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
           {item.name}
          </Text>
        
        </View>
      ))}
    </View>
  );
};

function HomeScreen() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");  
  const textInputRef = useRef(null);

  const handleSearch =  (value) => {
    const json = fetchDataFromApi("","",value)
    .then(json => {
        setData(json)
        textInputRef.current.clear();
        console.log('Search data' , json)
    })
    .catch(error => {
        console.log('Error fetching data', error)
    })
  } 
  const handleTextDebounce = useCallback(debounce(handleSearch,1200), [])


  

  const temperature = data.main?.temp || '';
  const weather = data.weather ? data.weather[0].main : '';
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9EC9FE', paddingTop: 76 }}>
     <View style={{
      flexDirection:'row',
      marginTop:100,
     }}>
     <TextInput
          style={styles.input}
          placeholder='Введите город'
          onChangeText={handleTextDebounce}
          ref={textInputRef}
          
    />
    
     </View>
      <Text style={{ fontWeight: "500", fontSize: 20, color: "white", marginBottom: 8, textAlign: 'center' , paddingVertical:15}}>
      Одежда на сегодняшний день
      </Text>
      <WeatherItem
        city={data.name ? data.name : ""}
        tempvalue={temperature}
        humidityvalue={data.main ? data.main.humidity : ""}
        windspeed="Скорость ветра"
        windspeedvalue={data.wind ? data.wind.speed : ""}
        title="Влажность"
        unity='%'
        typeweather={data.weather && data.weather.length > 0 ? data.weather[0].main : ""}
       

      />
      <ClothingRecommendation temperature={temperature} weather={weather} />
    </View>
  );
}

WeatherItem.propTypes = {
  typeweather: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3dbd5",
  },
  input: {
   
    paddingHorizontal: 10,
    width: 200,
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius:16
  },
  weatherText: {
    fontSize: 20,
    fontWeight: "bold",
  },
 });
export default HomeScreen;

