import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Imagae, ActivityIndicator } from "react-native";
import { colors } from "../../variables/colors";
import one2five from "../../screens/classes/olle/1to5";
import six2ten from "../../screens/classes/olle/6to10";
import eleven2fifteen from "../../screens/classes/olle/11to15";
import sixteen2twentyone from "../../screens/classes/olle/16to21";

const Material = createMaterialTopTabNavigator();

const OlleTab = ({ route }) => {
    const {
        params: { Data },
    } = route;
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const getClasses = async () => {
        const results = await Data.filter((data) => {
            const code = data.hcnt_hcd;
            return String(code).includes("A050");
        });
        const finalData = await results.filter((result) => {
            const code = result.hcnt_hcd;
            return String(code).includes("00");
        });
        setClasses(finalData);
        setLoading(false);
    };
    useEffect(() => {
        getClasses();
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
            <Material.Screen name={classes[1].hcnt_id} component={one2five}></Material.Screen>
            <Material.Screen name={classes[2].hcnt_id} component={six2ten}></Material.Screen>
            <Material.Screen name={classes[3].hcnt_id} component={eleven2fifteen}></Material.Screen>
            <Material.Screen
                name={classes[4].hcnt_id}
                component={sixteen2twentyone}></Material.Screen>
        </Material.Navigator>
    );
};

export default OlleTab;
