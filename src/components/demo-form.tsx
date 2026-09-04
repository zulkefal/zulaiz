"use client";

import { useState, type FormEvent } from "react";
import { useForm } from "@formspree/react";
import {
  CheckCircleIcon,
  CircleNotchIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  buildPayload,
  validate,
  FORMSPREE_ENDPOINT,
  FORMSPREE_FORM_ID,
  type FieldErrors,
} from "@/lib/formspree";
import { channelOptions, volumeOptions, type ContactInput } from "@/lib/contact";
import { Button } from "@/components/ui";

const FIELD_KEYS = [
  "name",
  "email",
  "company",
  "website",
  "volume",
  "channels",
  "message",
] as const satisfies readonly (keyof ContactInput)[];

const field =
  "w-full rounded-input border border-line-strong bg-raised px-3.5 py-2.5 text-base text-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none";

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-text">
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-accent">
      <WarningCircleIcon weight="fill" aria-hidden className="size-4 shrink-0" />
      {message}
    </p>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto sm:justify-self-start">
      {pending ? (
        <>
          <CircleNotchIcon
            weight="bold"
            aria-hidden
            className="size-4 animate-spin"
          />
          Sending
        </>
      ) : (
        "Book a demo"
      )}
    </Button>
  );
}

export function DemoForm() {
  /* Our pre-flight errors. Formspree's own errors live on state.errors. */
  const [localErrors, setLocalErrors] = useState<FieldErrors>({});
  const [state, submit] = useForm(FORMSPREE_FORM_ID, {
    ...(FORMSPREE_ENDPOINT ? { endpoint: FORMSPREE_ENDPOINT } : {}),
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.submitting) return;

    const form = new FormData(event.currentTarget);
    const result = validate({
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      website: form.get("website") || undefined,
      volume: form.get("volume"),
      channels: form.getAll("channels"),
      message: form.get("message") || undefined,
    });

    if (!result.ok) {
      setLocalErrors(result.fieldErrors);
      return;
    }

    setLocalErrors({});
    await submit(buildPayload(result.data));
  }

  if (state.succeeded) {
    return (
      <div className="accent-wash rounded-card border border-accent-line p-8">
        <CheckCircleIcon weight="duotone" aria-hidden className="size-9 text-accent" />
        <h2 className="mt-4 text-2xl font-semibold">Request received</h2>
        <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted">
          Thanks. We will reply within a few hours with two or three times
          that work, plus the ticket audit questions we like to ask up front.
        </p>
      </div>
    );
  }

  /* Ours first, then anything Formspree rejected on the same field. */
  const err: FieldErrors = { ...localErrors };
  for (const key of FIELD_KEYS) {
    if (!err[key]) {
      const message = state.errors?.getFieldErrors(key)[0]?.message;
      if (message) err[key] = message;
    }
  }

  const formErrors = state.errors?.getFormErrors() ?? [];

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      {formErrors.length ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-input border border-accent-line bg-accent-soft px-4 py-3 text-sm text-text"
        >
          <WarningCircleIcon weight="fill" aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
          {formErrors[0].message} If this keeps happening, email hello@zulaiz.com
          and we will pick it up from there.
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid content-start gap-2">
          <Label htmlFor="name">Your name</Label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "name-error" : undefined}
            className={field}
          />
          <FieldError id="name-error" message={err.name} />
        </div>

        <div className="grid content-start gap-2">
          <Label htmlFor="email">Work email</Label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "email-error" : undefined}
            className={field}
          />
          <FieldError id="email-error" message={err.email} />
        </div>

        <div className="grid content-start gap-2">
          <Label htmlFor="company">Brand name</Label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            required
            aria-invalid={!!err.company}
            aria-describedby={err.company ? "company-error" : undefined}
            className={field}
          />
          <FieldError id="company-error" message={err.company} />
        </div>

        <div className="grid content-start gap-2">
          <Label htmlFor="website">Store URL</Label>
          <input
            id="website"
            name="website"
            autoComplete="url"
            className={field}
          />
          <p className="text-sm text-subtle">Optional, but it speeds up the audit.</p>
        </div>
      </div>

      <div className="grid content-start gap-2">
        <Label htmlFor="volume">Monthly ticket volume</Label>
        <select
          id="volume"
          name="volume"
          defaultValue=""
          required
          aria-invalid={!!err.volume}
          aria-describedby={err.volume ? "volume-error" : undefined}
          className={field}
        >
          <option value="" disabled>
            Choose a range
          </option>
          {volumeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError id="volume-error" message={err.volume} />
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold text-text">
          Channels you want covered
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {channelOptions.map((channel) => (
            <label
              key={channel}
              className="flex cursor-pointer items-center gap-2.5 text-base text-muted"
            >
              <input
                type="checkbox"
                name="channels"
                value={channel}
                className="size-4 accent-[var(--accent)]"
              />
              {channel}
            </label>
          ))}
        </div>
        <FieldError id="channels-error" message={err.channels} />
      </fieldset>

      <div className="grid content-start gap-2">
        <Label htmlFor="message">Anything we should know</Label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${field} resize-y`}
        />
        <p className="text-sm text-subtle">
          Peak season dates, current helpdesk, what is going wrong today.
        </p>
      </div>

      <SubmitButton pending={state.submitting} />
    </form>
  );
}
