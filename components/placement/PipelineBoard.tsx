"use client"

import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, IndianRupee, MapPin } from "lucide-react"

export function PipelineBoard() {
  const { data, isLoading } = useQuery({
    queryKey: ["placements"],
    queryFn: async () => {
      const res = await fetch("/api/placement")
      const json = await res.json()
      return json.data || []
    }
  })

  if (isLoading) return <div className="p-8 text-center text-text-3 animate-pulse">Loading placement pipeline...</div>

  // Group by status for a Kanban-like view
  const columns = [
    { id: "APPLIED", title: "Applications", color: "bg-blue-50 border-blue-200" },
    { id: "INTERVIEWING", title: "Interviews", color: "bg-amber-50 border-amber-200" },
    { id: "SELECTED", title: "Selected", color: "bg-emerald-50 border-emerald-200" },
    { id: "REJECTED", title: "Rejected", color: "bg-rose-50 border-rose-200" }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
      {columns.map(col => {
        const jobs = data?.filter((p: any) => p.status === col.id) || []
        
        return (
          <div key={col.id} className={`rounded-xl border ${col.color} p-4 flex flex-col min-h-[500px]`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-text-1">{col.title}</h3>
              <Badge variant="secondary" className="bg-white/50">{jobs.length}</Badge>
            </div>
            
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
              {jobs.map((item: any) => (
                <Card key={item.id} className="p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab border-white/50 bg-white/80 backdrop-blur-sm">
                  <div className="font-semibold text-text-1 mb-1">{item.employee.user.name}</div>
                  <div className="text-xs text-text-2 mb-3">{item.company} · {item.role}</div>
                  
                  <div className="space-y-1.5 text-[11px] text-text-3 font-medium">
                    <div className="flex items-center gap-1.5"><Building2 className="w-3 h-3" /> {item.company}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {item.location}</div>
                    <div className="flex items-center gap-1.5"><IndianRupee className="w-3 h-3" /> {item.packageValue} LPA</div>
                  </div>
                </Card>
              ))}
              {jobs.length === 0 && (
                <div className="text-center p-4 text-text-3 text-sm border-2 border-dashed border-black/5 rounded-xl">
                  Drag items here
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
