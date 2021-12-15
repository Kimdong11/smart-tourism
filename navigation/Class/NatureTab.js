import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../../variables/colors";
import halla from "../../screens/classes/nature/halla";
import mountain from "../../screens/classes/nature/mountain";
import forest from "../../screens/classes/nature/forest";
import island from "../../screens/classes/nature/island";
import unesco from "../../screens/classes/nature/unesco";

const Nav = createMaterialTopTabNavigator();

const NatureTab = ({ route }) => {
    const {
        params: { Data, Name },
    } = route;
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const getClasses = async () => {
        const results = await Data.filter((data) => {
            const code = data.hcnt_hcd;
            return String(code).includes("A010");
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
        <Nav.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarItemStyle: {
                    width: 100,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: colors.orangeRed,
                },
            }}>
            <Nav.Screen name={classes[1].hcnt_id} component={halla}></Nav.Screen>
            <Nav.Screen name={classes[2].hcnt_id} component={mountain}></Nav.Screen>
            <Nav.Screen name={classes[3].hcnt_id} component={forest}></Nav.Screen>
            <Nav.Screen name={classes[4].hcnt_id} component={island}></Nav.Screen>
            <Nav.Screen name={classes[5].hcnt_id} component={unesco}></Nav.Screen>
        </Nav.Navigator>
    );
};

export default NatureTab;
