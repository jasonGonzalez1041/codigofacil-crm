import { AppSidebar } from "@/components/app-sidebar"
import { DashboardMetricsReal } from "@/components/dashboard-metrics-real"
import { RealActivity } from "@/components/real-activity"
import { DataTableReal } from "@/components/data-table-real"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-6 p-4 lg:p-6">
            {/* Real Dashboard Metrics */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard CRM</h2>
                <p className="text-muted-foreground">
                  Métricas en tiempo real de tu pipeline de ventas
                </p>
              </div>
              <DashboardMetricsReal />
            </div>

            {/* Activity and Data Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <RealActivity />
              </div>
              <div className="lg:col-span-2">
                {/* Quick actions or mini charts could go here */}
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p className="text-center">
                    📊 Espacio reservado para gráficos en tiempo real
                    <br />
                    <span className="text-sm">Charts conectados próximamente</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Real Data Table */}
            <DataTableReal />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
