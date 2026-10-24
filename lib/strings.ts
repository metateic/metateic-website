import fs from "node:fs"
import path from "node:path"
import { parse } from "yaml"

type RawStrings = {
  site: { title: string; description: string; company_name: string }
  nav: {
    about: string
    services: string
    approach: string
    capabilities: string
    insights: string
    contact: string
  }
  hero: {
    headline: string
    accent: string
    supporting: string
    primary_cta: string
    primary_href: string
    secondary_cta: string
    secondary_href: string
  }
  intro: { label: string; content: string; support: string }
  about: {
    label: string
    content: string
    principles: { title: string; text: string }[]
  }
  services: {
    heading: string
    intro: string
    items: { title: string; summary: string; image: string; points: string[] }[]
  }
  approach: {
    heading: string
    intro: string
    steps: { title: string; text: string }[]
  }
  capabilities: {
    heading: string
    lede: string
    fullstack: { title: string; description: string; image: string }
    agile: { title: string; description: string; image: string }
    scalable: { title: string; description: string; image: string }
  }
  insights: {
    heading_lead: string
    heading_rest: string
    button: string
    blog_url: string
    image: string
    posts: { title: string; date: string; excerpt: string; url: string }[]
  }
  contact: {
    heading: string
    intro: string
    image: string
    people: { name: string; email: string }[]
    form: {
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
  }
  footer: { legal_name: string }
}

const file = fs.readFileSync(path.join(process.cwd(), "content/strings.yml"), "utf8")
const raw = parse(file) as RawStrings

export const strings = {
  site: {
    name: raw.site.company_name,
    title: raw.site.title,
    description: raw.site.description,
  },
  nav: [
    { label: raw.nav.about, href: "#about" },
    { label: raw.nav.services, href: "#services" },
    { label: raw.nav.approach, href: "#approach" },
    { label: raw.nav.capabilities, href: "#capabilities" },
    { label: raw.nav.insights, href: "#insights" },
  ],
  contactLabel: raw.nav.contact,
  hero: raw.hero,
  intro: raw.intro,
  about: raw.about,
  services: raw.services,
  approach: {
    heading: raw.approach.heading,
    lede: raw.approach.intro,
    steps: raw.approach.steps.map((step, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title: step.title,
      body: step.text,
    })),
  },
  capabilities: {
    heading: raw.capabilities.heading,
    lede: raw.capabilities.lede,
    items: [raw.capabilities.fullstack, raw.capabilities.agile, raw.capabilities.scalable].map((item) => ({
      title: item.title,
      body: item.description,
      image: item.image,
    })),
  },
  insights: raw.insights,
  contact: raw.contact,
  footer: raw.footer,
}

export const emailjs = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
}
