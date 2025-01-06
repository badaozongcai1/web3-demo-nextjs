// src/components/web3/web3react/WalletButton.tsx
"use client";
import { useWeb3React } from "@web3-react/core";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { metaMask } from "@/lib/web3/web3react/connectors/metaMask";
import { walletConnectV2 } from "@/lib/web3/web3react/connectors/walletConnectV2";
import { useState, useEffect } from "react";
import Jazzicon from "@/components/web3/Jazzicon";
import { WalletDropdown } from "./WalletDropdown";
import { ethers } from "ethers";

interface TokenConfig {
  address: string;
  symbol: string;
  decimals: number;
}
type WindowWithEthereum = Window & {
  ethereum?: any;
};

const TOKEN_CONFIG: Record<number, TokenConfig> = {
  1: {
    address: process.env.NEXT_PUBLIC_SEPOLIA_TOKEN_ADDRESS as string,
    symbol: "YD",
    decimals: 0,
  },
  11155111: {
    address: process.env.NEXT_PUBLIC_SEPOLIA_TOKEN_ADDRESS as string,
    symbol: "YD",
    decimals: 0,
  },
};

export function WalletButton() {
  const { account, isActive, chainId, provider } = useWeb3React();
  const [connecting, setConnecting] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);

  useEffect(() => {
    if (isActive && account && provider) {
      fetchBalances();
    }
  }, [isActive, account, provider, chainId]);

  const fetchBalances = async () => {
    if (!provider || !account || !chainId) return;

    try {
      // 获取原生代币余额
      const ethProvider = new ethers.BrowserProvider(
        provider.provider as ethers.Eip1193Provider
      );
      const balance = await ethProvider.getBalance(account);
      setBalance(ethers.formatEther(balance));

      // 获取代币余额
      const tokenConfig = TOKEN_CONFIG[chainId];
      if (tokenConfig) {
        const tokenContract = new ethers.Contract(
          tokenConfig.address,
          ["function balanceOf(address) view returns (uint256)"],
          ethProvider
        );
        const tokenBalance = await tokenContract.balanceOf(account);
        setTokenBalance(tokenBalance.toString());
      }
    } catch (error) {
      console.error("Failed to fetch balances:", error);
    }
  };

  const handleNetworkSwitch = async () => {
    // 使用局部类型
    const win = window as WindowWithEthereum;
    try {
      // 在这里你可以添加切换网络的逻辑
      // 例如，在主网和测试网之间切换
      const targetChainId = chainId === 1 ? 11155111 : 1;
      await win.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  };

  const connectWallet = async (
    type: "metamask" | "walletconnect" = "metamask"
  ) => {
    try {
      setConnecting(true);
      const connector = type === "metamask" ? metaMask : walletConnectV2;
      await connector.activate();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setConnecting(false);
    }
  };

  if (isActive && account) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNetworkSwitch}
          className="rounded-none relative h-10 flex items-center gap-2 rounded-l-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 dark:from-violet-900/40 dark:to-purple-900/40 dark:hover:from-violet-800/50 dark:hover:to-purple-800/50 pr-3 pl-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 shadow-sm rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700/50 dark:to-gray-800/50 flex items-center justify-center">
                <span className="text-xs font-medium dark:text-gray-300">
                  {chainId === 1 ? "E" : "S"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm leading-none dark:text-gray-300">
                  {balance ? `${(+balance).toFixed(3)} ETH` : "0.00 ETH"}
                </span>
              </div>
              {tokenBalance && (
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-1">
                  {`${tokenBalance} YD`}
                </span>
              )}
            </div>
          </div>
        </Button>

        <WalletDropdown>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none h-10 flex items-center gap-2 rounded-r-xl bg-gradient-to-r from-violet-100 to-purple-100 hover:from-violet-200 hover:to-purple-200 dark:from-violet-900 dark:to-purple-900 dark:hover:from-violet-800 dark:hover:to-purple-800 pl-3 pr-4 -ml-px shadow-sm"
          >
            <Jazzicon address={account} size={20} />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">
              {`${account.slice(0, 6)}...${account.slice(-4)}`}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </Button>
        </WalletDropdown>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Button
        onClick={() => connectWallet()}
        size="sm"
        className="h-10 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 dark:from-violet-500 dark:to-purple-500 dark:hover:from-violet-400 dark:hover:to-purple-400 text-sm font-medium px-6 shadow-lg shadow-violet-200 dark:shadow-violet-900"
        disabled={connecting}
      >
        {connecting ? "连接中..." : "连接钱包"}
      </Button>
    </motion.div>
  );
}
