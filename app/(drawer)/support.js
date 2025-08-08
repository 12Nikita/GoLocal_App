import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import mockVendors from "../../constants/mockVendors";

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showAllVendors, setShowAllVendors] = useState(false);

  // will use real data when available
  const orderHistory = [
    { id: "1234", summary: "2 items from Green Grocery" },
    { id: "1250", summary: "1 item from Sharma Snacks" },
    { id: "1265", summary: "3 items from Raj Dairy" },
    { id: "1278", summary: "5 items from Fruit Cart" },
  ]; //will Replace with context or API

  const favoriteVendorIds = ["vendor1", "vendor2", "vendor3"]; 
  const favoriteVendors = mockVendors.filter((v) => favoriteVendorIds.includes(v.id));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Support</Text>

      {/* The Search Bar */}
      <TextInput
        placeholder="What do you want help with?"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Help with Orders */}
      <Text style={styles.sectionHeader}>Need help with an order?</Text>
      {(showAllOrders ? orderHistory : orderHistory.slice(0, 2)).map((order) => (
        <Text key={order.id} style={styles.itemText}>
          • {order.summary}
        </Text>
      ))}
      <TouchableOpacity onPress={() => setShowAllOrders(!showAllOrders)}>
        <Text style={styles.toggleText}>
          {showAllOrders ? "Show less" : "More orders"}
        </Text>
      </TouchableOpacity>

      {/* Help with Vendors */}
      <Text style={styles.sectionHeader}>Need help with a vendor?</Text>
      {(showAllVendors ? favoriteVendors : favoriteVendors.slice(0, 2)).map((vendor) => (
        <Text key={vendor.id} style={styles.itemText}>
          • {vendor.title}
        </Text>
      ))}
      <TouchableOpacity onPress={() => setShowAllVendors(!showAllVendors)}>
        <Text style={styles.toggleText}>
          {showAllVendors ? "Show less" : "More vendors"}
        </Text>
      </TouchableOpacity>

      {/* Contact */}
      <Text style={styles.sectionHeader}>Contact Us</Text>
      <Text style={styles.contact}>📧 support@golocal.app</Text>
      <Text style={styles.contact}>📞 +91 98765 4xyxz</Text>

      {/* Chatbot Placeholder */}
      <View style={styles.chatBotBox}>
        <Icon name="robot" size={24} color="#388e3c" />
        <Text style={styles.chatText}>Chat with GoLocal Support</Text>
      </View>
      <Text style={styles.chatPlaceholder}>
        [ Chatbot support coming soon... ]
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: "#fff",marginTop:20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#388e3c",
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  itemText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
    marginLeft: 6,
  },
  toggleText: {
    color: "#388e3c",
    fontWeight: "bold",
    marginTop: 6,
    marginLeft: 6,
  },
  contact: {
    fontSize: 15,
    marginBottom: 6,
    marginLeft: 6,
    color: "#444",
  },
  chatBotBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  chatText: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 15,
    color: "#2e7d32",
  },
  chatPlaceholder: {
    fontSize: 13,
    color: "gray",
    marginLeft: 10,
    marginTop: 6,
  },
});
