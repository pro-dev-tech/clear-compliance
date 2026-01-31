import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Loader2 } from "lucide-react";

interface BusinessInputPanelProps {
  onRunCheck: (turnover: number, employees: number) => void;
  isLoading?: boolean;
}

const BusinessInputPanel = ({ onRunCheck, isLoading = false }: BusinessInputPanelProps) => {
  const [turnover, setTurnover] = useState<string>("");
  const [employees, setEmployees] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const turnoverValue = parseFloat(turnover) || 0;
    const employeesValue = parseInt(employees) || 0;
    onRunCheck(turnoverValue, employeesValue);
  };

  const isValid = turnover && employees && parseFloat(turnover) > 0 && parseInt(employees) > 0;

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">Business Details</CardTitle>
        <CardDescription>
          Enter your business information to check applicable compliances
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="turnover" className="text-sm font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                Annual Turnover
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                <Input
                  id="turnover"
                  type="number"
                  placeholder="e.g., 5000000"
                  value={turnover}
                  onChange={(e) => setTurnover(e.target.value)}
                  className="pl-7"
                  min="0"
                />
              </div>
              <p className="text-xs text-muted-foreground">Enter your annual revenue in rupees</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employees" className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                Number of Employees
              </Label>
              <Input
                id="employees"
                type="number"
                placeholder="e.g., 25"
                value={employees}
                onChange={(e) => setEmployees(e.target.value)}
                min="0"
              />
              <p className="text-xs text-muted-foreground">Total full-time employees in your organization</p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            disabled={!isValid || isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Run Compliance Check"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessInputPanel;
