"use client";
import { useEffect, useRef, useState } from "react";
import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "../../lib/uploadthing";
import { SiteHeader } from "../../components/ui/SiteHeader";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { LoadingOverlay } from "../../components/ui/LoadingOverlay";
import { SuccessScreen } from "../../components/ui/SuccessScreen";
import { HeaderFields } from "../../components/form/HeaderFields";
import { SectionSystemAccess } from "../../components/form/SectionSystemAccess";
import { SectionUserInfo } from "../../components/form/SectionUserInfo";
import { SectionModules } from "../../components/form/SectionModules";
import { SubmitCard } from "../../components/form/SubmitCard";
import { useUAAForm } from "../../hooks/useUAAForm";

const UploadButton = generateUploadButton<OurFileRouter>();

export default function UAAFormPage() {
  const {
    form,
    errors,
    isSubmitting,
    successId,
    handleFieldChange,
    handleAccountTypeChange,
    handleExistingSubChange,
    handleUserTypeChange,
    handleLoginModeChange,
    handleFileChange,
    handleFromOfficeCodeChange,
    handleToOfficeCodeChange,
    handleModuleToggle,
    handleSubmit,
    moduleGroups,
    availableOfficeCodes,
  } = useUAAForm();

  const [activeStep, setActiveStep] = useState(0);
  const isSubmittedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isSubmittedRef.current) return;
      const offsets = [
        document.getElementById("sec1")?.offsetTop ?? 0,
        document.getElementById("sec2")?.offsetTop ?? 0,
        document.getElementById("sec3")?.offsetTop ?? 0,
      ];
      const position = window.scrollY + 150;
      const currentStep = offsets.reduce(
        (acc, top, index) => (position >= top ? index : acc),
        0,
      );
      setActiveStep(currentStep);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmitWithStep = async () => {
    const result = await handleSubmit();
    if (result?.success) {
      isSubmittedRef.current = true;
      setActiveStep(3);
    }
  };

  return (
    <main className="main">
      <SiteHeader />
      <ProgressBar activeStep={activeStep} />
      <LoadingOverlay visible={isSubmitting} />
      {successId ? <SuccessScreen trackingId={successId} /> : null}
      <form id="uaa-form" className={successId ? "form-hidden" : ""}>
        <HeaderFields
          effectiveDate={form.effectiveDate}
          officeCode={form.officeCode}
          officeCodeOptions={availableOfficeCodes}
          errors={errors}
          onChange={handleFieldChange}
        />
        <SectionSystemAccess
          accountType={form.accountType}
          existingSub={form.existingSub}
          fromOfficeCode={form.fromOfficeCode}
          toOfficeCode={form.toOfficeCode}
          userType={form.userType}
          loginMode={form.loginMode}
          errors={errors}
          onAccountTypeChange={handleAccountTypeChange}
          onExistingSubChange={handleExistingSubChange}
          onFromOfficeCodeChange={handleFromOfficeCodeChange}
          onToOfficeCodeChange={handleToOfficeCodeChange}
          onUserTypeChange={handleUserTypeChange}
          onLoginModeChange={handleLoginModeChange}
        />
        <SectionUserInfo
          username={form.username}
          accountType={form.accountType}
          lastName={form.lastName}
          firstName={form.firstName}
          middleName={form.middleName}
          designation={form.designation}
          employeeId={form.employeeId}
          contactNo={form.contactNo}
          email={form.email}
          errors={errors}
          onChange={handleFieldChange}
        />
        <SectionModules
          moduleGroups={moduleGroups}
          selectedModules={form.selectedModules}
          othersText={form.othersText}
          errors={errors}
          onToggleModule={handleModuleToggle}
          onChangeText={handleFieldChange}
        />
        <div className="card">
          <div className="card-header">
            <h2>Upload Supporting Document</h2>
          </div>
          <div className="card-body">
            <div className="form-group" style={{ width: "100%" }}>
              <UploadButton
                endpoint="doc"
                onClientUploadComplete={(res) => {
                  if (!res?.length) return;
                  const upload = res[0];
                  handleFileChange(
                    upload.serverData.fileName,
                    upload.serverData.fileUrl,
                  );
                }}
                onUploadError={(error) => {
                  console.error("UploadThing error:", error);
                }}
                appearance={{
                  container: { width: "100%" },
                  button: {
                    width: "100%",
                    backgroundColor: "var(--primary)",
                    color: "#fff",
                  },
                }}
                content={{
                  button: "Choose Supporting Document",
                  allowedContent: "Any file up to 8MB",
                }}
              />
              {form.supportingDocumentName ? (
                <div className="field-note">
                  Selected file: {form.supportingDocumentName}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <SubmitCard
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitWithStep}
        />
      </form>
    </main>
  );
}
