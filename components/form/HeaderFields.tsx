import type { UAAFormData, UAAFormErrors } from "../../types/uaa";

interface HeaderFieldsProps {
  controlNo: string;
  effectiveDate: string;
  officeCode: string;
  officeCodeOptions: string[];
  errors: UAAFormErrors;
  onChange: (field: keyof UAAFormData, value: string) => void;
}

export function HeaderFields({
  controlNo,
  effectiveDate,
  officeCode,
  officeCodeOptions,
  errors,
  onChange,
}: HeaderFieldsProps) {
  return (
    <div className="card">
      <div className="card-body" style={{ padding: "20px 24px" }}>
        <div className="form-row" style={{ marginBottom: 0 }}>
          <div className="form-group">
            <label>
              LTO-MID Control No. <span className="req">*</span>
            </label>
            <input
              type="text"
              id="control-no"
              value={controlNo}
              onChange={(e) => onChange("controlNo", e.target.value)}
              placeholder="e.g. MID-2026-0001"
            />
            {errors.controlNo ? (
              <div className="field-error show">{errors.controlNo}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>
              Effective Date <span className="req">*</span>
            </label>
            <input
              type="date"
              id="effective-date"
              value={effectiveDate}
              onChange={(e) => onChange("effectiveDate", e.target.value)}
              className="date-input"
            />
            {errors.effectiveDate ? (
              <div className="field-error show">{errors.effectiveDate}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>
              Office Code <span className="req">*</span>
            </label>
            <input
              list="business-offices"
              id="office-code-input"
              className="oc-styled-input"
              value={officeCode}
              onChange={(e) => onChange("officeCode", e.target.value)}
              placeholder="Select or type office code"
            />
            <datalist id="business-offices">
              {officeCodeOptions.map((code) => (
                <option key={code} value={code} />
              ))}
            </datalist>
            {errors.officeCode ? (
              <div className="field-error show">{errors.officeCode}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
