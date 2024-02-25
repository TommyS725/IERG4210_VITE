

export const products = [
    //Electronics
    {
        name: "Macbook",
        price: 659.1,
        description:
          "Apple 2020 MacBook Air Laptop M1 Chip, 13” Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Gold",
        image: "mac.jpg",
        category: "Electronics",
        inventory: 2,
      },
      {
        name:"Quest 2",
        price: 234.98,
        description: "Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB",
        image: "quest2.jpeg",
        category: "Electronics",
        inventory: 3,
      },
      {
        name:"Apple AirPods Pro (2nd Generation)",
        price: 249,
        description: "Apple AirPods Pro (2nd Generation) Wireless Ear Buds with USB-C Charging, Up to 2X More Active Noise Cancelling Bluetooth Headphones, Transparency Mode, Adaptive Audio, Personalized Spatial Audio",
        image: "airpods.jpg",
        category: "Electronics",
        inventory: 10,
      },
    //   Food
      {
        name: "Snack Box",
        price: 34,
        description:
          "OREO Original, OREO Golden, CHIPS AHOY! & Nutter Butter Cookie Snacks Variety Pack, 56 Snack Packs (2 Cookies Per Pack)",
        image: "snackbox.jpg",
        category: "Food & Grocery",
        inventory: 2,
      },
      {
        name:"Cashews",
        price: 14.53,
        description:"Planters Lightly Salted Whole Cashews (8.5 oz Canister) Lightly salted with sea salt",
        image: "cashews.jpg",
        category: "Food & Grocery",
        inventory: 36,
      },
      {
        name:"Royal Dansk Danish Cookie Selection",
        price:9.88,
        description:"Royal Dansk Danish Cookie Selection, No Preservatives or Coloring Added, 12 Ounce",
        image:"cookie.jpg",
        category: "Food & Grocery",
        inventory: 20,
      },
    //   Fashion
      {
        name: "Shirt",
        price: 29.5,
        description: "Legendary Whitetails Men's Buck Camp Flannel, Long Sleeve Plaid Button Down Casual Shirt, Corduroy Cuffs",
        image: "shirt.jpg",
        category: "Fashion",
        inventory: 30,
      },
      {
        name:"Bomber Jacket",
        price: 39.99,
        description:"MAGCOMSEN Men's Bomber Jacket Warm Zip Up Spring Coat Lightweight Casual Windbreaker Pilot Jacket with Pockets",
        image:"jacket.jpg",
        category: "Fashion",
        inventory: 23,
      },
      {
        name:"Cargo Pants",
        price: 27.98,
        description:"WZIKAI Mens Cargo Pants,Elastic Waist Sweatpants for Men Casual Long Trousers Light Jogger Pants",
        image:"pants.jpg",
        category: "Fashion",
        inventory: 28,
      },
      //Health & Personal Care
      {
        name: "Vitamin",
        price: 18.9,
        description: "Nutricost Vitamin C with Rose Hips 1025mg, 240 Capsules - Vitamin C 1,000mg, Rose Hips 25mg, Premium, Non-GMO, Gluten Free Supplement",
        image: "vitamin.jpg",
        category: "Health & Personal Care",
        inventory:20,
      },
      {
        name:"Body Lotion",
        price:8.98,
        description:"eos Shea Better Body Lotion- Fresh & Cozy, 24-Hour Moisture Skin Care, Lightweight & Non-Greasy, Made with Natural Shea, Vegan, 16 fl oz",
        image:"lotion.jpg",
        category: "Health & Personal Care",
        inventory: 49,
      },
      {
        name:"Toothbrush",
        price: 8.96,
        description:"Colgate Gum Expert Ultra Soft Gum Toothbrush Pack, Extra Soft Toothbrush for Gum Bleeding and Irritation, Helps Deep Clean Along Gum Line, 2 Pack",
        image:"toothbrush.jpg",
        category: "Health & Personal Care",
        inventory: 17,
      }
] satisfies {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    inventory: number;
}[]
