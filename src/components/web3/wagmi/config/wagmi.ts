// config/wagmi.ts
import { cookieStorage, createStorage, http } from "@wagmi/core";
import { mainnet, sepolia } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 从 WalletConnect Cloud 获取
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
// 设置元数据
const metadata = {
  name: "LearnWeb3",
  description: "Web3 学习平台",
  url: "http://127.0.0.1:3000", // 需要匹配你的域名
  icons: ["http://127.0.0.1:3000/main.png"], // 需要替换为你的图标
};
if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [mainnet, sepolia];

// 创建 Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  metadata,
});

export const config = wagmiAdapter.wagmiConfig;
