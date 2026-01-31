import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import BusinessInputPanel from "@/components/BusinessInputPanel";
import ComplianceResults from "@/components/ComplianceResults";
import OTPLogin from "@/components/auth/OTPLogin";
import { ComplianceData } from "@/components/ComplianceCard";
import { getApplicableCompliances } from "@/data/mockCompliances";

const Index = () => {
  const [complianceResults, setComplianceResults] = useState<ComplianceData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  // Check if user has previously logged in or skipped
  useEffect(() => {
    const authStatus = localStorage.getItem("complianceai-auth");
    if (authStatus === "logged-in" || authStatus === "skipped") {
      setShowLogin(false);
      setIsLoggedIn(authStatus === "logged-in");
    }
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("complianceai-auth", "logged-in");
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleSkipLogin = () => {
    localStorage.setItem("complianceai-auth", "skipped");
    setIsLoggedIn(false);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("complianceai-auth");
    setIsLoggedIn(false);
    setShowLogin(true);
    setComplianceResults([]);
    setHasSearched(false);
  };

  const handleRunCheck = async (turnover: number, employees: number) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const results = getApplicableCompliances(turnover, employees);
    setComplianceResults(results);
    setHasSearched(true);
    setIsLoading(false);
  };

  // Show login screen if not authenticated
  if (showLogin) {
    return <OTPLogin onLoginSuccess={handleLoginSuccess} onSkip={handleSkipLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
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
