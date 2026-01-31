import { ComplianceData } from "@/components/ComplianceCard";
import { RiskLevel } from "@/components/RiskBadge";

interface ComplianceRule {
  id: string;
  name: string;
  reason: string;
  deadline: string;
  riskLevel: RiskLevel;
  penaltyPreview: string;
  penaltyExplanation: string;
  plainExplanation: string;
  minTurnover?: number;
  maxTurnover?: number;
  minEmployees?: number;
  maxEmployees?: number;
}

const complianceRules: ComplianceRule[] = [
  {
    id: "gst-registration",
    name: "GST Registration",
    reason: "Your turnover exceeds ₹40 lakhs (threshold for goods)",
    deadline: "Within 30 days of crossing threshold",
    riskLevel: "critical",
    penaltyPreview: "Penalty up to ₹25,000",
    penaltyExplanation: "If you don't register for GST within 30 days, you could face a penalty of ₹10,000 or 10% of tax due (whichever is higher). Repeated non-compliance can lead to penalties up to ₹25,000.",
    plainExplanation: "GST is a tax on sales. If your business earns more than ₹40 lakhs per year, you must register with the government and charge GST on your sales. This money goes to the government, not your pocket.",
    minTurnover: 4000000,
  },
  {
    id: "pf-registration",
    name: "Provident Fund (EPF) Registration",
    reason: "You have 20 or more employees",
    deadline: "Within 1 month of reaching 20 employees",
    riskLevel: "critical",
    penaltyPreview: "Penalty up to ₹5 lakh + imprisonment",
    penaltyExplanation: "Failure to register can result in penalties up to ₹5 lakh. Continued non-compliance may lead to imprisonment for up to 3 years. You'll also owe interest on delayed contributions.",
    plainExplanation: "PF is like a savings account for your employees' retirement. Both you and your employees contribute a small amount each month. It's their money for later, and you're required by law to set this up.",
    minEmployees: 20,
  },
  {
    id: "esi-registration",
    name: "ESI Registration",
    reason: "You have 10 or more employees with salary under ₹21,000/month",
    deadline: "Within 15 days of becoming applicable",
    riskLevel: "high",
    penaltyPreview: "Penalty of 12% interest + damages",
    penaltyExplanation: "Late registration attracts 12% annual interest on unpaid contributions. Additional damages up to 25% of arrears may be imposed. Directors can face personal liability.",
    plainExplanation: "ESI is health insurance for your employees. It covers medical expenses, maternity benefits, and disability support. You and your employees share the cost, and it protects them when they're sick.",
    minEmployees: 10,
  },
  {
    id: "professional-tax",
    name: "Professional Tax Registration",
    reason: "Applicable in most Indian states for employers",
    deadline: "Before hiring first employee",
    riskLevel: "medium",
    penaltyPreview: "Penalty of ₹5 per day",
    penaltyExplanation: "Non-payment attracts a penalty of ₹5 per day of default in most states. Some states charge higher penalties and may suspend business licenses.",
    plainExplanation: "Professional Tax is a small state-level tax. It's deducted from employee salaries (usually ₹200/month max). As an employer, you need to register and submit this to the state government.",
    minEmployees: 1,
  },
  {
    id: "shops-establishment",
    name: "Shops & Establishment Act Registration",
    reason: "Required for all commercial establishments",
    deadline: "Within 30 days of starting business",
    riskLevel: "medium",
    penaltyPreview: "Fine up to ₹10,000",
    penaltyExplanation: "Operating without registration can result in fines up to ₹10,000. Repeat offenses may lead to closure of establishment by local authorities.",
    plainExplanation: "This is your official license to run a shop or office. It sets rules about working hours, holidays, and employee rights. Think of it as your business's basic permit to operate.",
    minEmployees: 1,
  },
  {
    id: "tds-compliance",
    name: "TDS Compliance",
    reason: "Required if turnover exceeds ₹1 crore",
    deadline: "7th of each month",
    riskLevel: "critical",
    penaltyPreview: "Interest + penalty equal to TDS amount",
    penaltyExplanation: "Late payment attracts 1.5% interest per month. Failure to file returns can result in penalties equal to the TDS amount. Prosecution may follow for willful defaults.",
    plainExplanation: "TDS means you deduct some tax from payments you make (like salaries or contractor fees) and send it directly to the government. It's collecting tax on behalf of the government.",
    minTurnover: 10000000,
  },
  {
    id: "labour-welfare-fund",
    name: "Labour Welfare Fund",
    reason: "Applicable in most states for establishments with employees",
    deadline: "30th June and 31st December each year",
    riskLevel: "low",
    penaltyPreview: "Fine up to ₹5,000",
    penaltyExplanation: "Non-contribution attracts penalties up to ₹5,000 depending on the state. Some states may charge additional interest on delayed payments.",
    plainExplanation: "This is a small fund (usually ₹6-₹20 per employee per month) that goes toward worker welfare programs like education and housing for laborers.",
    minEmployees: 5,
  },
  {
    id: "audit-requirement",
    name: "Tax Audit Requirement",
    reason: "Turnover exceeds ₹1 crore (₹10 crore if 95% digital)",
    deadline: "30th September each year",
    riskLevel: "high",
    penaltyPreview: "Penalty of 0.5% of turnover",
    penaltyExplanation: "Failure to get audit done attracts 0.5% of turnover as penalty, up to ₹1.5 lakh. This is in addition to interest on any tax shortfall discovered.",
    plainExplanation: "A tax audit is when a professional accountant checks your books to make sure everything is correct. It's mandatory for bigger businesses to ensure they're paying the right taxes.",
    minTurnover: 10000000,
  },
  {
    id: "gratuity",
    name: "Gratuity Payment Act",
    reason: "Applicable to establishments with 10+ employees",
    deadline: "Within 30 days of employee leaving (after 5 years)",
    riskLevel: "medium",
    penaltyPreview: "Simple interest + penalty up to ₹20,000",
    penaltyExplanation: "Delayed payment attracts simple interest at 10% per annum. Employers may face additional penalties up to ₹20,000 and imprisonment up to 2 years for willful default.",
    plainExplanation: "Gratuity is a thank-you payment to employees who work with you for 5+ years. When they leave, you owe them about 15 days' salary for each year they worked.",
    minEmployees: 10,
  },
  {
    id: "msme-registration",
    name: "MSME Udyam Registration",
    reason: "Recommended for all MSMEs to avail government benefits",
    deadline: "No strict deadline (voluntary but beneficial)",
    riskLevel: "low",
    penaltyPreview: "No penalty, but you miss benefits",
    penaltyExplanation: "While not mandatory, without Udyam registration you cannot access government schemes, priority sector lending, subsidy benefits, and protection under MSMED Act.",
    plainExplanation: "Udyam is a free government registration for small businesses. It opens doors to loans with lower interest, government tenders, and subsidies. There's no penalty, but you're missing out on benefits.",
    minTurnover: 0,
    maxTurnover: 2500000000,
    minEmployees: 0,
  },
];

export function getApplicableCompliances(
  turnover: number,
  employees: number
): ComplianceData[] {
  return complianceRules
    .filter((rule) => {
      const meetsMinTurnover = rule.minTurnover === undefined || turnover >= rule.minTurnover;
      const meetsMaxTurnover = rule.maxTurnover === undefined || turnover <= rule.maxTurnover;
      const meetsMinEmployees = rule.minEmployees === undefined || employees >= rule.minEmployees;
      const meetsMaxEmployees = rule.maxEmployees === undefined || employees <= rule.maxEmployees;
      
      return meetsMinTurnover && meetsMaxTurnover && meetsMinEmployees && meetsMaxEmployees;
    })
    .map((rule) => ({
      id: rule.id,
      name: rule.name,
      reason: rule.reason,
      deadline: rule.deadline,
      riskLevel: rule.riskLevel,
      penaltyPreview: rule.penaltyPreview,
      penaltyExplanation: rule.penaltyExplanation,
      plainExplanation: rule.plainExplanation,
    }));
}
