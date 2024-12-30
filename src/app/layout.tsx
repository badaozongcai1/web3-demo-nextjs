// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Web3Provider } from "@/components/web3/wagmi/Web3Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnWeb3 - Web3 学习平台",
  description: "使用 Web3 钱包登录的在线学习平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Web3Provider>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <footer className="mt-auto py-8 bg-gray-50">
              <div className="container mx-auto px-4 text-center text-gray-600">
                © 2024 LearnWeb3. All rights reserved.
              </div>
            </footer>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
