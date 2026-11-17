import type { RestaurantSettings } from "@/types";

export const DEFAULT_RESTAURANT_SETTINGS: RestaurantSettings = {
  name: "Lolacat><",
  tagline: {
    en: "Little bites. Big happiness.",
    ar: "لقيمات صغيرة.. سعادة كبيرة.",
  },
  description: {
    en: "A modern Japanese sushi, ramen, and noodles kitchen inspired by Tokyo street craft and playful Kawaii cat hospitality.",
    ar: "مطبخ ياباني عصري للسوشي والرامن والنودلز مستوحى من شوارع طوكيو وروح الضيافة اللطيفة.",
  },
  email: "hello@lolacat.kitchen",
  phone: "+20 100 778 4420",
  address: {
    en: "14 El-Gezira St., Zamalek, Cairo, Egypt",
    ar: "١٤ شارع الجزيرة، الزمالك، القاهرة، مصر",
  },
  openingHours: [
    { day: "monday", openTime: "12:00", closeTime: "23:30", isClosed: false },
    { day: "tuesday", openTime: "12:00", closeTime: "23:30", isClosed: false },
    { day: "wednesday", openTime: "12:00", closeTime: "23:30", isClosed: false },
    { day: "thursday", openTime: "12:00", closeTime: "00:30", isClosed: false },
    { day: "friday", openTime: "13:00", closeTime: "01:00", isClosed: false },
    { day: "saturday", openTime: "12:00", closeTime: "01:00", isClosed: false },
    { day: "sunday", openTime: "12:00", closeTime: "23:30", isClosed: false },
  ],
  socialLinks: {
    instagram: "https://instagram.com/lolacat.kitchen",
    facebook: "https://facebook.com/lolacat.kitchen",
    tiktok: "https://tiktok.com/@lolacat.kitchen",
    website: "https://lolacat.kitchen",
  },
  currency: "EGP",
  defaultLanguage: "en",
  updatedAt: "2026-11-01T10:00:00.000Z",
};
