"use client"

import { useState } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@metateic/ui"

type FormCopy = {
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

export default function ContactForm({
  copy,
  emailjs: emailjsConfig,
  inverse = false,
}: {
  copy: FormCopy
  emailjs: EmailConfig
  inverse?: boolean
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setStatus("error")
      setMessage(copy.error)
      return
    }

    const phone = form.elements.namedItem("phone") as HTMLInputElement | null
    const originalPhone = phone?.value ?? ""
    if (phone && originalPhone) phone.value = originalPhone.replace(/\D/g, "")

    setStatus("sending")
    setMessage("")

    try {
      await emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, form, {
        publicKey: emailjsConfig.publicKey,
      })
      form.reset()
      setStatus("success")
      setMessage(copy.success)
    } catch (error) {
      if (phone) phone.value = originalPhone
      console.error("EmailJS error:", error)
      setStatus("error")
      setMessage(copy.error)
    }
  }

  const fieldClass = inverse
    ? "w-full rounded-md border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/55 focus:outline-none focus:ring-2 focus:ring-primary"
    : "w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10)
    if (digits.length === 0) return ""
    if (digits.length <= 3) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  return (
    <form onSubmit={handleSubmit} className={`mt-8 max-w-lg space-y-4 text-left ${inverse ? "" : "mx-auto"}`}>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className={fieldClass} name="firstName" placeholder={copy.first_name_placeholder} required />
        <input className={fieldClass} name="lastName" placeholder={copy.last_name_placeholder} required />
      </div>
      <input className={fieldClass} type="email" name="email" placeholder={copy.email_placeholder} required />
      <label className={`flex items-center gap-2 text-sm ${inverse ? "text-white/80" : "text-muted-foreground"}`}>
        <input type="checkbox" name="mailingList" value="yes" />
        {copy.mailing_list_label}
      </label>
      <input
        className={fieldClass}
        type="tel"
        name="phone"
        placeholder={copy.phone_placeholder}
        onChange={(event) => {
          event.target.value = formatPhone(event.target.value)
        }}
      />
      <textarea
        className={fieldClass}
        name="message"
        rows={5}
        placeholder={copy.message_placeholder}
        required
      />
      <div className={inverse ? "" : "text-center"}>
        <Button type="submit" size="md" disabled={status === "sending"}>
          {status === "sending" ? copy.sending : copy.submit}
        </Button>
      </div>
      {message ? (
        <p role="status" className={`text-sm ${inverse ? "text-white/80" : "text-center text-muted-foreground"}`}>
          {message}
        </p>
      ) : null}
    </form>
  )
}
