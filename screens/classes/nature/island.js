import React, { useEffect, useState } from 'react';
import {View, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

    const island = ({route, navigation}) => {

    const [loading, setLoading] = useState(true);
    const [leftImages, setLeftImages] = useState([]);
    const [rightImages, setRightImages] = useState([]);
    const [wholeData, setWholeData] = useState([]);

    let contents = [];
    let leftContents =[];
    let rightContents = [];

    const getContents = async () => {
        const results = await(await fetch("http://203.253.207.111:8080/jsmith/restful/content?type=0&page=1&hcd=A0104")).json();
        
        const preData = results.filter((data) => {
            const code = data.hcnt_sub_img;
            return code !== ""; 
        });
        for (let i=0; i<preData.length; i++){
            contents[i]=preData[i]; 
        }
        for (let i =0; i<preData.length; i++){
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
        for (let i=0; i<Math.ceil(preData.length/2); i++){
            leftContents[i]=preData[i];
        }
        for (let i = Math.ceil(preData.length / 2); i <preData.length; i++){
            rightContents[i-Math.ceil(preData.length/2)]=preData[i];
        }
        setLeftImages(leftContents);
        setRightImages(rightContents);
        setWholeData(contents);
        setLoading(false);
    };
    useEffect(()=> {
        getContents();
    }, []);

    return loading ? (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
            }}>
                <ActivityIndicator />
        </View>
    ) : (
        <ScrollView style={{}}>
            <View  
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "space-between",
                    marginTop: 30,
                }}>
                <View style={{marginLeft: 22}}>
                    {leftImages.map((image)=>{
                        return(
                            <TouchableOpacity
                                onPress={() => 
                                    navigation.navigate("Detail", {
                                        contents: image,
                                        data: wholeData,
                                    })
                                }   
                                key={image.ROWNUM}
                                style={{}}>
                                <Image
                                    source={{
                                        uri: `http://203.253.207.111:8080/jsmith_image${image.hcnt_sub_img[0]}`,
                                    }}
                                    style={{
                                        width: 165,
                                        height: 165,
                                        marginRight: 5,
                                        marginBottom: 20,
                                    }}
                                    resizeMode="stretch"></Image>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style = {{marginLeft: 15, marginRight: 20}}>
                    {rightImages.map((image) => {
                        return(
                            <TouchableOpacity
                                onPress={() => 
                                    navigation.navigate("Detail", {
                                        contents: image,
                                        data: wholeData,
                                    })
                                }  
                                key={image.ROWNUM}
                                style={{}}>
                                <Image
                                    source={{
                                        uri: `http://203.253.207.111:8080/jsmith_image${image.hcnt_sub_img[0]}`,
                                    }}
                                    style={{
                                        width: 165,
                                        height: 165,
                                        marginLeft: 5,
                                        marginBottom: 20,
                                    }}
                                    resizeMode="stretch"></Image>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default island;