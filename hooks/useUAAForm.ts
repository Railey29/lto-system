"use client";
import { useMemo, useState } from "react";
import { validateUAAForm } from "../controllers/formValidation";
import { submitUAAForm } from "../controllers/formSubmit";
import {
  formatControlNo,
  formatContactNo,
  formatEmployeeId,
  formatNameInput,
  formatEmail,
  formatUsername,
  generateEmployeeId,
} from "../controllers/inputFormatting";
import { INITIAL_FORM_STATE } from "../models/formState";
import { MODULE_GROUPS } from "../models/modules";
import { OFFICE_CODES } from "../models/officeCodes";
import type { UAAFormData, UAAFormErrors } from "../types/uaa";

export function useUAAForm() {
  const [form, setForm] = useState<UAAFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<UAAFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleFieldChange = (field: keyof UAAFormData, value: string) => {
    let nextValue = value;
    if (field === "controlNo") nextValue = formatControlNo(value);
    if (
      field === "lastName" ||
      field === "firstName" ||
      field === "middleName" ||
      field === "designation"
    )
      nextValue = formatNameInput(value);
    if (field === "employeeId") nextValue = formatEmployeeId(value);
    if (field === "contactNo") nextValue = formatContactNo(value);
    if (field === "email") nextValue = formatEmail(value);
    if (field === "username") nextValue = formatUsername(value);
    setForm((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleAccountTypeChange = (value: string) => {
    const isNewAccount = value === "New Account";

    setForm((current) => ({
      ...current,
      accountType: value,
      existingSub: "",
      fromOfficeCode: "",
      toOfficeCode: "",
      employeeId: isNewAccount ? generateEmployeeId() : "",
    }));
    setErrors((current) => ({ ...current, accountType: undefined }));
  };

  const handleExistingSubChange = (value: string) => {
    setForm((current) => ({ ...current, existingSub: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setForm((current) => ({ ...current, userType: value }));
    setErrors((current) => ({ ...current, userType: undefined }));
  };

  const handleLoginModeChange = (value: string) => {
    setForm((current) => ({ ...current, loginMode: value }));
  };

  const handleFileChange = (fileName: string, fileUrl: string) => {
    setForm((current) => ({
      ...current,
      supportingDocumentName: fileName,
      supportingDocumentUrl: fileUrl,
    }));
  };

  const handleFromOfficeCodeChange = (value: string) => {
    setForm((current) => ({ ...current, fromOfficeCode: value }));
  };

  const handleToOfficeCodeChange = (value: string) => {
    setForm((current) => ({ ...current, toOfficeCode: value }));
  };

  const handleModuleToggle = (moduleValue: string) => {
    setForm((current) => {
      const selectedModules = current.selectedModules.includes(moduleValue)
        ? current.selectedModules.filter((item) => item !== moduleValue)
        : [...current.selectedModules, moduleValue];
      return { ...current, selectedModules };
    });
    setErrors((current) => ({ ...current, selectedModules: undefined }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateUAAForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return { success: false, errors: validationErrors };
    }
    setIsSubmitting(true);
    try {
      const result = await submitUAAForm(form);
      if (result.success) {
        setSuccessId(result.trackingId);
        setForm(INITIAL_FORM_STATE);
      }
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableOfficeCodes = useMemo(() => OFFICE_CODES, []);

  return {
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
    moduleGroups: MODULE_GROUPS,
    availableOfficeCodes,
  };
}
