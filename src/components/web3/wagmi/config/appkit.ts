// config/appkit.ts
import { createAppKit } from "@reown/appkit/react";
import { wagmiAdapter } from "./wagmi";
import {
  mainnet,
  arbitrum,
  avalanche,
  base,
  optimism,
  polygon,
} from "@reown/appkit/networks";

// 设置元数据
const metadata = {
  name: "LearnWeb3",
  description: "Web3 学习平台",
  url: "https://your-domain.com", // 需要匹配你的域名
  icons: ["https://your-domain.com/icon.png"], // 需要替换为你的图标
};

// 创建 modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  networks: [mainnet, arbitrum, avalanche, base, optimism, polygon],
  defaultNetwork: mainnet,
  metadata,
  features: {
    analytics: true,
  },
});
