import type { ChangeEvent } from "react";

export function formatControlNo(value: string) {
  return value.replace(/[^A-Za-z0-9\-]/g, "").toUpperCase();
}

export function formatNameInput(value: string) {
  return value
    .replace(/[^A-Za-z\s.,\-']/g, "")
    .replace(/\s+/g, " ")
    .trimStart();
}

export function formatEmployeeId(value: string) {
  return value.replace(/[^A-Za-z0-9\-]/g, "").toUpperCase();
}

export function formatContactNo(value: string) {
  const digits = value.replace(/[^0-9]/g, "").slice(0, 11);
  if (digits.length > 7) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length > 4) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return digits;
}

export function formatEmail(value: string) {
  return value.toLowerCase();
}

export function formatUsername(value: string) {
  return value.replace(/[^A-Za-z0-9._-]/g, "").toLowerCase();
}

export function generateEmployeeId() {
  return `LTO${String(Math.floor(10000 + Math.random() * 90000))}`;
}

export function sanitizeInputValue(event: ChangeEvent<HTMLInputElement>) {
  return event.target.value;
}
