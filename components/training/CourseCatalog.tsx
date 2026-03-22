"use client"

import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, PlayCircle, Users } from "lucide-react"

export function CourseCatalog() {
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch("/api/training")
      const json = await res.json()
      return json.data || []
    }
  })

  if (isLoading) return <div className="p-8 text-center text-text-3 animate-pulse">Loading courses...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((course: any) => (
        <Card key={course.id} className="overflow-hidden shadow-sm border-border hover:shadow-md transition-shadow group flex flex-col">
          <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 relative p-6 flex flex-col justify-between">
            {course.isFeatured && (
              <Badge className="self-start bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-sm">
                <Star className="w-3 h-3 mr-1 fill-white" /> Featured
              </Badge>
            )}
            <h3 className="text-xl font-bold font-display text-white tracking-tight mt-auto">{course.name}</h3>
            
            <div className="absolute inset-0 bg-brand-600 opacity-0 group-hover:opacity-20 transition-opacity mix-blend-overlay"></div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {course.techStack.slice(0, 3).map((tech: string, i: number) => (
                  <span key={i} className="text-[11px] font-semibold uppercase tracking-wider bg-surface-2 text-text-2 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
                {course.techStack.length > 3 && (
                  <span className="text-[11px] font-semibold uppercase tracking-wider bg-surface-2 text-text-2 px-2 py-1 rounded">
                    +{course.techStack.length - 3}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-y-3 text-sm text-text-2 mb-6">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-text-3" /> {course.duration}</div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4 text-text-3" /> Batch: {course.batchCode}</div>
              </div>
            </div>
            
            <button className="w-full py-2.5 rounded-lg bg-surface-2 hover:bg-brand-50 hover:text-brand-700 text-text-1 font-medium transition-colors flex items-center justify-center gap-2">
              <PlayCircle className="w-4 h-4" /> Start Learning
            </button>
          </div>
        </Card>
      ))}
    </div>
  )
}
