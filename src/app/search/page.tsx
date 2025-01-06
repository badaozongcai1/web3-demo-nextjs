"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { web3Contract, type Course } from "@/lib/web3/contract-utils";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { CourseFilter } from "@/components/course/CourseFilter";
import { CourseList } from "@/components/course/CourseLists";

interface CourseData extends Course {
  hasPurchased?: boolean;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [isOwner, setIsOwner] = useState(false);
  const [filters, setFilters] = useState({
    purchased: false,
  });

  // 初始化 Web3
  useEffect(() => {
    initializeWeb3();
  }, []);

  const initializeWeb3 = async () => {
    try {
      await web3Contract.connect();
      await Promise.all([
        fetchCourses(),
        fetchTokenBalance(),
        checkOwnerStatus(),
      ]);
    } catch (error) {
      console.error("Failed to initialize Web3:", error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "连接钱包失败，请确保已安装 MetaMask",
      });
    }
  };

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const courseList = await web3Contract.getCourseList();

      const coursesWithPurchaseStatus = await Promise.all(
        courseList.map(async (course) => {
          const hasPurchased = await web3Contract.hasCourse(
            course.web2CourseId
          );
          return { ...course, hasPurchased };
        })
      );

      setCourses(coursesWithPurchaseStatus);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "获取课程列表失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTokenBalance = async () => {
    try {
      const balance = await web3Contract.getTokenBalance();
      setTokenBalance(balance);
    } catch (error) {
      console.error("Failed to fetch token balance:", error);
    }
  };

  const checkOwnerStatus = async () => {
    try {
      const ownerStatus = await web3Contract.isContractOwner();
      setIsOwner(ownerStatus);
    } catch (error) {
      console.error("Failed to check owner status:", error);
    }
  };

  const handlePurchaseCourse = async (course: CourseData) => {
    try {
      setIsLoading(true);
      await web3Contract.approveTokens(course.price);
      await web3Contract.purchaseCourse(course.web2CourseId);

      toast({
        title: "购买成功",
        description: "课程已添加到你的账户",
      });

      await Promise.all([fetchCourses(), fetchTokenBalance()]);
    } catch (error) {
      console.error("Failed to purchase course:", error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "购买课程失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (name: string, value: boolean) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // 过滤课程
  const filteredCourses = courses.filter((course) => {
    if (filters.purchased && !course.hasPurchased) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <CourseFilter filters={filters} onFilterChange={handleFilterChange} />

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">
            {query ? `"${query}" 的搜索结果` : "所有课程"} (
            {filteredCourses.length})
          </h2>

          <CourseList
            courses={filteredCourses}
            isLoading={isLoading}
            onPurchase={handlePurchaseCourse}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
