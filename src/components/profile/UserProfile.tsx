"use client";
import React, { useState, useEffect } from "react";
import { web3Contract } from "@/lib/web3/ethers/contract-utils";
import type { Course } from "@/lib/web3/ethers/contract-utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Book, Award, Coins, Edit2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";

const UserProfile = () => {
  // 个人信息状态
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "James Angel",
    email: "james@example.com",
    avatar: "/demo.svg",
    joinDate: "2024-01-07",
  });

  // 学习指标数据
  const learningMetrics = [
    { icon: Clock, label: "学习时长", value: "120 小时" },
    { icon: Book, label: "完成课程", value: "12 门" },
    { icon: Award, label: "获得证书", value: "8 个" },
    { icon: Coins, label: "代币数量", value: "2,500 YD" },
  ];

  // 已购课程数据
  const purchasedCourses = [
    {
      id: 1,
      title: "智能合约开发进阶",
      progress: 85,
      lastAccessed: "2024-01-05",
      thumbnail:
        "https://i.seadn.io/gcs/files/6d5f2df1cb886b2b0cfb8231bcaceb75.jpg?auto=format&dpr=1&h=500&fr=1",
    },
    {
      id: 2,
      title: "DeFi 协议开发实战",
      progress: 60,
      lastAccessed: "2024-01-03",
      thumbnail:
        "https://i.seadn.io/gcs/files/6d5f2df1cb886b2b0cfb8231bcaceb75.jpg?auto=format&dpr=1&h=500&fr=1",
    },
  ];

  // NFT 证书数据
  const certificates = [
    {
      id: 1,
      name: "Web3 开发工程师认证",
      issueDate: "2024-01-01",
      tokenId: "#1234",
      image: "/main.png",
    },
    {
      id: 2,
      name: "DeFi 开发认证",
      issueDate: "2023-12-15",
      tokenId: "#1235",
      image: "/main.png",
    },
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* 个人信息卡片 */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-purple-500">
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-400 rounded-full opacity-20" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 rounded-full opacity-20" />
        </div>

        {/* 内容区域 */}
        <div className="relative px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* 左侧头像区域 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-white rounded-full opacity-50 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src={userInfo.avatar}
                  alt="Profile"
                  className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
              </div>
              {!isEditing && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="bg-white/90 hover:bg-white text-violet-600 shadow-lg"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  编辑资料
                </Button>
              )}
            </div>

            {/* 右侧信息区域 */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4 max-w-md">
                  <div>
                    <Input
                      value={userInfo.name}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, name: e.target.value })
                      }
                      className="bg-white/90 border-0 shadow-lg"
                      placeholder="你的名字"
                    />
                  </div>
                  <div>
                    <Input
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                      className="bg-white/90 border-0 shadow-lg"
                      placeholder="你的邮箱"
                    />
                  </div>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="bg-white/90 hover:bg-white text-violet-600 shadow-lg"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存更改
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 text-white">
                  <h2 className="text-3xl font-bold">{userInfo.name}</h2>
                  <p className="text-violet-100 font-medium ml-4">
                    {userInfo.email}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
                    <Clock className="w-4 h-4" />
                    加入时间：{userInfo.joinDate}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 学习指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {learningMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-violet-100 rounded-lg">
                  <metric.icon className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-xl font-bold">{metric.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 已购课程卡片 */}
      <Card className="bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle>已购课程</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {purchasedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-violet-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      进度：{course.progress}%
                    </p>
                    <p className="text-sm text-gray-500">
                      上次学习：{course.lastAccessed}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* NFT 证书卡片 */}
      <Card className="bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle>NFT 证书</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-600">
                    发放日期：{cert.issueDate}
                  </p>
                  <p className="text-sm text-gray-500">
                    Token ID：{cert.tokenId}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
