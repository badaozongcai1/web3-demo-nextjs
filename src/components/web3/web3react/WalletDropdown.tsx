// src/components/web3/web3react/WalletDropdown.tsx
"use client";
import { Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useWeb3React } from "@web3-react/core";

interface WalletDropdownProps {
  children: React.ReactNode;
}

export function WalletDropdown({ children }: WalletDropdownProps) {
  const { connector } = useWeb3React();
  const { theme, setTheme } = useTheme();

  const handleDisconnect = async () => {
    if (connector?.deactivate) {
      await connector.deactivate();
    } else {
      await connector.resetState();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 mr-2" />
          ) : (
            <Moon className="h-4 w-4 mr-2" />
          )}
          {theme === "dark" ? "切换亮色" : "切换暗色"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect}>断开连接</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
