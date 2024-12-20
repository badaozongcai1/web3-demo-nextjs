import React from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

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
              课程
            </Link>
            <Link href="/topics" className="text-gray-600 hover:text-gray-900">
              主题
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              连接钱包
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;