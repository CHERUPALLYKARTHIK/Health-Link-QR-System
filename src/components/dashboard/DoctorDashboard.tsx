
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PDFGenerator from "../utils/PDFGenerator";
import { Circle, FileText, Search, User, Users } from "lucide-react";

const mockPatients = [
  {
    id: "P-2023-4567",
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    lastVisit: "2023-12-15",
    reports: [
      {
        id: "MR-2023-6789",
        date: "2023-12-15",
        diagnosis: "Seasonal Allergies",
        treatment: "Prescribed antihistamines and nasal spray",
        followUp: "2 weeks",
        notes: "Patient reported improvement after initial medication. Continue treatment as prescribed."
      }
    ]
  },
  {
    id: "P-2023-4568",
    name: "Michael Brown",
    age: 45,
    gender: "Male",
    lastVisit: "2023-12-10",
    reports: [
      {
        id: "MR-2023-6790",
        date: "2023-12-10",
        diagnosis: "Hypertension",
        treatment: "Prescribed beta blockers and diet changes",
        followUp: "1 month",
        notes: "Blood pressure remains high. Consider adjusting medication if no improvement in 2 weeks."
      }
    ]
  }
];

const DoctorDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  
  useEffect(() => {
    const userData = localStorage.getItem("healthcareUser");
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
    if (patient.reports && patient.reports.length > 0) {
      setSelectedReport(patient.reports[0]);
    } else {
      setSelectedReport(null);
    }
  };

  const filteredPatients = searchTerm
    ? mockPatients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockPatients;

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctor Profile */}
        <Card className="dashboard-card animate-fade-in">
          <CardHeader>
            <CardTitle>Doctor Profile</CardTitle>
            <CardDescription>Your medical profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-2 border-healthcare-primary">
                <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                <AvatarFallback className="bg-healthcare-primary text-white">
                  <User size={36} />
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-500">Cardiologist</p>
              </div>
              <div className="w-full pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Doctor ID:</span>
                  <span>D-2023-1234</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Department:</span>
                  <span>Cardiology</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Experience:</span>
                  <span>15 years</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Search */}
        <Card className="dashboard-card animate-fade-in md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 text-healthcare-primary" />
              Patient Search
            </CardTitle>
            <CardDescription>
              Find patient records and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by patient name or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium flex">
                  <div className="w-1/3">Patient</div>
                  <div className="w-1/3">ID</div>
                  <div className="w-1/3">Last Visit</div>
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <div 
                        key={patient.id}
                        onClick={() => handlePatientSelect(patient)}
                        className={`p-3 flex cursor-pointer hover:bg-gray-50 border-t ${
                          selectedPatient?.id === patient.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="w-1/3 flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback className="bg-healthcare-primary text-white text-xs">
                              {patient.name.split(" ").map((n: string) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          {patient.name}
                        </div>
                        <div className="w-1/3 flex items-center text-gray-600">{patient.id}</div>
                        <div className="w-1/3 flex items-center text-gray-600">{patient.lastVisit}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No patients found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {selectedPatient && (
        <Card id="patient-report" className="dashboard-card animate-fade-in">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 text-healthcare-primary" />
                  Patient Report
                </CardTitle>
                <CardDescription>
                  {selectedPatient.name} ({selectedPatient.id})
                </CardDescription>
              </div>
              <PDFGenerator
                contentId="patient-report"
                filename={`report-${selectedReport?.id || 'patient'}`}
                label="Download Report"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="info">Patient Info</TabsTrigger>
                <TabsTrigger value="reports">Medical Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-healthcare-primary text-white text-xl">
                        {selectedPatient.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">{selectedPatient.name}</h3>
                      <div className="text-sm text-gray-500">
                        {selectedPatient.age} years old • {selectedPatient.gender}
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <Circle className="h-2 w-2 mr-1 text-green-500 fill-green-500" />
                        <span className="text-green-600">Active Patient</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <p className="text-sm text-gray-500">Patient ID</p>
                      <p className="font-medium">{selectedPatient.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Visit</p>
                      <p className="font-medium">{selectedPatient.lastVisit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{selectedPatient.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{selectedPatient.gender}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reports">
                {selectedPatient.reports && selectedPatient.reports.length > 0 ? (
                  <div className="space-y-4">
                    {selectedReport && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Report ID: {selectedReport.id}</h3>
                          <span className="text-sm text-gray-500">{selectedReport.date}</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Diagnosis</p>
                            <p>{selectedReport.diagnosis}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Treatment</p>
                            <p>{selectedReport.treatment}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Follow-up</p>
                            <p>{selectedReport.followUp}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-gray-500">Notes</p>
                          <p>{selectedReport.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    No medical reports available for this patient
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorDashboard;
