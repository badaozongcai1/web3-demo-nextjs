// src/store/wallet.ts
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 使用 atomWithStorage 持久化用户的选择
export type WalletProvider = "wagmi" | "web3-react";
export const walletProviderAtom = atomWithStorage<WalletProvider>(
  "wallet-provider",
  "wagmi"
);
