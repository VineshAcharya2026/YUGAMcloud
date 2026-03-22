"use client"

import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, IndianRupee } from "lucide-react"

export function JobBoard() {
  const { data, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch("/api/recruitment")
      const json = await res.json()
      return json.data || []
    }
  })

  if (isLoading) return <div className="p-8 text-center text-text-3 animate-pulse">Loading jobs...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((job: any) => (
        <Card key={job.id} className="p-6 shadow-sm border-border hover:shadow-md transition-shadow group flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-brand-50 text-brand-700 hover:bg-brand-100 border-0">{job.department.replace('_', ' ')}</Badge>
              <Badge variant="outline" className={job.status === 'OPEN' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-slate-200 text-slate-700 bg-slate-50'}>
                {job.status}
              </Badge>
            </div>
            <h3 className="text-xl font-bold font-display text-text-1 tracking-tight mb-2 group-hover:text-brand-600 transition-colors">{job.title}</h3>
            <p className="text-sm text-text-3 line-clamp-2 mb-4">{job.description}</p>
            
            <div className="space-y-2 mb-6 text-sm text-text-2">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-text-3" /> {job.location}</div>
              <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-text-3" /> {job.experience}</div>
              <div className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-text-3" /> {job.salary}</div>
            </div>
          </div>
          
          <button className="w-full py-2.5 rounded-lg border border-brand-200 text-brand-700 font-medium hover:bg-brand-50 transition-colors">
            View Details
          </button>
        </Card>
      ))}
    </div>
  )
}
