"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { categories, freeGifts, menu } from "@/lib/menu";
import { legalNotice, restaurantConfig } from "@/lib/config";

const CART_KEY = "mk_al_tahrir_cart";
const LANG_KEY = "mk_al_tahrir_lang";
const LAST_ORDER_KEY = "mk_al_tahrir_last_order";

const pages = [
  ["Menu", "/"],
  ["Most Ordered", "/most-ordered"],
  ["Newest", "/newest"],
  ["Large Orders", "/large-orders"],
  ["Reservations", "/reservations"],
  ["Events", "/events"],
  ["About Us", "/about"],
  ["Contact Us", "/contact"],
  ["Articles", "/articles"]
];

const categoryIcons = {
  Mahashi: <><path d="M5 14c2.8-5.2 7.5-7.2 14-6-2 6.2-6.8 8.2-14 6Z" /><path d="M5 14c3.5-.8 7-2.7 10.5-5.6" /></>,
  Koshari: <><path d="M5 10h14l-1.2 9H6.2L5 10Z" /><path d="M8 10c.2-3 2-5 4-5s3.8 2 4 5" /><path d="M8.5 14h7M9 17h6" /></>,
  Pasta: <><path d="M5 12c2-2 4-2 6 0s4 2 6 0 3-2 4-1" /><path d="M5 16c2-2 4-2 6 0s4 2 6 0 3-2 4-1" /><path d="M4 20h16" /></>,
  Desserts: <><path d="M6 11h12l-1 9H7l-1-9Z" /><path d="M8 11c0-3 1.8-5 4-5s4 2 4 5" /><path d="M9 6c.8-1.4 1.8-2 3-2" /></>,
  Drinks: <><path d="M8 3h8l-1 5v12H9V8L8 3Z" /><path d="M9 8h6" /><path d="M10 13h4" /></>
};

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem(LANG_KEY) || "en";
}

