import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { StatusBar } from "expo-status-bar";

const App = () => {
    return (
        <NavigationContainer>
            <Root />
            <StatusBar hidden={true}></StatusBar>
        </NavigationContainer>
    );
};

export default App;
