"use client";
import { useEffect, useRef, useState } from "react";
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
          controlNo={form.controlNo}
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
        <SubmitCard
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitWithStep}
        />
      </form>
    </main>
  );
}
