import Link from "next/link";
import { legalNotice, restaurantConfig } from "@/lib/config";

export default function ComingSoonPage({ title }) {
  return (
    <>
      <header className="app-header" aria-label="Restaurant header">
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
        <Link className="header-cart" href="/#menu"><span>Menu</span><strong>0</strong></Link>
      </header>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner">
            <p className="eyebrow">Coming soon</p>
            <h1>{title}</h1>
            <p>This page is not available right now.</p>
          </div>
        </section>
        <section className="page-content">
          <div className="construction-panel">
            <h2>قيد الإنشاء</h2>
            <p>هذه الصفحة غير متوفرة الآن. يمكنكم الطلب من الصفحة الرئيسية والمنيو الحالي.</p>
            <Link className="btn btn-primary" href="/#menu">Back to Menu</Link>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <p>
          {legalNotice.textBefore}{" "}
          <Link href="/terms">{legalNotice.terms}</Link>,{" "}
          <Link href="/privacy-policy">{legalNotice.privacy}</Link>, and{" "}
          <Link href="/cancellation-refund-policy">{legalNotice.cancellation}</Link>.
        </p>
      </footer>
    </>
  );
}
