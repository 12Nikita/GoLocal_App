import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState("xyz");
  const [phone, setPhone] = useState("+91 9876543xyz");
  const [email, setEmail] = useState("xyz@example.com");

  const [currentAddress, setCurrentAddress] = useState("Detecting...");
  const [savedAddresses, setSavedAddresses] = useState(["xyz..."]);
  const [newAddress, setNewAddress] = useState("");

  const detectLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setCurrentAddress("Permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [geo] = await Location.reverseGeocodeAsync(location.coords);
      const address = `${geo.name}, ${geo.street}, ${geo.city}`;
      setCurrentAddress(address);
    } catch (error) {
      setCurrentAddress("Location error");
    }
  };

  const addAddress = () => {
    if (newAddress.trim()) {
      setSavedAddresses([...savedAddresses, newAddress.trim()]);
      setNewAddress("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
  <View style={styles.nameRow}>
    <Icon name="account-circle" size={28} color="#388e3c" style={{ marginRight: 8 }} />
    <Text style={styles.name}>{name}</Text>
  </View>

  <TouchableOpacity style={styles.editBtn} onPress={() => router.push("/edit-profile")}>
    <Text style={styles.editText}>Edit</Text>
  </TouchableOpacity>
</View>


      <Text style={styles.label}>Phone: <Text style={styles.value}>{phone}</Text></Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{email}</Text></Text>

      <TouchableOpacity onPress={detectLocation}>
        <Text style={styles.label}>Current Address: <Text style={styles.link}>{currentAddress}</Text></Text>
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.label}>Add Another Address:</Text>
        <View style={styles.addAddressRow}>
          <TextInput
            placeholder="Type address here"
            value={newAddress}
            onChangeText={setNewAddress}
            style={styles.input}
          />
          <TouchableOpacity onPress={addAddress} style={styles.addBtn}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        {savedAddresses.map((addr, idx) => (
          <Text key={idx} style={styles.addressItem}>• {addr}</Text>
        ))}
      </View>

      <Text style={styles.sectionHeader}>Recent Orders</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* will be Replaced with real order cards */}
        <View style={styles.card}><Text>Order 1</Text></View>
        <View style={styles.card}><Text>Order 2</Text></View>
      </ScrollView>

      <Text style={styles.sectionHeader}>Favorite Vendors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* will be Replaced with real vendor cards */}
        <View style={styles.card}><Text>Vendor A</Text></View>
        <View style={styles.card}><Text>Vendor B</Text></View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: "#fff",marginTop:27 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 22, fontWeight: "bold", color: "#388e3c" },
  nameRow: {
  flexDirection: "row",
  alignItems: "center",
}
,
  editBtn: {
    backgroundColor:"#388e3c",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  editText: { color: "#fff", fontWeight: "bold" },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
    color: "#555",
  },
  value: { fontWeight: "normal", color: "#000" },
  link: { color: "blue", textDecorationLine: "underline" },
  addAddressRow: {
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    flex: 1,
    borderRadius: 6,
    marginRight: 10,
  },
  addBtn: {
    backgroundColor: "#4caf50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addressItem: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 14,
    color: "#444",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  card: {
    width: 140,
    height: 100,
    backgroundColor: "#f0f0f0",
    marginRight: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
