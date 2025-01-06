// src/components/web3/WalletConnectionSelector.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WalletButton as WagmiWalletButton } from "./wagmi/WalletButton";
import { WalletButton as Web3ReactWalletButton } from "./web3react/WalletButton";

export function WalletConnectionSelector() {
  const [connectionType, setConnectionType] = useState<"wagmi" | "web3-react">(
    "wagmi"
  );

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>选择连接钱包方式</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          defaultValue="wagmi"
          value={connectionType}
          onValueChange={(value) =>
            setConnectionType(value as "wagmi" | "web3-react")
          }
          className="mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wagmi" id="wagmi" />
            <Label htmlFor="wagmi">Wagmi</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="web3-react" id="web3-react" />
            <Label htmlFor="web3-react">Web3-React</Label>
          </div>
        </RadioGroup>

        <div className="mt-4">
          {connectionType === "wagmi" ? (
            <WagmiWalletButton />
          ) : (
            <Web3ReactWalletButton />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
