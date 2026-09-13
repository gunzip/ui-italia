import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CalendarIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { Input } from "./input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar"

const items: {
  title: string
  icon: typeof HomeIcon
  isActive?: boolean
}[] = [
  { title: "Overview", icon: HomeIcon, isActive: true },
  { title: "Cases", icon: InboxIcon },
  { title: "Deadlines", icon: CalendarIcon },
  { title: "Users", icon: UsersIcon },
]

function AppShell({
  variant = "sidebar",
  collapsible = "offcanvas",
  defaultOpen = true,
}: {
  variant?: React.ComponentProps<typeof Sidebar>["variant"]
  collapsible?: React.ComponentProps<typeof Sidebar>["collapsible"]
  defaultOpen?: boolean
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar variant={variant} collapsible={collapsible}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<a href="#" />}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <HomeIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    Example Municipality
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    Digital services
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<a href="#" />}
                      isActive={item.isActive}
                      aria-current={item.isActive ? "page" : undefined}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#" />}>
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-base font-semibold">Overview</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <label htmlFor="sidebar-search" className="sr-only">
            Search cases
          </label>
          <div className="relative w-full max-w-sm">
            <SearchIcon
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input id="sidebar-search" placeholder="Search…" className="pl-9" />
          </div>
          <p className="text-sm text-muted-foreground">Main page content.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

const meta = {
  component: SidebarProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SidebarProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <AppShell />,
}

export const Collapsed: Story = {
  render: () => <AppShell collapsible="icon" defaultOpen={false} />,
}

export const Floating: Story = {
  render: () => <AppShell variant="floating" />,
}
