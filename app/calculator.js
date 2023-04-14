// Calculator.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  display: {
    width: 300,
    height: 100,
    backgroundColor: "white",
    fontSize: 40,
    textAlign: "right",
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  button: {
    width: 75,
    height: 75,
    backgroundColor: "blue",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 30,
  },
});

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value) => {
    if (value === "=") {
      try {
        setResult(eval(expression));
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setExpression("");
      setResult("");
    } else {
      setExpression(expression + value);
      setResult("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.display} value={expression} editable={false} />
      <Text style={styles.display}>{result}</Text>
      <View style={styles.buttons}>
        {[
          "7",
          "8",
          "9",
          "+",
          "4",
          "5",
          "6",
          "-",
          "1",
          "2",
          "3",
          "*",
          ".",
          "0",
          "=",
          "/",
        ].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.button}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("C")}
        >
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
