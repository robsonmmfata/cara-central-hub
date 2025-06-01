
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  bgColor?: string;
  iconColor?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  bgColor = "bg-white",
  iconColor = "text-farm-blue-500"
}: StatsCardProps) {
  return (
    <div className={`${bgColor} rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-fade-in`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trendUp ? 'text-farm-green-500' : 'text-red-500'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconColor === "text-white" ? "bg-white/20" : "bg-gray-50"}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
