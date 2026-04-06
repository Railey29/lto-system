import type { UAAFormData } from "../types/uaa";

export const INITIAL_FORM_STATE: UAAFormData = {
  controlNo: "",
  effectiveDate: new Date().toISOString().slice(0, 10),
  officeCode: "",
  accountType: "",
  existingSub: "",
  fromOfficeCode: "",
  toOfficeCode: "",
  userType: "",
  loginMode: "",
  lastName: "",
  firstName: "",
  middleName: "",
  designation: "",
  employeeId: "",
  contactNo: "",
  email: "",
  selectedModules: [],
  othersText: "",
};
