
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

type QRCodeGeneratorProps = {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
};

const QRCodeGenerator = ({
  value,
  size = 200,
  bgColor = "#FFFFFF",
  fgColor = "#0EA5E9"
}: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 1,
          color: {
            dark: fgColor,
            light: bgColor
          }
        },
        (error) => {
          if (error) {
            console.error("Error generating QR code:", error);
          }
        }
      );
    }
  }, [value, size, bgColor, fgColor]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default QRCodeGenerator;
