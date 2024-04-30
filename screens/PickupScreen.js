import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";


const PickupScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery,setDelivery]=useState([])
  const navigation =useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total= cart.map((service)=>service.quantity*service.price).reduce((curr,prev)=>curr+prev,0);
  const deliveryTime = [
    { id: 1, name: "1 day" },
    { id: 2, name: "2 days" },
    { id: 3, name: "3 days" },
    { id: 4, name: "4 days" },
    { id: 5, name: "5 days" },
    { id: 6, name: "6 days" },
    { id: 7, name: "7 days" },
    { id: 8, name: "8 days" },
    { id: 9, name: "9 days" },
    { id: 10, name: "10 days" },
  ];
  const time = [
    { id: 1, time: "11 AM" },
    { id: 2, time: "12 PM" },
    { id: 3, time: "1 PM" },
    { id: 4, time: "2 PM" },
    { id: 5, time: "3 PM" },
    { id: 6, time: "4 PM" },
    { id: 7, time: "5 PM" },
    { id: 8, time: "6 PM" },
    { id: 9, time: "7 PM" },
    { id: 10, time: "8 PM" },
  ];
  const proceedToCart=()=>{
    
    if(!selectedDate || !selectedTime || !delivery){
        Alert.alert("Empty ", "Please choose all options", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
    }if(selectedDate && selectedTime && delivery){
       navigation.replace("Cart",{
        // pickUpdate:selectedDate,
        selectedTime:selectedTime,
        no_Of_days:delivery
       })
    }
  }

  return (
    <>
    <SafeAreaView>
      <Text style={{ fontSize: 15, fontWeight: 500, marginHorizontal: 10 }}>
        Enter Address:
      </Text>
      <TextInput
        style={{
          padding: 40,
          borderColor: "gray",
          borderWidth: 0.8,
          paddingVertical: 80,
          borderRadius: 6,
          margin: 10,
        }}
      />
      <Text style={{ fontSize: 15, fontWeight: 500, marginHorizontal: 10 }}>
        Pickup Date:
      </Text>
      <Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2024-03-01")}
          endDate={new Date("2024-03-31")}
          initialSelectedDate={new Date("2024-03-01")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
        ;
      </Text>
      <Text style={{ fontSize: 15, fontWeight: 500, marginHorizontal: 10 }}>
        Select Time:
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {time.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setSelectedTime(item.time)}
            style={selectedTime.includes(item.time) ? {
                margin: 10,
              padding: 15,
              borderRadius: 7,
              borderColor:'red',
              borderWidth: 0.8,
            } : {
                margin: 10,
              padding: 15,
              borderRadius: 7,
              borderColor:'gray',
              borderWidth: 0.8,
            }}
          >
            <Text>{item.time}</Text>
          </Pressable>
        ))}
      </ScrollView >
      <Text style={{ fontSize: 15, fontWeight: 500, marginHorizontal: 10 }}>
        Delivery Date:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deliveryTime.map((item)=>(
                <Pressable
                key={item.id}
                onPress={() => setDelivery(item.name)}
                style={delivery.includes(item.name) ? {
                    margin: 10,
                  padding: 15,
                  borderRadius: 7,
                  borderColor:'red',
                  borderWidth: 0.8,
                } : {
                    margin: 10,
                  padding: 15,
                  borderRadius: 7,
                  borderColor:'gray',
                  borderWidth: 0.8,
                }}
              >
                <Text>{item.name}</Text>
              </Pressable>
            ))}
        </ScrollView>
      
    </SafeAreaView>

    {total === 0 ? (null) : (
         <Pressable
         style={{
            marginTop:'auto',
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
         <Pressable onPress={proceedToCart}>
           <Text style={{fontSize:17,fontWeight:600,color:'white'}}>Proceed to Cart</Text>
         </Pressable>
       </Pressable>
       ) }
    </>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({});
