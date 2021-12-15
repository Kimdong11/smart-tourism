import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

var parseString = require("react-native-xml2js").parseString;

const ADDRESS_CODE = [
    {
        건입동: "5011059000",
        구좌읍: "5011025600",
        노형동: "5011066000",
        도두동: "5011069000",
        봉개동: "5011062000",
        회천동: "5011062000",
        삼도1동: "5011055000",
        삼도일동: "5011055000",
        삼도2동: "5011056000",
        삼도이동: "5011056000",
        삼양동: "5011061000",
        아라동: "5011063000",
        용강동: "5011063000",
        애월읍: "5011025300",
        연동: "5011065000",
        오라동: "5011064000",
        오등동: "5011064000",
        외도동: "5011067000",
        용담1동: "5011057000",
        용담2동: "5011058000",
        용담일동: "5011057000",
        용담이동: "5011058000",
        우도면: "5011033000",
        이도1동: "5011053000",
        이도2동: "5011054000",
        이호동: "5011068000",
        일도1동: "5011051000",
        일도2동: "5011052000",
        일도일동: "5011051000",
        일도이동: "5011052000",
        조천읍: "5011025900",
        추자면: "5011032000",
        한경면: "5011031000",
        한림읍: "5011025000",
        화북동: "5011060000",
        남원읍: "5013025300",
        대륜동: "5013059000",
        대정읍: "5013025000",
        대천동: "5013060000",
        동홍동: "5013057000",
        서홍동: "5013058000",
        강정동: "5013058000",
        월평동: "5013058000",
        성산읍: "5013025900",
        송산동: "5013051000",
        안덕면: "5013031000",
        하예동: "5013031000",
        영천동: "5013056000",
        예래동: "5013062000",
        정방동: "5013052000",
        중문동: "5013061000",
        색달동: "5013061000",
        중앙동: "5013053000",
        천지동: "5013054000",
        표선면: "5013032000",
        효돈동: "5013055000",
        보목동: "5013055000",
        서귀동: "5013055000",
        법환동: "5013055000",
        이어도: "5019099000",
        해안동: "5011025300",
        하원동: "5013061000",
        상효동: "5013057000",
        토평동: "5013057000",
        오라이동: "5011064000",
        하효동: "5013055000",
        대포동: "5013053000",
        이호일동: "5011068000",
        삼양일동: "5011061000",
        내도동: "5011067000",
        서호동: "5013058000",
    },
];
const weatherIcon = [
    "white-balance-sunny",
    "weather-partly-cloudy",
    "weather-cloudy",
    "weather-rainy",
    "weather-snowy",
    "weather-snowy-rainy",
    "weather-rainy",
];
let iconName;
let dayName;

