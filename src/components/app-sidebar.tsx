"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  Building2 as BuildingIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  PhoneIcon,
  CalendarIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Administrador CRM",
    email: "admin@codigofacil.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Leads",
      url: "/dashboard/leads",
      icon: ArrowUpCircleIcon,
    },
    {
      title: "Pipeline",
      url: "/dashboard/pipeline", 
      icon: BarChartIcon,
    },
    {
      title: "Empresas",
      url: "/dashboard/companies",
      icon: BuildingIcon,
    },
    {
      title: "Contactos",
      url: "/dashboard/contacts",
      icon: UsersIcon,
    },
  ],
  navCRM: [
    {
      name: "Seguimientos",
      icon: CalendarIcon,
      url: "/dashboard/follow-ups",
    },
    {
      name: "Actividades",
      icon: ClipboardListIcon,
      url: "/dashboard/activities",
    },
    {
      name: "Reportes",
      icon: FileTextIcon,
      url: "/dashboard/reports",
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "/dashboard/settings",
      icon: SettingsIcon,
    },
    {
      title: "Ayuda",
      url: "/dashboard/help",
      icon: PhoneIcon,
    },
    {
      title: "Buscar",
      url: "/dashboard/search",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Base de Datos",
      url: "/dashboard/database",
      icon: DatabaseIcon,
    },
    {
      name: "Reportes CRM",
      url: "/dashboard/reports",
      icon: ClipboardListIcon,
    },
    {
      name: "Exportar Datos",
      url: "/dashboard/export",
      icon: FileTextIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">CodigoFacil CRM</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.navCRM} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
