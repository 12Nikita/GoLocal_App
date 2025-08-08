import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Pressable } from "react-native";

import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import baseVendors from "../../constants/mockVendors";

const ads = [
  require("../../assets/ad1.jpg"),
  require("../../assets/ad2.jpg"),
  require("../../assets/ad3.jpg"),
   require("../../assets/ad4.jpg"),
];

const mockCategories = [
  { id: "1", name: "Vegetables" },
  { id: "2", name: "Medicines" },
  { id: "3", name: "Clothes" },
  { id: "4", name: "Grocery" },
];

function generateNearbyCoords(lat, lon, count = 10, minMeters = 100, maxMeters = 900) {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * (maxMeters - minMeters) + minMeters;
    const deltaLat = (distance / 111000) * Math.cos(angle);
    const deltaLon = (distance / (111000 * Math.cos(lat * Math.PI / 180))) * Math.sin(angle);
    return {
      latitude: lat + deltaLat,
      longitude: lon + deltaLon,
    };
  });
}

export default function Home() {
  const [region, setRegion] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [adIndex, setAdIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const flatListRef = useRef(null);
  const mapRef = useRef(null);
  const navigation = useNavigation();
useEffect(() => {
  (async () => {
    // Skip permission and location, used fixed location
    const fixedLat = 28.6315;  // Connaught Place Latitude
    const fixedLon = 77.2167;  // Connaught Place Longitude

    setRegion({
      latitude: fixedLat,
      longitude: fixedLon,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    });

    const coordsList = generateNearbyCoords(fixedLat, fixedLon, baseVendors.length);
    const updatedVendors = baseVendors.map((vendor, i) => ({
      ...vendor,
      coords: coordsList[i],
    }));

    setVendors(updatedVendors);

    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.fitToCoordinates(
          [{ latitude: fixedLat, longitude: fixedLon }, ...coordsList],
          {
            edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
            animated: true,
          }
        );
      }
    }, 6000);
  })();

  const interval = setInterval(() => {
    setAdIndex((prev) => (prev + 1) % ads.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);


  const filteredVendors = selectedCategory
    ? vendors.filter((v) => v.type === selectedCategory)
    : vendors;

  const topVendors = vendors;

  const scrollVendors = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 200, animated: true });
    }
  };

  return (
    <Pressable
      style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}
      onPress={() => selectedCategory && setSelectedCategory(null)}
    >
      
        <ScrollView keyboardShouldPersistTaps="handled"
  style={{ flex: 1, backgroundColor: "#fff" }}
  showsVerticalScrollIndicator={false}
