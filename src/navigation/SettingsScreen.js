import React from 'react'
import { View,Text,Image} from 'react-native'

function SettingsScreen() {
  return (
   <View  style={{
    paddingTop:100,
    alignItems:'center',
    justifyContent:'center'
 }}>
     <View style={{
        paddingTop:100,
        alignItems:'center',
        
    
        
     }}>
     <Image source={require('../assets/avatar.jpeg')} style={{
            width:100,
            height:100,
            borderWidth:1,
            borderRadius:50,
            borderColor:'gray',
        
           
        }}/>
        <Text style={{
            fontWeight:"600",
            color:'black',
            fontSize:20,
            textAlign:'center',
            paddingTop:4

        }}
        
        >User123</Text>
     </View>
   </View>
  )
}

export default SettingsScreen