"use client"

import emailjs from "@emailjs/browser"
import { Button, CheckboxField, FormStatus, TextAreaField, TextField, useSubmit } from "@metateic/ui"

type FormCopy = {
  name_label: string
  email_label: string
  phone_label: string
  message_label: string
  optional: string
  first_name_placeholder: string
  last_name_placeholder: string
  email_placeholder: string
  phone_placeholder: string
  message_placeholder: string
  mailing_list_label: string
  submit: string
  sending: string
  success: string
  error: string
}

type EmailConfig = {
  serviceId: string
  templateId: string
  publicKey: string
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export default function ContactForm({
  copy,
  emailjs: config,
  inverse = false,
}: {
  copy: FormCopy
  emailjs: EmailConfig
  inverse?: boolean
}) {
  const tone = inverse ? "inverse" : "default"

  const { status, onSubmit } = useSubmit(async (form) => {
    if (!config.serviceId || !config.templateId || !config.publicKey) {
      throw new Error("EmailJS keys are not configured")
    }

    // The template expects digits only; restore the formatted value if the send fails.
    const phone = form.elements.namedItem("phone") as HTMLInputElement | null
    const typed = phone?.value ?? ""
    if (phone && typed) phone.value = typed.replace(/\D/g, "")

    try {
      await emailjs.sendForm(config.serviceId, config.templateId, form, { publicKey: config.publicKey })
    } catch (error) {
      if (phone) phone.value = typed
      throw error
    }
  })

  return (
    <form onSubmit={onSubmit} className={`mt-8 max-w-lg space-y-4 text-left ${inverse ? "" : "mx-auto"}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          tone={tone}
          label={copy.first_name_placeholder}
          name="firstName"
          autoComplete="given-name"
          required
        />
        <TextField
          tone={tone}
          label={copy.last_name_placeholder}
          name="lastName"
          autoComplete="family-name"
          required
        />
      </div>
      <TextField
        tone={tone}
        label={copy.email_label}
        type="email"
        name="email"
        autoComplete="email"
        placeholder={copy.email_placeholder}
        required
      />
      <TextField
        tone={tone}
        label={copy.phone_label}
        optional={copy.optional}
        type="tel"
        name="phone"
        autoComplete="tel"
        placeholder={copy.phone_placeholder}
        onChange={(event) => {
          event.target.value = formatPhone(event.target.value)
        }}
      />
      <TextAreaField
        tone={tone}
        label={copy.message_label}
        name="message"
        placeholder={copy.message_placeholder}
        required
      />
      <CheckboxField tone={tone} label={copy.mailing_list_label} name="mailingList" value="yes" />
      <div className={inverse ? "" : "text-center"}>
        <Button type="submit" size="md" disabled={status === "sending"}>
          {status === "sending" ? copy.sending : copy.submit}
        </Button>
      </div>
      <FormStatus
        status={status}
        success={copy.success}
        error={copy.error}
        tone={tone}
        className={inverse ? "" : "text-center"}
      />
    </form>
  )
}
