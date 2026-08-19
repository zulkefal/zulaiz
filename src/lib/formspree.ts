import { contactSchema, type ContactInput } from "@/lib/contact";

/*
  Formspree is the form backend, submitted from the browser via
  @formspree/react. Going through the library rather than a raw fetch matters:
  it carries Formspree's spam and reCAPTCHA tokens, which a hand-rolled POST
  does not. Form IDs are public by design, so the override is NEXT_PUBLIC_.
*/
export const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "xoeaporq";

/* Only set in tests, to point submissions at a local stub. */
export const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

/* Flat and string-valued, which is what Formspree stores and emails. */
export function buildPayload(data: ContactInput) {
  return {
    name: data.name,
    email: data.email,
    company: data.company,
    website: data.website || "Not given",
    // Joined rather than repeated so the notification email reads cleanly.
    channels: data.channels.join(", "),
    volume: data.volume,
    message: data.message || "Not given",
    _subject: `Demo request: ${data.company}`,
  };
}

/*
  Our own rules run before the request goes out, so the copy in the errors is
  ours and a bad submission never leaves the browser. Formspree validates again
  server-side and those errors are merged in by the form component.
*/
export function validate(
  raw: unknown,
): { ok: true; data: ContactInput } | { ok: false; fieldErrors: FieldErrors } {
  const parsed = contactSchema.safeParse(raw);
  if (parsed.success) return { ok: true, data: parsed.data };

  const fieldErrors: FieldErrors = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof ContactInput;
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { ok: false, fieldErrors };
}
