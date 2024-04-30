import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../Cartreducer";
import { decrementQty, incrementQty } from "../Productreducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((service) => service.quantity * service.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const userUid = auth.currentUser.uid;
  const route = useRoute();
  const dispatch = useDispatch();

  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      {
        merge: true,
      }
    );
  };
  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your Card is empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                onPress={() => navigation.goBack()}
                name="arrow-left"
                size={24}
                color="black"
              />
              <Text>Your Bucket</Text>
            </View>
            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                marginHorizontal: 10,
                padding: 14,
              }}
            >
              {cart.map((service) => (
                <View
                  key={service.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 12,
                  }}
                >
                  <Text style={{ width: 100, fontSize: 16, fontWeight: 700 }}>
                    {service.name}
                  </Text>
                  {/* Button */}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 8,
                      paddingVertical: 8,
                      borderWidth: 0.8,
                      borderRadius: 12,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(service));
                        dispatch(decrementQty(service));
                      }}
                      style={{
                        width: 26,
                        height: 26,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>
                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        {service.quantity}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(service));
                        dispatch(incrementQty(service));
                      }}
                      style={{
                        width: 26,
                        height: 26,

                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>
                  <Text style={{ fontSize: 16, fontWeight: 700 }}>
                    {service.price * service.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>
            <View>
              <Text style={{ padding: 10, fontSize: 17, fontWeight: 700 }}>
                Billing Details:
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                margin: 10,
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 500, color: "gray" }}>
                  Item Total
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 400, color: "gray" }}>
                  {total}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 500, color: "gray" }}>
                  Delivery Fee |1.2 KM
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 400, color: "green" }}>
                  Free
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 500, color: "gray" }}>
                  Free Delivery on your Order
                </Text>
              </View>
              <View
                style={{
                  borderColor: "gray",
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              ></View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 500, color: "gray" }}>
                  Selected Date
                </Text>
                {/* <Text style={{fontSize:18,fontWeight:400,color:'gray'}}>{route.params.pickUpDate}</Text> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 500, color: "gray" }}>
                  No of Days
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 400, color: "green" }}>
                  {route.params.no_Of_days}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 500, color: "gray" }}>
                  Selected PickUp time
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 400, color: "green" }}>
                  {route.params.selectedTime}
                </Text>
              </View>
              <View
                style={{
                  borderColor: "gray",
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>To Pay</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {total}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            marginTop: "auto",
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
            <Text style={{ fontSize: 15, fontWeight: 600, color: "white" }}>
              {cart.length} items | {total}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "white",
                marginVertical: 6,
              }}
            >
              Extra charges might apply
            </Text>
          </View>
          <Pressable onPress={placeOrder}>
            <Text style={{ fontSize: 17, fontWeight: 600, color: "white" }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
