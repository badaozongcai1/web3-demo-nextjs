"use client";

import React, { useState, useEffect } from "react";
import { web3Contract } from "@/lib/web3/contract-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddCourse() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [formData, setFormData] = useState({
    web2CourseId: "",
    name: "",
    price: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    const checkOwner = async () => {
      try {
        await web3Contract.connect();
        const ownerStatus = await web3Contract.isContractOwner();
        setIsOwner(ownerStatus);
      } catch (err) {
        console.error("检查所有者状态时出错:", err);
        setIsOwner(false);
      }
    };

    checkOwner();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 验证输入
      if (!formData.web2CourseId || !formData.name || !formData.price) {
        throw new Error("请填写所有字段");
      }

      if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
        throw new Error("价格必须是正数");
      }

      await web3Contract.connect();
      const tx = await web3Contract.addCourse(
        formData.web2CourseId,
        formData.name,
        formData.price
      );

      await tx.wait();
      // 触发自定义事件
      const event = new CustomEvent("courseAdded");
      window.dispatchEvent(event);

      toast({
        title: "成功",
        description: "课程添加成功!",
      });

      // 清空表单
      setFormData({
        web2CourseId: "",
        name: "",
        price: "",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "错误",
        description: err.message || "添加课程失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOwner) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur shadow-xl">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">
              只有合约所有者才能添加课程。
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            添加新课程
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="web2CourseId" className="text-gray-700">
                课程 ID
              </Label>
              <Input
                id="web2CourseId"
                name="web2CourseId"
                placeholder="请输入课程 ID"
                value={formData.web2CourseId}
                onChange={handleInputChange}
                disabled={isLoading}
                className="h-11 px-4 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                课程名称
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="请输入课程名称"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className="h-11 px-4 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-700">
                价格 (YD)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="请输入 YD 代币价格"
                value={formData.price}
                onChange={handleInputChange}
                disabled={isLoading}
                min="0"
                step="0.1"
                className="h-11 px-4 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  添加中...
                </>
              ) : (
                "添加课程"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
