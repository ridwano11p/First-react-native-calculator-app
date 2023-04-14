import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Stack } from "expo-router";

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  navbarLink: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default function HomePage() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.navbar}>
        <Link href="/calculator">
          <Text style={styles.navbarLink}>Calculator</Text>
        </Link>
        <Link href="/notebook">
          <Text style={styles.navbarLink}>Notebook</Text>
        </Link>
      </View>
      <Text style={styles.welcomeText}>Welcome to the app!</Text>
      <Text style={styles.infoText}>
        This app can be used both as a calculator and as a notebook.
      </Text>
    </View>
  );
}
