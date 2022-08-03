import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function LoadingScreen() {
  return (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large"  color= "#4c46c8"/>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '87%',
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  }
});
