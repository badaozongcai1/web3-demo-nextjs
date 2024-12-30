// config/appkit.ts
import { createAppKit } from "@reown/appkit/react";
import { wagmiAdapter } from "./wagmi";
import { mainnet, sepolia } from "@reown/appkit/networks";

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
  networks: [mainnet, sepolia], // 可以切换的链
  defaultNetwork: mainnet,
  metadata,
  themeMode: "light",
  themeVariables: {
    "--w3m-font-family": "Inter",
    // "--w3m-accent": "green",
    "--w3m-border-radius-master": "16px", // 对应UI中的XL选项
    "--w3m-color-mix": "white", // 背景色
  },
  features: {
    swaps: false, // 禁用 swap 功能
    onramp: false, // 禁用链上购买功能
    receive: false, // 禁用接收功能
    send: false, // 禁用发送功能

    // 其他可选的功能控制
    email: true, // 启用邮箱登录
    history: true, // 启用历史记录
    analytics: true, // 启用分析
    allWallets: true, // 启用所有钱包选项

    // 可以控制社交登录选项
    socials: false, // 禁用所有社交登录
    // 或者指定允许的社交登录方式
    // socials: ['google', 'github']
  },
});
