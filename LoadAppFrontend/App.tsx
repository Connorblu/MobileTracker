import React from "react";
import { NativeBaseProvider, Box, Center, Text, Spacer } from "native-base";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavButton } from "./components/NavButtonComponent/NavButton"
import { AddLoadScreen } from "./components/AddLoadScreenComponent/AddLoadScreen";
import { ViewLoadScreen } from "./components/ViewLoadScreenComponent/ViewLoadScreen";

const Stack =  createNativeStackNavigator();

const HomeComponent = () => {
  return(
    <Box h = "100%" bg="coolGray.800">
      <Box p = {3} bg="coolGray.800">
        <Center>
          <Text bold fontSize="4xl" color="coolGray.300">
            Load Tracker
          </Text>
        </Center>
        <Spacer h = {3}/>
        <NavButton 
          buttonName="Add a Load"
          destName="AddLoad"
        />
        <Spacer h = {3}/>
        <NavButton 
          buttonName="View Loads"
          destName="ViewLoads"
        />
      </Box>
    </Box>
  )
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home"
            component={HomeComponent}
            options={{title: "Home"}}
          />
          <Stack.Screen
            name="AddLoad"
            component={AddLoadScreen}
            options={{title: "Add Load"}}
          />
          <Stack.Screen
            name="ViewLoads"
            component={ViewLoadScreen}
            options={{title: "Add Load"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}