function useRestaurantCart() {
  const [cart, setCart] = useState([]);
  const [lang, setLangState] = useState(getInitialLanguage);
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [optionProduct, setOptionProduct] = useState(null);
  const [optionId, setOptionId] = useState("");
  const [optionQty, setOptionQty] = useState(1);
  const [toast, setToast] = useState("");
  const [customer, setCustomer] = useState({ name: "", area: "", time: "", notes: "" });
  const [freeDeliveryCelebrated, setFreeDeliveryCelebrated] = useState(false);
  const [lastOrderAvailable, setLastOrderAvailable] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const toastTimer = useRef(null);

  const isAr = lang === "ar";
  const pick = (en, ar) => (isAr ? ar || en : en);
  const money = (value) => {
    const amount = Number.isInteger(value) ? value : Number(value).toFixed(1);
    return isAr ? `${amount} درهم` : `${amount} AED`;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.body.classList.toggle("is-ar", isAr);
    localStorage.setItem(LANG_KEY, lang);
  }, [lang, isAr]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      const hydrated = saved.flatMap(({ id, optionId: savedOptionId, qty }) => {
        const product = menu.find((item) => item.id === id);
        const option = product?.options.find((itemOption) => itemOption.id === savedOptionId) || product?.options[0];
        if (!product || !option || qty <= 0 || product.available === false || option.available === false) return [];
        return [{ ...product, optionId: option.id, optionName: option.name, optionNameAr: option.nameAr, price: option.price, qty }];
      });
      setCart(hydrated);
    } catch {
      localStorage.removeItem(CART_KEY);
    }

    try {
      setLastOrderAvailable(JSON.parse(localStorage.getItem(LAST_ORDER_KEY) || "[]").length > 0);
    } catch {
      localStorage.removeItem(LAST_ORDER_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.map(({ id, optionId, qty }) => ({ id, optionId, qty }))));
  }, [cart]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const delivery = subtotal >= restaurantConfig.freeDeliveryAt || subtotal === 0 ? 0 : restaurantConfig.deliveryFee;
    const total = subtotal + delivery;
    const gift = subtotal >= restaurantConfig.freeGiftAt ? freeGifts[Math.floor(subtotal / restaurantConfig.freeGiftAt) % freeGifts.length] : null;
    return { subtotal, delivery, total, gift };
  }, [cart]);

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const isValidWhatsAppNumber = /^\d{10,15}$/.test(String(restaurantConfig.whatsappNumber).replace(/\D/g, ""));

  const isRestaurantOpen = () => {
    if (restaurantConfig.acceptingOrders === false) return false;
    const hour = Number(new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: restaurantConfig.timezone
    }).format(new Date()));
    return hour >= restaurantConfig.openingHour && hour < restaurantConfig.closingHour;
  };

  const restaurantOpen = isRestaurantOpen();

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 1500);
  };

  const startConfetti = () => {
    const colors = ["#10a34a", "#ffd166", "#ef476f", "#2ec4b6", "#f77f00"];
    const pieces = Array.from({ length: 52 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 0.18,
      duration: 0.9 + Math.random() * 0.7,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setConfettiPieces(pieces);
    window.setTimeout(() => setConfettiPieces([]), 1800);
  };

  useEffect(() => {
    if (totals.subtotal >= restaurantConfig.freeDeliveryAt && !freeDeliveryCelebrated) {
      setFreeDeliveryCelebrated(true);
      startConfetti();
      showToast(pick("Free delivery unlocked", "تم فتح التوصيل المجاني"));
    }
    if (totals.subtotal < restaurantConfig.freeDeliveryAt) setFreeDeliveryCelebrated(false);
  }, [totals.subtotal, freeDeliveryCelebrated]);

  const openOptionSheet = (product) => {
    const firstOption = product.options.find((option) => option.available !== false) || product.options[0];
    setOptionProduct(product);
    setOptionId(firstOption.id);
    setOptionQty(product.id === "mahashi-plate" ? 6 : 1);
  };

  const closeOptionSheet = () => setOptionProduct(null);

  const addItem = (product, selectedOption, qty = 1) => {
    setCart((current) => {
      const key = `${product.id}__${selectedOption.id}`;
      const existing = current.find((item) => `${item.id}__${item.optionId}` === key);
      if (existing) {
        return current.map((item) => `${item.id}__${item.optionId}` === key ? { ...item, qty: item.qty + qty } : item);
      }
      return [...current, {
        ...product,
        optionId: selectedOption.id,
        optionName: selectedOption.name,
        optionNameAr: selectedOption.nameAr,
        price: selectedOption.price,
        qty
      }];
    });
    showToast(pick(`${product.name} - ${selectedOption.name} added`, `تمت إضافة ${product.nameAr} - ${selectedOption.nameAr}`));
    closeOptionSheet();
  };

  const changeQty = (key, delta) => {
    setCart((current) => current.flatMap((item) => {
      if (`${item.id}__${item.optionId}` !== key) return [item];
      const nextQty = item.qty + delta;
      return nextQty <= 0 ? [] : [{ ...item, qty: nextQty }];
    }));
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    setCart([]);
    showToast(pick("Cart cleared", "تم تفريغ السلة"));
  };

  const saveLastOrder = () => {
    const snapshot = cart.map(({ id, optionId, qty }) => ({ id, optionId, qty }));
    if (snapshot.length > 0) {
      localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(snapshot));
      setLastOrderAvailable(true);
    }
  };

  const restoreLastOrder = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(LAST_ORDER_KEY) || "[]");
      const restored = saved.flatMap(({ id, optionId: savedOptionId, qty }) => {
        const product = menu.find((item) => item.id === id);
        const option = product?.options.find((itemOption) => itemOption.id === savedOptionId) || product?.options[0];
        if (!product || !option || qty <= 0 || product.available === false || option.available === false) return [];
        return [{ ...product, optionId: option.id, optionName: option.name, optionNameAr: option.nameAr, price: option.price, qty }];
      });
      setCart(restored);
      showToast(restored.length ? pick("Last order restored", "تمت استعادة آخر طلب") : pick("No previous order", "لا يوجد طلب سابق"));
    } catch {
      localStorage.removeItem(LAST_ORDER_KEY);
      showToast(pick("No previous order", "لا يوجد طلب سابق"));
    }
  };

  const upsell = useMemo(() => {
    const options = [
      menu.find((item) => item.id === "pepsi"),
      menu.find((item) => item.id === "rice-pudding"),
      menu.find((item) => item.id === "mahashi-box")
    ].filter(Boolean);
    return options.find((item) => !cart.some((cartItem) => cartItem.id === item.id)) || options[0];
  }, [cart]);

  const whatsappUrl = useMemo(() => {
    const phone = String(restaurantConfig.whatsappNumber).replace(/\D/g, "");
    if (!phone) return "#";
    const lines = [
      restaurantConfig.name,
      isAr ? "طلب واتساب جديد" : "New WhatsApp Order",
      "",
      isAr ? "الأصناف:" : "Items:",
      ...cart.map((item) => {
        const optionName = pick(item.optionName, item.optionNameAr);
        return `- ${item.qty} x ${pick(item.name, item.nameAr)} — ${optionName} - ${money(item.price * item.qty)}`;
      }),
      "",
      totals.gift ? `${isAr ? "الهدية" : "Gift"}: ${pick(totals.gift.name, totals.gift.nameAr)} - ${isAr ? "مجانًا" : "Free"}` : `${isAr ? "الهدية" : "Gift"}: ${isAr ? "لا توجد" : "None"}`,
      `${isAr ? "التوصيل" : "Delivery"}: ${totals.delivery === 0 && totals.subtotal > 0 ? (isAr ? "مجانًا" : "Free") : money(totals.delivery)}`,
      `${isAr ? "المجموع" : "Subtotal"}: ${money(totals.subtotal)}`,
      `${isAr ? "الإجمالي" : "Total"}: ${money(totals.total)}`,
      "",
      isAr ? "بيانات العميل:" : "Customer details:",
      `${isAr ? "الاسم" : "Name"}: ${customer.name}`,
      `${isAr ? "الموقع في أبوظبي" : "Abu Dhabi area"}: ${customer.area}`,
      `${isAr ? "الوقت المفضل" : "Preferred time"}: ${customer.time}`,
      `${isAr ? "ملاحظات" : "Notes"}: ${customer.notes}`
    ];
    return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [cart, customer, totals, isAr]);

  const checkoutDisabled = cart.length === 0 || !isValidWhatsAppNumber || !restaurantOpen;

  const handleCheckoutClick = (event) => {
    if (checkoutDisabled) {
      event.preventDefault();
      if (!isValidWhatsAppNumber) showToast(pick("Set WhatsApp number in environment settings", "ضعي رقم واتساب في إعدادات الموقع"));
      else if (!restaurantOpen) showToast(pick("Restaurant is closed now", "المطعم مغلق الآن"));
      else showToast(pick("Add items before checkout", "أضيفي أصناف قبل الطلب"));
      return;
    }
    saveLastOrder();
  };

  const setLang = () => setLangState((current) => current === "ar" ? "en" : "ar");

  return {
    cart,
    cartOpen,
    checkoutDisabled,
    confettiPieces,
    count,
    customer,
    drawerOpen,
    isAr,
    lang,
    lastOrderAvailable,
    money,
    optionId,
    optionProduct,
    optionQty,
    pick,
    restaurantOpen,
    toast,
    totals,
    upsell,
    whatsappUrl,
    addItem,
    changeQty,
    clearCart,
    closeOptionSheet,
    handleCheckoutClick,
    openOptionSheet,
    restoreLastOrder,
    setCartOpen,
    setCustomer,
    setDrawerOpen,
    setLang,
    setOptionId,
    setOptionQty
  };
}

