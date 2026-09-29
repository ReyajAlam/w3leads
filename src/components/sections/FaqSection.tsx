import { Container } from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';
import { FAQ_CONTENT } from '@/content/landingContent';
import { getFaqJsonLd } from '@/lib/seo/jsonLd';

/** FAQ section with accessible accordion and FAQ JSON-LD */
export function FaqSection() {
  const accordionItems = FAQ_CONTENT.map((faq, i) => ({
    id: `faq-${i}`,
    trigger: faq.question,
    content: faq.answer,
  }));

  /** FAQ Schema.org JSON-LD */
  const faqJsonLd = getFaqJsonLd(FAQ_CONTENT);

  return (
    <section
      className="py-20 lg:py-28"
      aria-labelledby="faq-heading"
    >
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="font-heading text-ink mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-ink-muted text-lg">
              Everything you need to know about W3Leads. Can&apos;t find what you&apos;re looking for?{' '}
              <a href="#" className="text-primary underline underline-offset-2 hover:text-primary-hover">
                Contact our team
              </a>.
            </p>
          </div>

          <Accordion items={accordionItems} />
        </div>
      </Container>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
