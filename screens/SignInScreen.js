import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard, 
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://yuyx.pythonanywhere.com";
const API_LOGIN = "/auth";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(""); 
  const [loading, setLoading] = useState(false);

  async function login() {
    console.log("---- Login time ----");
    Keyboard.dismiss();
    //AsyncStorage.setItem("token", "demo_token");
    //navigation.navigate("Account");
    try { 
      setLoading(true);
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success logging in!");
      //console.log(response);

      //AsyncStorage.setItem("token", response.data.access_token);
      await AsyncStorage.setItem("token", response.data.access_token); 
      setLoading(false);
      navigation.navigate("Account");
    } catch (error) { 
      setLoading(false);
      console.log("Error logging in!");
      console.log(error.response); 
      setErrorText(error.response.data.description);
    } 
  }

  function signup()
  {
    navigation.navigate("SignUp"); 
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to blog</Text>
        <Text style={styles.fieldTitle}>Username</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(input) => setUsername(input)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        /> 
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={login} style={styles.loginButton}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator style={styles.activity} /> // adjust
          ) : null}
        </View>
        <Text style={styles.errorText}>{errorText}</Text>  
        <View style={{color:"red"}}></View> 
        <TouchableOpacity  onPress={signup} style={styles.SignupButton}>
          <Text>Don't have an account?</Text>
          <Text style={
            {
              marginLeft: 20,
              color:"red", 
              fontWeight: "bold", 
            }}>Sign Up Now!</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  activity:{
    marginLeft: 20,
    marginBottom: 20,
    color: "blue",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  SignupButton: {  
    flexDirection: 'row',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    height: 40,
  },
});
