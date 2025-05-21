interface PatientData {
  patientId: string;
}

export const generatePatientQRData = (patientId: string): string => {
  const data: PatientData = {
    patientId
  };
  return btoa(JSON.stringify(data));
};

export const verifyPatientQRData = (data: string): { isValid: boolean; patientId?: string } => {
  try {
    const decoded = JSON.parse(atob(data));
    return {
      isValid: true,
      patientId: decoded.patientId
    };
  } catch (error) {
    return { isValid: false };
  }
}; 