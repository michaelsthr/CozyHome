import Timetable from "@/components/timetable";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function calendar() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/calendar.png")}
          style={{ width: 24, height: 24, marginRight: "auto"}}
        />
          <Image
            source={require("../../../assets/inbox.png")}
            style={{ width: 24, height: 24}}
          />
        <Image
          source={require("../../../assets/symbol-plus.png")}
          style={{ width: 17, height: 17}}
        />
      </View>
      <Timetable />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});
