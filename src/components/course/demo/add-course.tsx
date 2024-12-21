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
        console.error("Error checking owner status:", err);
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
        throw new Error("Please fill in all fields");
      }

      if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
        throw new Error("Price must be a positive number");
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
        title: "Success",
        description: "Course added successfully!",
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
        title: "Error",
        description: err.message || "Failed to add course",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOwner) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Only contract owner can add courses.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="web2CourseId">Course ID</Label>
            <Input
              id="web2CourseId"
              name="web2CourseId"
              placeholder="Enter course ID"
              value={formData.web2CourseId}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter course name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (YD)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price in YD tokens"
              value={formData.price}
              onChange={handleInputChange}
              disabled={isLoading}
              min="0"
              step="0.1"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Course...
              </>
            ) : (
              "Add Course"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
