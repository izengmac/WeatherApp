import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
function SearchScreen() {
  return (
   <View style={{
    justifyContent:'center',
    alignItems:'center',
    paddingTop:40
   }}>
    <TextInput
    style={styles.input}
    placeholder='Enter a city'
    />
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