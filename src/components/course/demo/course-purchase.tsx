"use client";

import React, { useState, useEffect } from "react";
import { web3Contract } from "@/lib/web3/ethers/contract-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [isApproving, setIsApproving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeContract = async () => {
      try {
        await web3Contract.connect();
        const [status, balance] = await Promise.all([
          web3Contract.hasCourse(web2CourseId),
          web3Contract.getTokenBalance(),
        ]);
        setHasPurchased(status);
        console.log(balance);

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
      // 首先进行代币授权
      setIsApproving(true);
      toast({
        title: "Approving tokens...",
        description: "Please confirm the transaction in your wallet",
      });

      await web3Contract.approveTokens(price);

      setIsApproving(false);
      toast({
        title: "Tokens approved",
        description: "Now proceeding with purchase",
      });

      // 然后购买课程
      toast({
        title: "Purchasing course...",
        description: "Please confirm the transaction in your wallet",
      });

      const tx = await web3Contract.purchaseCourse(web2CourseId);
      await tx.wait();

      // 更新状态
      setHasPurchased(true);
      const newBalance = await web3Contract.getTokenBalance();
      setTokenBalance(newBalance);

      toast({
        title: "Success",
        description: "Course purchased successfully!",
      });
    } catch (err: any) {
      setError(err.message || "Failed to purchase course");
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to purchase course",
      });
    } finally {
      setIsLoading(false);
      setIsApproving(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) {
      if (isApproving) {
        return "Approving Tokens...";
      }
      return "Purchasing...";
    }
    return "Purchase Course";
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800">
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
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {getButtonText()}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
