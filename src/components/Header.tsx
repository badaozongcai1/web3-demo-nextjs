"use client"
import React from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { WalletButton } from './web3/WalletButton';

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            LearnWeb3
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-gray-600 hover:text-gray-900">
              测试页面
            </Link>
            <Link href="/addCourse" className="text-gray-600 hover:text-gray-900">
              新增课程
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;