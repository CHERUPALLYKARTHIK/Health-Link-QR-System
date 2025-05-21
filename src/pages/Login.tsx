
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = localStorage.getItem("healthcareUser");
    
    if (userData) {
      navigate("/dashboard");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen healthcare-gradient flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">MediCare</h1>
        <p className="text-xl text-gray-700">Your Trusted Healthcare Platform</p>
      </div>
      
      <div className="auth-card">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
