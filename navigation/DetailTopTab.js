import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import detailScreen from "../screens/detailScreen";
import { colors } from "../variables/colors";
import weather from "../screens/weather";
import map from "../screens/map";

const Material = createMaterialTopTabNavigator();

const DetailTobTab = ({ route }) => {
    const {
        params: { contents, wholeData },
    } = route;
    return (
        <Material.Navigator
            screenOptions={{
                swipeEnabled: false,
                tabBarScrollEnabled: true,
                tabBarItemStyle: { width: 125 },
                tabBarIndicatorStyle: {
                    backgroundColor: colors.orangeRed,
                },
            }}>
            <Material.Screen
                name="소개"
                component={detailScreen}
                initialParams={{ contents: contents, data: wholeData }}></Material.Screen>
            <Material.Screen
                name="날씨"
                component={weather}
                initialParams={{ contents: contents }}></Material.Screen>
            <Material.Screen
                name="지도"
                component={map}
                initialParams={{ contents: contents }}></Material.Screen>
        </Material.Navigator>
    );
};

export default DetailTobTab;
