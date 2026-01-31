import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import RiskBadge, { RiskLevel } from "./RiskBadge";
import { Calendar, AlertTriangle, ChevronRight } from "lucide-react";

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

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-card-hover group animate-fade-in",
        "border-l-4",
        riskLevel === "critical" && "risk-border-critical",
        riskLevel === "high" && "risk-border-high",
        riskLevel === "medium" && "risk-border-medium",
        riskLevel === "low" && "risk-border-low"
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-foreground text-lg truncate">{name}</h3>
              <RiskBadge level={riskLevel} />
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{reason}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{deadline}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-risk-critical">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">{penaltyPreview}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceCard;
