// src/components/web3/wagmi/WalletDropdown.tsx
"use client";
import { useDisconnect } from "wagmi";
import { Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { modal } from "./config/appkit";

interface WalletDropdownProps {
  children: React.ReactNode;
}

export function WalletDropdown({ children }: WalletDropdownProps) {
  const { disconnect } = useDisconnect();
  const { theme, setTheme } = useTheme();

  const handleOpenAccountModal = () => {
    modal.open({ view: "Account" });
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
        <DropdownMenuItem onClick={handleOpenAccountModal}>
          账户设置
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => disconnect()}>
          断开连接
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
