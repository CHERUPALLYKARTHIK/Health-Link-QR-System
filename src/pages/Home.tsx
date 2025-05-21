import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { backgroundConfig } from "@/assets/background";

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = localStorage.getItem("healthcareUser");
    
    if (userData) {
      navigate("/dashboard");
    }
  }, [navigate]);
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${backgroundConfig.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: backgroundConfig.overlay.gradient,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Health QR Link</h1>
        <p className="text-xl text-gray-700">Your Trusted Healthcare Platform</p>
      </div>
      
      <div className="relative z-10 auth-card bg-white/95 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
