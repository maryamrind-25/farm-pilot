"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarPlus,
  Ticket,
  Receipt,
  UserRound,
  Sprout,
} from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

const mainItems = [
  { title: "Dashboard", url: "/farmer", icon: LayoutDashboard },
  { title: "New Booking", url: "/farmer/bookings/new", icon: CalendarPlus },
  { title: "My Bookings", url: "/farmer/bookings", icon: Ticket },
  { title: "Procurements", url: "/farmer/procurements", icon: Receipt },
];

const accountItems = [
  { title: "Profile", url: "/farmer/profile", icon: UserRound },
];

const matches = (pathname, url) =>
  url === "/farmer"
    ? pathname === url
    : pathname === url || pathname.startsWith(url + "/");

export function AppSidebar({ user }) {
  const pathname = usePathname();

  // Longest matching url wins, so "/farmer/bookings/new" doesn't
  // also highlight "/farmer/bookings"
  const activeUrl = [...mainItems, ...accountItems]
    .map((i) => i.url)
    .filter((u) => matches(pathname, u))
    .sort((a, b) => b.length - a.length)[0];

  const renderItems = (items) =>
  items.map((item) => (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton
        render={<Link href={item.url} />}
        isActive={item.url === activeUrl}
      >
        <item.icon />
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
        <SidebarMenuItem>
  <SidebarMenuButton size="lg" render={<Link href="/farmer" />}>
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
      <Sprout className="size-4" />
    </div>
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-semibold">Farm Pilot</span>
      <span className="truncate text-xs text-muted-foreground">
        Farmer portal
      </span>
    </div>
  </SidebarMenuButton>
</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Procurement</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(mainItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(accountItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col gap-2 p-2">
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.name || "Farmer"}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user?.email}
            </span>
          </div>
          <LogoutButton className="w-full" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}