>

        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.logo}>GoLocal</Text>
          <View style={styles.iconGroup}>
            <TouchableOpacity onPress={() => router.push("/(drawer)/cart")}> 
              <Ionicons name="cart-outline" size={24} color="#333" />
            </TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={20} style={styles.searchIcon} />
          <TextInput
            placeholder="Search for items (e.g., Tomato)"
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={searchQuery}
            returnKeyType="search"
            onChangeText={(text) => {
              setSearchQuery(text);
              const query = text.toLowerCase().trim();
              if (query === "") {
                setSearchSuggestions([]);
                return;
              }
              const allItems = vendors.flatMap((vendor) => vendor.items.map((item) => item.name));
              const uniqueItems = [...new Set(allItems)];
              const suggestions = uniqueItems.filter((item) => item.toLowerCase().includes(query));
              setSearchSuggestions(suggestions.slice(0, 5));
            }}
            onSubmitEditing={() => {
              const finalQuery = searchQuery.trim().toLowerCase();
              if (finalQuery.length > 0) {
                setSearchQuery("");
                setSearchSuggestions([]);
                router.push(`/searchresults/${finalQuery}`);
              }
            }}
          />
        </View>
        {searchSuggestions.length > 0 && (
          <View style={{ backgroundColor: "#f0f0f0", borderRadius: 8, marginBottom: 10 }}>
            {searchSuggestions.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  setSearchQuery("");
                  setSearchSuggestions([]);
                  router.push(`/searchresults/${item.toLowerCase()}`);
                }}
                style={{ paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: idx !== searchSuggestions.length - 1 ? 1 : 0, borderBottomColor: "#ccc" }}
              >
                <Text style={{ fontFamily: "Lora-Regular" }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Map */}
        <View style={styles.mapWrapper}>
          {region && (
            <MapView
              ref={mapRef}
              style={StyleSheet.absoluteFillObject}
              showsUserLocation
              customMapStyle={[]}
              initialRegion={region}
            >
              {vendors.map((vendor) => (
                <Marker
                  key={vendor.id}
                  coordinate={vendor.coords}
                  title={vendor.title}
                  description={vendor.type}
                  image={vendor.marker}
                  onPress={() => router.push(`/vendor/${vendor.id}`)}
                />
              ))}
            </MapView>
          )}
        </View>

        {/* CATEGORY + VENDOR SECTION */}
        <View>
          <View style={styles.headerRow}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <Text style={styles.sectionTitle}>Nearby Vendors</Text>
            </Pressable>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <Text style={styles.sectionTitle}>Category</Text>
            </Pressable>
          </View>

          <Pressable onPress={(e) => e.stopPropagation()}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {mockCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.name)}
                  style={[styles.categoryBox, selectedCategory === cat.name && styles.selectedCategoryBox]}
                >
                  <Text style={styles.categoryText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>

          {selectedCategory && (
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={styles.horizontalVendorSection}>
                <FlatList
                  ref={flatListRef}
                  data={filteredVendors}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => router.push(`/vendor/${item.id}`)}
                      style={styles.hVendorCard}
                    >
                      <Image source={item.image} style={styles.vendorImage} />
                      <Text style={styles.vendorTitle}>{item.title}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity onPress={scrollVendors}>
                  <Ionicons name="arrow-forward-circle" size={30} color="green" />
                </TouchableOpacity>
              </View>
            </Pressable>
          )}
        </View>

      {/* Ad Banner */}
      <Image source={ads[adIndex]} style={styles.adImage} />
      {searchQuery.length > 0 && (
  <>
    <Text style={{ fontSize: 18, fontFamily: "LilitaOne-Regular", marginBottom: 10 }}>
      Search Results for "{searchQuery}"
    </Text>
    {searchResults.length === 0 ? (
      <Text style={{ fontFamily: "Lora-Regular", color: "gray", marginBottom: 20 }}>
        No vendors found selling that item.
      </Text>
    ) : (
      searchResults.map((vendor) => (
        <TouchableOpacity
          key={vendor.id}
          style={styles.detailedCard}
          onPress={() => router.push(`/vendor/${vendor.id}`)}
        >
          <Image source={vendor.image} style={styles.detailedImage} />
          <View>
            <Text style={{ fontFamily: "Lora-Regular", fontWeight: "bold", fontSize: 16 }}>
              {vendor.title}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>{vendor.type}</Text>

            {/* Highlighted searched item */}
            <View style={{ backgroundColor: "#d2f2d0", padding: 5, borderRadius: 6, marginTop: 4 }}>
              <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                {vendor.matchedItems[0].name} - ₹{vendor.matchedItems[0].price}/{vendor.matchedItems[0].unit}
              </Text>
            </View>

            {/* Other related items */}
            {vendor.matchedItems.slice(1).map((item, idx) => (
              <Text key={idx} style={{ fontSize: 13, color: "#555" }}>
                {item.name} - ₹{item.price}/{item.unit}
              </Text>
            ))}
          </View>
        </TouchableOpacity>
      ))
    )}
    <View style={styles.separator} />
  </>
)}


      {/* Vertical Vendor List */}
      {topVendors.slice(0, 4).map((vendor) => (
        <TouchableOpacity
          key={vendor.id}
          style={styles.detailedCard}
          onPress={() => router.push(`/vendor/${vendor.id}`)}
        >
          <Image source={vendor.image} style={styles.detailedImage} />
          <View>
            <Text style={{ fontFamily: "Lora-Regular", fontWeight: "bold", fontSize: 16 }}>
              {vendor.title}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>{vendor.type}</Text>
            <Text style={{ fontSize: 13, color: "#555" }}>{vendor.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.viewAllButton} onPress={() => router.push("/allvendors")}>
        <Text style={styles.viewAllText}>View All Nearby Vendors</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      {/* Quick Options */}
     <View style={styles.optionsRow}>
  {["Customer Service", "My Favourites", "My Orders"].map((opt, idx) => (
    <TouchableOpacity
      key={idx}
      style={styles.optionBox}
      onPress={() => {
        if (opt === "Customer Service") {
          router.push("/(drawer)/support"); // This will Navigate to Support screen
        } else {
       
          alert(`${opt} coming soon...`);
        }
      }}
    >
      <Ionicons name="star-outline" size={20} color="green" />
      <Text style={styles.optionText}>{opt}</Text>
    </TouchableOpacity>
  ))}
</View>
    </ScrollView>
    </Pressable>
  );
}



const styles = StyleSheet.create({
  topBar: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight:150,
    color: "green",
    fontFamily: "LilitaOne-Regular",
  },
  iconGroup: { flexDirection: "row" },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DBDBDB",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    marginVertical: 20,
  },
  searchIcon: { marginRight: 8, color: "#000" },
  searchInput: { flex: 1, fontFamily: "Lora-Regular", color: "#000" },
  mapWrapper: {
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontFamily: "LilitaOne-Regular" },
  categoryScroll: { marginBottom: 20 },
  categoryBox: {
    backgroundColor: "#A5D6A7",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  selectedCategoryBox: { backgroundColor: "#67AE6E" },
  categoryText: { fontFamily: "Lora-Regular", fontWeight: "bold", fontSize: 14 },
  horizontalVendorSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  hVendorCard: {
    width: 140,
    marginRight: 10,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
  },
  vendorImage: { width: 80, height: 80, marginBottom: 5 },
  vendorTitle: { fontFamily: "Lora-Regular", fontWeight: "bold", fontSize: 16 },
  adImage: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailedCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    minHeight: 120,
  },
  detailedImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  viewAllButton: {
    backgroundColor: "#A5D6A7",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 25,
  },
  viewAllText: {
    fontFamily: "Lora-Regular",
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
    marginBottom: 50,
  },
  optionBox: {
    flex: 1,
    backgroundColor: "#e6f2e6",
    padding: 3,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },
  optionText: {
    fontSize: 13,
    fontFamily: "Lora-Regular",
    marginTop: 5,
    textAlign: "center",
  },
  matchedBox: {
  backgroundColor: "#C8E6C9",
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 8,
  marginVertical: 5,
  alignSelf: "flex-start",
},
matchedText: {
  color: "#2E7D32",
  fontWeight: "bold",
  fontFamily: "Lora-Regular",
},

});
