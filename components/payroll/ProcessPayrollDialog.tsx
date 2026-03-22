"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function ProcessPayrollDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString())
  const [year, setYear] = useState((new Date().getFullYear()).toString())
  
  const queryClient = useQueryClient()

  const handleProcess = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month: parseInt(month), year: parseInt(year) }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to process payroll")
      }

      toast.success(`Successfully processed ${result.count} payslips for ${month}/${year}`)
      queryClient.invalidateQueries({ queryKey: ["payroll"] })
      setOpen(false)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger {...{ asChild: true } as any}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Process Monthly Payroll</DialogTitle>
          <DialogDescription>
            This action will calculate attendance, deductions, and generate payslips for all active employees.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="month" className="text-right">Month</Label>
            <div className="col-span-3">
              <Select value={month} onValueChange={(val) => setMonth(val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">Year</Label>
            <div className="col-span-3">
              <Select value={year} onValueChange={(val) => setYear(val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {[2024, 2025, 2026, 2027].map((y) => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>Cancel</Button>
          <Button onClick={handleProcess} disabled={isSubmitting} className="bg-brand-600 hover:bg-brand-700 text-white">
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Run Batch Process"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
