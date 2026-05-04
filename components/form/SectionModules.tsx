import type { ModuleGroup, UAAFormData, UAAFormErrors } from "../../types/uaa";
import { CheckboxItem } from "../ui/FormComponents";

interface SectionModulesProps {
  moduleGroups: ModuleGroup[];
  selectedModules: string[];
  othersText: string;
  errors: UAAFormErrors;
  onToggleModule: (moduleValue: string) => void;
  onChangeText: (field: keyof UAAFormData, value: string) => void;
}

export function SectionModules({
  moduleGroups,
  selectedModules,
  othersText,
  errors,
  onToggleModule,
  onChangeText,
}: SectionModulesProps) {
  const showOtherText = selectedModules.includes("Others. Please specify");

  return (
    <div className="card" id="sec3">
      <div className="card-header">
        <span className="sec-num">III</span>
        <h2>Modules</h2>
      </div>
      <div className="card-body">
        <div className="info-note">
          <span className="icon">⚠️</span>
          <span>
            Select at least one module. Items marked require Chief or OIC
            designation.
          </span>
        </div>
        {errors.selectedModules ? (
          <div className="field-error show" style={{ marginBottom: 12 }}>
            {errors.selectedModules}
          </div>
        ) : null}
        {moduleGroups.map((group) => (
          <div className="module-group" key={group.title}>
            <div className="module-group-title">{group.title}</div>
            <div className="checkbox-grid">
              {group.options.map((option) => (
                <CheckboxItem
                  key={option.value}
                  label={
                    option.chiefOnly
                      ? `${option.label} (Chief/OIC Only)`
                      : option.label
                  }
                  value={option.value}
                  checked={selectedModules.includes(option.value)}
                  onChange={() => onToggleModule(option.value)}
                />
              ))}
            </div>
          </div>
        ))}
        {showOtherText && (
          <div className="form-group" style={{ marginTop: 12 }}>
            <label>Please specify the other access or position</label>
            <input
              type="text"
              id="others-text"
              value={othersText}
              onChange={(e) => onChangeText("othersText", e.target.value)}
              placeholder="Please specify the requested access or position"
            />
            {errors.othersText ? (
              <div className="field-error show">{errors.othersText}</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
