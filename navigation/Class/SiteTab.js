import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Imagae, ActivityIndicator } from "react-native";
import { colors } from "../../variables/colors";
import camp from "../../screens/classes/site/camp";
import gallery from "../../screens/classes/site/gallery";
import museum from "../../screens/classes/site/museum";
import theme from "../../screens/classes/site/theme";
import touristSpot from "../../screens/classes/site/touristSpot";

const Material = createMaterialTopTabNavigator();

const SiteTab = ({ route }) => {
    const {
        params: { Data },
    } = route;
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const getClasses = async () => {
        const results = await Data.filter((data) => {
            const code = data.hcnt_hcd;
            return String(code).includes("A030");
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
            <Material.Screen name={classes[1].hcnt_id} component={theme}></Material.Screen>
            <Material.Screen name={classes[2].hcnt_id} component={touristSpot}></Material.Screen>
            <Material.Screen name={classes[3].hcnt_id} component={museum}></Material.Screen>
            <Material.Screen name={classes[4].hcnt_id} component={gallery}></Material.Screen>
            <Material.Screen name={classes[5].hcnt_id} component={camp}></Material.Screen>
        </Material.Navigator>
    );
};

export default SiteTab;
