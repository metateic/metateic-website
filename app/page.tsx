import {
  Band,
  BrandHero,
  Button,
  ContactIntro,
  Copy,
  LabeledCopy,
  LinkCards,
  MediaGrid,
  PrincipleCards,
  ScrollProgress,
  SectionHeading,
  ServiceList,
  SiteFooter,
  SiteHeader,
  SplitPanel,
  ThemeToggle,
  Timeline,
} from "@metateic/ui"
import ContactForm from "./components/ContactForm"
import { emailjs, strings } from "@/lib/strings"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader
        wordmark={strings.site.name}
        logo={{ src: "/metateic-logo-horizontal.png", alt: strings.site.name, className: "brand-logo" }}
        links={strings.nav}
        cta={{ label: strings.contactLabel, href: "#contact" }}
        extra={<ThemeToggle />}
        mobileNav
        navAt="lg"
      />
      <main id="main" className="flex-1">
        <BrandHero
          logoSrc="/metateic-logo.png"
          headline={strings.hero.headline}
          accent={strings.hero.accent}
          supporting={strings.hero.supporting}
          primary={{ label: strings.hero.primary_cta, href: strings.hero.primary_href }}
          secondary={{ label: strings.hero.secondary_cta, href: strings.hero.secondary_href }}
        />

        <LabeledCopy label={strings.intro.label}>
          <Copy lead={strings.intro.content} support={strings.intro.support} emphasis={strings.site.name} />
        </LabeledCopy>

        <LabeledCopy id="about" label={strings.about.label} continued>
          <Copy lead={strings.about.content} />
          <PrincipleCards
            items={strings.about.principles.map((item) => ({ title: item.title, body: item.text }))}
          />
        </LabeledCopy>

        <Band id="services" tone="muted">
          <SectionHeading title={strings.services.heading} lede={strings.services.intro} />
          <ServiceList
            items={strings.services.items.map((item) => ({
              title: item.title,
              body: item.summary,
              image: item.image,
              points: item.points,
            }))}
          />
        </Band>

        <Band id="approach" tone="navy">
          <SectionHeading inverse title={strings.approach.heading} lede={strings.approach.lede} />
          <Timeline items={strings.approach.steps} tone="inverse" />
        </Band>

        <Band id="capabilities">
          <SectionHeading title={strings.capabilities.heading} lede={strings.capabilities.lede} />
          <MediaGrid items={strings.capabilities.items} />
        </Band>

        <Band id="insights" className="border-t border-border">
          <SplitPanel image={{ src: strings.insights.image, width: 682, height: 1024 }}>
            <SectionHeading title={strings.insights.heading_lead} lede={strings.insights.heading_rest} />
            <Button href={strings.insights.blog_url} size="md" className="mt-6 w-fit transition hover:-translate-y-0.5">
              {strings.insights.button}
            </Button>
          </SplitPanel>
          <div className="mt-12">
            <LinkCards
              items={strings.insights.posts.map((post) => ({
                href: post.url,
                eyebrow: post.date,
                title: post.title,
                body: post.excerpt,
              }))}
            />
          </div>
        </Band>

        <Band id="contact">
          <SplitPanel
            tone="navy"
            imageSide="end"
            image={{ src: strings.contact.image, width: 682, height: 1024 }}
          >
            <ContactIntro heading={strings.contact.heading} intro={strings.contact.intro} people={strings.contact.people}>
              <ContactForm copy={strings.contact.form} emailjs={emailjs} inverse />
            </ContactIntro>
          </SplitPanel>
        </Band>
      </main>
      <SiteFooter
        wordmark={strings.site.name}
        meta={"Copyright " + new Date().getFullYear() + " " + strings.footer.legal_name}
      />
    </>
  )
}
