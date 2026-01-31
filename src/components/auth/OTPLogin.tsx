import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, Mail, Phone, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Validation schemas
const emailSchema = z.string()
  .trim()
  .email({ message: "Please enter a valid email address" })
  .max(255, { message: "Email must be less than 255 characters" })
  .refine((email) => {
    // Block temporary/disposable email domains
    const blockedDomains = [
      "tempmail.com", "temp-mail.org", "guerrillamail.com", "10minutemail.com",
      "mailinator.com", "throwaway.email", "fakeinbox.com", "yopmail.com",
      "getnada.com", "trashmail.com", "maildrop.cc", "dispostable.com",
      "mailnesia.com", "temp.email", "tempr.email", "discard.email"
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    return !blockedDomains.includes(domain);
  }, { message: "Temporary email addresses are not allowed" });

const phoneSchema = z.string()
  .trim()
  .regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian phone number" });

interface OTPLoginProps {
  onLoginSuccess: () => void;
  onSkip: () => void;
}

const OTPLogin = ({ onLoginSuccess, onSkip }: OTPLoginProps) => {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validateInput = () => {
    setError("");
    try {
      if (method === "email") {
        emailSchema.parse(email);
      } else {
        phoneSchema.parse(phone);
      }
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const handleSendOTP = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    
    // Simulate OTP sending (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "OTP Sent!",
      description: `A verification code has been sent to your ${method === "email" ? "email" : "phone"}.`,
    });
    
    setStep("otp");
    setIsLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate OTP verification (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo, any 6-digit OTP works
    setStep("success");
    setIsLoading(false);

    // Auto-redirect after success animation
    setTimeout(() => {
      onLoginSuccess();
    }, 1500);
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "OTP Resent!",
      description: "A new verification code has been sent.",
    });
    setIsLoading(false);
    setOtp("");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[hsl(var(--risk-low-bg))] flex items-center justify-center animate-scale-in">
                <CheckCircle2 className="w-8 h-8 text-[hsl(var(--risk-low))]" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Verification Successful!</h2>
              <p className="text-muted-foreground">Redirecting to dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to ComplianceAI</CardTitle>
          <CardDescription className="text-base">
            {step === "input" 
              ? "Sign in with your email or phone number"
              : `Enter the OTP sent to your ${method}`
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "input" ? (
            <>
              <Tabs value={method} onValueChange={(v) => { setMethod(v as "email" | "phone"); setError(""); }}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      className={error ? "border-destructive" : ""}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
                        +91
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => { 
                          const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setPhone(value); 
                          setError(""); 
                        }}
                        className={`rounded-l-none ${error ? "border-destructive" : ""}`}
                        maxLength={10}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button 
                onClick={handleSendOTP} 
                className="w-full" 
                size="lg"
                disabled={isLoading || (method === "email" ? !email : !phone)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground"
                onClick={onSkip}
              >
                Skip login for now
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <Label className="text-center">Enter 6-digit verification code</Label>
                  <InputOTP
                    value={otp}
                    onChange={(value) => { setOtp(value); setError(""); }}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}

                <p className="text-sm text-muted-foreground text-center">
                  Sent to: {method === "email" ? email : `+91 ${phone}`}
                </p>
              </div>

              <Button 
                onClick={handleVerifyOTP} 
                className="w-full" 
                size="lg"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </Button>

              <div className="flex items-center justify-between text-sm">
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground"
                  onClick={() => { setStep("input"); setOtp(""); setError(""); }}
                  disabled={isLoading}
                >
                  Change {method}
                </Button>
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                >
                  Resend OTP
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPLogin;
