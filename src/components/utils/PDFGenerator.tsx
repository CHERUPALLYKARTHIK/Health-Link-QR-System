import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PDFGeneratorProps {
  contentId: string;
  filename: string;
  label?: string | React.ReactNode;
}

const PDFGenerator = ({ contentId, filename, label = "Download PDF" }: PDFGeneratorProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const generatePDF = async () => {
    const element = document.getElementById(contentId);
    if (!element) return;

    try {
      // Disable the button during generation
      if (buttonRef.current) {
        buttonRef.current.disabled = true;
      }
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Re-enable the button
      if (buttonRef.current) {
        buttonRef.current.disabled = false;
      }
    }
  };

  if (typeof label === "string") {
    return (
      <Button 
        ref={buttonRef}
        onClick={generatePDF} 
        className="bg-healthcare-primary hover:bg-healthcare-secondary text-white"
      >
        <Download className="mr-2 h-4 w-4" />
        {label}
      </Button>
    );
  }

  return (
    <div onClick={generatePDF} className="cursor-pointer">
      {label}
    </div>
  );
};

export default PDFGenerator;
