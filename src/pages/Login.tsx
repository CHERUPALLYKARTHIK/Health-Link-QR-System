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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
          Health QR Link System
        </h1>
        <p className="text-xl text-white/90 drop-shadow">Your Trusted Healthcare Platform</p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#0f766e]">Sign In</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
