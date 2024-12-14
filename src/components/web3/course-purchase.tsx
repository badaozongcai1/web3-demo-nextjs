"use client";

import React, { useState, useEffect } from "react";
import { web3Contract } from "@/lib/web3/contract-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseProps {
  web2CourseId: string;
  name: string;
  price: string;
}

export default function CoursePurchase({
  web2CourseId,
  name,
  price,
}: CourseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [tokenBalance, setTokenBalance] = useState("0");
  const [error, setError] = useState("");

  useEffect(() => {
    const initializeContract = async () => {
      try {
        await web3Contract.connect();
        const [status, balance] = await Promise.all([
          web3Contract.hasCourse(web2CourseId),
          web3Contract.getTokenBalance(),
        ]);
        setHasPurchased(status);
        setTokenBalance(balance);
      } catch (err) {
        console.error("Error initializing:", err);
      }
    };

    initializeContract();
  }, [web2CourseId]);

  const handlePurchase = async () => {
    setIsLoading(true);
    setError("");

    try {
      // 首先授权代币
      await web3Contract.approveTokens(price);

      // 然后购买课程
      const tx = await web3Contract.purchaseCourse(web2CourseId);
      await tx.wait();

      // 更新状态
      setHasPurchased(true);
      const newBalance = await web3Contract.getTokenBalance();
      setTokenBalance(newBalance);
    } catch (err: any) {
      setError(err.message || "Failed to purchase course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg">Price: {price} YD</p>
          <p className="text-sm">Your Balance: {tokenBalance} YD</p>

          {error && <p className="text-red-500">{error}</p>}

          {hasPurchased ? (
            <p className="text-green-500">You own this course!</p>
          ) : (
            <Button
              onClick={handlePurchase}
              disabled={isLoading || Number(tokenBalance) < Number(price)}
              className="w-full"
            >
              {isLoading ? "Processing..." : "Purchase Course"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