function Header({ app }) {
  return (
    <header className="app-header" aria-label="Restaurant header">
      <button className="menu-toggle" type="button" onClick={() => app.setDrawerOpen(true)} aria-label="Open menu"><span /><span /><span /></button>
      <Link className="brand-lockup" href="/" aria-label="Mahashi and Koshari Al Tahrir home">
        <span className="brand-logo-wrap">
          <img className="brand-logo" src="/assets/logo.png" width="84" height="84" alt="Mahashi & Koshari Al Tahrir logo" />
          <span className="brand-mark" aria-hidden="true">M</span>
        </span>
        <span>
          <span className="brand-name">{restaurantConfig.shortName}</span>
          <span className="brand-area">{restaurantConfig.area}</span>
        </span>
      </Link>
      <button className="lang-toggle" type="button" onClick={app.setLang} aria-label="Switch language">{app.isAr ? "EN" : "AR"}</button>
      <button className="header-cart" type="button" onClick={() => app.setCartOpen(true)} aria-label="Open cart">
        <span>{app.pick("Cart", "السلة")}</span>
        <strong>{app.count}</strong>
      </button>
    </header>
  );
}

function Hero({ app }) {
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <img src="/assets/hero-egyptian-spread.jpg" width="1536" height="864" alt="Egyptian mahashi, koshari, pasta and desserts on a bright table" />
      </div>
      <div className="hero-content">
        <p className="eyebrow">{app.pick("Fresh Egyptian comfort food", "أكل مصري أصيل")}</p>
        <h1>{app.pick("Authentic Egyptian Food", "أكل مصري أصيل")}</h1>
        <p className="subtitle">{app.pick("Mahashi • Koshari • Pasta • Desserts • Drinks", "محاشي • كشري • مكرونة • حلويات • مشروبات")}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#menu">{app.pick("Browse Menu", "تصفح المنيو")}</a>
          <button className="btn btn-secondary" type="button" onClick={() => app.setCartOpen(true)}>{app.pick("View Cart", "عرض السلة")}</button>
        </div>
      </div>
    </section>
  );
}

