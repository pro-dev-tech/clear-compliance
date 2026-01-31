import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RiskBadge from "./RiskBadge";
import { ComplianceData } from "./ComplianceCard";
import { Calendar, AlertTriangle, MessageCircle, FileText } from "lucide-react";

interface ComplianceDetailModalProps {
  compliance: ComplianceData | null;
  open: boolean;
  onClose: () => void;
}

const ComplianceDetailModal = ({ compliance, open, onClose }: ComplianceDetailModalProps) => {
  if (!compliance) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <DialogTitle className="text-xl">{compliance.name}</DialogTitle>
            <RiskBadge level={compliance.riskLevel} />
          </div>
          <DialogDescription>{compliance.reason}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Deadline Section */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Deadline</p>
              <p className="text-sm text-muted-foreground">{compliance.deadline}</p>
            </div>
          </div>

          <Separator />

          {/* Penalty Explanation */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-risk-critical">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="font-medium">What happens if you ignore this?</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-6">
              {compliance.penaltyExplanation}
            </p>
          </div>

          <Separator />

          {/* Plain English Explanation */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4" />
              <h4 className="font-medium">In simple terms</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-6">
              {compliance.plainExplanation}
            </p>
          </div>

          <Separator />

          {/* Action Button */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                // Placeholder for expert consultation
                console.log("Talk to expert clicked for:", compliance.name);
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Talk to an Expert
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComplianceDetailModal;
