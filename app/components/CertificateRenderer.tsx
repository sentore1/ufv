"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface Director {
  full_name: string;
  role: string;
  signature_position: number;
  display_order: number;
  position_x?: number;
  position_y?: number;
  font_size_name?: number;
  font_size_role?: number;
}

interface CertificateData {
  participantName: string;
  certificateNumber: string;
  verificationUrl: string;
  directors: Director[];
  issueDate: string;
}

interface CertificateRendererProps {
  certificateData: CertificateData;
  onReady?: (canvas: HTMLCanvasElement) => void;
}

export default function CertificateRenderer({
  certificateData,
  onReady,
}: CertificateRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderCertificate = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Failed to get canvas context");
        return;
      }

      try {
        // Set canvas size to match certificate template
        canvas.width = 3508; // A4 landscape at 300 DPI
        canvas.height = 2480;

        // Generate QR code on client side
        const qrCodeDataUrl = await QRCode.toDataURL(certificateData.verificationUrl, {
          width: 200,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });

        // Load the certificate template image
        const templateImg = new Image();
        templateImg.crossOrigin = "anonymous";

        templateImg.onload = async () => {
          // Draw the template
          ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

          // Set text styles
          ctx.textAlign = "center";
          ctx.fillStyle = "#000000";

          // Draw participant name (capitalize first letter of each word, rest lowercase)
          // Increased size and moved down
          const participantName = certificateData.participantName
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          ctx.font = "italic 200px 'Brush Script MT', 'Lucida Handwriting', 'Segoe Script', cursive";
          ctx.fillText(
            participantName,
            canvas.width / 2,
            canvas.height / 2 - 80 // Moved down from -150 to -80
          );

          // Generate QR code with custom color
          const qrCodeDataUrlColored = await QRCode.toDataURL(certificateData.verificationUrl, {
            width: 200,
            margin: 1,
            color: {
              dark: "#518c71",
              light: "#ffffff",
            },
          });

          // Load and draw QR code (bottom right, moved left more and increased size)
          const qrImg = new Image();
          qrImg.onload = () => {
            const qrSize = 320; // Increased from 280 to 320
            const qrX = canvas.width - qrSize - 500; // Moved more left from 400 to 500
            const qrY = canvas.height - qrSize - 350;

            // Draw QR code
            ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

            // Draw certificate number below QR code
            ctx.font = "bold 40px Arial"; // Increased font size
            ctx.textAlign = "center";
            ctx.fillStyle = "#000000";
            ctx.fillText(
              certificateData.certificateNumber,
              qrX + qrSize / 2,
              qrY + qrSize + 50
            );
          };
          qrImg.src = qrCodeDataUrlColored;

          // Draw director signatures using their stored positions
          ctx.fillStyle = "#000000";
          ctx.strokeStyle = "#000000";

          // Draw all directors using their custom positions
          certificateData.directors.forEach((director, index) => {
            const x = director.position_x || 1754; // Default to center if not set
            const y = director.position_y || 2210; // Default Y position
            const fontSizeName = director.font_size_name || 42;
            const fontSizeRole = director.font_size_role || 38;
            const lineWidth = 500; // Increased width of the horizontal line

            // Draw horizontal line above the director name (100px above)
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x - lineWidth / 2, y - 100); // Line at 100px above
            ctx.lineTo(x + lineWidth / 2, y - 100);
            ctx.stroke();

            // Draw director name (below the line)
            ctx.textAlign = "center";
            ctx.font = `bold ${fontSizeName}px 'Open Sans', Arial, sans-serif`;
            ctx.fillText(director.full_name, x, y - 10); // Name below the line

            // Draw role (below the name with more space)
            ctx.font = `${fontSizeRole}px 'Open Sans', Arial, sans-serif`;
            ctx.fillText(director.role, x, y + 45); // Increased from 30 to 45 for more space
          });

          setIsLoading(false);
          if (onReady) {
            onReady(canvas);
          }
        };

        templateImg.onerror = () => {
          setError("Failed to load certificate template");
          setIsLoading(false);
        };

        templateImg.src = "/certificate/Certificate Template.png";
      } catch (err) {
        console.error("Certificate rendering error:", err);
        setError("Failed to render certificate");
        setIsLoading(false);
      }
    };

    renderCertificate();
  }, [certificateData, onReady]);

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Rendering certificate...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto border border-gray-300 rounded shadow-lg"
      />
    </div>
  );
}
