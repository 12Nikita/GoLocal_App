import { UserProvider } from "../context/UserContext";
import { CartProvider } from "../context/CartContext"; 
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CartProvider>
    </UserProvider>
  );
}
