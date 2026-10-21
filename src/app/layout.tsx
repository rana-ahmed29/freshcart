import type { Metadata } from "next";
import { Exo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import TrustStrip from "@/components/common/trust-strip";
import ToastProvider from "@/components/common/toast-provider";
import AuthSessionProvider from "@/context/session-provider";
import QueryProvider from "@/context/query-provider";
import ReduxProvider from "@/redux/provider";

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description:
    "Your one-stop destination for quality products, from fresh groceries to electronics.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        exo.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthSessionProvider>
          <QueryProvider>
            <ReduxProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <TrustStrip />
              <Footer />
              <ToastProvider />
            </ReduxProvider>
          </QueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
