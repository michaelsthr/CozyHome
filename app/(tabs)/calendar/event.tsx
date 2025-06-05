import CozyDate from "@/components/cozy_date";
import CozySwitch from "@/components/cozy_switch";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { calendarStyles } from "./styles";

const { height } = Dimensions.get("window");

export default function Event() {
  const dummyDescription: string =
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ";

  const startDate: string = "10.04.2025-12:00";
  const endDate: string = "10.04.2025-15:00";

  const wholeday: boolean = false;
  const switchTitle: string = "Ganztägig";

  return (
    <View
      style={{
        alignContent: "center",
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: 30,
        backgroundColor: "blue"
      }}>
      <Text style={calendarStyles.h1}>Title</Text>
      <Text style={calendarStyles.text}>{dummyDescription}</Text>
      <CozyDate startDate={startDate} endDate={endDate} />
      <CozySwitch state={wholeday} title={switchTitle} />
      <Text style={calendarStyles.text}>repeat</Text>
      <Text style={calendarStyles.text}>Category</Text>
    </View>
  );
}
