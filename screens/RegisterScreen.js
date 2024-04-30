import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {setDoc,doc} from 'firebase/firestore'


const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const navigation = useNavigation();

  const register = () => {
   if( email === '' || password === '' || mobileNo == ''){
    Alert.alert("Empty", "Please fill all the Fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
   }
   createUserWithEmailAndPassword(auth,email,password).then((userCredentail)=>{
    console.log("user crendential",userCredentail);
    const user =userCredentail._tokenResponse.email;
    console.log(user);
    const myUserUid =auth.currentUser.uid
    console.log(myUserUid);
   
    setDoc(doc(db,"users",`${myUserUid}`),{
      email:user,
      mobileNo:mobileNo

    })                                                //databse//collection//userid
   })
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#662d91" }}>
            Register
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#662d91",
              marginTop: 8,
            }}
          >
            Create a new Account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 10,
                marginLeft: 10,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor="black"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 30,
                marginLeft: 10,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              placeholder="Phone"
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholderTextColor="black"
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 10,
                marginLeft: 10,
              }}
            />
          </View>

          <Pressable
          onPress={register}
            style={{
              width: 200,
              backgroundColor: "#00308F",
              padding: 15,
              borderRadius: 6,
              marginTop: 50,
              marginLeft: 80,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
              }}
            >
              Sign Up
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                fontWeight: 500,
                color: "gray",
              }}
            >
              Already Registered ? Log In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
