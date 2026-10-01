"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = () => {
    startTransition(async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      router.push("/login");
      router.refresh();
    });
  };

  return (
    <Button onClick={handleLogout} disabled={isPending} variant="outline">
      {isPending ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
};