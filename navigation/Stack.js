import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import mainScreen from "../screens/mainScreen";
import TopTab from "./TopTab";
import { colors } from "../variables/colors";
import Detail from "./Detail";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    return (
        <NativeStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: colors.orangeRed,
                },
                headerTitleStyle: {
                    fontSize: 20,
                },
                headerTintColor: "white",
            }}>
            <NativeStack.Screen
                name="Main"
                component={mainScreen}
                options={{ headerShown: false }}></NativeStack.Screen>
            <NativeStack.Screen
                name="Category"
                component={TopTab}
                options={{
                    headerTitle: "스마트 관광",
                }}></NativeStack.Screen>
            <NativeStack.Screen
                name="Detail"
                component={Detail}
                options={{ headerShown: false }}></NativeStack.Screen>
        </NativeStack.Navigator>
    );
};

export default Stack;
