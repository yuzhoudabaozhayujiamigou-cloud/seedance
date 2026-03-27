"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";

const testimonials = [
  {
    name: "Emma R.",
    role: "Shopify Beauty Store Owner",
    quote:
      "We replaced freelance ad editing with Seedance 2.0 workflows. Our weekly creative output jumped from 4 videos to 22.",
  },
  {
    name: "Derek M.",
    role: "Amazon FBA Seller",
    quote:
      "The Amazon listing templates are exactly what we needed. We can launch product videos the same day we receive new inventory photos.",
  },
  {
    name: "Lina P.",
    role: "Etsy Handmade Brand",
    quote:
      "Before/after and demo styles helped us test angles quickly. We saw a lower cost per purchase within the first two weeks.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <BlurFade inView>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">Trusted by Ecommerce Teams</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real feedback from sellers using AI product video workflows in production.
            </p>
          </div>
        </BlurFade>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <BlurFade key={item.name} delay={index * 0.08} inView>
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-white/65 bg-white/72 p-6 backdrop-blur-md shadow-[0_10px_30px_rgba(30,42,120,0.08)]"
              >
                <div className="mb-4 flex items-center gap-1 text-[#FF6A00]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">“{item.quote}”</p>
                <div className="mt-5 border-t border-primary/10 pt-4">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </motion.article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
