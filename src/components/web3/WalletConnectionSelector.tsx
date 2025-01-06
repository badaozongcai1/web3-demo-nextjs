// src/components/web3/WalletConnectionSelector.tsx
"use client";

import { useAtom } from "jotai";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { walletProviderAtom } from "@/store/wallet";

export function WalletConnectionSelector() {
  const [walletProvider, setWalletProvider] = useAtom(walletProviderAtom);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>请选择</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={walletProvider}
          onValueChange={(value) =>
            setWalletProvider(value as "wagmi" | "web3-react")
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
      </CardContent>
    </Card>
  );
}
