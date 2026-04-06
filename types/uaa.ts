export interface UAAFormData {
  controlNo: string;
  effectiveDate: string;
  officeCode: string;
  accountType: string;
  existingSub: string;
  fromOfficeCode: string;
  toOfficeCode: string;
  userType: string;
  loginMode: string;
  lastName: string;
  firstName: string;
  middleName: string;
  designation: string;
  employeeId: string;
  contactNo: string;
  email: string;
  selectedModules: string[];
  othersText: string;
}

export interface UAAFormErrors {
  controlNo?: string;
  effectiveDate?: string;
  officeCode?: string;
  accountType?: string;
  userType?: string;
  lastName?: string;
  firstName?: string;
  designation?: string;
  employeeId?: string;
  contactNo?: string;
  email?: string;
  selectedModules?: string;
  othersText?: string;
}

export interface ModuleOption {
  value: string;
  label: string;
  chiefOnly?: boolean;
}

export interface ModuleGroup {
  title: string;
  options: ModuleOption[];
}
