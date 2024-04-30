import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import { auth } from '../firebase';
import {signOut} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
    const user =auth.currentUser
    const navigation =useNavigation()
    const signOutUser =()=>{
        signOut(auth).then(()=>{
            navigation.replace('Login')
        }).catch(err => console.log(err))
    }
  return (
    <SafeAreaView style={{flex:1}}>
      <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent:'space-between'
              }}
            >
              <MaterialCommunityIcons
                onPress={() => navigation.goBack()}
                name="arrow-left"
                size={24}
                color="black"
              />
              <Text style={{marginRight:10,fontSize:17,fontWeight:500}}>Your Profile</Text>
            </View>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    
     <Pressable style={{marginVertical:10}}>
      <Text>Welcome {user.email}</Text>
     </Pressable>
     <Pressable onPress={signOutUser}
     style={{backgroundColor:'#656565',padding:10,borderRadius:6,marginTop:10}}
     >
        <Text style={{fontSize:17,fontWeight:700,color:'white'}}>Sign Out</Text>
     </Pressable>
    </View>
   
    </SafeAreaView>
    
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})