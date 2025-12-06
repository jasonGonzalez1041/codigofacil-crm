"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, X } from "lucide-react"

const companySchema = z.object({
  name: z.string().min(1, "Company name is required").max(200),
  industry: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().default("Costa Rica"),
  employees: z.number().positive().optional(),
  revenue: z.number().positive().optional(),
  notes: z.string().optional(),
})

type CompanyFormData = z.infer<typeof companySchema>

interface CompanyFormProps {
  company?: any
  onSubmit: (data: CompanyFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function CompanyForm({ company, onSubmit, onCancel, isLoading }: CompanyFormProps) {
  const [submitLoading, setSubmitLoading] = useState(false)

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: company ? {
      name: company.name || "",
      industry: company.industry || "",
      website: company.website || "",
      phone: company.phone || "",
      address: company.address || "",
      city: company.city || "",
      country: company.country || "Costa Rica",
      employees: company.employees || undefined,
      revenue: company.revenue || undefined,
      notes: company.notes || "",
    } : {
      name: "",
      industry: "",
      website: "",
      phone: "",
      address: "",
      city: "",
      country: "Costa Rica",
      notes: "",
    }
  })

  const handleSubmit = async (data: CompanyFormData) => {
    try {
      setSubmitLoading(true)
      await onSubmit(data)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {company ? "Edit Company" : "Create New Company"}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {company ? "Edit Mode" : "New Company"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Enter company name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  {...form.register("industry")}
                  placeholder="e.g., Technology, Healthcare"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  {...form.register("website")}
                  placeholder="https://example.com"
                />
                {form.formState.errors.website && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.website.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...form.register("phone")}
                  placeholder="+506 1234-5678"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location</h3>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...form.register("address")}
                placeholder="Street address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  {...form.register("city")}
                  placeholder="e.g., San José"
                />
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  {...form.register("country")}
                  placeholder="Costa Rica"
                />
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  {...form.register("employees", { valueAsNumber: true })}
                  placeholder="e.g., 50"
                />
              </div>

              <div>
                <Label htmlFor="revenue">Annual Revenue (CRC)</Label>
                <Input
                  id="revenue"
                  type="number"
                  {...form.register("revenue", { valueAsNumber: true })}
                  placeholder="e.g., 50000000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                {...form.register("notes")}
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
                rows={3}
                placeholder="Additional notes about the company"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={submitLoading || isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitLoading || isLoading}
            >
              {submitLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {company ? "Update Company" : "Create Company"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}