'use client';

import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@/lib/web3/connectors';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export function ConnectButton() {
  const { account, isActive, connector } = useWeb3React();
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // 尝试自动连接
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  const handleConnect = async () => {
    if (!connector) return;

    try {
      setIsConnecting(true);
      await metaMask.activate();
      toast({
        title: "连接成功",
        description: "已成功连接到 MetaMask 钱包",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "连接失败",
        description: error.message || "连接钱包时出现错误",
      });
      console.error('Failed to connect:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    if (!connector) return;
    if (connector?.deactivate) {
      void connector.deactivate();
    } else {
      void connector.resetState();
    }
  };

  // 格式化地址显示
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isActive && account) {
    return (
      <Button 
        variant="outline"
        onClick={handleDisconnect}
        className="min-w-[160px] justify-between"
      >
        <span>{formatAddress(account)}</span>
        <span className="ml-2">断开</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="min-w-[160px]"
    >
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          连接中...
        </>
      ) : (
        '连接钱包'
      )}
    </Button>
  );
}