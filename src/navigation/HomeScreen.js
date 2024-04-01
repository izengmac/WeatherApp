import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from './WeatherConditions';
import PropTypes from 'prop-types';

const API_KEY = '5d240e73bdeaa7d6c94bdcd0543d36ec';

const clothingItems = [
  { name: "Heavy Coat", image: require('../assets/coat.png') },
  { name: "Light Jacket", image: require('../assets/jacket copy.png') },
  { name: "T-Shirt", image: require('../assets/t-shirt.png') },
  { name: "Light Clothes", image: require('../assets/feather.png') },
  { name: "Sweater", image: require('../assets/sweater.png') },
  { name: "Jeans", image: require('../assets/jeans.png') },
  { name: "Dress", image: require('../assets/dress.png') },
  { name: "Skirt", image: require('../assets/skirt.png') },
  { name: "Shorts", image: require('../assets/shorts.png') },
  { name: "Summer Dress", image: require('../assets/dress (1).png') },
];

const WeatherItem = ({ city, tempvalue, windspeed, title, windspeedvalue, humidityvalue, typeweather}) => {
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
        marginRight: 8,

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
          }}>{tempvalue}</Text>
          <Text style={{
            fontSize: 20,
            color: 'white',
            position: 'relative',
            top: -25,
            left: 4
          }}>&#176;</Text>
        </Text>
        <Text style={{
          fontSize: 14,
          color: 'white'
        }}>{windspeed} {windspeedvalue} m/c | {title} {humidityvalue}</Text>
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
      return [clothingItems[1], clothingItems[4], clothingItems[6], clothingItems[5]]; // Light Jacket, Sweater, Dress Shirt, Jeans
    } else if (temp >= 15 && temp < 20) {
      return [clothingItems[2], clothingItems[4], clothingItems[6], clothingItems[7]]; // T-Shirt and Shorts, Sweater, Dress Shirt, Skirt
    } else if (temp >= 20 && temp < 25) {
      return [clothingItems[2], clothingItems[4], clothingItems[7], clothingItems[8]]; // T-Shirt and Shorts, Sweater, Skirt, Shorts
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
          setData(data);
          console.log(data)
          console.log(data)
          console.log(typeof data.weather[0].main)
          console.log(data.weather[0].main)
         
          
          
        });
    }
  };

  const temperature = data.main?.temp || '';
  const weather = data.weather ? data.weather[0].main : '';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9EC9FE', paddingTop: 76 }}>
      <Text style={{ fontWeight: "500", fontSize: 20, color: "white", marginBottom: 8, textAlign: 'center' }}>
        Clothes For Today
      </Text>
      <WeatherItem
        city={data.name ? data.name : ""}
        tempvalue={temperature}
        humidityvalue={data.main ? data.main.humidity : ""}
        windspeed="WindSpeed"
        windspeedvalue={data.wind ? data.wind.speed : ""}
        title="Current Weather"
        typeweather={data.weather && data.weather.length > 0 ? data.weather[0].main : ""}
       

      />
      <ClothingRecommendation temperature={temperature} weather={weather} />
    </View>
  );
}

WeatherItem.propTypes = {
  typeweather: PropTypes.string
};

export default HomeScreen;

