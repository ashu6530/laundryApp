import {
  StyleSheet,
  Text,
  Alert,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Carousal from "../components/Carousal";
import Services from "../components/Services";
import Dressitem from "../components/Dressitem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Productreducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart); 
  const total= cart.map((service)=>service.quantity*service.price).reduce((curr,prev)=>curr+prev,0);
  // console.log(cart);
  const navigation =useNavigation()
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Location Loading.....");
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [item, setItem] = useState([])
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  //check if location is enable or not
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync(); //returns true or false
    if (!enabled) {
      //if not enable
      Alert.alert("Location not enabled", "Please enable your Location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationServicesEnabled(enabled); //store true into state
    }
  };
  //get current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    //console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    //console.log(coords)

    if (coords) {
      const { latitude, longitude } = coords;
      //console.log(latitude,longitude);
      let responce = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log(responce);

      for (let item of responce) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };
  //pusing the services into getproducts in productreducer
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  // console.log("product Array:", product);
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProduct = async () => {
     const colRef = collection(db,'types');
     const docSnap = await getDocs(colRef)
     docSnap.forEach((doc) => {
      item.push(doc.data())
     });
     item?.map((service)=>dispatch(getProducts(service)))
    };
    fetchProduct();
  }, []);

 

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}
      >
        {/* Location */}

        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Entypo name="location-pin" size={30} color="black" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          {/* Profile */}

          <Pressable onPress={()=>navigation.navigate('Profile')} style={{ marginLeft: "auto", marginRight: 10 }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "black",
              }}
              source={{
                uri: "https://yt3.ggpht.com/yti/ANjgQV9hTrD6bBPfdR_RKiKUqqwCYplMICWE5-eWc4Nwguvt8LX5=s88-c-k-c0x00ffffff-no-rj",
              }}
            />
          </Pressable>
        </View>

        {/* SearchBar */}

        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "black",
            borderRadius: 10,
          }}
        >
          <TextInput placeholder="Search for items" />
          <FontAwesome name="search" size={30} color="black" />
        </View>

        {/* Image Carousal */}
        <Carousal />

        {/* Services Component */}
        <Services />

        {/* Render All the products */}
        {product.map((service) => (
          <Dressitem service={service} key={service.id} />
        ))}
      </ScrollView>

       {total === 0 ? (null) : (
         <Pressable
         style={{
           backgroundColor: "#656565",
           padding: 10,
           marginBottom: 40,
           margin: 15,
           borderRadius: 6,
           flexDirection: "row",
           alignItems: "center",
           justifyContent: "space-between",
         }}
       >
         <View>
           <Text style={{fontSize:15,fontWeight:600,color:'white'}}>{cart.length} items | {total}</Text>
           <Text style={{fontSize:13,fontWeight:400,color:'white',marginVertical:6}}>Extra charges might apply</Text>
         </View>
         <Pressable onPress={()=>navigation.navigate("Pickup")}>
           <Text style={{fontSize:17,fontWeight:600,color:'white'}}>Proceed to pickup</Text>
         </Pressable>
       </Pressable>
       ) }
        

     
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
