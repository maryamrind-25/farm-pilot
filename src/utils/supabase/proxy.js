import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { ROLE_HOME, AREA_ROLES } from "@/lib/roles";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Don't put code between createServerClient and getClaims()
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  const path = request.nextUrl.pathname;
  const isAuthPage = path.startsWith("/login") || path.startsWith("/sign-up");
  const isPublic = path === "/" || isAuthPage || path.startsWith("/auth");

  // Redirect while keeping any refreshed session cookies
  const redirectTo = (to) => {
    const url = request.nextUrl.clone();
    url.pathname = to;
    url.search = "";
    const res = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((c) => res.cookies.set(c));
    return res;
  };

  // 1. Logged out
  if (!claims) return isPublic ? supabaseResponse : redirectTo("/login");

  // 2. Logged in: only look up the role when we actually need it
  const area = Object.keys(AREA_ROLES).find(
    (a) => path === a || path.startsWith(a + "/")
  );

  if (isAuthPage || area) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", claims.sub)
      .single();

    const role = profile?.role;

    // Logged-in users don't need login/sign-up
    if (isAuthPage && role) return redirectTo(ROLE_HOME[role]);

    if (area) {
      if (!role) return redirectTo("/login");
      if (!AREA_ROLES[area].includes(role)) return redirectTo(ROLE_HOME[role]);
    }
  }

  return supabaseResponse;
}