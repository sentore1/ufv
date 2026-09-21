import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import QRCode from "qrcode";

export const runtime = "edge";
export const dynamic = "force-dynamic";

interface CertificateDirector {
  full_name: string;
  role: string;
  signature_position: number;
  display_order: number;
}

export async function POST(request: NextRequest) {
  try {
    const { registrationId } = await request.json();

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    // Fetch registration details
    const { data: registration, error: regError } = await supabase
      .from("workshop_registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (regError || !registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Generate certificate number if not exists
    let certificateNumber = registration.certificate_number;
    if (!certificateNumber) {
      const { data: certData, error: certError } = await supabase.rpc(
        "generate_certificate_number"
      );

      if (certError) {
        console.error("Error generating certificate number:", certError);
        return NextResponse.json(
          { error: "Failed to generate certificate number" },
          { status: 500 }
        );
      }

      certificateNumber = certData;

      // Update registration with certificate number
      const { error: updateError } = await supabase
        .from("workshop_registrations")
        .update({
          certificate_number: certificateNumber,
          certificate_generated_at: new Date().toISOString(),
        })
        .eq("id", registrationId);

      if (updateError) {
        console.error("Error updating registration:", updateError);
      }
    }

    // Fetch active directors
    const { data: directors, error: dirError } = await supabase
      .from("certificate_directors")
      .select("full_name, role, signature_position, display_order")
      .eq("is_active", true)
      .order("signature_position", { ascending: true })
      .order("display_order", { ascending: true });

    if (dirError) {
      console.error("Error fetching directors:", dirError);
    }

    // Generate QR code for verification
    const verificationUrl = `${request.nextUrl.origin}/verify-certificate?code=${certificateNumber}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    // Return certificate data for client-side rendering
    return NextResponse.json({
      success: true,
      certificateData: {
        participantName: registration.full_name,
        certificateNumber: certificateNumber,
        qrCodeDataUrl: qrCodeDataUrl,
        verificationUrl: verificationUrl,
        directors: (directors || []) as CertificateDirector[],
        issueDate: registration.certificate_generated_at || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Certificate generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
