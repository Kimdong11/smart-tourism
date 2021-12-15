import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Swiper from "react-native-web-swiper";
import { colors } from "../../variables/colors";

const { height: SCREEN_HEIGT } = Dimensions.get("window");

const DetailScreen1 = ({ route, navigation: { push } }) => {
    const {
        params: { contents, data },
    } = route;
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}>
            <Swiper
                timeout={3.5}
                controlsEnabled={false}
                loop
                containerStyle={{ width: "100%", height: SCREEN_HEIGT / 2.5 }}>
                {contents.hcnt_sub_img.map((image) => {
                    return (
                        <View key={image} style={{ flex: 1 }}>
                            <Image
                                source={{
                                    uri: `http://203.253.207.111:8080/jsmith_image${image}`,
                                }}
                                style={{
                                    width: "100%",
                                    height: "90%",
                                }}></Image>
                        </View>
                    );
                })}
            </Swiper>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "grey",
                    height: SCREEN_HEIGT / 100,
                    marginTop: -16,
                }}></View>
            <View
                style={{
                    marginTop: 8,
                    backgroundColor: "grey",
                    flex: 1,
                    borderStyle: "solid",
                    borderColor: "black",
                    height: SCREEN_HEIGT / 6,
                    marginBottom: 8,
                }}>
                <Text style={{ color: "black" }}>기본정보</Text>
                <Text style={{ color: "black" }}>{contents.hcnt_tel}</Text>
                <Text style={{ color: "black" }}>{contents.hcnt_addr}</Text>
                <Text style={{ color: "black" }}>{contents.hcnt_site}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "grey", height: SCREEN_HEIGT / 100 }}></View>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 8,
                }}>
                <View
                    style={{
                        flex: 0.32,
                        alignItems: "center",
                        marginLeft: 15,
                        marginRight: 10,
                    }}>
                    <Text>지도 연동</Text>
                </View>
                <View
                    style={{
                        flex: 0.32,
                        alignItems: "center",
                        marginRight: 10,
                    }}>
                    <Text>버스 연동</Text>
                </View>
                <View style={{ flex: 0.32, alignItems: "center" }}>
                    <Text>네비 연동</Text>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "grey", height: SCREEN_HEIGT / 100 }}></View>
            <View
                style={{
                    flex: 1,
                }}>
                <View
                    style={{
                        backgroundColor: colors.orangeRed,
                        paddingVertical: 10,
                        marginTop: 8,
                        marginBottom: 10,
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "900",
                            color: "white",
                        }}>
                        {contents.hcnt_rcmd_comt[0]}
                    </Text>
                </View>
                <Text style={{ color: "black", fontSize: 16 }}>{contents.hcnt_rcmd_comt[1]}</Text>
                <View
                    style={{
                        backgroundColor: colors.orangeRed,
                        paddingVertical: 10,
                        marginBottom: 10,
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "900",
                            color: "white",
                        }}>
                        {contents.hcnt_rcmd_comt_sec[0]}
                    </Text>
                </View>
                <Text style={{ color: "black", fontSize: 16 }}>
                    {contents.hcnt_rcmd_comt_sec[1]}
                </Text>
                <View
                    style={{
                        backgroundColor: colors.orangeRed,
                        paddingVertical: 10,
                        marginBottom: 10,
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "900",
                            color: "white",
                        }}>
                        {contents.hcnt_rcmd_comt_thd[0]}
                    </Text>
                </View>
                <Text style={{ color: "black", fontSize: 16 }}>
                    {contents.hcnt_rcmd_comt_thd[1]}
                </Text>
                <View
                    style={{
                        backgroundColor: colors.orangeRed,
                        paddingVertical: 10,
                        marginBottom: 10,
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "900",
                            color: "white",
                        }}>
                        {contents.hcnt_rcmd_comt_fth[0]}
                    </Text>
                </View>
                <Text style={{ color: "black", fontSize: 16 }}>
                    {contents.hcnt_rcmd_comt_fth[1]}
                </Text>
                <View
                    style={{
                        backgroundColor: colors.orangeRed,
                        paddingVertical: 10,
                        marginBottom: 10,
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "900",
                            color: "white",
                        }}>
                        {contents.hcnt_inv_hcnt[0]}
                    </Text>
                </View>
                <View>
                    {contents.hcnt_inv_hcnt.map((item) => {
                        const courseData = data.filter((course) => {
                            return item === course.hcnt_id;
                        });
                        return courseData.map((eachCourse) => {
                            return (
                                <TouchableOpacity
                                    key={eachCourse.hcnt_id}
                                    style={{ flex: 1 }}
                                    onPress={() => {
                                        push("Detail", {
                                            contents: eachCourse,
                                            data: data,
                                        });
                                    }}>
                                    <Image
                                        source={{
                                            uri: `http://203.253.207.111:8080/jsmith_image${eachCourse.hcnt_sub_img[0]}`,
                                        }}
                                        style={{
                                            width: 150,
                                            height: 140,
                                            marginBottom: 20,
                                        }}></Image>
                                </TouchableOpacity>
                            );
                        });
                    })}
                </View>
                <View
                    style={{
                        backgroundColor: colors.orangeRed,
                        paddingVertical: 10,
                        marginBottom: 10,
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "900",
                            color: "white",
                        }}>
                        {contents.nickname[0]}
                    </Text>
                </View>
                <View>
                    {contents.nickname.map((item) => {
                        const courseData = data.filter((course) => {
                            return item === course.hcnt_id;
                        });
                        return courseData.map((eachCourse) => {
                            return (
                                <TouchableOpacity
                                    key={eachCourse.hcnt_id}
                                    style={{ flex: 1 }}
                                    onPress={() => {
                                        push("Detail", {
                                            contents: eachCourse,
                                            data: data,
                                        });
                                    }}>
                                    <Image
                                        source={{
                                            uri: `http://203.253.207.111:8080/jsmith_image${eachCourse.hcnt_sub_img[0]}`,
                                        }}
                                        style={{
                                            width: 150,
                                            height: 140,
                                            marginBottom: 20,
                                        }}></Image>
                                </TouchableOpacity>
                            );
                        });
                    })}
                </View>
            </View>
        </ScrollView>
    );
};

export default DetailScreen1;