const weather = ({ route }) => {
    let dayCounter = 0;
    const [shortData, setShortData] = useState([]);
    const [midData, setMidData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [icon, setIcon] = useState([]);
    const {
        params: { contents },
    } = route;
    const getIconName = (code) => {
        if (code === "맑음") {
            return weatherIcon[0];
        } else if (code === "구름많음") {
            return weatherIcon[1];
        } else if (code === "흐림") {
            return weatherIcon[2];
        } else if (code === "비" || code === "흐리고 비") {
            return weatherIcon[3];
        } else if (code === "비/눈") {
            return weatherIcon[4];
        } else if (code === "눈") {
            return weatherIcon[5];
        } else {
            return weatherIcon[6];
        }
    }; //  아이콘 표시 함수
    const makeText = (code) => {
        const date = new Date();
        const month = date.getMonth();
        const day = date.getDate();
        const convertedCode = code.split(" ");
        if (convertedCode[1] === "00:00") {
            if (dayCounter === 0) {
                dayCounter += 1;
                return `월요일(${month + 1}.${day} 오전) `;
            } else if (dayCounter === 2) {
                dayCounter += 1;
                return `화요일(${month + 1}.${day} 오전) `;
            } else if (dayCounter === 4) {
                dayCounter += 1;
                return `수요일(${month + 1}.${day} 오전) `;
            } else if (dayCounter === 6) {
                dayCounter += 1;
                return `목요일(${month + 1}.${day} 오전) `;
            } else if (dayCounter === 8) {
                dayCounter += 1;
                return `금요일(${month + 1}.${day} 오전) `;
            }
        } else {
            if (dayCounter === 1) {
                dayCounter += 1;
                return `월요일(${month + 1}.${day} 오후) `;
            } else if (dayCounter === 3) {
                dayCounter += 1;
                return `화요일(${month + 1}.${day} 오후) `;
            } else if (dayCounter === 5) {
                dayCounter += 1;
                return `수요일(${month + 1}.${day} 오후) `;
            } else if (dayCounter === 7) {
                dayCounter += 1;
                return `목요일(${month + 1}.${day} 오후) `;
            } else if (dayCounter === 9) {
                dayCounter = 1;
                return `금요일(${month + 1}.${day} 오후) `;
            }
        }
    }; // 요일 및 시간 표시 함수

    const CODE = ADDRESS_CODE[0][contents.hcnt_addr[2]]; // 관광지 주소 (읍/면/동)
    const getWeather = async () => {
        const shortForecast = await axios.get(
            `https://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=${CODE}`
        );
        const data = parseString(shortForecast.data, (err, result) => {
            const text = JSON.stringify(result);
            const json = JSON.parse(text);
            const weatherCode = json.rss.channel[0].item[0].description[0].body[0].data[0].wfKor[0];
            setIcon(getIconName(weatherCode));
            setShortData(json);
        });
        const midForecast = await axios.get(
            `https://www.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=184`
        );
        const weeklyData = parseString(midForecast.data, (err, result) => {
            const text = JSON.stringify(result);
            const json = JSON.parse(text);
            json.rss.channel[0].item[0].description[0].body[0].location[0].data.length = 10;
            setMidData(json);
            setLoading(false);
        });
    }; // 단기 예보 및  중기 예보 API 사용 함수
    useEffect(() => {
        getWeather();
    }, []);
    return loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator></ActivityIndicator>
        </View>
    ) : (
        <ScrollView>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 20, opacity: 0.7 }}>
                    {contents.hcnt_addr[2]} 날씨
                </Text>
                <Text style={{ fontSize: 13, fontWeight: "400" }}>
                    {shortData.rss.channel[0].pubDate} 기준
                </Text>
                <Text style={{ fontSize: 40, fontWeight: "700", marginTop: 10, opacity: 0.7 }}>
                    {shortData.rss.channel[0].item[0].description[0].body[0].data[0].temp}°
                </Text>
                <View style={{ marginTop: 10, opacity: 0.7 }}>
                    <Icon name={icon} size={80} color="black" />
                </View>
                <Text style={{ marginTop: 10, opacity: 0.7 }}>
                    풍속{" "}
                    {parseFloat(
                        shortData.rss.channel[0].item[0].description[0].body[0].data[0].ws[0]
                    ).toFixed(1)}
                    m/s 보통
                </Text>
                <Text style={{ opacity: 0.7 }}>
                    습도{" "}
                    {parseFloat(
                        shortData.rss.channel[0].item[0].description[0].body[0].data[0].reh[0]
                    )}
                    %
                </Text>
            </View>
            <View style={{ marginTop: 20, alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>시간대별 날씨</Text>
            </View>
            <ScrollView horizontal={true} style={{ marginTop: 20, height: "50%", flex: 1 }}>
                {shortData.rss.channel[0].item[0].description[0].body[0].data.map((item) => {
                    const code = item.wfKor[0];
                    iconName = getIconName(code);
                    return (
                        <View
                            key={item.$.seq}
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 70,
                                height: 150,
                            }}>
                            <Text>{item.hour[0]}시</Text>
                            <Icon name={iconName} size={33} color="black" />
                            <Text>{item.temp}°</Text>
                            <Text>{item.pop}%</Text>
                            <Text>{parseFloat(item.ws).toFixed(1)}m/s</Text>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>주간날씨</Text>
            </View>
            <View
                style={{
                    marginTop: 20,
                    marginRight: 10,
                    width: "100%",
                }}>
                <View>
                    {midData.rss.channel[0].item[0].description[0].body[0].location[0].data.map(
                        (item) => {
                            const dateCode = item.tmEf[0];
                            dayName = makeText(dateCode);
                            const code = item.wf[0];
                            iconName = getIconName(code);
                            return (
                                <View
                                    key={item.tmEf[0]}
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 10,
                                        marginLeft: 40,
                                        alignItems: "center",
                                    }}>
                                    <Text style={{ fontSize: 16, marginRight: 10 }}>{dayName}</Text>
                                    <Icon
                                        name={iconName}
                                        size={33}
                                        color="black"
                                        style={{ marginRight: 10 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            marginRight: 10,
                                        }}>
                                        {item.tmx}°
                                    </Text>
                                    <Text style={{ fontSize: 16, marginRight: 10 }}>
                                        {item.tmn}°
                                    </Text>
                                    <Text style={{ fontSize: 16, marginRight: 10 }}>{item.wf}</Text>
                                </View>
                            );
                        }
                    )}
                </View>
            </View>
        </ScrollView>
    );
};
export default weather;
