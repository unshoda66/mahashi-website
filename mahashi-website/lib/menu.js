export const categories = [
  { id: "mahashi", name: "Mahashi", nameAr: "محاشي" },
  { id: "koshari", name: "Koshari", nameAr: "كشري" },
  { id: "pasta", name: "Pasta", nameAr: "مكرونة" },
  { id: "desserts", name: "Desserts", nameAr: "حلويات" },
  { id: "drinks", name: "Drinks", nameAr: "مشروبات" }
];

export const menu = [
  {
    id: "mahashi-plate",
    category: "Mahashi",
    name: "Mahashi Plate",
    nameAr: "طبق محاشي بالقطعة",
    description: "Choose your favorite stuffed vegetables by piece.",
    descriptionAr: "اختاري نوع المحاشي وعدد القطع حسب الطلب.",
    image: "/assets/family-mahashi.jpg",
    badge: "Customer Favorite",
    badgeAr: "مفضل العملاء",
    tags: ["best", "large"],
    options: [
      { id: "grape-leaves-piece", name: "Grape leaves", nameAr: "محشي ورق عنب", price: 2.5 },
      { id: "cabbage-piece", name: "Cabbage", nameAr: "محشي ملفوف", price: 2.5 },
      { id: "onion-piece", name: "Onion", nameAr: "محشي بصل", price: 2.5 },
      { id: "potato-piece", name: "Potato", nameAr: "محشي بطاطس", price: 4 },
      { id: "zucchini-piece", name: "Zucchini", nameAr: "محشي كوسة", price: 4 },
      { id: "pepper-piece", name: "Pepper", nameAr: "محشي فلفل", price: 4 }
    ]
  },
  {
    id: "mahashi-box",
    category: "Mahashi",
    name: "Mahashi Box",
    nameAr: "بوكس محاشي مشكل",
    description: "Mixed mahashi box for sharing.",
    descriptionAr: "بوكس محاشي مشكل مناسب للمشاركة.",
    image: "/assets/mixed-mahashi.jpg",
    badge: "Best Seller",
    badgeAr: "الأكثر مبيعًا",
    tags: ["best", "large"],
    options: [
      { id: "small-30", name: "Small - 30 pieces", nameAr: "صغير - 30 حبة", price: 70 },
      { id: "medium-45", name: "Medium - 45 pieces", nameAr: "وسط - 45 حبة", price: 100 },
      { id: "large-55", name: "Large - 55 pieces", nameAr: "كبير - 55 حبة", price: 120 }
    ]
  },
  {
    id: "classic-koshari",
    category: "Koshari",
    name: "Classic Koshari",
    nameAr: "كشري كلاسيك",
    description: "Rice, lentils, pasta, chickpeas, crispy onions and tomato sauce.",
    descriptionAr: "أرز وعدس ومكرونة وحمص وبصل مقرمش وصلصة طماطم.",
    image: "/assets/classic-koshari.jpg",
    badge: "Best Seller",
    badgeAr: "الأكثر مبيعًا",
    tags: ["best"],
    options: [
      { id: "small", name: "Small", nameAr: "صغير", price: 15 },
      { id: "medium", name: "Medium", nameAr: "وسط", price: 20 },
      { id: "large", name: "Large", nameAr: "كبير", price: 25 }
    ]
  },
  {
    id: "koshari-combo",
    category: "Koshari",
    name: "Koshari Combo",
    nameAr: "كشري كومبو",
    description: "Small koshari with Pepsi and small rice pudding.",
    descriptionAr: "كشري صغير مع بيبسي وأرز بالحليب صغير.",
    image: "/assets/koshari-meal.jpg",
    badge: "Included in Offer",
    badgeAr: "داخل العرض",
    tags: ["best", "new"],
    options: [{ id: "combo", name: "Combo", nameAr: "كومبو", price: 27 }]
  },
  {
    id: "bechamel-pasta",
    category: "Pasta",
    name: "Pasta Bechamel",
    nameAr: "مكرونة بشاميل",
    description: "Baked pasta layers with creamy bechamel.",
    descriptionAr: "مكرونة بشاميل مخبوزة بطبقات كريمية.",
    image: "/assets/bechamel-pasta.jpg",
    badge: "Best Seller",
    badgeAr: "الأكثر مبيعًا",
    tags: ["best"],
    options: [
      { id: "small", name: "Small", nameAr: "صغير", price: 25 },
      { id: "medium", name: "Medium", nameAr: "وسط", price: 35 },
      { id: "large", name: "Large", nameAr: "كبير", price: 45 }
    ]
  },
  {
    id: "taybeen-pasta",
    category: "Pasta",
    name: "Taybeen Pasta",
    nameAr: "مكرونة الطيبين",
    description: "Classic comfort pasta with rich Egyptian-style sauce.",
    descriptionAr: "مكرونة الطيبين بصلصة مصرية غنية.",
    image: "/assets/red-sauce-pasta.jpg",
    badge: "New",
    badgeAr: "جديد",
    tags: ["new"],
    options: [
      { id: "small", name: "Small", nameAr: "صغير", price: 10.5 },
      { id: "medium", name: "Medium", nameAr: "وسط", price: 21 },
      { id: "large", name: "Large", nameAr: "كبير", price: 42 }
    ]
  },
  {
    id: "rice-pudding",
    category: "Desserts",
    name: "Rice Pudding",
    nameAr: "أرز بالحليب",
    description: "Creamy Egyptian rice pudding.",
    descriptionAr: "أرز بالحليب كريمي على الطريقة المصرية.",
    image: "/assets/rice-pudding.jpg",
    badge: "Included in Offer",
    badgeAr: "داخل العرض",
    tags: ["best"],
    options: [
      { id: "small", name: "Small", nameAr: "صغير", price: 10 },
      { id: "large", name: "Large", nameAr: "كبير", price: 15 }
    ]
  },
  {
    id: "custard",
    category: "Desserts",
    name: "Custard",
    nameAr: "كاسترد",
    description: "Silky chilled custard.",
    descriptionAr: "كاسترد بارد ناعم.",
    image: "/assets/custard.jpg",
    badge: "Customer Favorite",
    badgeAr: "مفضل العملاء",
    tags: ["best"],
    options: [
      { id: "small", name: "Small", nameAr: "صغير", price: 10 },
      { id: "large", name: "Large", nameAr: "كبير", price: 15 }
    ]
  },
  {
    id: "om-ali",
    category: "Desserts",
    name: "Om Ali",
    nameAr: "أم علي",
    description: "Warm Egyptian bread pudding with nuts.",
    descriptionAr: "أم علي دافئة بالمكسرات.",
    image: "/assets/desserts.jpg",
    badge: "New",
    badgeAr: "جديد",
    tags: ["new"],
    options: [
      { id: "small", name: "Small", nameAr: "صغير", price: 15 },
      { id: "large", name: "Large", nameAr: "كبير", price: 20 }
    ]
  },
  {
    id: "water",
    category: "Drinks",
    name: "Water",
    nameAr: "مياه",
    description: "Bottled water.",
    descriptionAr: "مياه باردة.",
    image: "/assets/drinks.jpg",
    badge: "",
    badgeAr: "",
    tags: ["best"],
    options: [{ id: "one", name: "One bottle", nameAr: "عبوة واحدة", price: 1 }]
  },
  {
    id: "pepsi",
    category: "Drinks",
    name: "Pepsi",
    nameAr: "بيبسي",
    description: "Chilled Pepsi can.",
    descriptionAr: "بيبسي بارد.",
    image: "/assets/cold-drink.jpg",
    badge: "Customer Favorite",
    badgeAr: "مفضل العملاء",
    tags: ["best"],
    options: [{ id: "one", name: "One can", nameAr: "علبة واحدة", price: 3.5 }]
  },
  {
    id: "seven-up",
    category: "Drinks",
    name: "7UP",
    nameAr: "سفن أب",
    description: "Chilled 7UP can.",
    descriptionAr: "سفن أب بارد.",
    image: "/assets/cold-drink.jpg",
    badge: "",
    badgeAr: "",
    tags: ["new"],
    options: [{ id: "one", name: "One can", nameAr: "علبة واحدة", price: 3.5 }]
  }
].map((item) => ({
  ...item,
  price: Math.min(...item.options.map((option) => option.price))
}));

export const freeGifts = [
  { name: "Rice Pudding", nameAr: "أرز بالحليب" },
  { name: "Custard", nameAr: "كاسترد" },
  { name: "Small dessert", nameAr: "حلو صغير" }
];
