import React from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { ConnectButton } from './web3/ConnectButton';

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
            {/* <ConnectButton /> */}
            连接钱包
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;