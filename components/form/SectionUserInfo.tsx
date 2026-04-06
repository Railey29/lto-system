import type { UAAFormData, UAAFormErrors } from "../../types/uaa";

interface SectionUserInfoProps {
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
              Employee ID <span className="req">*</span>
            </label>
            <input
              type="text"
              id="employee-id"
              value={employeeId}
              onChange={(e) => onChange("employeeId", e.target.value)}
              placeholder="e.g. LTO12345"
            />
            {errors.employeeId ? (
              <div className="field-error show">{errors.employeeId}</div>
            ) : null}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Contact No. <span className="req">*</span>
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
              Email Address <span className="req">*</span>
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
