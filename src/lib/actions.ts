"use server";

import { Resend } from "resend";
import {
  contactSchema,
  type ContactInput,
  type ContactState,
} from "@/lib/contact";
import { site } from "@/lib/site";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );
}

function renderEmail(data: ContactInput) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Brand", data.company],
    ["Website", data.website || "Not given"],
    ["Monthly volume", data.volume],
    ["Channels", data.channels.join(", ")],
    ["Message", data.message || "Not given"],
  ];

  return `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#5a626d;vertical-align:top">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
      )
      .join("")}
  </table>`;
}

export async function submitDemoRequest(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    website: formData.get("website") || undefined,
    volume: formData.get("volume"),
    channels: formData.getAll("channels"),
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Zulaiz site <onboarding@resend.dev>";

  if (!apiKey) {
    // Local development without credentials. The submission is logged, not lost.
    console.warn("[contact] RESEND_API_KEY is not set. Submission was not emailed.");
    console.info("[contact] payload", parsed.data);
    return {
      status: "success",
      message: "Thanks. We will reply within one business day.",
      fieldErrors: {},
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `Demo request: ${parsed.data.company}`,
      html: renderEmail(parsed.data),
    });

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[contact] send failed", error);
    return {
      status: "error",
      message: `Something went wrong on our side. Please email ${site.email} and we will pick it up from there.`,
      fieldErrors: {},
    };
  }

  return {
    status: "success",
    message: "Thanks. We will reply within one business day.",
    fieldErrors: {},
  };
}
