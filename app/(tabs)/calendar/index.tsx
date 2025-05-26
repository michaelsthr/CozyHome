import Timetable from "@/components/timetable";
import { router , Link} from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function calendar() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/calendar.png")}
          style={{ width: 24, height: 24, marginRight: "auto" }}
        />
        <Image
          source={require("../../../assets/inbox.png")}
          style={{ width: 24, height: 24 }}
        />
        <Link href="/(tabs)/calendar/add_event" push asChild >
          <Pressable>
            <Image
              source={require("../../../assets/symbol-plus.png")}
              style={{ width: 17, height: 17 }}
            />
          </Pressable>
        </Link>
      </View>
      <Timetable />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});