function Categories({ app }) {
  return (
    <section className="categories" aria-labelledby="categories-title">
      <div className="section-heading">
        <p>{app.pick("Order faster", "اطلب أسرع")}</p>
        <h2 id="categories-title">{app.pick("Categories", "الأقسام")}</h2>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <a className="category-card" href={`#${category.id}`} key={category.id}>
            <span className="category-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">{categoryIcons[category.name]}</svg>
            </span>
            <strong>{app.pick(category.name, category.nameAr)}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ app, item }) {
  const isAvailable = item.available !== false;
  return (
    <article className={`product-card ${isAvailable ? "" : "is-soldout"}`} data-product-card>
      <img className="product-image" src={item.image} width="720" height="720" alt={item.name} loading="lazy" />
      <div className="product-info">
        {isAvailable && item.badge ? <span className="badge">{app.pick(item.badge, item.badgeAr)}</span> : null}
        {!isAvailable ? <span className="badge badge-muted">{app.pick("Sold out", "غير متوفر")}</span> : null}
        <h3>{app.pick(item.name, item.nameAr)}</h3>
        <p>{app.pick(item.description, item.descriptionAr)}</p>
        <div className="product-bottom">
          <span className="price">{app.pick("Starts from", "يبدأ من")} {app.money(item.price)}</span>
          <button className="add-btn" type="button" aria-label={`${app.pick("Add", "أضف")} ${app.pick(item.name, item.nameAr)}`} disabled={!isAvailable} onClick={() => app.openOptionSheet(item)}>
            {isAvailable ? "+" : "×"}
          </button>
        </div>
      </div>
    </article>
  );
}

function MenuSection({ app }) {
  return (
    <section className="menu-section" id="menu" aria-labelledby="menu-title">
      <div className="section-heading menu-heading">
        <div>
          <p>{app.pick("Freshly prepared", "طازج يوميًا")}</p>
          <h2 id="menu-title">{app.pick("Menu", "المنيو")}</h2>
        </div>
        <span className="delivery-pill">{app.pick("Free delivery over 150 AED", "توصيل مجاني فوق 150 درهم")}</span>
      </div>
      <div className="menu-list">
        {categories.map((category) => (
          <div className="menu-group" id={category.id} key={category.id}>
            <h3 className="menu-group-title">{app.pick(category.name, category.nameAr)}</h3>
            {menu.filter((item) => item.category === category.name).map((item) => <ProductCard app={app} item={item} key={item.id} />)}
          </div>
        ))}
      </div>
    </section>
  );
}

