import React, { useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { cos } from "react-native-reanimated";
import { useState } from "react/cjs/react.development";

const unesco = ({ route, navigation: { navigate } }) => {
    const [loading, setLoading] = useState(true);
    const [displayData, setDisplayData] = useState([]);
    const [leftImages, setLeftImages] = useState([]);
    const [rightImages, setRightImages] = useState([]);
    const [wholeData, setWholeData] = useState([]);

    let testData = [];
    let finalData = [];
    let sortData = [];
    let contents = [];
    let content1 = [];
    let content2 = [];
    const getContents = async () => {
        const results = await (
            await fetch(
                "http://203.253.207.111:8080/jsmith/restful/content?type=0&page=1&hcd=A0105"
            )
        ).json();
        sortData = results.filter((data) => {
            const code = data.hcnt_scd;
            return code == "A00";
        });

        const preData = await results.filter((data) => {
            const code = data.hcnt_sub_img;
            return code !== "";
        });
        testData = preData.filter((item) => {
            return item.hcnt_rcmd_comt_sec === "" && item.hcnt_rcmd_comt_thd === "";
        });
        for (let i = 0; i < preData.length; i++) {
            contents[i] = preData[i];
        }
        for (let i = 0; i < preData.length; i++) {
            contents[i].hcnt_sub_img = contents[i].hcnt_sub_img.split(",");
            contents[i].hcnt_inv_hcnt = contents[i].hcnt_inv_hcnt.split(/;|,/);
            contents[i].hcnt_rcmd_comt = contents[i].hcnt_rcmd_comt.split(":");
            if (contents[i].hcnt_rcmd_comt_sec !== "") {
                contents[i].hcnt_rcmd_comt_sec = contents[i].hcnt_rcmd_comt_sec.split(":");
            }
            if (contents[i].hcnt_rcmd_comt_fiv !== "") {
                contents[i].hcnt_rcmd_comt_fiv = contents[i].hcnt_rcmd_comt_fiv.split(":");
            }
            if (contents[i].hcnt_rcmd_comt_fth !== "") {
                contents[i].hcnt_rcmd_comt_fth = contents[i].hcnt_rcmd_comt_fth.split(":");
            }
            if (contents[i].hcnt_rcmd_comt_thd !== "") {
                contents[i].hcnt_rcmd_comt_thd = contents[i].hcnt_rcmd_comt_thd.split(":");
            }
            if (contents[i].hcnt_duration !== "") {
                contents[i].hcnt_duration = contents[i].hcnt_duration.split(",");
            }
            if (contents[i].nickname !== "") {
                contents[i].nickname = contents[i].nickname.split(/;|,/);
            }
            if (contents[i].hcnt_addr !== "") {
                contents[i].hcnt_addr = contents[i].hcnt_addr.split(" ");
            }
        }
        for (let i = 0; i < Math.ceil(preData.length / 2); i++) {
            content1[i] = preData[i];
        }
        for (let i = Math.ceil(preData.length / 2); i < preData.length; i++) {
            content2[i - Math.ceil(preData.length / 2)] = preData[i];
        }
        setLeftImages(content1);
        setRightImages(content2);
        setWholeData(contents);
        setLoading(false);
    };
    useEffect(() => {
        getContents();
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
        <ScrollView style={{}}>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 30,
                }}>
                <View style={{ marginLeft: 22 }}>
                    {leftImages.map((image) => {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    navigate("Detail", {
                                        contents: image,
                                        data: wholeData,
                                    })
                                }
                                key={image.hcnt_hcd}
                                style={{}}>
                                <Image
                                    source={{
                                        uri: `http://203.253.207.111:8080/jsmith_image${image.hcnt_sub_img[0]}`,
                                    }}
                                    style={{
                                        width: 160,
                                        height: 160,
                                        marginBottom: 20,
                                    }}></Image>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={{ marginLeft: 15, marginRight: 20 }}>
                    {rightImages.map((image) => {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    navigate("Detail", {
                                        contents: image,
                                        data: wholeData,
                                    })
                                }
                                key={image.hcnt_hcd}
                                style={{}}>
                                <Image
                                    source={{
                                        uri: `http://203.253.207.111:8080/jsmith_image${image.hcnt_sub_img[0]}`,
                                    }}
                                    style={{
                                        width: 160,
                                        height: 160,
                                        marginBottom: 20,
                                    }}></Image>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
};

export default unesco;
