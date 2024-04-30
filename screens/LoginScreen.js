import {
    ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { rows } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading] =useState(false)
  const navigation = useNavigation();
  useEffect(()=>{
    setLoading(true)
    const unsubscribe =auth.onAuthStateChanged((authUser)=>{
        if(authUser){
       navigation.navigate('Home')
        }else{
            setLoading(false)
        }
    })
    return unsubscribe
  },[])

  const login =()=>{
    if( email === '' || password === ''){
        Alert.alert("Empty", "Please fill all the Fields", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
       }
       signInWithEmailAndPassword(auth,email, password).then((userCredential)=>{
        console.log("user credential for login",userCredential);
        const user = userCredential.user
        console.log("user details " ,user);
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
        {loading ? (
            <View style={{flex:1 ,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size='large' color='blue'/>
            </View>
        ) : (  <KeyboardAvoidingView>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#662d91" }}>
                Sign In
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#662d91",
                  marginTop: 8,
                }}
              >
                Sign In to tour account
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
              <Pressable
              onPress={login}
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
                  Login
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Register")}
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
                  Don't have an account ? Sign Up
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>) }
    
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
