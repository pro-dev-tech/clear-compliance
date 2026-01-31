import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import BusinessInputPanel from "@/components/BusinessInputPanel";
import ComplianceResults from "@/components/ComplianceResults";
import { ComplianceData } from "@/components/ComplianceCard";
import { getApplicableCompliances } from "@/data/mockCompliances";

const Index = () => {
  const [complianceResults, setComplianceResults] = useState<ComplianceData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunCheck = async (turnover: number, employees: number) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const results = getApplicableCompliances(turnover, employees);
    setComplianceResults(results);
    setHasSearched(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Business Input Section */}
          <section>
            <BusinessInputPanel onRunCheck={handleRunCheck} isLoading={isLoading} />
          </section>

          {/* Results Section */}
          <section>
            <ComplianceResults results={complianceResults} hasSearched={hasSearched} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            ComplianceAI helps Indian MSMEs stay compliant. For educational purposes only — consult a professional for legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
