"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Menu } from "lucide-react";
import { WalletButton as WagmiWalletButton } from "./web3/wagmi/WalletButton";
import { WalletButton as Web3ReactWalletButton } from "./web3/web3react/WalletButton";
import { walletProviderAtom } from "@/store/wallet";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/management", label: "后台管理" },
  { href: "/profile", label: "个人中心" },
];

const Header = () => {
  const [walletProvider] = useAtom(walletProviderAtom);

  const WalletButtonComponent =
    walletProvider === "wagmi" ? WagmiWalletButton : Web3ReactWalletButton;

  return (
    <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-9 h-9 bg-gradient-to-tr from-violet-500 via-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-lg">L3</span>
            </motion.div>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent group-hover:from-violet-500 group-hover:to-purple-500 transition-all duration-300"
            >
              LearnWeb3
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <Link
                    href={item.href}
                    className="relative px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-800 dark:to-purple-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-1" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <WalletButtonComponent />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="打开菜单"
                >
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </SheetTrigger>
              <SheetContent className="w-[80vw] sm:w-[380px]">
                <SheetHeader>
                  <SheetTitle className="text-lg font-semibold mb-4">
                    导航菜单
                  </SheetTitle>
                  <SheetDescription>点击选择菜单</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-6 px-4">
                    <WalletButtonComponent />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
