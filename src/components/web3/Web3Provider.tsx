"use client";

import { Web3ReactProvider } from "@web3-react/core";
import { type ReactNode, useEffect } from "react";
import {
  metaMask,
  hooks as metaMaskHooks,
} from "@/lib/web3/connectors/metaMask";
import {
  walletConnectV2,
  hooks as walletConnectV2Hooks,
} from "@/lib/web3/connectors/walletConnectV2";

const connectors: [any, any][] = [
  [metaMask, metaMaskHooks],
  [walletConnectV2, walletConnectV2Hooks],
];
function EagerConnect() {
  useEffect(() => {
    // MetaMask eager connect
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to MetaMask");
    });

    // WalletConnect eager connect
    void walletConnectV2.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to WalletConnect");
    });
  }, []);

  return null;
}
export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <EagerConnect />
      {children}
    </Web3ReactProvider>
  );
}
