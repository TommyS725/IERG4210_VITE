import { Product } from "../models/products";
import { CartItem } from "../context/ShoppingCartContext";

export const dummy_products = [
  {
    pid: 1,
    pname: "Macbook",
    price: 659.1,
    description:
      "Apple 2020 MacBook Air Laptop M1 Chip, 13” Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Gold",
    image: "/images/products/mac.jpg",
    category: "electronics",
    remaining: 1,
  },
  {
    pid: 2,
    pname: "Snack Box",
    price: 34,
    description:
      "OREO Original, OREO Golden, CHIPS AHOY! & Nutter Butter Cookie Snacks Variety Pack, 56 Snack Packs (2 Cookies Per Pack)",
    image: "/images/products/snackbox.jpg",
    category: "food_and_grocery",
    remaining: 2,
  },
  {
    pid: 3,
    pname: "Shirt",
    price: 29.5,
    description: "Legendary Whitetails Men's Buck Camp Flannel, Long Sleeve Plaid Button Down Casual Shirt, Corduroy Cuffs",
    image: "/images/products/shirt.jpg",
    category: "fashion",
    remaining: 30,
  },
  {
    pid: 4,
    pname:"Luggage",
    price: 120.1,
    description: " Basics 28-Inch Hardside Spinner, Black",
    image: "/images/products/luggage.jpg",
    category: "travel_and_luggage",
    remaining: 3,
  },
  {
    pid: 5,
    pname: "Vitamin",
    price: 18.9,
    description: "Nutricost Vitamin C with Rose Hips 1025mg, 240 Capsules - Vitamin C 1,000mg, Rose Hips 25mg, Premium, Non-GMO, Gluten Free Supplement",
    image: "/images/products/vitamin.jpg",
    category: "health_and_personal_care",
    remaining:20,
  },
] satisfies Product[];

export const dummy_cart = dummy_products
  .map((p) => {
    if (p.pid % 2 !== 0) {
      return { ...p, quantity: Math.floor(p.remaining / p.pid) || 1 };
    }
  })
  .filter((item) => item !== undefined) as CartItem[];

// repeat dummy cart for 10 times

export const dummy_cart_10 = Array.from({ length: 10 }, (_) => {
  return dummy_cart.map((item) => {
    return { ...item, quantity: item.quantity };
  });
}).flat() as CartItem[];
