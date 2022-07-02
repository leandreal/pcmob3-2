import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");


function NotesScreen({ navigation }) {
  
  const [notes, setNotes] = useState([
    { title: "Sleep", done: false, id: "0" }
  ])
  
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote} style={styles.headerIcon}>
          <Entypo name="new-message" size={24} color="black" />
        </TouchableOpacity>
           //entypo is how we add icons from vector icons.
      ),
    });
  });

  function addNote() {
    let newNote = { title: "test", done: false, id: notes.length.toString()}
    setNotes([...notes, newNote])
  }

function renderItem({ item }) {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
}


  return (
  <View style={styles.container}>
    <FlatList data={notes} renderItem={renderItem} />
  </View>
  );
  }

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
         name="Notes"
         component={NotesScreen}
         options={{
           headerTitle: "Notes 2022 App",
           headerTitleStyle: {
             fontWeight: "bold",
             fontSize: 24,
           },
           headerStyle: {
             height: 120,
             backgroundColor: "yellow",
             borderBottomColor: "grey",
             borderBottomWidth: 5,
           },
         }}
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
   
 },

 headerIcon: {
  marginRight: 20,
  backgroundColor: "lightpink",
},

});


