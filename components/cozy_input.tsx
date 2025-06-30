import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps;

export default function CozyInput({ ...rest }: Props) {
  return <TextInput style={styles.input} {...rest}></TextInput>;
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    fontSize: 17,

    marginVertical: 10,
    padding: 10,
    alignItems: "center",
  },
});
