"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface Director {
  full_name: string;
  role: string;
  signature_position: number;
  display_order: number;
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

          // Draw participant name (lowercase, with handwritten script font like Amsterdam)
          // Moved up more
          const participantNameLower = certificateData.participantName.toLowerCase();
          ctx.font = "italic 130px 'Brush Script MT', 'Lucida Handwriting', 'Segoe Script', cursive";
          ctx.fillText(
            participantNameLower,
            canvas.width / 2,
            canvas.height / 2 - 150 // Moved up from -50 to -150 (100px more up)
          );

          // Draw decorative line under name
          ctx.strokeStyle = "#16a34a";
          ctx.lineWidth = 5;
          ctx.beginPath();
          const lineY = canvas.height / 2 - 100; // Adjusted to follow name
          ctx.moveTo(canvas.width / 2 - 500, lineY);
          ctx.lineTo(canvas.width / 2 + 500, lineY);
          ctx.stroke();

          // Generate QR code with custom color
          const qrCodeDataUrlColored = await QRCode.toDataURL(certificateData.verificationUrl, {
            width: 200,
            margin: 1,
            color: {
              dark: "#518c71",
              light: "#ffffff",
            },
          });

          // Load and draw QR code (bottom right, moved left more)
          const qrImg = new Image();
          qrImg.onload = () => {
            const qrSize = 200;
            const qrX = canvas.width - qrSize - 400; // Moved more left from 250 to 400
            const qrY = canvas.height - qrSize - 350;

            // Draw QR code
            ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

            // Draw certificate number below QR code
            ctx.font = "bold 35px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#000000";
            ctx.fillText(
              certificateData.certificateNumber,
              qrX + qrSize / 2,
              qrY + qrSize + 40
            );
          };
          qrImg.src = qrCodeDataUrlColored;

          // Draw director signatures on the three horizontal lines at bottom
          // Adjusted to match the horizontal lines, moved up, and increased size
          const signatureY = 2180; // Moved up from 2205 to 2180
          const lineWidth = 440;

          // Group directors by position
          const leftDirectors = certificateData.directors.filter(
            (d) => d.signature_position === 1
          );
          const centerDirectors = certificateData.directors.filter(
            (d) => d.signature_position === 2
          );
          const rightDirectors = certificateData.directors.filter(
            (d) => d.signature_position === 3
          );

          ctx.fillStyle = "#000000";

          // Calculate spacing to distribute directors more evenly
          const totalWidth = 2400; // Total width for all three positions
          const startX = (canvas.width - totalWidth) / 2; // Center the group
          const spacing = totalWidth / 2; // Space between positions

          // Draw left signatures (closer spacing)
          leftDirectors.forEach((director, index) => {
            const x = startX + 300; // First position
            const y = signatureY + index * 50;

            // Draw name (above the line) - increased size
            ctx.textAlign = "center";
            ctx.font = "bold 42px Arial";
            ctx.fillText(director.full_name, x, y - 15);

            // Draw role (below the line) - increased size
            ctx.font = "38px Arial";
            ctx.fillText(director.role, x, y + 25);
          });

          // Draw center signatures
          centerDirectors.forEach((director, index) => {
            const x = startX + 300 + spacing; // Second position (middle)
            const y = signatureY + index * 50;

            // Draw name (above the line) - increased size
            ctx.textAlign = "center";
            ctx.font = "bold 42px Arial";
            ctx.fillText(director.full_name, x, y - 15);

            // Draw role (below the line) - increased size
            ctx.font = "38px Arial";
            ctx.fillText(director.role, x, y + 25);
          });

          // Draw right signatures
          rightDirectors.forEach((director, index) => {
            const x = startX + 300 + spacing * 2; // Third position (right)
            const y = signatureY + index * 50;

            // Draw name (above the line) - increased size
            ctx.textAlign = "center";
            ctx.font = "bold 42px Arial";
            ctx.fillText(director.full_name, x, y - 15);

            // Draw role (below the line) - increased size
            ctx.font = "38px Arial";
            ctx.fillText(director.role, x, y + 25);
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
