import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ROLE_HOME } from "@/lib/roles";

// cache() = one lookup per request, even if called from layout + page
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, center_id")
    .eq("id", claims.sub)
    .single();

  if (!profile) return null;

  return { id: claims.sub, email: claims.email, ...profile };
});

export async function requireRole(allowedRoles) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!allowedRoles.includes(user.role)) redirect(ROLE_HOME[user.role]);
  return user;
}