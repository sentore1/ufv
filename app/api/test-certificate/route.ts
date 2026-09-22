import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({
        error: "No code provided",
        example: "/api/test-certificate?code=UFV-2026-0001"
      }, { status: 400 });
    }

    // Test 1: Check if we can connect to Supabase
    const { data: testConnection, error: connError } = await supabase
      .from("workshop_registrations")
      .select("count")
      .limit(1);

    if (connError) {
      return NextResponse.json({
        test: "connection",
        success: false,
        error: connError.message
      }, { status: 500 });
    }

    // Test 2: Check if certificate_number column exists
    const { data: allRegistrations, error: allError } = await supabase
      .from("workshop_registrations")
      .select("id, full_name, certificate_number")
      .limit(5);

    if (allError) {
      return NextResponse.json({
        test: "column_check",
        success: false,
        error: allError.message,
        hint: "The certificate_number column might not exist. Run add_certificate_system.sql"
      }, { status: 500 });
    }

    // Test 3: Search for the specific certificate
    const { data: certificate, error: certError } = await supabase
      .from("workshop_registrations")
      .select("*")
      .eq("certificate_number", code)
      .maybeSingle();

    if (certError) {
      return NextResponse.json({
        test: "certificate_search",
        success: false,
        error: certError.message,
        code: code
      }, { status: 500 });
    }

    // Test 4: Count certificates with numbers
    const { count: certCount } = await supabase
      .from("workshop_registrations")
      .select("*", { count: "exact", head: true })
      .not("certificate_number", "is", null);

    return NextResponse.json({
      success: true,
      searchCode: code,
      found: !!certificate,
      certificateData: certificate ? {
        id: certificate.id,
        name: certificate.full_name,
        certificateNumber: certificate.certificate_number,
        generatedAt: certificate.certificate_generated_at,
      } : null,
      statistics: {
        totalCertificatesGenerated: certCount || 0,
        sampleRegistrations: allRegistrations?.map(r => ({
          id: r.id,
          name: r.full_name,
          certificateNumber: r.certificate_number || "NOT_GENERATED"
        }))
      }
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
