import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface Props {
  state: boolean;
  title: string;
}

export default function CozySwitch(props: Props) {
  let previousState = props.state;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        gap: 10,
        width: "100%"
      }}>
      <Text style={{ color: "black" }}>{props.title}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor='#3e3e3e'
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
