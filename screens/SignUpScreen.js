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

const API = "https://yuyx.pythonanywhere.com";
const API_LOGIN = "/newuser";
import { commonStyles } from "../styles/commonStyles";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function signup()
  { 
    console.log("---- Sign-Up Time ----")
    Keyboard.dismiss()

  }

  return (
    <TouchableWithoutFeedback>
      <View styles={styles.container}>
        <Text styles={styles.title}>Create a new user</Text>
        <Text styles={styles.fieldTitle}>New Username</Text>
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
          <TouchableOpacity>

          </TouchableOpacity>
        </View>
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
});
