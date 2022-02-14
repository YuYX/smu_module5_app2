import React from "react";
import { useState, useEffect } from "react";
import { 
  StyleSheet, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text, 
  TextInput,
  Keyboard,
  View 
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { commonStyles } from "../styles/commonStyles";

const API = "https://yuyx.pythonanywhere.com";
const API_LOGIN = "/newuser";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [newuser, setNewuser] = useState("")
  const [errorText, setErrorText] = useState(""); 

  async function signup()
  { 
    console.log("---- Sign-Up Time ----")
    Keyboard.dismiss()

    try{
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success Sign-Up!");
      setNewuser(username);
      //navigation.navigate("SignIn")
    }catch(error){
      console.log("Error in Sign-Up!");
      console.log(error.response); 
      setErrorText(error.response.data.description);
    } 
  } 

  function goto_signin()
  {
    navigation.navigate("SignIn")
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Create a new user</Text>
        <Text style={styles.fieldTitle}>New Username</Text>
        <TextInput 
          style={styles.input} 
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(input)=>setUsername(input)}
        />
        <Text styles={styles.fieldTitle}>Password</Text>
        <TextInput 
          style={styles.input} 
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(input)=>{setPassword(input)}}
        />
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={signup} style={styles.signupButton}>
            <Text style={styles.buttonText}>Sign Up!</Text>
          </TouchableOpacity>
        </View> 
        <TouchableOpacity onPress={goto_signin} style={{flexDirection:'row'}}>
          <Text style={
            {
              backgroundColor: 'blue',
              padding: 4,
              fontSize: 20,
              color: 'yellow',  
            }}>Sign in to new user!</Text>
            <Text style={{
              marginLeft: 20,
              fontSize: 20,
              fontWeight: 'bold',
              height: 36,
              color: "red",
            }}>{newuser}</Text>
        </TouchableOpacity>

        <Text style={styles.errorText}>{errorText}</Text>  
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
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
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
  signupButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  errorText: {
    color: "red",
    height: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
