"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  CheckCircleIcon,
  CircleNotchIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { submitDemoRequest } from "@/lib/actions";
import {
  channelOptions,
  initialContactState,
  volumeOptions,
  type ContactState,
} from "@/lib/contact";
import { Button } from "@/components/ui";

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

function SubmitButton() {
  const { pending } = useFormStatus();
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
  const [state, action] = useActionState<ContactState, FormData>(
    submitDemoRequest,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div className="accent-wash rounded-card border border-accent-line p-8">
        <CheckCircleIcon weight="duotone" aria-hidden className="size-9 text-accent" />
        <h2 className="mt-4 text-2xl font-semibold">Request received</h2>
        <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted">
          {state.message} You will get a short note back with two or three times
          that work, plus the ticket audit questions we like to ask up front.
        </p>
      </div>
    );
  }

  const err = state.fieldErrors;

  return (
    <form action={action} noValidate className="grid gap-6">
      {state.status === "error" && !Object.keys(err).length ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-input border border-accent-line bg-accent-soft px-4 py-3 text-sm text-text"
        >
          <WarningCircleIcon weight="fill" aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
          {state.message}
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

      <SubmitButton />
    </form>
  );
}
