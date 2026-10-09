"use client";

import { User2, LogOutIcon } from "lucide-react";
import { logout } from "@/features/auth/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import ToastMessage from "@/lib/toastMessage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Avatar({ userName }: { userName: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  function handleLogout() {
    const toast = new ToastMessage();
    startTransition(async () => {
      try {
        const response = await logout();
        if (response.success) {
          router.replace("/");
          toast.success("Success", "logout was successful.");
        }
      } catch {
        toast.error("Error", "An error has been accoured, Try again!");
      }
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Hi {userName} <User2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout} disabled={isPending}>
          <LogOutIcon />
          {isPending ? "waiting..." : "sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
