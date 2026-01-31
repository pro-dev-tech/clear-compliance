import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import RiskBadge, { RiskLevel } from "./RiskBadge";
import { Calendar, AlertTriangle, ChevronRight, Clock } from "lucide-react";

export interface ComplianceData {
  id: string;
  name: string;
  reason: string;
  deadline: string;
  riskLevel: RiskLevel;
  penaltyPreview: string;
  penaltyExplanation: string;
  plainExplanation: string;
}

interface ComplianceCardProps {
  compliance: ComplianceData;
  onClick: () => void;
}

const ComplianceCard = ({ compliance, onClick }: ComplianceCardProps) => {
  const { name, reason, deadline, riskLevel, penaltyPreview } = compliance;

  const riskBorderStyles = {
    critical: "border-l-[hsl(var(--risk-critical))] hover:shadow-[0_4px_20px_-4px_hsl(var(--risk-critical)/0.25)]",
    high: "border-l-[hsl(var(--risk-high))] hover:shadow-[0_4px_20px_-4px_hsl(var(--risk-high)/0.25)]",
    medium: "border-l-[hsl(var(--risk-medium))] hover:shadow-[0_4px_20px_-4px_hsl(var(--risk-medium)/0.25)]",
    low: "border-l-[hsl(var(--risk-low))] hover:shadow-[0_4px_20px_-4px_hsl(var(--risk-low)/0.25)]",
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 group animate-fade-in",
        "border-l-4 hover:translate-y-[-2px]",
        "bg-card hover:bg-card/80",
        riskBorderStyles[riskLevel]
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            {/* Header with name and badge */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-foreground text-lg leading-tight">{name}</h3>
              <RiskBadge level={riskLevel} />
            </div>
            
            {/* Reason */}
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{reason}</p>
            
            {/* Meta info row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 rounded-md bg-muted">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">{deadline}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 rounded-md bg-[hsl(var(--risk-critical-bg))]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[hsl(var(--risk-critical))]" />
                </div>
                <span className="font-medium text-[hsl(var(--risk-critical))]">{penaltyPreview}</span>
              </div>
            </div>
          </div>
          
          {/* Arrow indicator */}
          <div className="flex-shrink-0 self-center">
            <div className="p-2 rounded-full bg-muted group-hover:bg-primary transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceCard;
