export const ALL_CATEGORIES = [
    {
      "cname": "Electronics",
      "ckey": "electronics"
    },
    {
      "cname": "Fashion",
      "ckey": "fashion"
    },
    {
      "cname": "Home & Kitchen",
      "ckey": "home_and_kitchen"
    },
    {
      "cname": "Health & Personal Care",
      "ckey": "health_and_personal_care"
    },
    {
      "cname": "Sports & Outdoors",
      "ckey": "sports_and_outdoors"
    },
    {
      "cname": "Automotive",
      "ckey": "automotive"
    },
    {
      "cname": "Books",
      "ckey": "books"
    },
    {
      "cname": "Movies, Music & Games",
      "ckey": "movies_music_and_games"
    },
    {
      "cname": "Toys & Kids",
      "ckey": "toys_and_kids"
    },
    {
      "cname": "Food & Grocery",
      "ckey": "food_and_grocery"
    },
    {
      "cname": "Beauty & Cosmetics",
      "ckey": "beauty_and_cosmetics"
    },
    {
      "cname": "Office Supplies",
      "ckey": "office_supplies"
    },
    {
      "cname": "Pet Supplies",
      "ckey": "pet_supplies"
    },
    {
      "cname": "Baby Products",
      "ckey": "baby_products"
    },
    {
      "cname": "Garden & Outdoor",
      "ckey": "garden_and_outdoor"
    },
    {
      "cname": "Jewelry",
      "ckey": "jewelry"
    },
    {
      "cname": "Handmade",
      "ckey": "handmade"
    },
    {
      "cname": "Industrial & Scientific",
      "ckey": "industrial_and_scientific"
    },
    {
      "cname": "Travel & Luggage",
      "ckey": "travel_and_luggage"
    },
    {
      "cname": "Gift Cards",
      "ckey": "gift_cards"
    }
  ] as const;


export type Category = typeof ALL_CATEGORIES[number];
export type CategoryKey = Category['ckey'];
export type CategoryName = Category['cname'];
