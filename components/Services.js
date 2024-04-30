import { Pressable, ScrollView, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Services = () => {
    const services=[
        {
          "id": 1,
          "name": "Washing",
          "image": 'https://cdn-icons-png.flaticon.com/128/1104/1104590.png'
        },
        {
          "id": 2,
          "name": "Cleaning",
          "image": 'https://cdn-icons-png.flaticon.com/128/3043/3043787.png'
        },
        {
          "id": 3,
          "name": "Ironing",
          "image": 'https://cdn-icons-png.flaticon.com/128/1934/1934788.png'
        },
        {
          "id": 4,
          "name": "Folding",
          "image": 'https://cdn-icons-png.flaticon.com/128/6966/6966776.png'
        },
        {
          "id": 5,
          "name": "Dry Cleaning",
          "image": 'https://cdn-icons-png.flaticon.com/128/9759/9759111.png'
        }
      ]
      
  return (
    <View style={{padding:10}}>
        <Text style={{fontSize:20,fontWeight:500,marginBottom:7}}>Services Availabe</Text>
     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service)=>(
            <Pressable 
            style ={{margin:10, backgroundColor:'white',padding:20,borderRadius:10}}
            key={service.id}>
                <Image
                source={{uri:service.image}}
                style={{width:80,height:80, resizeMode:'cover'}}
                />
                <Text style={{textAlign:'center',marginTop:10}}>{service.name}</Text>
            </Pressable>
        ))}
     </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})