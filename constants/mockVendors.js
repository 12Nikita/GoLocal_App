const baseVendors = [
  {
    id: "v1",
    title: "Jasbeer Dairy",
    type: "Dairy",
    description: "Fresh milk, curd and paneer available daily.",
    image: require("../assets/vendors/jasbeer-dairy.jpg"),
    marker: require("../assets/vendor-marker.png"),
    coords: { latitude: 28.6922, longitude: 77.1600 },
    items: [
      {id:"v1i1", name: "Milk", price: "₹50", unit: "litre" },
      {id:"v1i2",name: "Curd", price: "₹40", unit: "500g" },
      {id:"v1i3", name: "Paneer", price: "₹90", unit: "250g" },
    ],
  },
  {
    id: "v2",
    title: "Oven Classics",
    type: "Bakery",
    description: "Cakes, pastries and breads fresh from the oven.",
    image: require("../assets/vendors/oven-classics.jpg"),
    marker: require("../assets/vendor-marker.png"),
    coords: { latitude: 28.6915, longitude: 77.1620 },
    items: [
      {id:"v2i1", name: "Bread", price: "₹35", unit: "loaf" },
      {id:"v2i2", name: "Chocolate Cake", price: "₹299", unit: "half kg" },
      {id:"v2i3", name: "Patties", price: "₹25", unit: "piece" },
    ],
  },
  {
    id: "v3",
    title: "Patel Sabzi Wala",
    type: "Vegetables",
    description: "Daily fresh vegetables from the mandi.",
    image: require("../assets/vendors/patel-sabzi-wala.jpg"),
    marker: require("../assets/vendor-marker.png"),
    coords: { latitude: 28.6900, longitude: 77.1630 },
    items: [
      {id:"v3i1", name: "Tomato", price: "₹30", unit: "kg" },
      {id:"v3i2", name: "Onion", price: "₹25", unit: "kg" },
      {id:"v3i3", name: "Potato", price: "₹20", unit: "kg" },
    ],
  },
  {
    id: "v4",
    title: "Glamoure Zone",
    type: "Accessories",
    description: "Stylish women's accessories and beauty products.",
    image: require("../assets/vendors/glamour-zone.jpg"),
    marker: require("../assets/vendor-marker.png"),
    coords: { latitude: 28.6929, longitude: 77.1670 },
    items: [
      {id:"v4i1", name: "Earrings", price: "₹99", unit: "pair" },
      {id:"v4i2", name: "Bangles Set", price: "₹149", unit: "set" },
      {id:"v4i3", name: "Hair Clips", price: "₹20", unit: "piece" },
    ],
  },
  {
    id: "v5",
    title: "Ramesh Chat Centre",
    type: "Street Food",
    description: "Spicy and tangy chaat items with authentic taste.",
    image: require("../assets/vendors/ramesh-chat.jpg"),
    marker: require("../assets/vendor-marker.png"),
    coords: { latitude: 28.6921, longitude: 77.1609 },
    items: [
      {id:"v5i1", name: "Samosa", price: "₹10", unit: "piece" },
      {id:"v5i2", name: "Pani Puri", price: "₹25", unit: "plate" },
      {id:"v5i3", name: "Aloo Tikki", price: "₹30", unit: "plate" },
    ],
  },
  {
    id: "v6",
    title: "Sharma Kirana Store",
    type: "Grocery",
    description: "Daily essentials and household grocery.",
    image: require("../assets/vendors/sharma-kirana.jpg"),
    marker: require("../assets/vendor-marker.png"),
    coords: { latitude: 28.6860, longitude: 77.1638 },
    items: [
      {id:"v6i1", name: "Toor Dal", price: "₹110", unit: "kg" },
      {id:"v6i2", name: "Salt", price: "₹18", unit: "1kg" },
      {id:"v6i3", name: "Refined Oil", price: "₹130", unit: "1L" },
    ],
  },
  {
    id: "v7",
    title: "Lucky Footwear",
    type: "Footwear",
    description: "Shoes, slippers and more at great prices.",
    image: require("../assets/vendors/lucky-footwear.jpg"),
    marker: require("../assets/vendor-marker.png"),
    coords: { latitude: 28.6920, longitude: 77.1654 },
    items: [
      {id:"v7i1", name: "Running Shoes", price: "₹999", unit: "pair" },
      {id:"v7i2", name: "Slippers", price: "₹199", unit: "pair" },
      {id:"v7i3", name: "Sandals", price: "₹499", unit: "pair" },
    ],
  },
];

export default baseVendors;
