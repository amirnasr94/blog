import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "@/components/provider/ThemProvider";
import { TanStackProvider } from "@/components/provider/TanStackProvider";
import { Toaster } from "sonner";
import "./globals.css";

const latoSans = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Blog",
  },
  description: "",
  icons: [
    {
      url: "./favicon.ico",
      sizes: "250*250",
    },
  ],
  keywords: "blog, technolgy, idea",
  authors: { name: "Amir Nasr Esfahani", url: "https://github.com/amirnasr94" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${latoSans.variable}  h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanStackProvider>
            {children}
            <Toaster />
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
