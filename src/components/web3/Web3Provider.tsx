'use client'
// src/components/web3/Web3Provider.tsx
import { Web3ReactProvider } from '@web3-react/core'
import { type ReactNode } from 'react'
import { metaMask, hooks as metaMaskHooks } from '@/lib/web3/connectors/metaMask';
import { walletConnectV2, hooks as walletConnectV2Hooks } from '@/lib/web3/connectors/walletConnectV2'

const connectors: [any, any][] = [
  [metaMask, metaMaskHooks],
//   [walletConnectV2, walletConnectV2Hooks],
]

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors}>
      {children}
    </Web3ReactProvider>
  )
}