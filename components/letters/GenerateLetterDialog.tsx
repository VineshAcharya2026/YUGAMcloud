"use client"

import { useState } from "react"
import { useQueryClient, useQuery } from "@tanstack/react-query"
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

export function GenerateLetterDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [empId, setEmpId] = useState("")
  const [type, setType] = useState("OFFER")
  
  const queryClient = useQueryClient()

  // Fetch employees for the dropdown
  const { data: employees } = useQuery({
    queryKey: ["employees-list"],
    queryFn: async () => {
      const res = await fetch("/api/employees");
      const json = await res.json();
      return json.data || [];
    },
    enabled: open
  });

  const handleProcess = async () => {
    if (!empId) {
      toast.error("Please select an employee");
      return;
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empId, type }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to generate letter")
      }

      toast.success(`Letter generated successfully`)
      queryClient.invalidateQueries({ queryKey: ["letters"] })
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
          <DialogTitle>Generate Official Letter</DialogTitle>
          <DialogDescription>
            Select an employee and the document type to automatically generate a formal PDF letter.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="employee" className="text-right">Employee</Label>
            <div className="col-span-3">
              <Select value={empId} onValueChange={(val) => setEmpId(val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select receiver" />
                </SelectTrigger>
                <SelectContent>
                  {employees?.map((emp: any) => (
                    <SelectItem key={emp.id} value={emp.empId}>
                      {emp.user.name} ({emp.empId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Doc Type</Label>
            <div className="col-span-3">
              <Select value={type} onValueChange={(val) => setType(val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OFFER">Offer Letter</SelectItem>
                  <SelectItem value="RELIEVING">Relieving Letter</SelectItem>
                  <SelectItem value="EXPERIENCE">Experience Letter</SelectItem>
                  <SelectItem value="WARNING">Warning Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>Cancel</Button>
          <Button onClick={handleProcess} disabled={isSubmitting} className="bg-brand-600 hover:bg-brand-700 text-white">
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate & Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
