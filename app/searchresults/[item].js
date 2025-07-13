import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import baseVendors from "../../constants/mockVendors";

export default function SearchResultScreen() {
  const { item } = useLocalSearchParams();
  const searchQuery = item?.toLowerCase() || "";

  const matchedVendors = baseVendors
    .map((vendor) => {
      const matchedItems = vendor.items.filter((i) =>
        i.name.toLowerCase().includes(searchQuery)
      );
      if (matchedItems.length > 0) {
        return { ...vendor, matchedItems };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 20, fontFamily: "LilitaOne-Regular", marginBottom: 20 }}>
        Vendors selling: {item}
      </Text>

      {matchedVendors.length === 0 ? (
        <Text style={{ fontFamily: "Lora-Regular", color: "gray" }}>
          No vendors found selling that item.
        </Text>
      ) : (
        matchedVendors.map((vendor) => (
          <TouchableOpacity
            key={vendor.id}
           onPress={() =>
  router.push({
    pathname: `/vendor/${vendor.id}`,
    params: { highlight: item?.toLowerCase() || "" },
  })
}

            style={styles.vendorCard}
          >
            <Image source={vendor.image} style={styles.vendorImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.vendorName}>{vendor.title}</Text>
              <Text style={{ fontSize: 14, color: "gray" }}>{vendor.type}</Text>

              <View style={styles.matchedBox}>
                <Text style={styles.matchedItemText}>
                  {vendor.matchedItems[0].name} - ₹{vendor.matchedItems[0].price}/{vendor.matchedItems[0].unit}
                </Text>
              </View>

              {vendor.matchedItems.slice(1).map((i, idx) => (
                <Text key={idx} style={{ fontSize: 13, color: "#555" }}>
                  {i.name} - ₹{i.price}/{i.unit}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  vendorCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  vendorImage: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 10,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Lora-Regular",
  },
  matchedBox: {
    backgroundColor: "#d2f2d0",
    padding: 5,
    borderRadius: 6,
    marginTop: 4,
  },
  matchedItemText: {
    fontWeight: "bold",
    fontSize: 13,
  },
});
