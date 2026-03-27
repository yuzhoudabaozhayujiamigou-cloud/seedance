import { Suspense } from "react";

import { getCurrentUser } from "@/lib/auth";

import { ModalProvider } from "@/components/modal-provider";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      {/* 全局渐变背景 - 所有营销页面共享 */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-background dark:bg-[#0f1227]" />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30, 42, 120, 0.28), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(30, 42, 120, 0.14), rgba(247, 248, 252, 0.2) 45%, var(--background) 75%)",
          }}
        />
      </div>

      <Suspense fallback={<div className="h-16 border-b" />}>
        <LandingHeader user={user ?? null} />
      </Suspense>

      <ModalProvider>
        <main className="flex-1">{children}</main>
      </ModalProvider>

      <LandingFooter />
    </div>
  );
}
