import { RadioItem } from "../ui/FormComponents";
import type { UAAFormErrors } from "../../types/uaa";

interface SectionSystemAccessProps {
  accountType: string;
  existingSub: string;
  userType: string;
  loginMode: string;
  fromOfficeCode: string;
  toOfficeCode: string;
  errors: UAAFormErrors;
  onAccountTypeChange: (value: string) => void;
  onExistingSubChange: (value: string) => void;
  onUserTypeChange: (value: string) => void;
  onLoginModeChange: (value: string) => void;
  onFromOfficeCodeChange: (value: string) => void;
  onToOfficeCodeChange: (value: string) => void;
}

const accountOptions = [
  "New Account",
  "Existing Account",
  "Change Office Code",
];
const existingOptions = ["Change Role", "Remove Role", "Update Details"];
const userTypeOptions = ["LTO Employee", "OGA", "Stakeholder"];
const loginModeOptions = ["Password", "Fingerprint", "Facial Recognition"];

export function SectionSystemAccess({
  accountType,
  existingSub,
  userType,
  loginMode,
  fromOfficeCode,
  toOfficeCode,
  errors,
  onAccountTypeChange,
  onExistingSubChange,
  onUserTypeChange,
  onLoginModeChange,
  onFromOfficeCodeChange,
  onToOfficeCodeChange,
}: SectionSystemAccessProps) {
  return (
    <div className="card" id="sec1">
      <div className="card-header">
        <span className="sec-num">I</span>
        <h2>System Access Functions</h2>
      </div>
      <div className="card-body">
        <div className="info-note">
          <span className="icon">ℹ️</span>
          <span>
            Select the type of account action and your user type. Fields marked{" "}
            <span style={{ color: "var(--accent)" }}>*</span> are required.
          </span>
        </div>
        <div className="access-grid">
          <div className="access-col">
            <h4>
              Account Action <span style={{ color: "var(--accent)" }}>*</span>
            </h4>
            <div className="radio-group">
              {accountOptions.map((option) => (
                <RadioItem
                  key={option}
                  label={option}
                  name="account_type"
                  value={option}
                  checked={accountType === option}
                  onChange={() => onAccountTypeChange(option)}
                />
              ))}
            </div>
            {errors.accountType ? (
              <div className="field-error show">{errors.accountType}</div>
            ) : null}

            {accountType === "Existing Account" && (
              <div className="conditional show" id="existing-sub">
                <div className="radio-group">
                  {existingOptions.map((option) => (
                    <RadioItem
                      key={option}
                      label={option}
                      name="existing_sub"
                      value={option}
                      checked={existingSub === option}
                      onChange={() => onExistingSubChange(option)}
                    />
                  ))}
                </div>
                {errors.existingSub ? (
                  <div className="field-error show">{errors.existingSub}</div>
                ) : null}
              </div>
            )}

            {accountType === "Change Office Code" && (
              <div className="conditional show" id="office-code-sub">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      From <span style={{ color: "var(--accent)" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Current office code"
                      value={fromOfficeCode}
                      onChange={(e) => onFromOfficeCodeChange(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        fontSize: "0.85rem",
                      }}
                    />
                    {errors.fromOfficeCode ? (
                      <div className="field-error show">
                        {errors.fromOfficeCode}
                      </div>
                    ) : null}
                  </div>
                  <span
                    style={{ marginTop: 20, fontWeight: 700, color: "#555" }}
                  >
                    →
                  </span>
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      To <span style={{ color: "var(--accent)" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="New office code"
                      value={toOfficeCode}
                      onChange={(e) => onToOfficeCodeChange(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        fontSize: "0.85rem",
                      }}
                    />
                    {errors.toOfficeCode ? (
                      <div className="field-error show">
                        {errors.toOfficeCode}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="access-col">
            <h4>
              User Type <span style={{ color: "var(--accent)" }}>*</span>
            </h4>
            <div
              className="radio-group"
              style={{ flexDirection: "column", gap: 8 }}
            >
              {userTypeOptions.map((option) => (
                <RadioItem
                  key={option}
                  label={option}
                  name="user_type"
                  value={option}
                  checked={userType === option}
                  onChange={() => onUserTypeChange(option)}
                />
              ))}
            </div>
            {errors.userType ? (
              <div className="field-error show">{errors.userType}</div>
            ) : null}
            <hr className="divider" style={{ marginTop: 18 }} />
            <h4 style={{ marginBottom: 10 }}>
              Login Mode Change{" "}
              <span
                style={{
                  fontWeight: 400,
                  textTransform: "none",
                  fontSize: "0.75rem",
                }}
              >
                (optional)
              </span>
            </h4>
            <div className="radio-group">
              {loginModeOptions.map((option) => (
                <RadioItem
                  key={option}
                  label={option}
                  name="login_mode"
                  value={option}
                  checked={loginMode === option}
                  onChange={() => onLoginModeChange(option)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
