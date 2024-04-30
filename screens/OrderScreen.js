import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
    const navigation=useNavigation()
  return (
    <SafeAreaView>
      <LottieView
        autoPlay
        loop={false}
        speed={0.7}
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
      />
      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Your order has been placed{" "}
      </Text>

      <LottieView
        autoPlay
        loop={false}
        speed={0.7}
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
      />
     <Pressable onPress={()=>navigation.navigate('Home')} 
     style={{backgroundColor:'#4B5320', borderRadius:12, width:150, height:50, marginLeft:150, marginTop:50}}>
  <Text style={{fontSize:17, fontWeight:700, textAlign:'center', color:'white', lineHeight:50}}>Go Back</Text>
</Pressable>

    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
