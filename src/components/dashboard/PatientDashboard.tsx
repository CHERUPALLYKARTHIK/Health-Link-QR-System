import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import QRCodeGenerator from "../utils/QRCodeGenerator";
import PDFGenerator from "../utils/PDFGenerator";
import { FileText, User } from "lucide-react";
import { generatePatientQRData } from "@/utils/tokenGenerator";
import { useToast } from "@/components/ui/use-toast";

// Sample medical reports data
const mockMedicalReports = [
  {
    id: "MR-2023-1234",
    date: "2023-06-15",
    doctorName: "Dr. Sarah Wilson",
    diagnosis: "Common Cold",
    treatment: "Prescribed cold medicine and rest",
    followUp: "None required",
    notes: "Patient should recover within a week with proper rest."
  },
  {
    id: "MR-2023-4567",
    date: "2023-09-22",
    doctorName: "Dr. Michael Brown",
    diagnosis: "Sprained Ankle",
    treatment: "Ice pack application, compression bandage, and pain medication",
    followUp: "1 week",
    notes: "Avoid strenuous activities and keep the foot elevated."
  },
  {
    id: "MR-2023-6789",
    date: "2023-12-15",
    doctorName: "Dr. John Smith",
    diagnosis: "Seasonal Allergies",
    treatment: "Prescribed antihistamines and nasal spray",
    followUp: "2 weeks",
    notes: "Patient reported improvement after initial medication. Continue treatment as prescribed."
  }
];

const PatientDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [showCardBack, setShowCardBack] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const userData = localStorage.getItem("healthcareUser");
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Add contact and address information for Sarah Anderson
      const enhancedUser = {
        ...parsedUser,
        phone: "+1 (555) 123-4567",
        address: "123 Medical Avenue, Healthcare District, New York, NY 10001",
        bloodGroup: "O+",
        emergencyContact: {
          name: "John Anderson",
          relation: "Spouse",
          phone: "+1 (555) 987-6543"
        }
      };
      setUser(enhancedUser);
      
      // Generate QR code data
      const qrData = generatePatientQRData(enhancedUser.username);
      
      // Create a shareable URL using the current domain
      const currentDomain = window.location.origin;
      setQrUrl(`${currentDomain}/patient/${enhancedUser.username}?code=${qrData}`);
    }
  }, []);

  const CardFront = () => (
    <div className="relative w-full h-64 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl p-6 overflow-hidden">
      {/* Medical cross pattern overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-20 h-20 text-emerald-300 opacity-20">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 text-emerald-300 opacity-20">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 text-emerald-300 opacity-20">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>
        {/* Add glowing effect */}
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-400 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-emerald-300 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="relative z-10 h-full flex text-white">
        {/* Left side - Photo and Info */}
        <div className="w-2/3 flex">
          {/* Photo section */}
          <div className="w-1/3 flex flex-col items-center space-y-2">
            <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg backdrop-blur-sm">
              <Avatar className="w-full h-full">
                <AvatarImage src={user.photo} className="object-cover" />
                <AvatarFallback className="bg-white text-healthcare-primary">
                  <User size={40} />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg tracking-wide text-white">HEALTH</p>
              <p className="font-bold text-lg tracking-wide text-white">VIRTUAL</p>
              <p className="font-bold text-lg tracking-wide text-white">CARD</p>
            </div>
          </div>

          {/* Information section */}
          <div className="w-2/3 flex flex-col justify-between pl-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold text-white">{user.name}</h2>
              </div>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="text-white/70">DOB: </span>
                  <span className="text-white">01/01/1990</span>
                </p>
                <p className="text-sm">
                  <span className="text-white/70">Gender: </span>
                  <span className="text-white">Female</span>
                </p>
                <p className="text-sm">
                  <span className="text-white/70">Blood Group: </span>
                  <span className="text-white">{user.bloodGroup}</span>
                </p>
                <p className="text-sm">
                  <span className="text-white/70">Phone: </span>
                  <span className="text-white">{user.phone}</span>
                </p>
                <p className="text-sm">
                  <span className="text-white/70">Address: </span>
                  <span className="text-white text-xs">{user.address}</span>
                </p>
              </div>
            </div>

            <div className="mt-2">
              <p className="font-mono text-base font-bold tracking-wider text-white">
                {user.username.replace(/[^\d]/g, '').padStart(12, '0').match(/.{1,4}/g)?.join(' ')}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - QR Code */}
        <div className="w-1/3 flex flex-col items-center justify-center">
          <div className="bg-white/90 p-3 rounded-lg shadow-lg backdrop-blur-sm">
            <QRCodeGenerator 
              value={qrUrl}
              size={100}
            />
          </div>
          <p className="text-xs text-white/70 mt-2 text-center">Scan for details</p>
        </div>
      </div>
    </div>
  );

  const CardBack = () => (
    <div className="relative w-full h-56 bg-[#F8F8F8] rounded-xl p-6 overflow-hidden">
      {/* Top tricolor bar */}
      <div className="absolute top-0 left-0 w-full h-3 flex">
        <div className="w-1/3 h-full bg-[#FF9933]" />
        <div className="w-1/3 h-full bg-white" />
        <div className="w-1/3 h-full bg-[#138808]" />
      </div>

      <div className="relative z-10 h-full flex text-gray-800">
        {/* Left side - Address */}
        <div className="w-2/3 pr-4 space-y-3 text-sm">
          <div>
            <p className="font-medium mb-1">Address:</p>
            <p className="text-gray-600">{user.address}</p>
          </div>
          <div>
            <p className="font-medium mb-1">Contact:</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
          <div>
            <p className="font-medium mb-1">Emergency Contact:</p>
            <p className="text-gray-600">
              {user.emergencyContact.name} ({user.emergencyContact.relation})
              <br />
              {user.emergencyContact.phone}
            </p>
          </div>
        </div>

        {/* Right side - QR Code */}
        <div className="w-1/3 flex items-center justify-center">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <QRCodeGenerator 
              value={qrUrl}
              size={80}
            />
          </div>
        </div>
      </div>

      {/* Bottom elements */}
      <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-xs text-gray-600">
        <div>
          <p>Virtual Health Card</p>
        </div>
        <div className="text-right">
          <p>help@healthcare.com</p>
          <p>www.healthcare.com</p>
        </div>
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-emerald-600 relative">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hexagonal Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.1' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Connected Dots Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
        
        {/* Medical Crosses */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10v20M10 20h20' stroke='rgba(255,255,255,0.1)' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">Patient Dashboard</h1>
          </div>

          {/* Patient Name and Details */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-6 text-white">{user.name}</h2>
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-slate-700">
              <CardContent className="grid grid-cols-2 gap-4 p-6">
                <div>
                  <p className="text-sm text-teal-300">Patient ID</p>
                  <p className="font-medium text-white">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-teal-300">Blood Group</p>
                  <p className="font-medium text-white">{user.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-sm text-teal-300">Contact Number</p>
                  <p className="font-medium text-white">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-teal-300">Email</p>
                  <p className="font-medium text-white">{user.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-teal-300">Address</p>
                  <p className="font-medium text-white">{user.address}</p>
                </div>
                <div className="col-span-2 border-t border-slate-700 pt-4 mt-2">
                  <p className="text-sm text-teal-300 font-medium mb-2">Emergency Contact</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-teal-300">Name</p>
                      <p className="font-medium text-white">{user.emergencyContact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-teal-300">Relation</p>
                      <p className="font-medium text-white">{user.emergencyContact.relation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-teal-300">Contact Number</p>
                      <p className="font-medium text-white">{user.emergencyContact.phone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Virtual Health Card */}
          <div className="space-y-4">
            <div id="virtual-card" className="card-container">
              {showCardBack ? <CardBack /> : <CardFront />}
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setShowCardBack(!showCardBack)}
                className="text-white border-white/20 hover:bg-white/10"
              >
                {showCardBack ? "Show Front" : "Show Back"}
              </Button>
              <PDFGenerator
                contentId="virtual-card"
                filename="virtual-health-card"
                label="Download Card"
                isCard={true}
              />
            </div>

            {/* QR Code section */}
            <div className="mt-4">
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-slate-700">
                <CardHeader>
                  <CardTitle className="text-teal-300">QR Code</CardTitle>
                  <CardDescription className="text-slate-400">Scan to view patient details</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <QRCodeGenerator 
                      value={qrUrl}
                      size={200}
                    />
                  </div>
                  <p className="text-sm text-slate-400 mt-4 text-center">
                    Network URL: {qrUrl}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Medical Reports */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center text-teal-300">
                  <FileText className="mr-2 text-teal-500" />
                  Medical Reports
                </CardTitle>
                <PDFGenerator
                  contentId="all-medical-reports"
                  filename="complete-medical-history"
                  label="Download All Reports"
                />
              </div>
              <CardDescription className="text-slate-400">
                View your medical reports in chronological order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div id="all-medical-reports" className="space-y-6">
                {mockMedicalReports.map((report, index) => (
                  <div key={report.id}>
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-teal-300">Report ID: {report.id}</h3>
                          <span className="text-sm text-slate-400">
                            {report.date}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-teal-300">Doctor</p>
                              <p className="text-white">{report.doctorName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-teal-300">Diagnosis</p>
                              <p className="text-white">{report.diagnosis}</p>
                            </div>
                            <div>
                              <p className="text-sm text-teal-300">Treatment</p>
                              <p className="text-white">{report.treatment}</p>
                            </div>
                            <div>
                              <p className="text-sm text-teal-300">Follow-up</p>
                              <p className="text-white">{report.followUp}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-teal-300">Notes</p>
                            <p className="text-white">{report.notes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {index < mockMedicalReports.length - 1 && (
                      <Separator className="my-4 bg-slate-700" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
