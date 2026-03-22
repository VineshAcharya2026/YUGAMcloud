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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ApplyLeaveDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [type, setType] = useState("CASUAL")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  
  const queryClient = useQueryClient()

  const handleProcess = async () => {
    if (!startDate || !endDate || !reason) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, startDate: new Date(startDate), endDate: new Date(endDate), reason }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to apply for leave")
      }

      toast.success(`Leave request submitted successfully`)
      queryClient.invalidateQueries({ queryKey: ["leaves"] })
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
          <DialogTitle>Apply for Leave</DialogTitle>
          <DialogDescription>
            Submit your leave application for approval by HR or your reporting manager.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Leave Type</Label>
            <Select value={type} onValueChange={(val) => setType(val as string)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CASUAL">Casual Leave</SelectItem>
                <SelectItem value="SICK">Sick Leave</SelectItem>
                <SelectItem value="EARNED">Earned Leave</SelectItem>
                <SelectItem value="UNPAID">Unpaid Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Leave</Label>
            <Textarea 
              id="reason" 
              placeholder="Please provide a brief reason..." 
              value={reason} 
              onChange={e => setReason(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>Cancel</Button>
          <Button onClick={handleProcess} disabled={isSubmitting} className="bg-brand-600 hover:bg-brand-700 text-white">
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Apply"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
