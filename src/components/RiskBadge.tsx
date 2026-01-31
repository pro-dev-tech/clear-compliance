import { cn } from "@/lib/utils";

export type RiskLevel = "critical" | "high" | "medium" | "low";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const riskLabels: Record<RiskLevel, string> = {
  critical: "Critical",
  high: "High Risk",
  medium: "Medium",
  low: "Low",
};

const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        level === "critical" && "risk-badge-critical",
        level === "high" && "risk-badge-high",
        level === "medium" && "risk-badge-medium",
        level === "low" && "risk-badge-low",
        className
      )}
    >
      {riskLabels[level]}
    </span>
  );
};

export default RiskBadge;
