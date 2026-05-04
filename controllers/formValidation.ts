import type { UAAFormData, UAAFormErrors } from "../types/uaa";

export function validateUAAForm(form: UAAFormData): UAAFormErrors {
  const errors: UAAFormErrors = {};

  if (!form.officeCode.trim()) {
    errors.officeCode = "Office code is required.";
  }

  if (!form.effectiveDate.trim()) {
    errors.effectiveDate = "Effective date is required.";
  }

  if (!form.accountType.trim()) {
    errors.accountType = "Please select an account action.";
  }

  if (
    form.accountType === "Existing Account" &&
    !form.existingSub.trim()
  ) {
    errors.existingSub = "Please select the existing-account change.";
  }

  if (form.accountType === "Change Office Code") {
    if (!form.fromOfficeCode.trim()) {
      errors.fromOfficeCode = "Current office code is required.";
    }
    if (!form.toOfficeCode.trim()) {
      errors.toOfficeCode = "New office code is required.";
    }
  }

  if (!form.username.trim()) {
    errors.username = "Username is required.";
  }

  if (!form.userType.trim()) {
    errors.userType = "Please select a user type.";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!form.designation.trim()) {
    errors.designation = "Designation is required.";
  }

  const employeeIdOptional = form.accountType !== "New Account";
  if (!employeeIdOptional && !form.employeeId.trim()) {
    errors.employeeId = "Employee ID is required.";
  }

  const contactOptional = form.accountType !== "New Account";
  if (!contactOptional && !form.contactNo.trim()) {
    errors.contactNo = "Contact number is required.";
  }

  if (
    !contactOptional &&
    (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
  ) {
    errors.email = "A valid email is required.";
  }

  if (
    contactOptional &&
    form.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    errors.email = "Enter a valid email, or leave it blank.";
  }

  const hasModule =
    form.selectedModules.length > 0 || form.othersText.trim().length > 0;
  if (!hasModule) {
    errors.selectedModules = "Please select at least one module.";
  }

  if (
    form.selectedModules.includes("Other Access Request") &&
    !form.othersText.trim()
  ) {
    errors.othersText = "Please describe the requested other access.";
  }

  return errors;
}
