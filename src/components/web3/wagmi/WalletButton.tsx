"use client";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useDisconnect,
  useBalance,
  useChainId,
  useConfig,
} from "wagmi";
import { type Address } from "viem";
import { modal } from "./config/appkit";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
// 使用 wagmi 的类型
interface TokenConfig {
  address: Address;
  symbol: string;
  decimals: number;
}

// 定义支持的代币配置
const TOKEN_CONFIG: Record<number, TokenConfig> = {
  // 以太坊主网
  1: {
    // 代币合约地址
    address: process.env.NEXT_PUBLIC_SEPOLIA_TOKEN_ADDRESS as Address, // 替换为你的代币合约地址
    symbol: "YD", // 代币符号
    decimals: 0, // 代币精度
  },
  // Sepolia 测试网
  11155111: {
    address: process.env.NEXT_PUBLIC_SEPOLIA_TOKEN_ADDRESS as Address, // 替换为测试网上的代币合约地址
    symbol: "YD",
    decimals: 0,
  },
};
export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address: address,
  });
  // 获取自定义代币余额
  const { data: tokenBalance } = useBalance({
    address: address,
    token: chainId ? TOKEN_CONFIG[chainId]?.address : undefined, // 根据当前链 ID 获取对应的代币地址
  });
  const config = useConfig();
  const currentChain = config.chains.find((chain) => chain.id === chainId);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleOpenNetworkModal = () => {
    modal.open({ view: "Networks" });
  };

  const handleOpenAccountModal = () => {
    modal.open({ view: "Account" });
  };
  if (isConnected && address) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenNetworkModal}
          className="relative h-10 flex items-center gap-2 rounded-l-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 pr-3 pl-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            {currentChain && (
              <div className="w-6 h-6 shadow-sm rounded-full overflow-hidden">
                {currentChain.id === 1 ? (
                  <img
                    src="data:image/png;base64,..." // 原有的 base64
                    alt="Ethereum"
                    className="w-full h-full object-cover"
                  />
                ) : currentChain.id === 11155111 ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium">S</span>
                  </div>
                ) : null}
              </div>
            )}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm leading-none">
                  {balance
                    ? `${parseFloat(balance?.formatted).toFixed(3)} ${
                        balance?.symbol
                      }`
                    : "0.00"}
                </span>
              </div>
              {tokenBalance && (
                <span className="text-xs text-gray-500 leading-none mt-1">
                  {`${parseFloat(tokenBalance?.formatted).toFixed(0)} ${
                    tokenBalance?.symbol
                  }`}
                </span>
              )}
            </div>
          </div>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenAccountModal}
          className="h-10 flex items-center gap-2 rounded-r-xl bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 pl-3 pr-4 -ml-px shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-purple-400" />
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
            {formatAddress(address)}
          </span>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Button
        onClick={() => modal.open()}
        size="sm"
        className="h-10 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-sm font-medium px-6 shadow-lg shadow-violet-200"
      >
        连接钱包
      </Button>
    </motion.div>
  );
}
