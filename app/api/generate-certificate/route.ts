import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface CertificateDirector {
  full_name: string;
  role: string;
  signature_position: number;
  display_order: number;
  position_x: number;
  position_y: number;
  font_size_name: number;
  font_size_role: number;
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
      console.log("Generating new certificate number...");
      
      const { data: certData, error: certError } = await supabase.rpc(
        "generate_certificate_number"
      );

      console.log("RPC response:", { certData, certError });

      if (certError) {
        console.error("Error generating certificate number:", certError);
        return NextResponse.json(
          { 
            error: "Failed to generate certificate number",
            details: certError.message,
            hint: "Make sure the generate_certificate_number() function exists in Supabase"
          },
          { status: 500 }
        );
      }

      certificateNumber = certData;
      console.log("Generated certificate number:", certificateNumber);

      // Update registration with certificate number
      const { error: updateError, data: updateData } = await supabase
        .from("workshop_registrations")
        .update({
          certificate_number: certificateNumber,
          certificate_generated_at: new Date().toISOString(),
        })
        .eq("id", registrationId)
        .select();

      console.log("Update result:", { updateData, updateError });

      if (updateError) {
        console.error("Error updating registration:", updateError);
        return NextResponse.json(
          { 
            error: "Failed to save certificate number",
            details: updateError.message,
            certificateNumber: certificateNumber
          },
          { status: 500 }
        );
      }
    }

    // Fetch active directors
    const { data: directors, error: dirError } = await supabase
      .from("certificate_directors")
      .select("full_name, role, signature_position, display_order, position_x, position_y, font_size_name, font_size_role")
      .eq("is_active", true)
      .order("signature_position", { ascending: true })
      .order("display_order", { ascending: true });

    if (dirError) {
      console.error("Error fetching directors:", dirError);
    }

    // Generate verification URL for QR code (client will generate QR)
    const verificationUrl = `${request.nextUrl.origin}/verify-certificate?code=${certificateNumber}`;

    // Return certificate data for client-side rendering
    return NextResponse.json({
      success: true,
      certificateData: {
        participantName: registration.full_name,
        certificateNumber: certificateNumber,
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
