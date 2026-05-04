import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../controllers/dbClient";
import type { UAAFormData } from "../../../types/uaa";

function formatDatePrefix(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `UAAF-${year}-${month}-${day}`;
}

async function generateTrackingId() {
  const prefix = formatDatePrefix(new Date());
  const latest = await prisma.uaa_submissions.findFirst({
    where: { tracking_id: { startsWith: `${prefix}-` } },
    orderBy: { tracking_id: "desc" },
  });
  const latestSequence = latest?.tracking_id.match(/-(\d{4})$/)?.[1];
  const nextSequence = (Number(latestSequence ?? "0") + 1)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${nextSequence}`;
}

async function generateEmployeeId() {
  return `LTO${String(Math.floor(10000 + Math.random() * 90000))}`;
}

async function ensureUAAUserInfoUploadColumns() {
  await prisma.$executeRaw`
    ALTER TABLE uaa_user_info
    ADD COLUMN IF NOT EXISTS supporting_document_name TEXT
  `;
  await prisma.$executeRaw`
    ALTER TABLE uaa_user_info
    ADD COLUMN IF NOT EXISTS supporting_document_url TEXT
  `;
}

async function generateUniqueEmployeeId() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidate = await generateEmployeeId();
    const existing = await prisma.uaa_user_info.findFirst({
      where: { employee_id: candidate },
      select: { id: true },
    });
    if (!existing) return candidate;
  }
  throw new Error("Unable to generate a unique Employee ID. Please try again.");
}

export async function POST(req: NextRequest) {
  try {
    await ensureUAAUserInfoUploadColumns();

    const form: UAAFormData = await req.json();
    const username = form.username.trim().toLowerCase();

    if (!username) {
      return NextResponse.json(
        { success: false, error: "Username is required." },
        { status: 400 },
      );
    }

    const existingPending = await prisma.uaa_submissions.findFirst({
      where: {
        status: { not: "Rejected" },
        approved_by_l4: false,
        uaa_user_info: {
          some: {
            username: {
              equals: username,
              mode: "insensitive",
            },
          },
        },
      },
      select: { id: true },
    });

    if (existingPending) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This username already has a pending request. Please wait for it to be processed before submitting another request.",
        },
        { status: 409 },
      );
    }

    if (form.accountType === "New Account") {
      const existingUsername = await prisma.uaa_user_info.findFirst({
        where: {
          username: {
            equals: username,
            mode: "insensitive",
          },
        },
        select: { id: true },
      });

      if (existingUsername) {
        return NextResponse.json(
          {
            success: false,
            error: "Username already exists. Please use a unique username.",
          },
          { status: 409 },
        );
      }
    }

    const trackingId = await generateTrackingId();
    const employeeId =
      form.accountType === "New Account"
        ? await generateUniqueEmployeeId()
        : form.employeeId;

    // 1. Insert uaa_submissions
    const submission = await prisma.uaa_submissions.create({
      data: {
        tracking_id: trackingId,
        control_no: null,
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
        username,
        designation: form.designation,
        employee_id: employeeId,
        contact_no: form.contactNo,
        email: form.email,
        supporting_document_name: form.supportingDocumentName || null,
        supporting_document_url: form.supportingDocumentUrl || null,
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
