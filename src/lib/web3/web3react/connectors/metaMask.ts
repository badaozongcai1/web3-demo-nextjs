import { initializeConnector } from "@web3-react/core"; //基本状态的更新
import { MetaMask } from "@web3-react/metamask";

export const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);
