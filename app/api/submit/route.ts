import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../controllers/dbClient";
import type { UAAFormData } from "../../../types/uaa";

export async function POST(req: NextRequest) {
  try {
    const form: UAAFormData = await req.json();

    const trackingId =
      form.controlNo ||
      `MID-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;

    // 1. Insert uaa_submissions
    const submission = await prisma.uaa_submissions.create({
      data: {
        tracking_id: trackingId,
        control_no: form.controlNo,
        effective_date: form.effectiveDate,
        office_code: form.officeCode,
      },
    });

    // 2. Insert uaa_system_access
    await prisma.uaa_system_access.create({
      data: {
        submission_id: submission.id,
        account_type: form.accountType,
        existing_sub: form.existingSub,
        from_office_code: form.fromOfficeCode,
        to_office_code: form.toOfficeCode,
        user_type: form.userType,
        login_mode: form.loginMode,
      },
    });

    // 3. Insert uaa_user_info
    await prisma.uaa_user_info.create({
      data: {
        submission_id: submission.id,
        last_name: form.lastName,
        first_name: form.firstName,
        middle_name: form.middleName,
        designation: form.designation,
        employee_id: form.employeeId,
        contact_no: form.contactNo,
        email: form.email,
      },
    });

    // 4. Insert uaa_modules
    await prisma.uaa_modules.create({
      data: {
        submission_id: submission.id,
        selected_modules: form.selectedModules,
        others_text: form.othersText,
      },
    });

    return NextResponse.json({ success: true, trackingId });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("DB Submit Error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
