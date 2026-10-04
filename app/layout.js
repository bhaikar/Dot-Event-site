import { Chakra_Petch, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CyberpunkBackground from "@/components/CyberpunkBackground";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "DOT DevOps Team — Build Bolder, Together",
  description:
    "DOT DevOps Team is a college technical club running Hackathon and Gamethon — build, learn, collaborate and innovate.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔴</text></svg>",
  },
};

export const viewport = {
  themeColor: "#271d22",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${chakra.variable} ${manrope.variable}`}>
      <body>
        <CyberpunkBackground />
        <div
          className="glow-spot"
          style={{
            width: 520,
            height: 520,
            background: "var(--color-red)",
            top: -140,
            right: -160,
          }}
        />
        <div
          className="glow-spot"
          style={{
            width: 460,
            height: 460,
            background: "var(--color-burgundy)",
            bottom: "10%",
            left: -180,
            opacity: 0.35,
          }}
        />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
