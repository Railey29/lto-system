import type { UAAFormData } from "../types/uaa";

export async function submitUAAForm(form: UAAFormData) {
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Submission failed.");
  }

  return await response.json();
}
