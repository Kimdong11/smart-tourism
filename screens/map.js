import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import MapView, { //맵 띄워준다
    Marker, //핀 찍어준다
    PROVIDER_DEFAULT, //애플맵 제공
    PROVIDER_GOOGLE, //구글맵 제공
} from "react-native-maps"; // 설치

const map = ({ route }) => {
    const {
        params: { contents },
    } = route;
    return (
        <SafeAreaView>
            <MapView
                style={style.map} //height로 맵 크기 조절 해줘야 화면에 뜹니다.
                provider={PROVIDER_GOOGLE} //맵 제공할 회사 선택
                region={{
                    // 초기 좌표 설정
                    latitude: parseFloat(contents.hcnt_coord_x), //위도
                    longitude: parseFloat(contents.hcnt_coord_y), //경도
                    latitudeDelta: 0.1, //위도 확대(1에 가까워질 수록 zoom out)
                    longitudeDelta: 0.1, //경도 확대(1에 가까워질 수록 zoom out)
                }}>
                <Marker
                    title="하고싶은 타이틀"
                    pinColor="#00c7ae"
                    coordinate={{ latitude: 37.505969, longitude: 127.05186 }}
                />
            </MapView>
        </SafeAreaView>
    );
};

export const style = StyleSheet.create({
    map: {
        height: "100%",
    },
});

export default map;
