import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

// 初始化 MetaMask 连接器
export const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);
// 链配置
export const CHAINS = {
  1337: {
    name: "Local Testnet",
    urls: ["http://127.0.0.1:8545/"],
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
  1: {
    name: "Ethereum Mainnet",
    urls: ["https://mainnet.infura.io/v3/your-infura-id"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  // BSC Testnet
  97: {
    name: "BSC Testnet",
    urls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "tBNB",
      decimals: 18,
    },
  },
  // 根据需要添加其他链
};
