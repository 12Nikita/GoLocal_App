import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function EditProfile() {
  const router = useRouter();

  // Temp local state — replace with global store later
  const [name, setName] = useState("xyz");
  const [phone, setPhone] = useState("+91 9876543xyz");
  const [email, setEmail] = useState("xyz@example.com");

  const handleSave = () => {
   
    Alert.alert("Profile Updated", "Your changes have been saved.");
    router.back(); // Go back to profile page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#388e3c",
  },
  label: { fontSize: 16, fontWeight: "600", marginTop: 10, color: "#333" },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  saveBtn: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
  },
  saveText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
