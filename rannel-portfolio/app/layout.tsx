import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import { ModalProvider } from "@/components/ModalContext";
import BookCallModalWrapper from "@/components/BookCallModalWrapper";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Rannel | Security-First AI Developer",
  description: "AI-Speed Development. Enterprise-Grade Security.",
  icons: {
    icon: [
      { url: "/favicon-r-dark.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-r-light.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-r-dark.png" type="image/png" sizes="32x32" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-r-light.png" type="image/png" sizes="32x32" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-r-dark.png" type="image/png" sizes="16x16" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-r-light.png" type="image/png" sizes="16x16" media="(prefers-color-scheme: dark)" />
        <link rel="shortcut icon" href="/favicon-r-dark.png" media="(prefers-color-scheme: light)" />
        <link rel="shortcut icon" href="/favicon-r-light.png" media="(prefers-color-scheme: dark)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('rannel-theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProviderWrapper>
          <ModalProvider>
            <BookCallModalWrapper />
            {children}
          </ModalProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
