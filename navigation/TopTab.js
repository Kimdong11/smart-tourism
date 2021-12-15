import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NatureTab from "./Class/NatureTab";
import SeaTab from "./Class/SeaTab";
import { colors } from "../variables/colors";
import SiteTab from "./Class/Site";
import ActivityTab from "./Class/ActivityTab";
import OlleTab from "./Class/OlleTab";

const Material = createMaterialTopTabNavigator();

const TopTab = ({ route }) => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getCategories = async () => {
        const results = await (
            await fetch("http://203.253.207.111:8080/jsmith/restful/content?type=0&page=1&scd=A00")
        ).json();
        const preData = await results.filter((data) => {
            const code = data.hcnt_hcd;
            return String(code).includes("0000");
        });
        await setData(results);
        await setCategories(preData);
        await setLoading(false);
    };
    useEffect(() => {
        getCategories();
    }, []);
    return loading ? (
        <View
            style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
            }}>
            <ActivityIndicator />
        </View>
    ) : (
        <Material.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarItemStyle: {
                    width: 100,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: colors.orangeRed,
                },
            }}>
            <Material.Screen
                name={categories[0].hcnt_id}
                component={NatureTab}
                initialParams={{ Data: data }}></Material.Screen>
            <Material.Screen
                name={categories[1].hcnt_id}
                component={SeaTab}
                initialParams={{ Data: data }}></Material.Screen>
            <Material.Screen
                name="제주관광지"
                component={SiteTab}
                initialParams={{ Data: data }}></Material.Screen>
            <Material.Screen
                name={categories[3].hcnt_id}
                component={ActivityTab}
                initialParams={{ Data: data }}></Material.Screen>
            <Material.Screen
                name={categories[4].hcnt_id}
                component={OlleTab}
                initialParams={{ Data: data }}></Material.Screen>
        </Material.Navigator>
    );
};

export default TopTab;
