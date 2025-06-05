import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface Props {
  startDate: string;
  endDate: string;
}

export default function CozyDate(props: Props) {
  return (
    <View style={{ backgroundColor: "gray", padding: 10 }}>
      <Text>Start Date: {props.startDate}</Text>
      <Text>End Date{props.endDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
