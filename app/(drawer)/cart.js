import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const [address, setAddress] = useState("Add delivery address");
  const [showCoupons, setShowCoupons] = useState(false); // for dropdown toggle

  const { cartItems, addToCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const mockCoupons = [
    { code: "SAVE10", description: "Flat ₹10 off on orders above ₹100" },
    { code: "FREESHIP", description: "Free delivery on orders above ₹50" },
    { code: "GET20", description: "₹20 off on your first order" },
    { code: "GOLOCAL50", description: "Flat 50% OFF upto ₹50" },
  ];

  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const vendorIds = Object.keys(cartItems).filter(
    (vendorId) => cartItems[vendorId].length > 0
  );

  if (vendorIds.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={styles.emptyText}>🛒 Your cart is empty.</Text>
      </View>
    );
  }

  let totalMRP = 0;
  vendorIds.forEach((vendorId) => {
    cartItems[vendorId].forEach((item) => {
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("₹", ""))
          : item.price;

      totalMRP += price * item.quantity;
    });
  });

  const deliveryCharge = totalMRP > 100 ? 0 : 20;

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "save10") {
      setAppliedDiscount(10);
    } else {
      setAppliedDiscount(0);
    }
  };
  const gstRate = 0.05; // 5% GST
  const gstAmount = totalMRP * gstRate;

  const finalTotal = totalMRP + gstAmount + deliveryCharge - appliedDiscount;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Your Cart</Text>

        {vendorIds.map((vendorId) => (
          <View key={vendorId} style={styles.vendorSection}>
            <Text style={styles.vendorTitle}>
              {cartItems[vendorId][0]?.vendorName || "Vendor"}
            </Text>

            {cartItems[vendorId].map((item) => {
              const price =
                typeof item.price === "string"
                  ? parseFloat(item.price.replace("₹", ""))
                  : typeof item.price === "number"
                  ? item.price
                  : 0;

              const itemTotal = price * item.quantity;

              return (
                <View key={item.id} style={styles.itemCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.unitPrice}>
                      ₹{price} / {item.unit}
                    </Text>
                    <Text style={styles.itemTotal}>
                      ₹{itemTotal.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.qtyControl}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => {
                        if (item.quantity > 1) {
                          addToCart(vendorId, {
                            ...item,
                            quantity: -1,
                          });
                        } else {
                          // Remove if quantity becomes 0
                          addToCart(vendorId, {
                            ...item,
                            quantity: -1,
                          });
                        }
                      }}
                    >
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyValue}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => {
                        addToCart(vendorId, {
                          ...item,
                          quantity: 1,
                        });
                      }}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Dustbin below controls */}
                  <TouchableOpacity
                    onPress={() => {
                      addToCart(vendorId, {
                        ...item,
                        quantity: -item.quantity,
                      });
                    }}
                    style={{ marginTop: 50, alignItems: "center" }}
                  >
                    <Icon name="delete-outline" size={22} color="#03b31aff" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ))}
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>Deliver to:</Text>
          <Text style={styles.addressText}>{address}</Text>
          <TouchableOpacity
            style={styles.changeAddressBtn}
            onPress={() => {
              // In future: open modal with GPS or manual options
            }}
          >
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.promoSection}>
          <TextInput
            placeholder="Enter promo code"
            value={promoCode}
            onChangeText={setPromoCode}
            style={styles.promoInput}
          />
          <TouchableOpacity
            onPress={() => {
              handleApplyPromo();
              alert("Coupon applied!");
            }}
            style={styles.applyBtn}
          >
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.couponBox}>
          <TouchableOpacity onPress={() => setShowCoupons((prev) => !prev)}>
            <Text style={styles.couponHeader}>
              {showCoupons ? "▼ Hide Coupons" : "▶ View Available Coupons"}
            </Text>
          </TouchableOpacity>

          {showCoupons &&
            mockCoupons.map((coupon, index) => (
              <TouchableOpacity
                key={index}
                style={styles.couponCard}
                onPress={() => {
                  setPromoCode(coupon.code);
                  handleApplyPromo();
                }}
              >
                <Text style={styles.couponCode}>{coupon.code}</Text>
                <Text style={styles.couponDesc}>{coupon.description}</Text>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Bill Details</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total MRP</Text>
            <Text style={styles.summaryValue}>₹{totalMRP.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST (5%)</Text>
            <Text style={styles.summaryValue}>₹{gstAmount.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Charges</Text>
            <Text style={styles.summaryValue}>
              ₹{deliveryCharge === 0 ? "0 (Free)" : deliveryCharge}
            </Text>
          </View>
          {appliedDiscount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Promo Discount</Text>
              <Text style={styles.summaryValue}>− ₹{appliedDiscount}</Text>
            </View>
          )}
          <View style={styles.summaryRowTotal}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{finalTotal.toFixed(2)}</Text>
          </View>

          <Text style={styles.eta}>Delivery by ~ 30-45 min</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 29, backgroundColor: "#fff" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 22,
    color: "green",
  },

  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
  },

  vendorSection: { marginBottom: 20 },
  vendorTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2fff2",
    borderWidth: 1,
    borderColor: "#c8e6c9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  itemName: { fontSize: 16, fontWeight: "bold" },
  unitPrice: { fontSize: 14, color: "#555" },
  itemTotal: { fontSize: 15, color: "#333", marginTop: 4 },

  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "center",
  },
  qtyBtn: {
    paddingHorizontal: 8,
  },
  qtyBtnText: { fontSize: 20, color: "#2e7d32", fontWeight: "bold" },
  qtyValue: { fontSize: 16, fontWeight: "bold", color: "#333" },

  promoSection: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 20,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  applyBtn: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyBtnText: { color: "#fff", fontWeight: "bold" },
  couponBox: {
    marginTop: 20,
    backgroundColor: "#f9fbe7",
    borderRadius: 10,
    padding: 10,
  },
  couponHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#388e3c",
  },
  couponCard: {
    padding: 10,
    backgroundColor: "#e8f5e9",
    marginBottom: 8,
    borderRadius: 6,
  },
  couponCode: {
    fontWeight: "bold",
    color: "#2e7d32",
  },
  couponDesc: {
    fontSize: 13,
    color: "#555",
  },

  summaryBox: {
    backgroundColor: "#f1f8e9",
    padding: 16,
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 100, 
  },
  summaryTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryRowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 8,
  },
  summaryLabel: { fontSize: 14, color: "#444" },
  summaryValue: { fontSize: 14, fontWeight: "bold" },
  totalLabel: { fontSize: 16, fontWeight: "bold", color: "#222" },
  totalValue: { fontSize: 16, fontWeight: "bold", color: "green" },
  eta: {
    marginTop: 8,
    fontSize: 13,
    fontStyle: "italic",
    color: "#555",
    textAlign: "right",
  },
  addressBox: {
    marginBottom: 20,
    backgroundColor: "#f1f8e9",
    padding: 10,
    borderRadius: 8,
  },
  addressLabel: {
    fontSize: 14,
    color: "#333",
  },
  addressText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
  },
  changeAddressBtn: {
    marginTop: 6,
  },
  changeText: {
    color: "#388e3c",
    fontWeight: "bold",
  },

  checkoutBtn: {
    position: "relative",
    bottom: 33,
    left: 0,
    right: 0,
    backgroundColor: "#4caf50",
    paddingVertical: 16,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
