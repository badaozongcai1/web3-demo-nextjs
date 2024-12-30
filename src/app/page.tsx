"use client";
import React, { useState } from "react";
import { Search, Sparkles, Clock, Users, BookOpen } from "lucide-react";

export default function Home() {
  const [searchFocus, setSearchFocus] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    { icon: Clock, text: "40+ 小时精品内容" },
    { icon: Users, text: "3000+ 学员" },
    { icon: BookOpen, text: "完整项目实战" },
  ];

  const courses = [
    {
      id: 1,
      title: "智能合约开发进阶",
      description: "从零开始学习 Solidity 智能合约开发",
      duration: "40小时",
      price: "999 YD",
      tags: ["Solidity", "Web3.js"],
    },
    {
      id: 2,
      title: "DeFi 协议开发实战",
      description: "深入理解 DeFi 协议架构与实现",
      duration: "35小时",
      price: "888 YD",
      tags: ["DeFi", "智能合约"],
    },
    {
      id: 3,
      title: "NFT 市场开发教程",
      description: "构建完整的 NFT 交易市场",
      duration: "30小时",
      price: "777 YD",
      tags: ["NFT", "React"],
    },
  ];

  return (
    <main className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm mb-8">
            <Sparkles size={16} />
            <span>现已支持区块链认证证书</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            面向Web3开发者的在线学习平台
          </h1>

          <p className="text-xl text-gray-600 mb-12">
            使用 Web3 钱包登录，开启您的学习之旅
          </p>

          <div className="flex justify-center gap-8 mb-16">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-gray-600">
                <Icon size={20} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <form action="/search" className="max-w-2xl mx-auto">
            <div
              className={`flex gap-2 transition-transform duration-300 ${
                searchFocus ? "scale-105" : ""
              }`}
            >
              <input
                type="text"
                name="q"
                placeholder="搜索课程、技术栈..."
                className="flex-1 px-6 py-4 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
              />
              <button
                type="submit"
                className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Search size={20} />
                搜索
              </button>
            </div>
          </form>

          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-8">热门课程</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`bg-white rounded-lg p-6 transition-all duration-300 cursor-pointer
                    ${
                      hoveredCard === course.id
                        ? "shadow-xl -translate-y-2"
                        : "shadow-lg"
                    }`}
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative">
                    <img
                      src="/demo2.svg"
                      alt={course.title}
                      className="w-full h-48 rounded-lg mb-4 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                      {course.price}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {course.duration}
                    </span>
                    <button className="text-blue-500 hover:text-blue-600 font-medium">
                      了解详情 →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
