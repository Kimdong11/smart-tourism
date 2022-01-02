import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Imagae, ActivityIndicator } from "react-native";
import { colors } from "../../variables/colors";
import beach from "../../screens/classes/sea/beach";
import harbor from "../../screens/classes/sea/harbor";
import seaside from "../../screens/classes/sea/seaside";
import valley from "../../screens/classes/sea/valley";
import waterfall from "../../screens/classes/sea/waterfall";

const Material = createMaterialTopTabNavigator();

const SeaTab = ({ route }) => {
    const {
        params: { Data },
    } = route;
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const getClasses = async () => {
        const results = await Data.filter((data) => {
            const code = data.hcnt_hcd;
            return String(code).includes("A020");
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
            <Material.Screen name={classes[1].hcnt_id} component={beach}></Material.Screen>
            <Material.Screen name={classes[2].hcnt_id} component={seaside}></Material.Screen>
            <Material.Screen name={classes[3].hcnt_id} component={waterfall}></Material.Screen>
            <Material.Screen name={classes[4].hcnt_id} component={valley}></Material.Screen>
            <Material.Screen name={classes[5].hcnt_id} component={harbor}></Material.Screen>
        </Material.Navigator>
    );
};

export default SeaTab;
