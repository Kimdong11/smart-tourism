import React from "react";
import styles from "../styles/mainStyle";
import { View, Text } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function mainHeader() {
    return (
        <View style={styles.header}>
            <View style={styles.header__left}>
                <Ionicons name="ios-bookmark-outline" size={28} color="white" />
                <Text style={styles.header__left__text}>스마트 힐링 투어</Text>
            </View>
            <View style={styles.header__right}>
                <FontAwesome5 name="bars" size={24} color="white" />
            </View>
        </View>
    );
}
