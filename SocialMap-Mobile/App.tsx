import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons'

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfilesScreen from './screens/ProfilesScreen';
import CreatePostScreen from './screens/CreatePostScreen';

import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as PostProvider } from "./context/PostContext"
import { navigationRef } from './RootNavigation';
import { RootSiblingParent } from 'react-native-root-siblings';

const warn = console.warn;
function logWarning(...warnings) {
  let showWarning = true;
  warnings.forEach(warning => {
    if (warning.includes("Toast")) showWarning = false;
  });
  if (showWarning) warn(...warnings);
}


console.warn = logWarning;

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const App = () => {
  const { token, loginStorage, isLoading } = useContext(AuthContext)

  useEffect(() => {
    loginStorage ? loginStorage() : ""
  }, [])


  return (
    <SafeAreaProvider>

      <NavigationContainer ref={navigationRef}>
        {isLoading ? null :
          !token ?
            (
              <Stack.Navigator
                screenOptions={({ route, navigation }) => ({
                  headerShown: false
                })}
              >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
              </Stack.Navigator>
            )
            :
            (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    switch (route.name) {
                      case "Home":
                        return (<MaterialIcons name="home" size={size} color={color} />)
                      case "Profiles":
                        return (<MaterialIcons name="groups" size={size} color={color} />)
                      case "Profile":
                        return (<MaterialIcons name="account-circle" size={size} color={color} />)
                    }
                  },
                  headerShown: false,
                })}
              >
                <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
                <Tab.Screen name='Profiles' component={ProfilesScreen}></Tab.Screen>
                <Tab.Screen name='Profile' component={ProfileScreen}></Tab.Screen>
              </Tab.Navigator>
            )
        }
      </NavigationContainer>

    </SafeAreaProvider>
  );
}

export default () => {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </AuthProvider>
    </RootSiblingParent>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
