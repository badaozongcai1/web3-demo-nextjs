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
interface Course {
  web2CourseId: string;
  name: string;
  price: string;
  isActive: boolean;
  creator: string;
}
// 合约地址 - 需要替换为实际部署的地址
const TOKEN_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const COURSE_MARKET_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

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
        ethers.getBigInt(amount)
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
      // 这个函数默认会按 18 位小数来格式化（相当于除以 10^18）。
      // return ethers.formatEther(balance);
      // 直接返回 balance 的字符串形式，不需要 formatEther
      return balance.toString();

      // 或者如果你想确保考虑 decimals
      // const decimals = await this.tokenContract.decimals();
      // return balance.div(BigNumber.from(10).pow(decimals)).toString();
    } catch (error) {
      console.error("Error getting token balance:", error);
      throw error;
    }
  }
  // 添加课程方法
  async addCourse(web2CourseId: string, name: string, price: string) {
    if (!this.courseMarketContract || !this.signer) {
      throw new Error("Contract not initialized");
    }

    try {
      // 将价格转换为wei单位
      // const priceInWei = ethers.parseEther(price);
      const priceInt = ethers.getBigInt(price);

      const tx = await this.courseMarketContract.addCourse(
        web2CourseId,
        name,
        priceInt
      );

      await tx.wait();
      return tx;
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    }
  }
  // 在 Web3Contract 类中添加新方法
  async isContractOwner(): Promise<boolean> {
    if (!this.courseMarketContract || !this.signer) {
      throw new Error("Contract not initialized");
    }

    try {
      const owner = await this.courseMarketContract.owner();
      const address = await this.signer.getAddress();
      return owner.toLowerCase() === address.toLowerCase();
    } catch (error) {
      console.error("Error checking contract owner:", error);
      return false;
    }
  }
  async getCourseList(): Promise<Course[]> {
    if (!this.courseMarketContract) {
      throw new Error("Contract not initialized");
    }

    try {
      const courseCount = await this.courseMarketContract.courseCount();
      const courses: Course[] = [];

      for (let i = 1; i <= courseCount; i++) {
        const course = await this.courseMarketContract.courses(i);
        console.log(course.price);
        courses.push({
          web2CourseId: course.web2CourseId,
          name: course.name,
          // price: ethers.formatEther(course.price),
          price: course.price.toString(),
          isActive: course.isActive,
          creator: course.creator,
        });
      }

      return courses;
    } catch (error) {
      console.error("Error getting course list:", error);
      throw error;
    }
  }
}
export type { Course };
export const web3Contract = new Web3Contract();
