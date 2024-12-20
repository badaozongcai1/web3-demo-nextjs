'use client';

import { useSearchParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { web3Contract, type Course } from "@/lib/web3/contract-utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster";

interface CourseData extends Course {
  hasPurchased?: boolean;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [isOwner, setIsOwner] = useState(false);
  const [filters, setFilters] = useState({
    price: null as number | null,
    purchased: false
  });

  // 连接钱包并获取数据
  const initializeWeb3 = async () => {
    try {
      await web3Contract.connect();
      await Promise.all([
        fetchCourses(),
        fetchTokenBalance(),
        checkOwnerStatus()
      ]);
    } catch (error) {
      console.error('Failed to initialize Web3:', error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "连接钱包失败，请确保已安装 MetaMask"
      });
    }
  };

  // 获取课程列表
  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const courseList = await web3Contract.getCourseList();
      
      // 检查每个课程的购买状态
      const coursesWithPurchaseStatus = await Promise.all(
        courseList.map(async (course) => {
          const hasPurchased = await web3Contract.hasCourse(course.web2CourseId);
          return { ...course, hasPurchased };
        })
      );
      
      setCourses(coursesWithPurchaseStatus);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "获取课程列表失败"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 获取代币余额
  const fetchTokenBalance = async () => {
    try {
      const balance = await web3Contract.getTokenBalance();
      setTokenBalance(balance);
    } catch (error) {
      console.error('Failed to fetch token balance:', error);
    }
  };

  // 检查是否是合约拥有者
  const checkOwnerStatus = async () => {
    try {
      const ownerStatus = await web3Contract.isContractOwner();
      setIsOwner(ownerStatus);
    } catch (error) {
      console.error('Failed to check owner status:', error);
    }
  };

  // 购买课程
  const handlePurchaseCourse = async (course: CourseData) => {
    try {
      setIsLoading(true);
      // 首先批准代币转账
      await web3Contract.approveTokens(course.price);
      // 然后购买课程
      await web3Contract.purchaseCourse(course.web2CourseId);
      toast({
        title: "购买成功",
        description: "课程已添加到你的账户"
      });
      // 刷新数据
      await Promise.all([fetchCourses(), fetchTokenBalance()]);
    } catch (error) {
      console.error('Failed to purchase course:', error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "购买课程失败"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2">{rating}</span>
      </div>
    );
  };

  // 过滤课程
  const filteredCourses = courses.filter(course => {
    if (filters.purchased && !course.hasPurchased) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>账户余额</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono">{tokenBalance} YD</div>
        </CardContent>
      </Card>

      <div className="flex gap-8">
        {/* 过滤器侧边栏 */}
        <Card className="w-64 flex-shrink-0 h-fit">
          <CardHeader>
            <CardTitle>筛选</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="purchased">
                  <input
                    id="purchased"
                    type="checkbox"
                    className="mr-2"
                    checked={filters.purchased}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        purchased: e.target.checked,
                      }))
                    }
                  />
                  仅显示已购买
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 课程列表 */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">
            {query ? `"${query}" 的搜索结果` : '所有课程'} ({filteredCourses.length})
          </h2>
          
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <Skeleton className="w-48 h-48 rounded-lg" />
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-8 w-2/3" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCourses.map((course) => (
                <Card key={course.web2CourseId}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-48 h-48 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-gray-500">课程封面</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          {renderStars(4.5)}
                        </div>
                        <div className="mb-4">
                          <span className={`px-2 py-1 rounded ${
                            course.isActive 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {course.isActive ? '可购买' : '已下架'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xl font-bold">{course.price} YD</div>
                          {course.hasPurchased ? (
                            <Button variant="secondary" disabled>
                              已购买
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handlePurchaseCourse(course)}
                              disabled={isLoading || !course.isActive}
                            >
                              购买课程
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}