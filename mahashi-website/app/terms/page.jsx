import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Mahashi & Koshari Al Tahrir website and placing orders."
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These terms apply when you use this website or place an order with Mahashi & Koshari Al Tahrir."
      sections={[
        { heading: "Orders", body: "Orders submitted through WhatsApp are confirmed only after the restaurant reviews availability, delivery location, timing, and final total." },
        { heading: "Prices and Availability", body: "Menu prices and item availability may change without prior notice. If an item is unavailable, we may suggest an alternative before confirming your order." },
        { heading: "Delivery", body: "Delivery availability depends on the customer location in Abu Dhabi, order timing, and restaurant capacity." },
        { heading: "Customer Information", body: "Customers are responsible for providing accurate name, location, timing, and contact details when placing an order." }
      ]}
    />
  );
}
