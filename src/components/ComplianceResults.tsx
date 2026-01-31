import { useState } from "react";
import ComplianceCard, { ComplianceData } from "./ComplianceCard";
import ComplianceDetailModal from "./ComplianceDetailModal";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ComplianceResultsProps {
  results: ComplianceData[];
  hasSearched: boolean;
}

const ComplianceResults = ({ results, hasSearched }: ComplianceResultsProps) => {
  const [selectedCompliance, setSelectedCompliance] = useState<ComplianceData | null>(null);

  if (!hasSearched) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No compliance check yet</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Enter your business details above and click "Run Compliance Check" to see applicable compliances.
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-risk-low-bg flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-risk-low" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">All clear!</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          No critical compliances found for your business profile. Keep up the good work!
        </p>
      </div>
    );
  }

  // Sort by risk level
  const sortOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedResults = [...results].sort(
    (a, b) => sortOrder[a.riskLevel] - sortOrder[b.riskLevel]
  );

  const criticalCount = results.filter((r) => r.riskLevel === "critical").length;
  const highCount = results.filter((r) => r.riskLevel === "high").length;

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Compliance Results</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Found {results.length} applicable compliance{results.length !== 1 ? "s" : ""}
            {criticalCount > 0 && (
              <span className="text-risk-critical font-medium">
                {" "}• {criticalCount} critical
              </span>
            )}
            {highCount > 0 && (
              <span className="text-risk-high font-medium">
                {" "}• {highCount} high risk
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" id="compliance-results">
        {sortedResults.map((compliance) => (
          <ComplianceCard
            key={compliance.id}
            compliance={compliance}
            onClick={() => setSelectedCompliance(compliance)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <ComplianceDetailModal
        compliance={selectedCompliance}
        open={!!selectedCompliance}
        onClose={() => setSelectedCompliance(null)}
      />
    </div>
  );
};

export default ComplianceResults;
