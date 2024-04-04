import React, {useEffect, useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { fetchDataFromApi } from '../api';
import LocationComponent from '../navigation/components/location'
import { FlatList } from 'react-native-gesture-handler';

function SearchScreen({route,navigation}) {
const [weatherData, setWeatherData] = useState(null)
const [city, setCity] = useState("");    
console.log('weatherdata' ,weatherData)

handleSearch =  () => {
  const json = fetchDataFromApi("","",city)
  .then(json => {
      setWeatherData(json)
      console.log('Search data' , json)
  })
  .catch(error => {
      console.log('Error fetching data', error)
  })
}



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
    <Button title='Search' onPress={handleSearch()}></Button>
    {
        weatherData && (
            <View>
         <Text style={styles.weatherText}>
           {weatherData.name}, {weatherData.sys.country}: {weatherData.main.temp}°C
         </Text>
       </View>
        )
    }
    {city && weatherData && (
        <FlatList
          style={{
            flex: 1,
            backgroundColor: '#ffffff'
          }}
          data={[weatherData]}  
         // Convert weatherData to an array for FlatList
          renderItem={({ item }) => <LocationComponent item={item} navigation={navigation} />} // Pass item instead of city directly
          keyExtractor={item => item.id.toString()} // Use item.id for keyExtractor
          showsVerticalScrollIndicator={false}
        />
      )}
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