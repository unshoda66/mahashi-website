import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Mahashi & Koshari Al Tahrir order information."
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains how order information is used when you contact or order from us."
      sections={[
        { heading: "Information We Collect", body: "When placing an order, you may provide your name, location, preferred delivery time, order notes, and contact details through WhatsApp." },
        { heading: "How We Use Information", body: "We use this information only to prepare, confirm, deliver, and support your order." },
        { heading: "Sharing", body: "Order information may be shared only with staff or delivery support needed to complete the order." },
        { heading: "Retention", body: "WhatsApp conversations may remain available in the restaurant's order history for customer service and operational reference." }
      ]}
    />
  );
}
