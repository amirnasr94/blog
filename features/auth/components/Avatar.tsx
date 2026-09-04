"use client";

import ToastMessage from "@/lib/toastMessage";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../../components/ui/dropdown-menu";
import { User2, LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { logout } from "../actions";

export function Avatar({ user }: { user: string }) {
  async function logOut() {
    const toast = new ToastMessage();
    const response = await logout();

    if (response?.success && response.status === 200) {
      toast.success("Success", response.message);
    }
    redirect("/", "replace");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Hi {user} <User2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={logOut}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
