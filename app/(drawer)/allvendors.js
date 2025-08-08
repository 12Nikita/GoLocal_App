import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import  mockVendors  from "../../constants/mockVendors";

export default function AllVendors() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>All Nearby Vendors</Text>

      {mockVendors.map((vendor) => (
        <TouchableOpacity
          key={vendor.id}
          style={styles.card}
          onPress={() => router.push(`/vendor/${vendor.id}`)}
        >
          <Image source={vendor.image} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{vendor.title}</Text>
            <Text style={styles.type}>{vendor.type}</Text>
            <Text style={styles.desc}>{vendor.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
    fontFamily: "LilitaOne-Regular",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: "Lora-Regular",
    fontWeight: "bold",
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4,
    fontFamily: "Lora-Regular",
  },
  desc: {
    fontSize: 13,
    color: "#555",
    fontFamily: "Lora-Regular",
  },
});
