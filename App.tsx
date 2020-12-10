import * as React from 'react';
import { Button, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import firebase from 'firebase';

function initFirebase() {
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBX_dlArqdEjrO4qMRAbYzkPFHAOFkTQXo",
    authDomain: "expo1-7a220.firebaseapp.com",
    databaseURL: "https://expo1-7a220.firebaseio.com",
    projectId: "expo1-7a220",
    storageBucket: "expo1-7a220.appspot.com",
    messagingSenderId: "609264137954",
    appId: "1:609264137954:web:ab5959d2c76bf569aad0bb",
    measurementId: "G-LLVKVC9SKL"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  // firebase.analytics();
}


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      <Button
        onPress={() => {
          writeUserData(13, "Harry Penlington", "harry.penlington@gmail.com", "")
        }}
        title="Test database"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <MaterialCommunityIcons name="bell-ring" size={24} color="black" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

export default function App() {
  initFirebase()
  var database = firebase.database()

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} options={{
          title: "Notifications",
          drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name="bell-ring" size={size} color={focused ? "black" : "#888"} />)
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}