function Drawer({ app }) {
  return (
    <>
      <aside className="site-drawer" aria-label="Main menu" aria-hidden={!app.drawerOpen}>
        <div className="drawer-header">
          <strong>{app.pick("Pages", "الصفحات")}</strong>
          <button className="icon-btn" type="button" onClick={() => app.setDrawerOpen(false)} aria-label="Close menu">x</button>
        </div>
        <nav className="drawer-nav">
          {pages.map(([label, href]) => <Link href={href} key={href}>{app.pick(label, arabicPage(label))}</Link>)}
        </nav>
      </aside>
      <div className="drawer-overlay" onClick={() => app.setDrawerOpen(false)} hidden={!app.drawerOpen} />
    </>
  );
}

function arabicPage(label) {
  return {
    Menu: "المنيو",
    "Most Ordered": "الأكثر طلبًا",
    Newest: "الأحدث",
    "Large Orders": "طلبات كبيرة",
    Reservations: "الحجوزات",
    Events: "المناسبات",
    "About Us": "نبذة عنا",
    "Contact Us": "تواصل معنا",
    Articles: "مقالات"
  }[label] || label;
}

function BottomTabbar({ app }) {
  const quickWhatsApp = restaurantConfig.whatsappNumber.replace(/\D/g, "");
  return (
    <nav className="bottom-tabbar" aria-label="Mobile quick actions">
      <Link href="/"><span>H</span><strong>{app.pick("Home", "الرئيسية")}</strong></Link>
      <a href="#menu"><span>M</span><strong>{app.pick("Menu", "المنيو")}</strong></a>
      <button type="button" onClick={() => app.setCartOpen(true)} aria-label="Open order cart"><span>O</span><strong>{app.pick("Order", "اطلب")}</strong><em>{app.count}</em></button>
      <Link href="/events"><span>E</span><strong>{app.pick("Events", "المناسبات")}</strong></Link>
      <a href={quickWhatsApp ? `https://wa.me/${quickWhatsApp}` : "#"} target="_blank" rel="noopener"><span>W</span><strong>{app.pick("WhatsApp", "واتساب")}</strong></a>
    </nav>
  );
}

