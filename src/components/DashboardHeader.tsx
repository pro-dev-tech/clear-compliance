import { Shield, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const DashboardHeader = ({ isLoggedIn = false, onLogout }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">ComplianceAI</h1>
            <p className="text-xs text-muted-foreground">For Indian MSMEs</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground hidden sm:block">Compliance Dashboard</span>
          <ThemeToggle />
          {isLoggedIn && onLogout && (
            <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Logout">
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
