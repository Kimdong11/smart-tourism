import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import detailScreen from "../screens/detailScreen";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { colors } from "../variables/colors";
import { TouchableOpacity } from "react-native";
import DetailTobTab from "./DetailTopTab";

const Navigation = createNativeStackNavigator();

const Detail = ({ route, navigation: { navigate, goBack } }) => {
    const {
        params: { contents, data },
    } = route;
    return (
        <Navigation.Navigator>
            <Navigation.Screen
                name={contents.hcnt_name}
                component={DetailTobTab}
                initialParams={{ contents: contents, wholeData: data }}
                options={{
                    headerStyle: { backgroundColor: colors.orangeRed },
                    headerTitleStyle: { color: "white", fontSize: 20 },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                goBack();
                            }}>
                            <Feather
                                name="chevron-left"
                                size={34}
                                color="white"
                                style={{ marginLeft: -20 }}
                            />
                        </TouchableOpacity>
                    ),
                }}></Navigation.Screen>
        </Navigation.Navigator>
    );
};

export default Detail;