function Cart({ app }) {
  const progress = Math.min(100, (app.totals.subtotal / restaurantConfig.freeDeliveryAt) * 100);
  const needed = Math.max(0, restaurantConfig.freeDeliveryAt - app.totals.subtotal);
  return (
    <>
      <button className="floating-cart" type="button" onClick={() => app.setCartOpen(true)} aria-label="Open cart">
        <span className="cart-bubble">{app.count}</span>
        <span>{app.pick("View cart", "السلة")}</span>
        <strong>{app.money(app.totals.subtotal)}</strong>
      </button>
      <div className="cart-overlay" onClick={() => app.setCartOpen(false)} hidden={!app.cartOpen} />
      <aside className="cart-panel" aria-label="Shopping cart" aria-hidden={!app.cartOpen}>
        <div className="sheet-handle" aria-hidden="true" />
        <div className="cart-header">
          <div><p>{app.pick("Your order", "طلبك")}</p><h2>{app.pick("Cart", "السلة")}</h2></div>
          <div className="cart-actions">
            <button className="clear-cart-btn" type="button" onClick={app.clearCart}>{app.pick("Clear", "تفريغ")}</button>
            <button className="icon-btn" type="button" onClick={() => app.setCartOpen(false)} aria-label="Close cart">x</button>
          </div>
        </div>
        <div className={`restaurant-status ${app.restaurantOpen ? "" : "is-closed"}`}>
          <strong>{app.restaurantOpen ? app.pick("Accepting orders now", "نستقبل الطلبات الآن") : app.pick("Closed now", "مغلق الآن")}</strong>
          <span>{app.restaurantOpen ? app.pick("Open daily 10:00 AM - 11:00 PM", "مفتوح يوميًا من 10 صباحًا إلى 11 مساءً") : app.pick("Orders are available from 10:00 AM to 11:00 PM", "الطلبات متاحة من 10 صباحًا إلى 11 مساءً")}</span>
        </div>
        <div className="offer-progress" aria-live="polite">
          <div className="progress-top"><span>{app.pick("Delivery", "التوصيل")}</span><strong>{Math.min(app.totals.subtotal, restaurantConfig.freeDeliveryAt)} / {restaurantConfig.freeDeliveryAt} AED</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <p>{needed > 0 ? app.pick(`Add ${needed} AED more for FREE delivery.`, `أضف ${needed} درهم للتوصيل المجاني.`) : app.pick("Free delivery unlocked.", "تم فتح التوصيل المجاني.")}</p>
        </div>
        {app.totals.gift ? <div className="gift-row">{app.pick("Free Gift Added:", "تمت إضافة هدية مجانية:")} <strong>{app.pick(app.totals.gift.name, app.totals.gift.nameAr)}</strong></div> : null}
        <div className="cart-items">
          {app.cart.map((item) => {
            const key = `${item.id}__${item.optionId}`;
            return (
              <div className="cart-item" key={key}>
                <img src={item.image} alt={item.name} width="52" height="52" />
                <div>
                  <h3>{app.pick(item.name, item.nameAr)} — {app.pick(item.optionName, item.optionNameAr)}</h3>
                  <p>{app.pick("Quantity", "الكمية")}: {item.qty} · {app.money(item.price * item.qty)}</p>
                </div>
                <div className="qty-controls">
                  <button className="qty-btn" type="button" onClick={() => app.changeQty(key, -1)} aria-label="Decrease quantity">-</button>
                  <span>{item.qty}</span>
                  <button className="qty-btn" type="button" onClick={() => app.changeQty(key, 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
            );
          })}
        </div>
        {app.cart.length === 0 ? <div className="empty-cart"><strong>{app.pick("Your cart is waiting.", "السلة فارغة")}</strong><span>{app.pick("Add your Egyptian favorites and checkout on WhatsApp.", "أضف أكلاتك المصرية المفضلة وأكمل الطلب على واتساب.")}</span></div> : null}
        {app.lastOrderAvailable ? <button className="reorder-btn" type="button" onClick={app.restoreLastOrder}>{app.pick("Reorder last order", "إعادة آخر طلب")}</button> : null}
        {app.upsell ? (
          <div className="upsell">
            <p>{app.pick("Complete your meal with:", "كمّل وجبتك مع:")}</p>
            <div className="upsell-card">
              <span>{app.pick(app.upsell.name, app.upsell.nameAr)} · {app.money(app.upsell.price)}</span>
              <button type="button" onClick={() => app.openOptionSheet(app.upsell)}>Add</button>
            </div>
          </div>
        ) : null}
        <div className="customer-form">
          <label><span>{app.pick("Name", "الاسم")}</span><input type="text" autoComplete="name" placeholder="Your name" value={app.customer.name} onChange={(event) => app.setCustomer({ ...app.customer, name: event.target.value })} /></label>
          <label><span>{app.pick("Area / Location", "المنطقة / الموقع")}</span><input type="text" autoComplete="street-address" placeholder="Abu Dhabi area" value={app.customer.area} onChange={(event) => app.setCustomer({ ...app.customer, area: event.target.value })} /></label>
          <label><span>{app.pick("Preferred time", "الوقت المفضل")}</span><input type="text" placeholder="Now / 8:30 PM" value={app.customer.time} onChange={(event) => app.setCustomer({ ...app.customer, time: event.target.value })} /></label>
          <label><span>{app.pick("Notes", "ملاحظات")}</span><textarea rows="2" placeholder="Extra sauce, no onion..." value={app.customer.notes} onChange={(event) => app.setCustomer({ ...app.customer, notes: event.target.value })} /></label>
        </div>
        <div className="cart-summary">
          <div><span>{app.pick("Subtotal", "المجموع")}</span><strong>{app.money(app.totals.subtotal)}</strong></div>
          <div><span>{app.pick("Delivery", "التوصيل")}</span><strong>{app.totals.delivery === 0 && app.totals.subtotal > 0 ? <><s>{app.money(restaurantConfig.deliveryFee)}</s> FREE</> : app.money(app.totals.delivery || restaurantConfig.deliveryFee)}</strong></div>
          <div className="summary-total"><span>{app.pick("Total", "الإجمالي")}</span><strong>{app.money(app.totals.total || 0)}</strong></div>
        </div>
        <a className="checkout-btn" href={app.checkoutDisabled ? "#" : app.whatsappUrl} target="_blank" rel="noopener" aria-disabled={app.checkoutDisabled} onClick={app.handleCheckoutClick}>{app.pick("Checkout on WhatsApp", "إتمام الطلب واتساب")}</a>
      </aside>
    </>
  );
}

function OptionSheet({ app }) {
  if (!app.optionProduct) return null;
  const selected = app.optionProduct.options.find((option) => option.id === app.optionId) || app.optionProduct.options[0];
  return (
    <>
      <div className="option-overlay" onClick={app.closeOptionSheet} />
      <aside className="option-sheet" aria-hidden="false" aria-label="Choose option">
        <div className="sheet-handle" aria-hidden="true" />
        <div className="option-header">
          <div>
            <p>{app.optionProduct.id === "mahashi-plate" ? app.pick("Choose type", "اختار النوع") : app.pick("Choose size", "اختار الحجم")}</p>
            <h2>{app.pick(app.optionProduct.name, app.optionProduct.nameAr)}</h2>
          </div>
          <button className="icon-btn" type="button" onClick={app.closeOptionSheet} aria-label="Close options">x</button>
        </div>
        <div className="option-list">
          {app.optionProduct.options.map((option) => (
            <button className={`option-choice ${option.id === app.optionId ? "is-selected" : ""}`} type="button" key={option.id} disabled={option.available === false} onClick={() => app.setOptionId(option.id)}>
              <span>{app.pick(option.name, option.nameAr)}{option.available === false ? <em> {app.pick("Sold out", "غير متوفر")}</em> : null}</span>
              <strong>{app.money(option.price)}{app.optionProduct.id === "mahashi-plate" ? ` / ${app.pick("piece", "قطعة")}` : ""}</strong>
            </button>
          ))}
        </div>
        <div className="option-qty">
          <span>{app.optionProduct.id === "mahashi-plate" ? app.pick("Pieces", "عدد القطع") : app.pick("Quantity", "الكمية")}</span>
          <div>
            <button type="button" onClick={() => app.setOptionQty(Math.max(1, app.optionQty - 1))} aria-label="Decrease option quantity">-</button>
            <strong>{app.optionQty}</strong>
            <button type="button" onClick={() => app.setOptionQty(Math.min(99, app.optionQty + 1))} aria-label="Increase option quantity">+</button>
          </div>
        </div>
        <button className="option-confirm" type="button" disabled={selected.available === false} onClick={() => app.addItem(app.optionProduct, selected, app.optionQty)}>
          {selected.available === false ? app.pick("Sold out", "غير متوفر") : `${app.pick("Add to cart", "أضف للسلة")} — ${app.money(selected.price * app.optionQty)}`}
        </button>
      </aside>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        {legalNotice.textBefore}{" "}
        <Link href="/terms">{legalNotice.terms}</Link>,{" "}
        <Link href="/privacy-policy">{legalNotice.privacy}</Link>, and{" "}
        <Link href="/cancellation-refund-policy">{legalNotice.cancellation}</Link>.
      </p>
    </footer>
  );
}

function Confetti({ pieces }) {
  if (!pieces.length) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span key={piece.id} style={{ left: `${piece.left}%`, background: piece.color, animationDelay: `${piece.delay}s`, animationDuration: `${piece.duration}s` }} />
      ))}
    </div>
  );
}

export default function RestaurantApp() {
  const app = useRestaurantCart();

  useEffect(() => {
    document.body.classList.toggle("cart-open", app.cartOpen);
    document.body.classList.toggle("drawer-open", app.drawerOpen);
    document.body.classList.toggle("option-open", Boolean(app.optionProduct));
    return () => {
      document.body.classList.remove("cart-open", "drawer-open", "option-open");
    };
  }, [app.cartOpen, app.drawerOpen, app.optionProduct]);

  return (
    <>
      <a className="skip-link" href="#menu">Skip to menu</a>
      <Header app={app} />
      <main>
        <Hero app={app} />
        <Categories app={app} />
        <MenuSection app={app} />
      </main>
      <Footer />
      <Drawer app={app} />
      <Cart app={app} />
      <BottomTabbar app={app} />
      <OptionSheet app={app} />
      <div className={`toast ${app.toast ? "show" : ""}`} role="status" aria-live="polite">{app.toast}</div>
      <Confetti pieces={app.confettiPieces} />
    </>
  );
}
