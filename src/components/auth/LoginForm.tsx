
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // In a real app, this would be an API call
    // Simulating authentication based on role
    setTimeout(() => {
      let userRole = "";
      if (username === "doctor") {
        userRole = "doctor";
      } else if (username === "patient") {
        userRole = "patient";
      } else if (username === "staff") {
        userRole = "report_entry";
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials. Try doctor/patient/staff with any password.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Store the user data (in a real app, this would be a JWT token)
      localStorage.setItem("healthcareUser", JSON.stringify({
        username,
        role: userRole,
        name: username === "doctor" ? "Dr. John Smith" : (username === "patient" ? "Sarah Johnson" : "Mike Wilson"),
      }));
      
      toast({
        title: "Success",
        description: "Login successful",
      });
      
      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="h-12"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 bg-healthcare-primary hover:bg-healthcare-secondary text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
        ) : (
          <span className="flex items-center">
            <LogIn className="mr-2" size={20} />
            Sign In
          </span>
        )}
      </Button>
      
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-healthcare-primary hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
