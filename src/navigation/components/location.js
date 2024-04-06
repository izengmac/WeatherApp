import React from 'react'
import {View,Text} from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';



function location ({SearchScreen,city,data, time, navigation}) {
    console.log('City Name', city)
  return (
    <View style={{
        paddingVertical:80,
        paddingHorizontal:12
      }}>
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

export default location;