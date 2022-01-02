import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Imagae, ActivityIndicator } from "react-native";
import { colors } from "../../variables/colors";
import cart from "../../screens/classes/activity/cart";
import farm from "../../screens/classes/activity/farm";
import photo from "../../screens/classes/activity/photo";
import riding from "../../screens/classes/activity/riding";
import submarine from "../../screens/classes/activity/submarine";

const Material = createMaterialTopTabNavigator();

const ActivityTab = ({ route }) => {
    const {
        params: { Data },
    } = route;
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const getClasses = async () => {
        const results = await Data.filter((data) => {
            const code = data.hcnt_hcd;
            return String(code).includes("A040");
        });
        const finalData = results.filter((result) => {
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
            <Material.Screen name={classes[1].hcnt_id} component={farm}></Material.Screen>
            <Material.Screen name={classes[2].hcnt_id} component={riding}></Material.Screen>
            <Material.Screen name={classes[3].hcnt_id} component={submarine}></Material.Screen>
            <Material.Screen name={classes[4].hcnt_id} component={cart}></Material.Screen>
            <Material.Screen name={classes[5].hcnt_id} component={photo}></Material.Screen>
        </Material.Navigator>
    );
};

export default ActivityTab;
