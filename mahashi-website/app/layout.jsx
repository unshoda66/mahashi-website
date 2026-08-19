import "./globals.css";
import { restaurantConfig } from "@/lib/config";

export const metadata = {
  metadataBase: new URL("https://mahashi-koshari-al-tahrir.example"),
  title: {
    default: "Mahashi & Koshari Al Tahrir | Egyptian Food in Abu Dhabi",
    template: "%s | Mahashi & Koshari Al Tahrir"
  },
  description: restaurantConfig.description,
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Mahashi & Koshari Al Tahrir",
    description: "Authentic Egyptian food delivered in Abu Dhabi.",
    type: "website",
    images: ["/assets/hero-egyptian-spread.jpg"]
  },
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#10a34a"
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurantConfig.name,
  servesCuisine: ["Egyptian", "Middle Eastern"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abu Dhabi",
    addressCountry: "AE"
  },
  image: "/assets/hero-egyptian-spread.jpg",
  priceRange: "AED",
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "10:00",
    closes: "23:00"
  }]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      </body>
    </html>
  );
}
