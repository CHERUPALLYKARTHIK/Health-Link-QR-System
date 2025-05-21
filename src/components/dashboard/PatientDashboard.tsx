
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import QRCodeGenerator from "../utils/QRCodeGenerator";
import PDFGenerator from "../utils/PDFGenerator";
import { FileText, User } from "lucide-react";

const mockMedicalReport = {
  id: "MR-2023-6789",
  date: "2023-12-15",
  doctorName: "Dr. John Smith",
  diagnosis: "Seasonal Allergies",
  treatment: "Prescribed antihistamines and nasal spray",
  followUp: "2 weeks",
  notes: "Patient reported improvement after initial medication. Continue treatment as prescribed."
};

const PatientDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [qrValue, setQrValue] = useState("");
  
  useEffect(() => {
    const userData = localStorage.getItem("healthcareUser");
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Create a full URL for the QR code that includes the domain
      const currentDomain = window.location.origin;
      setQrValue(`${currentDomain}/patient/${parsedUser.username}`);
    }
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Virtual Health Card */}
        <div className="md:w-1/3">
          <Card id="virtual-card" className="medical-card animate-fade-in" style={{ aspectRatio: "1.6/1" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">HEALTHCARE SYSTEM</CardTitle>
              <CardDescription className="text-white/80">
                Virtual Health ID Card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-lg font-bold">
                    {user.name}
                  </h3>
                  <p className="text-white/90 text-sm">ID: P-2023-4567</p>
                  <p className="text-white/90 text-sm">DOB: 01/01/1990</p>
                  <p className="text-white/90 text-sm">Blood: O+</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-20 w-20 border-2 border-white">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                    <AvatarFallback className="bg-white text-healthcare-primary">
                      <User size={32} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white p-2 rounded-md">
                    <QRCodeGenerator 
                      value={qrValue} 
                      size={80}
                      showText={false}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 flex justify-center">
            <PDFGenerator
              contentId="virtual-card"
              filename="health-card"
              label="Download Health Card"
              isCard={true}
            />
          </div>
        </div>
        
        {/* Latest Medical Report */}
        <div className="md:w-2/3">
          <Card id="medical-report" className="dashboard-card h-full animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 text-healthcare-primary" />
                Latest Medical Report
              </CardTitle>
              <CardDescription>
                View your most recent medical information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Report ID: {mockMedicalReport.id}</h3>
                  <span className="text-sm text-gray-500">
                    {mockMedicalReport.date}
                  </span>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Doctor</p>
                    <p>{mockMedicalReport.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Diagnosis</p>
                    <p>{mockMedicalReport.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Treatment</p>
                    <p>{mockMedicalReport.treatment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Follow-up</p>
                    <p>{mockMedicalReport.followUp}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p>{mockMedicalReport.notes}</p>
                </div>
                
                <div className="flex justify-end mt-4">
                  <PDFGenerator
                    contentId="medical-report"
                    filename="medical-report"
                    label="Download Report"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* More dashboard components here */}
    </div>
  );
};

export default PatientDashboard;
