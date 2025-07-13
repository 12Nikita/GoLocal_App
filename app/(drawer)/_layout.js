// app/(drawer)/_layout.js
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from '../../context/CartContext'; 

export default function DrawerLayout() {
  return (
    <CartProvider>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: 'green',
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="cart"
          options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
  name="profile"
  options={{
    title: "My Profile",
    drawerIcon: ({ color, size }) => (
      <Ionicons name="person-circle-outline" size={size} color={color} />
    ),
  }}
/>
<Drawer.Screen
  name="allvendors"
  options={{
    title: "All Vendors",
    drawerIcon: ({ color, size }) => (
      <Ionicons name="storefront-outline" size={size} color={color} />
    ),
  }}
/>
<Drawer.Screen
  name="support"
  options={{
    title: "Support",
    drawerIcon: ({ color, size }) => (
      <Ionicons name="help-buoy-outline" size={size} color={color} />
    ),
  }}
/>

      </Drawer>

    </CartProvider>
  );
}
