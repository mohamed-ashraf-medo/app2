import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/layout/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-face",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "مسار CV — منشئ السيرة الذاتية المتوافقة مع ATS ومحلل خارطة الطريق",
    template: "%s | مسار CV",
  },
  description:
    "ابنِ سيرتك الذاتية جزءاً بجزء بتصميم ATS احترافي، حلّل جاهزيتك على خارطة طريق تفاعلية لتخصصك (Front-End، Back-End، Full-Stack، Software، AI والمزيد)، وقارنها بوصف الوظيفة.",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "مسار CV",
    title: "مسار CV — منشئ CV متوافق مع ATS وخارطة طريق تفاعلية",
    description:
      "أنشئ سيرتك الذاتية بالإنجليزية أو العربية، افحص توافقها مع أنظمة ATS، واكتشف المهارات الناقصة على خارطة طريق مسارك المهني.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${ibmArabic.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main-content"
          className="no-print sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 focus:rounded-full focus:bg-[var(--accent-solid)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--accent-on-solid)]"
        >
          انتقل إلى المحتوى الرئيسي
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionConfig reducedMotion="user">
            <AuthProvider>
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <Toaster position="bottom-left" dir="rtl" richColors />
            </AuthProvider>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
