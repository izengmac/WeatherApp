import React, {useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchDataFromApi } from '../api';

function SearchScreen({route,navigation}) {
const [weatherData, setWeatherData] = useState(null)
const [city, setCity] = useState("");

handleSearch =  () => {
        const data = fetchDataFromApi("","",city)
        .then(data => {
            console.log('Search data' , data)
            setWeatherData(data)
        })
        .catch(error => {
            console.log('Error fetching data', error)
        })
    
}
console.log({})
  return (
   <View style={{
    justifyContent:'center',
    alignItems:'center',
    paddingTop:40
   }}>
    <TextInput
    style={styles.input}
    placeholder='Enter a city'
    onChangeText={(text) => setCity(text)}
    value={city}
    />
    <Button title='Search' onPress={handleSearch}></Button>
    {
        weatherData && (
            <View>
         <Text style={styles.weatherText}>
           {weatherData.name}, {weatherData.sys.country}: {weatherData.main.temp}°C
         </Text>
       </View>
        )
    }
   
   </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e3dbd5",
    },
    input: {
      marginBottom: 10,
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
export default SearchScreen