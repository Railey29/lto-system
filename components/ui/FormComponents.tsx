import type { ReactNode } from "react";

interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return <div className="field-error show">{message}</div>;
}

interface InfoNoteProps {
  children: ReactNode;
}

export function InfoNote({ children }: InfoNoteProps) {
  return <div className="info-note">{children}</div>;
}

interface CardProps {
  title?: string;
  sectionLabel?: string;
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="card">
      <div className="card-body">{children}</div>
    </div>
  );
}

interface RadioItemProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  helper?: string;
}

export function RadioItem({
  label,
  name,
  value,
  checked,
  onChange,
  helper,
}: RadioItemProps) {
  return (
    <label className={`radio-item ${checked ? "selected" : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
      {helper ? (
        <small style={{ marginLeft: 4, opacity: 0.8 }}>{helper}</small>
      ) : null}
    </label>
  );
}

interface CheckboxItemProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

export function CheckboxItem({ label, checked, onChange }: CheckboxItemProps) {
  return (
    <label className={`checkbox-item ${checked ? "selected" : ""}`}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="cb-label">{label}</span>
    </label>
  );
}
