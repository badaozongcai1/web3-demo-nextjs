import { ethers } from "ethers";
import {
  CourseMarket__factory,
  YiDengToken__factory,
  CourseMarket,
  YiDengToken,
} from "./typechain-types";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// 合约地址 - 需要替换为实际部署的地址
const COURSE_MARKET_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export class Web3Contract {
  private courseMarketContract: CourseMarket | null = null;
  private tokenContract: YiDengToken | null = null;
  private signer: ethers.Signer | null = null;

  async connect() {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("Please install MetaMask!");
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await provider.getSigner();

      // 初始化合约
      this.courseMarketContract = CourseMarket__factory.connect(
        COURSE_MARKET_ADDRESS,
        this.signer
      );

      this.tokenContract = YiDengToken__factory.connect(
        TOKEN_ADDRESS,
        this.signer
      );

      return true;
    } catch (error) {
      console.error("Failed to connect:", error);
      throw error;
    }
  }

  async approveTokens(amount: string) {
    if (!this.tokenContract || !this.signer) {
      throw new Error("Contracts not initialized");
    }

    try {
      const tx = await this.tokenContract.approve(
        COURSE_MARKET_ADDRESS,
        ethers.parseEther(amount)
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error("Error approving tokens:", error);
      throw error;
    }
  }

  async purchaseCourse(web2CourseId: string) {
    if (!this.courseMarketContract || !this.signer) {
      throw new Error("Contract not initialized");
    }

    try {
      const tx = await this.courseMarketContract.purchaseCourse(web2CourseId);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error("Error purchasing course:", error);
      throw error;
    }
  }

  async hasCourse(web2CourseId: string) {
    if (!this.courseMarketContract || !this.signer) {
      throw new Error("Contract not initialized");
    }

    try {
      const address = await this.signer.getAddress();
      return await this.courseMarketContract.hasCourse(address, web2CourseId);
    } catch (error) {
      console.error("Error checking course ownership:", error);
      throw error;
    }
  }

  async getTokenBalance(): Promise<string> {
    if (!this.tokenContract || !this.signer) {
      throw new Error("Contract not initialized");
    }

    try {
      const address = await this.signer.getAddress();
      const balance = await this.tokenContract.balanceOf(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error getting token balance:", error);
      throw error;
    }
  }
}

export const web3Contract = new Web3Contract();
