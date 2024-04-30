import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity } from "../Cartreducer";
import { decrementQty, incrementQty } from "../Productreducer";

const Dressitem = ({ service }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(service));
    dispatch(incrementQty(service));
  };
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "#F8F8F8",
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 14,
        }}
      >
        <View>
          <Image
            source={{
              uri:service.image
            }}
            style={{ width: 70, height: 70, resizeMode: "cover" }}
          />
        </View>
        <View>
          <Text
            style={{
              width: 83,
              fontSize: 17,
              fontWeight: 500,
              marginBottom: 7,
            }}
          >
            {service.name}
          </Text>
          <Text style={{ color: "gray", fontSize: 15 }}>{service.price}</Text>
        </View>
         

        {cart.some((c) => c.id === service.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Pressable
            onPress={()=>{
              dispatch(decrementQuantity(service))
              dispatch(decrementQty(service))
            }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
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
            onPress={()=>{
              dispatch(incrementQuantity(service))
              dispatch(incrementQty(service))
            }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
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
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: "gray",
                borderWidth: 0.8,
                borderRadius: 4,
                marginVertical: 10,
                color: "#088F8F",
                textAlign: "center",
                padding: 5,
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default Dressitem;

const styles = StyleSheet.create({});
