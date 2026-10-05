
export const restaurantConfig = {
  name: "Mahashi & Koshari Al Tahrir",
  shortName: "Mahashi & Koshari",
  area: "Abu Dhabi",
  description:
    "Authentic Egyptian mahashi, koshari, pasta, desserts and drinks delivered in Abu Dhabi.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  deliveryFee: 10,
  freeDeliveryAt: 150,
  freeGiftAt: 100,
  acceptingOrders: true,
  timezone: "Asia/Dubai",
  openingHour: 10,
  closingHour: 23
};

export const legalNotice = {
  textBefore: "By using this website or placing an order, you agree to our",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  cancellation: "Cancellation & Refund Policy"
};
