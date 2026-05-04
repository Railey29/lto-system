import type { UAAFormData, UAAFormErrors } from "../../types/uaa";

interface SectionUserInfoProps {
  username: string;
  accountType: string;
  lastName: string;
  firstName: string;
  middleName: string;
  designation: string;
  employeeId: string;
  contactNo: string;
  email: string;
  errors: UAAFormErrors;
  onChange: (field: keyof UAAFormData, value: string) => void;
}

export function SectionUserInfo({
  username,
  accountType,
  lastName,
  firstName,
  middleName,
  designation,
  employeeId,
  contactNo,
  email,
  errors,
  onChange,
}: SectionUserInfoProps) {
  const isNewAccount = accountType === "New Account";
  const employeeIdOptional = !isNewAccount;
  const contactOptional = accountType !== "New Account";

  return (
    <div className="card" id="sec2">
      <div className="card-header">
        <span className="sec-num">II</span>
        <h2>User Information</h2>
      </div>
      <div className="card-body">
        <div className="form-row">
          <div className="form-group">
            <label>
              Username <span className="req">*</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => onChange("username", e.target.value)}
              placeholder="Existing or requested username"
            />
            {errors.username ? (
              <div className="field-error show">{errors.username}</div>
            ) : null}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Last Name <span className="req">*</span>
            </label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              placeholder="e.g. Dela Cruz"
            />
            {errors.lastName ? (
              <div className="field-error show">{errors.lastName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>
              First Name <span className="req">*</span>
            </label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              placeholder="e.g. Juan"
            />
            {errors.firstName ? (
              <div className="field-error show">{errors.firstName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input
              type="text"
              id="middle-name"
              value={middleName}
              onChange={(e) => onChange("middleName", e.target.value)}
              placeholder="e.g. Santos"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Designation <span className="req">*</span>
            </label>
            <input
              type="text"
              id="designation"
              value={designation}
              onChange={(e) => onChange("designation", e.target.value)}
              placeholder="e.g. Chief, OIC, Officer"
            />
            {errors.designation ? (
              <div className="field-error show">{errors.designation}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>
              Employee ID{" "}
              {employeeIdOptional ? (
                "(Optional)"
              ) : (
                <span className="req">*</span>
              )}
            </label>
            <input
              type="text"
              id="employee-id"
              value={employeeId}
              onChange={(e) => onChange("employeeId", e.target.value)}
              placeholder={
                isNewAccount ? "Auto-generated for new users" : "e.g. LTO12345"
              }
              readOnly={isNewAccount}
            />
            {isNewAccount ? (
              <div className="field-note">
                Generated automatically for new users.
              </div>
            ) : null}
            {errors.employeeId ? (
              <div className="field-error show">{errors.employeeId}</div>
            ) : null}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Contact No.{" "}
              {contactOptional ? "(Optional)" : <span className="req">*</span>}
            </label>
            <input
              type="tel"
              id="contact-no"
              value={contactNo}
              onChange={(e) => onChange("contactNo", e.target.value)}
              placeholder="e.g. 0917-123-4567"
            />
            {errors.contactNo ? (
              <div className="field-error show">{errors.contactNo}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>
              Email Address{" "}
              {contactOptional ? "(Optional)" : <span className="req">*</span>}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="e.g. juan@lto.gov.ph"
            />
            {errors.email ? (
              <div className="field-error show">{errors.email}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
