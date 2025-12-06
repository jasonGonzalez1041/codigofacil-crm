"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
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
    name: "CodigoFacil Team",
    email: "equipo@codigofacil.com",
    avatar: "/avatars/codigofacil.jpg",
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
      icon: UsersIcon,
    },
    {
      title: "Pipeline",
      url: "/dashboard/pipeline",
      icon: BarChartIcon,
    },
    {
      title: "Seguimientos",
      url: "/dashboard/follow-ups",
      icon: ClipboardListIcon,
    },
    {
      title: "Clientes",
      url: "/dashboard/clients",
      icon: FolderIcon,
    },
  ],
  navClouds: [
    {
      title: "Contactos",
      icon: UsersIcon,
      isActive: true,
      url: "/dashboard/contacts",
      items: [
        {
          title: "Contactos Activos",
          url: "/dashboard/contacts",
        },
        {
          title: "Archivados",
          url: "/dashboard/contacts/archived",
        },
      ],
    },
    {
      title: "Propuestas",
      icon: FileTextIcon,
      url: "/dashboard/proposals",
      items: [
        {
          title: "Propuestas Activas",
          url: "/dashboard/proposals",
        },
        {
          title: "Enviadas",
          url: "/dashboard/proposals/sent",
        },
      ],
    },
    {
      title: "Comunicación",
      icon: FileCodeIcon,
      url: "/dashboard/communication",
      items: [
        {
          title: "Email",
          url: "/dashboard/email",
        },
        {
          title: "Llamadas",
          url: "/dashboard/calls",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "/dashboard/settings",
      icon: SettingsIcon,
    },
    {
      title: "Soporte",
      url: "/dashboard/help",
      icon: HelpCircleIcon,
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
      name: "Reportes",
      url: "/dashboard/reports",
      icon: ClipboardListIcon,
    },
    {
      name: "Documentos",
      url: "/dashboard/documents",
      icon: FileIcon,
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
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
