import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../../variables/colors";
import forest from "../../screens/classes/nature/forest";
import halla from "../../screens/classes/nature/halla";
import island from "../../screens/classes/nature/island";
import mountain from "../../screens/classes/nature/mountain";
import unesco from "../../screens/classes/nature/unesco";

const mNav = createMaterialTopTabNavigator();

const NatureTab = ({ route, navigation }) => {
    const { Data } = route.params;

    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);

    const getClasses = async () => {
        const results = await Data.filter((data) => {
            const code = data.hcnt_hcd;
            return String(code).includes("A010");
        });
        const finalData = results.filter((results) => {
            const code = results.hcnt_hcd;
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
                justifyContent: "center",
                alignContent: "center",
            }}>
            <ActivityIndicator />
        </View>
    ) : (
        <mNav.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarItemStyle: {
                    width: 100,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: colors.orangeRed,
                },
            }}>
            <mNav.Screen name={classes[1].hcnt_id} component={halla} />
            <mNav.Screen name={classes[2].hcnt_id} component={mountain} />
            <mNav.Screen name={classes[3].hcnt_id} component={forest} />
            <mNav.Screen name={classes[4].hcnt_id} component={island} />
            <mNav.Screen name={classes[5].hcnt_id} component={unesco} />
        </mNav.Navigator>
    );
};

export default NatureTab;
