"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

const faqData: FAQItem[] = [
  {
    questionKey: "general.question",
    answerKey: "general.answer",
  },
  {
    questionKey: "commercial.question",
    answerKey: "commercial.answer",
  },
  {
    questionKey: "aiModels.question",
    answerKey: "aiModels.answer",
  },
  {
    questionKey: "credits.question",
    answerKey: "credits.answer",
  },
  {
    questionKey: "refund.question",
    answerKey: "refund.answer",
  },
  {
    questionKey: "support.question",
    answerKey: "support.answer",
  },
];

export function FAQSection() {
  const t = useTranslations("FAQ");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: t(item.questionKey),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(item.answerKey),
      },
    })),
  };

  return (
    <section className="py-24 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-balance text-3xl font-semibold text-[#0B0F1A] md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-[#0B0F1A]/70 md:text-lg">
              {t("subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mt-10"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.map((item, index) => (
                <AccordionItem
                  key={item.questionKey}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-[#E5E7EB] bg-[#F5F7FB] px-5"
                >
                  <AccordionTrigger className="cursor-pointer py-4 text-left font-medium text-[#0B0F1A] hover:no-underline">
                    <span className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1E2A78]/10 text-xs font-semibold text-[#1E2A78]">
                        {index + 1}
                      </span>
                      <span>{t(item.questionKey)}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-10 leading-relaxed text-[#0B0F1A]/70">
                    {t(item.answerKey)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="mt-8 text-center text-sm text-[#0B0F1A]/65"
          >
            {t("contact")}{" "}
            <a href="mailto:support@videofly.app" className="font-medium text-[#1E2A78] hover:underline">
              support@videofly.app
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
