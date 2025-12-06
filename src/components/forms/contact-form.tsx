"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, X } from "lucide-react"

const contactSchema = z.object({
  companyId: z.string().optional(),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  isPrimary: z.boolean().default(false),
  notes: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  contact?: any
  onSubmit: (data: ContactFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function ContactForm({ contact, onSubmit, onCancel, isLoading }: ContactFormProps) {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [companies, setCompanies] = useState<any[]>([])
  const [loadingCompanies, setLoadingCompanies] = useState(true)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact ? {
      companyId: contact.companyId || "",
      firstName: contact.firstName || "",
      lastName: contact.lastName || "",
      email: contact.email || "",
      phone: contact.phone || "",
      position: contact.position || "",
      department: contact.department || "",
      isPrimary: contact.isPrimary || false,
      notes: contact.notes || "",
    } : {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      isPrimary: false,
      notes: "",
    }
  })

  // Fetch companies for dropdown
  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch('/api/companies')
        const result = await response.json()
        if (result.success) {
          setCompanies(result.data)
        }
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setLoadingCompanies(false)
      }
    }
    fetchCompanies()
  }, [])

  const handleSubmit = async (data: ContactFormData) => {
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
            {contact ? "Edit Contact" : "Create New Contact"}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {contact ? "Edit Mode" : "New Contact"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Company Selection */}
          <div>
            <Label htmlFor="companyId">Company</Label>
            <Select
              value={form.watch("companyId")}
              onValueChange={(value) => form.setValue("companyId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a company (optional)" />
              </SelectTrigger>
              <SelectContent>
                {loadingCompanies ? (
                  <SelectItem value="loading" disabled>
                    Loading companies...
                  </SelectItem>
                ) : companies.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    No companies found
                  </SelectItem>
                ) : (
                  companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  placeholder="Enter first name"
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  placeholder="Enter last name"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="contact@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.email.message}
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

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  {...form.register("position")}
                  placeholder="e.g., Marketing Manager"
                />
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  {...form.register("department")}
                  placeholder="e.g., Marketing"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPrimary"
                checked={form.watch("isPrimary")}
                onCheckedChange={(checked) => form.setValue("isPrimary", checked as boolean)}
              />
              <Label htmlFor="isPrimary" className="text-sm font-medium">
                Primary contact for this company
              </Label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              {...form.register("notes")}
              className="w-full px-3 py-2 border border-input rounded-md text-sm"
              rows={3}
              placeholder="Additional notes about this contact"
            />
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
              {contact ? "Update Contact" : "Create Contact"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}