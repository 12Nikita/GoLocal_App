import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Vibration,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import mockVendors from "../../constants/mockVendors";



export default function VendorDetail() {
  
  const router = useRouter();
  const { id, highlight } = useLocalSearchParams();
  const vendor = mockVendors.find((v) => v.id === id);
  const highlightedItem = highlight?.toLowerCase().trim() || "";

  const [activeItemId, setActiveItemId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const { addToCart } = useCart();

  const handleAddPress = (itemId) => {
    setActiveItemId(itemId);
    setAddedItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  const handleAddToCart = (itemId) => {
    if (quantities[itemId] && parseInt(quantities[itemId]) > 0) {
      Vibration.vibrate([0, 60, 40, 60]);
      const item = vendor.items.find((i) => i.id === itemId);
      const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
      addToCart(vendor.id, {
        ...item,
        vendorName: vendor.title,
        price: numericPrice,
        quantity: parseFloat(quantities[itemId]),
      });
      setAddedItems((prev) => ({ ...prev, [itemId]: true }));
    }
  };

  const highlightedItemExact = vendor?.items.find(
    (item) => item.name.toLowerCase() === highlightedItem
  );

  const otherMatchedItems = vendor?.items.filter(
    (item) =>
      item.name.toLowerCase().includes(highlightedItem) &&
      item.name.toLowerCase() !== highlightedItem
  );

  const remainingItems = vendor?.items.filter(
    (item) => !item.name.toLowerCase().includes(highlightedItem)
  );

  const renderItem = (item) => {
    const isActive = activeItemId === item.id;
    const isAdded = addedItems[item.id];

    return (
      <Pressable
        key={item.id}
        onPress={(e) => e.stopPropagation()}
        style={styles.itemBox}
      >
        <View style={styles.itemHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              ₹{item.price}/{item.unit}
            </Text>
          </View>

          {activeItemId !== item.id && (
            <TouchableOpacity onPress={() => handleAddPress(item.id)}>
              <Text style={styles.addItemButton}>Add Item</Text>
            </TouchableOpacity>
          )}
        </View>

        {isActive && (
          <>
            {!isAdded ? (
              <View style={styles.expandedSection}>
                <TextInput
                  placeholder="Enter quantity"
                  keyboardType="numeric"
                  style={styles.quantityInput}
                  value={quantities[item.id] || ""}
                  onChangeText={(text) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [item.id]: text,
                    }))
                  }
                />
                <TouchableOpacity
                  style={styles.addToCartBtn}
                  onPress={() => handleAddToCart(item.id)}
                >
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.addedMessage}>
                <Text style={styles.addedText}>Item Added</Text>
                <TouchableOpacity
                  style={styles.goToCartBtn}
                  onPress={() => {
                    setActiveItemId(null); // ✅ collapse before navigating
                    router.push("/(drawer)/cart");
                  }}
                >
                  <Text style={styles.goToCartText}>Go to Cart</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </Pressable>
    );
  };

  if (!vendor) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Vendor not found.</Text>
      </View>
    );
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (activeItemId !== null) setActiveItemId(null);
      }}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Image source={vendor.image} style={styles.image} />
        <Text style={styles.title}>{vendor.title}</Text>
        <Text style={styles.description}>{vendor.description}</Text>

        <Text style={styles.itemsHeader}>Available Items:</Text>

        {highlightedItemExact && renderItem(highlightedItemExact)}

        {otherMatchedItems.length > 0 && (
          <>
            <Text style={styles.subHeader}>Other matches:</Text>
            {otherMatchedItems.map(renderItem)}
          </>
        )}

        {remainingItems.length > 0 && (
          <>
            <Text style={styles.subHeader}>Other available items:</Text>
            {remainingItems.map(renderItem)}
          </>
        )}
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 16, marginTop: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 6, color: "green" },
  description: { fontSize: 16, color: "#555", marginBottom: 12 },
  itemsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#222",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#444",
  },
  itemBox: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#a5d6a7",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { fontSize: 14, color: "#333" },
  addItemButton: {
    backgroundColor: "#a5d6a7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontWeight: "bold",
    color: "#fff",
  },
  expandedSection: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  addToCartBtn: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addedMessage: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addedText: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
  goToCartBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#81c784",
    borderRadius: 8,
  },
  goToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
});


