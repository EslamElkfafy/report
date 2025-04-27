import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Hand-thrown Ceramic Mug",
    price: 35,
    image: "https://images.pexels.com/photos/5877676/pexels-photo-5877676.jpeg",
    description: "This handcrafted ceramic mug is perfect for your morning coffee or tea. Each piece is unique with subtle variations in glaze and form.",
    category: "ceramics",
    artistId: 1,
    featured: true,
    materials: ["clay", "ceramic glaze"],
    dimensions: "4\"H x 3.5\"W",
    inStock: 8
  },
  {
    id: 2,
    name: "Woven Wall Hanging",
    price: 120,
    image: "https://images.pexels.com/photos/6048023/pexels-photo-6048023.jpeg",
    description: "A beautiful handwoven wall hanging made with natural fibers and dyed with plant-based colors. Each piece tells a story through texture and pattern.",
    category: "textiles",
    artistId: 2,
    featured: true,
    materials: ["cotton", "wool", "natural dyes"],
    dimensions: "24\"H x 18\"W",
    inStock: 3
  },
  {
    id: 3,
    name: "Hand-forged Copper Pendant",
    price: 75,
    image: "https://images.pexels.com/photos/10983783/pexels-photo-10983783.jpeg",
    description: "This stunning pendant is hand-forged from copper and features a delicate leaf design. Each pendant comes with an 18\" sterling silver chain.",
    category: "jewelry",
    artistId: 3,
    featured: false,
    materials: ["copper", "sterling silver"],
    dimensions: "1.5\"H x 1\"W",
    inStock: 5
  },
  {
    id: 4,
    name: "Carved Wooden Bowl",
    price: 95,
    image: "https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg",
    description: "This bowl is hand-carved from a single piece of reclaimed walnut wood. Perfect for fruit or as a decorative piece in your home.",
    category: "woodworking",
    artistId: 4,
    featured: true,
    materials: ["walnut wood", "natural oils"],
    dimensions: "4\"H x 8\"W",
    inStock: 2
  },
  {
    id: 5,
    name: "Hand-printed Linen Napkins",
    price: 45,
    image: "https://images.pexels.com/photos/7214304/pexels-photo-7214304.jpeg",
    description: "Set of four linen napkins with hand-printed botanical designs. Made with sustainable linen and non-toxic inks.",
    category: "textiles",
    artistId: 2,
    featured: false,
    materials: ["linen", "non-toxic ink"],
    dimensions: "20\"x20\" each",
    inStock: 10
  },
  {
    id: 6,
    name: "Stained Glass Suncatcher",
    price: 68,
    image: "https://images.pexels.com/photos/2950365/pexels-photo-2950365.jpeg",
    description: "Handcrafted stained glass suncatcher that creates beautiful light patterns. Each piece is made using traditional copper foil techniques.",
    category: "glass",
    artistId: 5,
    featured: false,
    materials: ["glass", "copper foil", "lead-free solder"],
    dimensions: "8\" diameter",
    inStock: 4
  },
  {
    id: 7,
    name: "Hand-stitched Leather Journal",
    price: 55,
    image: "https://images.pexels.com/photos/6044226/pexels-photo-6044226.jpeg",
    description: "This journal features a hand-stitched leather cover and handmade paper pages. Perfect for sketching, writing, or as a special gift.",
    category: "paper",
    artistId: 6,
    featured: true,
    materials: ["vegetable-tanned leather", "handmade paper", "waxed linen thread"],
    dimensions: "8\"H x 6\"W",
    inStock: 7
  },
  {
    id: 8,
    name: "Handwoven Wool Scarf",
    price: 85,
    image: "https://images.pexels.com/photos/3738394/pexels-photo-3738394.jpeg",
    description: "Stay warm with this beautiful handwoven wool scarf. Made with locally sourced wool and dyed with natural plant dyes.",
    category: "textiles",
    artistId: 2,
    featured: false,
    materials: ["wool", "natural dyes"],
    dimensions: "72\"L x 12\"W",
    inStock: 6
  },
  {
    id: 9,
    name: "Ceramic Serving Platter",
    price: 110,
    image: "https://images.pexels.com/photos/4226805/pexels-photo-4226805.jpeg",
    description: "This large ceramic serving platter is perfect for entertaining. Handmade with durable stoneware clay and a food-safe glaze.",
    category: "ceramics",
    artistId: 1,
    featured: true,
    materials: ["stoneware clay", "food-safe glaze"],
    dimensions: "16\"L x 10\"W",
    inStock: 3
  },
  {
    id: 10,
    name: "Hand-poured Soy Candle",
    price: 28,
    image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
    description: "A hand-poured soy candle with essential oils. Each candle comes in a handthrown ceramic vessel that can be reused.",
    category: "home",
    artistId: 1,
    featured: false,
    materials: ["soy wax", "cotton wick", "essential oils", "ceramic"],
    dimensions: "3\"H x 3\"W",
    inStock: 12
  },
  {
    id: 11,
    name: "Carved Wooden Spoons",
    price: 42,
    image: "https://images.pexels.com/photos/6831088/pexels-photo-6831088.jpeg",
    description: "Set of three hand-carved wooden spoons made from cherry wood. Perfect for cooking and serving.",
    category: "woodworking",
    artistId: 4,
    featured: false,
    materials: ["cherry wood", "natural oils"],
    dimensions: "Various sizes",
    inStock: 5
  },
  {
    id: 12,
    name: "Handmade Quilted Pillow",
    price: 65,
    image: "https://images.pexels.com/photos/6794921/pexels-photo-6794921.jpeg",
    description: "This beautiful pillow features hand-quilted designs and natural fabric. Each piece is one-of-a-kind.",
    category: "textiles",
    artistId: 7,
    featured: true,
    materials: ["cotton", "linen", "down insert"],
    dimensions: "18\"x18\"",
    inStock: 4
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "ceramics", name: "Ceramics" },
  { id: "textiles", name: "Textiles" },
  { id: "jewelry", name: "Jewelry" },
  { id: "woodworking", name: "Woodworking" },
  { id: "glass", name: "Glass" },
  { id: "paper", name: "Paper & Books" },
  { id: "home", name: "Home Goods" }
];

export const priceRanges = [
  { id: 1, range: [0, 50], label: "Under $50" },
  { id: 2, range: [50, 100], label: "$50 - $100" },
  { id: 3, range: [100, 200], label: "$100 - $200" },
  { id: 4, range: [0, 1000], label: "All Prices" }
];