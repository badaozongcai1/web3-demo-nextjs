// src/components/web3/WalletButton.tsx
import { useWeb3React } from '@web3-react/core'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { metaMask } from '@/lib/web3/connectors/metaMask'
// import { walletConnectV2 } from '@/lib/web3/connectors/walletConnectV2'
import { shortenAddress } from '@/lib/web3/utils'
import { useState, useEffect } from 'react'

export function WalletButton() {
  const { account, isActive, connector } = useWeb3React()
  const [connecting, setConnecting] = useState(false)

  // 处理钱包连接
  const connectWallet = async (type: 'metamask' | 'walletConnectV2') => {
    try {
      setConnecting(true)
    //   const connector = type === 'metamask' ? metaMask : walletConnectV2
      const connector = metaMask
      await connector.activate()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setConnecting(false)
    }
  }

  // 断开连接
  const disconnect = async () => {
    if (connector?.deactivate) {
      await connector.deactivate()
    } else {
      await connector.resetState()
    }
  }

  // 如果已连接，显示地址和断开连接选项
  if (isActive && account) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {shortenAddress(account)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={disconnect}>
            断开连接
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // 未连接时显示连接选项
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={connecting}>
          {connecting ? '连接中...' : '连接钱包'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => connectWallet('metamask')}>
          MetaMask
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => connectWallet('walletConnectV2')}>
          WalletConnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}