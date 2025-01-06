// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
// import { Web3Provider } from "@/components/web3/wagmi/Web3Provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import AnimatedBackground from "@/components/dynamicEffect/AnimatedBackground";
import { Provider as JotaiProvider } from "jotai";
import { Web3Provider as WagmiProvider } from "@/components/web3/wagmi/Web3Provider";
import { Web3Provider as Web3ReactProvider } from "@/components/web3/web3react/Web3Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnWeb3 - Web3 学习平台",
  description: "使用 Web3 钱包登录的在线学习平台",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }, // SVG版本
      // { url: "/favicon.ico" }, // ICO版本作为后备
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <JotaiProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <WagmiProvider>
              <Web3ReactProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <AnimatedBackground duration={3000} />
                  {children}
                  <footer className="mt-auto py-8 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                      © 2024 LearnWeb3. All rights reserved.
                    </div>
                  </footer>
                </div>
              </Web3ReactProvider>
            </WagmiProvider>
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
