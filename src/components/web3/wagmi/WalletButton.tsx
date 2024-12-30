"use client";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useDisconnect,
  useBalance,
  useChainId,
  useConfig,
} from "wagmi";
import { modal } from "./config/appkit";
import { ChevronDown } from "lucide-react";

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });
  const chainId = useChainId();
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
      <div className="flex items-center gap-2">
        {/* 切换网络按钮 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenNetworkModal}
          className="h-8 flex items-center gap-1.5 rounded-full bg-transparent hover:bg-gray-100 px-3 text-sm text-gray-600"
        >
          <div className="flex items-center gap-1.5">
            {currentChain && (
              <div className="w-5 h-5">
                {currentChain.id === 1 ? (
                  <img
                    src="data:image/png;base64,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"
                    alt="Ethereum"
                    className="w-5 h-5"
                  />
                ) : currentChain.id === 11155111 ? (
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs">S</span>
                  </div>
                ) : null}
              </div>
            )}
            <span className="text-sm">
              {balance
                ? `${parseFloat(balance?.formatted).toFixed(3)} ${
                    balance?.symbol
                  }`
                : "0.00"}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </Button>

        {/* 账户按钮 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenAccountModal}
          className="h-8 flex items-center gap-1.5 rounded-full bg-violet-100 text-violet-700 hover:bg-violet-200 px-3"
        >
          <div className="w-4 h-4 rounded-full bg-violet-400" />
          <span className="text-sm font-medium text-violet-700">
            {formatAddress(address)}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => modal.open()}
      size="sm"
      className="h-8 rounded-full bg-violet-600 hover:bg-violet-700 text-sm font-medium"
    >
      连接钱包
    </Button>
  );
}
