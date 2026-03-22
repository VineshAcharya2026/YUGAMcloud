"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

enum Department {
  ENGINEERING = "ENGINEERING",
  TRAINING = "TRAINING",
  HR = "HR",
  SALES = "SALES",
  MARKETING = "MARKETING",
  MANAGEMENT = "MANAGEMENT",
  PLACEMENT = "PLACEMENT",
  DATA_ENGINEERING = "DATA_ENGINEERING",
  DEVOPS = "DEVOPS",
}

enum EmpStatus {
  ACTIVE = "ACTIVE",
  PROBATION = "PROBATION",
  NOTICE_PERIOD = "NOTICE_PERIOD",
  TERMINATED = "TERMINATED",
  ON_LEAVE = "ON_LEAVE",
}

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const employeeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  department: z.nativeEnum(Department),
  designation: z.string().min(2, "Designation is required"),
  salary: z.coerce.number().positive("Salary must be positive"),
  joinedAt: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  status: z.nativeEnum(EmpStatus).default(EmpStatus.ACTIVE),
})

type EmployeeFormValues = z.infer<typeof employeeSchema>

export function AddEmployeeSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: Department.ENGINEERING,
      designation: "",
      salary: 0,
      joinedAt: new Date().toISOString().split('T')[0],
      status: EmpStatus.ACTIVE,
    },
  })

  // Reset form when sheet opens/closes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setTimeout(() => form.reset(), 200)
    }
  }

  const onSubmit = async (data: EmployeeFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to add employee")
      }

      toast.success("Employee added successfully")
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      setOpen(false)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger {...{ asChild: true } as any}>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-surface border-l border-border">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold font-display text-text-1 tracking-tight">Add New Employee</SheetTitle>
          <SheetDescription className="text-text-3">
            Enter the details for the new employee. An account will be automatically created.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" placeholder="E.g. Priya Sharma" {...form.register("name")} className="h-10" />
            {form.formState.errors.name && <p className="text-xs text-error mt-1">{form.formState.errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" type="email" placeholder="priya@yugamcloud.ai" {...form.register("email")} className="h-10" />
            {form.formState.errors.email && <p className="text-xs text-error mt-1">{form.formState.errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={(val) => form.setValue("department", val as Department)} defaultValue={form.getValues("department")}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select dept" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Department).map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept.replace('_', ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(val) => form.setValue("status", val as EmpStatus)} defaultValue={form.getValues("status")}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EmpStatus).map((status) => (
                    <SelectItem key={status} value={status}>{status.replace('_', ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation">Designation *</Label>
            <Input id="designation" placeholder="E.g. Snowflake Trainer" {...form.register("designation")} className="h-10" />
            {form.formState.errors.designation && <p className="text-xs text-error mt-1">{form.formState.errors.designation.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Monthly Salary (₹)</Label>
              <Input id="salary" type="number" {...form.register("salary")} className="h-10" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="joinedAt">Joining Date</Label>
              <Input id="joinedAt" type="date" {...form.register("joinedAt")} className="h-10 text-text-2" />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className="w-full" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Add Employee"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
