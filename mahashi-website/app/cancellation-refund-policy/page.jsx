import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Cancellation & Refund Policy",
  description: "Cancellation and refund policy for confirmed food orders."
};

export default function CancellationRefundPolicyPage() {
  return (
    <LegalPage
      title="Cancellation & Refund Policy"
      intro="This policy applies to confirmed food orders placed with Mahashi & Koshari Al Tahrir."
      sections={[
        { heading: "Cancellations", body: "Orders may be cancelled before preparation begins. Once preparation has started, cancellation may not be possible." },
        { heading: "Refunds", body: "Refunds, when applicable, are reviewed case by case depending on order status, payment method, and the nature of the issue." },
        { heading: "Unavailable Items", body: "If an item becomes unavailable after ordering, we will contact you to offer a replacement or adjust the order before confirmation." },
        { heading: "Order Issues", body: "If there is an issue with your order, please contact us on WhatsApp as soon as possible so we can review and assist." }
      ]}
    />
  );
}
