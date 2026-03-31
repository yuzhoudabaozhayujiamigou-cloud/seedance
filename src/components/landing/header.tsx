"use client";

import { useEffect, useState, useTransition } from "react";
import { Gem, Globe, Menu } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { useSigninModal } from "@/hooks/use-signin-modal";
import { LocaleLink } from "@/i18n/navigation";
import { authClient } from "@/lib/auth/client";
import type { User } from "@/lib/auth/client";
import { useCredits } from "@/stores/credits-store";
import { cn } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { id: "generate", href: "/#generator" },
  { id: "templates", href: "/templates" },
  { id: "examples", href: "/examples" },
  { id: "pricing", href: "/pricing" },
  { id: "api", href: "/api-access" },
] as const;

export function LandingHeader({ user }: { user?: User | null }) {
  const signInModal = useSigninModal();
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [scrolled, setScrolled] = useState(false);

  const isHomePath = pathname === "/" || pathname === `/${locale}`;
  const hasSolidBackground = !isHomePath || scrolled;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push(`/${locale}`);
    router.refresh();
  };

  useEffect(() => {
    if (!isHomePath) {
      setScrolled(true);
      return;
    }

    let ticking = false;

    const update = () => {
      const nextScrolled = window.scrollY > 16;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePath]);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      let newPath = pathname;

      if (newPath.startsWith("/zh") || newPath.startsWith("/en")) {
        newPath = newPath.replace(/^\/(zh|en)/, "");
      }

      if (newPath === "") {
        newPath = "/";
      }

      if (newLocale === "zh") {
        if (newPath === "/") {
          newPath = "/zh";
        } else if (!newPath.startsWith("/zh")) {
          newPath = `/zh${newPath}`;
        }
      }

      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        hasSolidBackground
          ? "border-b border-[#E5E7EB] bg-[rgba(245,247,251,0.90)] backdrop-blur-md shadow-[0_10px_40px_rgba(11,15,26,0.06)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="hidden h-16 items-center justify-between lg:flex">
          <LocaleLink href="/" className="flex items-center gap-2 text-lg font-semibold text-[#0B0F1A]">
            <Image src="/logo.svg" alt="Seedance" width={26} height={26} className="rounded-md" />
            Seedance
          </LocaleLink>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <LocaleLink
                key={item.id}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#0B0F1A]/75 transition-colors hover:bg-white/75 hover:text-[#0B0F1A]"
              >
                {t(`Header.${item.id}`)}
              </LocaleLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-full px-2 py-1 text-sm text-[#0B0F1A]/70 transition-colors hover:text-[#0B0F1A]"
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{locale.toUpperCase()}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[120px] border-[#E5E7EB] bg-[#F5F7FB] text-[#0B0F1A] shadow-xl"
              >
                <DropdownMenuItem onClick={() => switchLocale("en")} className="cursor-pointer">
                  {locale === "zh" ? "English" : "英文"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("zh")} className="cursor-pointer">
                  中文
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user && (
              <div className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white/90 px-3 py-1.5 text-[#0B0F1A]">
                <Gem className="h-4 w-4 text-[#FF6A00]" />
                <CreditsDisplay />
              </div>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E2A78]/10">
                      <span className="text-sm font-medium text-[#1E2A78]">
                        {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border-[#E5E7EB] bg-[#F5F7FB] text-[#0B0F1A] shadow-xl"
                >
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <LocaleLink href="/my-creations">{t("Header.myCreations")}</LocaleLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <LocaleLink href="/credits">{t("Header.credits")}</LocaleLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <LocaleLink href="/settings">{t("Header.settings")}</LocaleLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#E5E7EB]" />
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleSignOut}>
                    {t("Common.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={signInModal.onOpen}
                disabled={isPending}
                className="rounded-full bg-[#1E2A78] text-white hover:bg-[#19235F]"
              >
                {t("Common.login")}
              </Button>
            )}
          </div>
        </nav>

        <div className="flex h-16 items-center justify-between lg:hidden">
          <LocaleLink href="/" className="flex items-center gap-2 text-base font-semibold text-[#0B0F1A]">
            <Image src="/logo.svg" alt="Seedance" width={26} height={26} className="rounded-md" />
            Seedance
          </LocaleLink>

          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white/90 px-2 py-1 text-xs">
                <Gem className="h-3 w-3 text-[#FF6A00]" />
                <CreditsDisplay />
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-[#0B0F1A]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto border-l-[#E5E7EB] bg-[#F5F7FB]">
                <SheetHeader>
                  <SheetTitle>
                    <LocaleLink href="/" className="flex items-center gap-2 text-[#0B0F1A]">
                      <Image src="/logo.svg" alt="Seedance" width={26} height={26} className="rounded-md" />
                      Seedance
                    </LocaleLink>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <LocaleLink
                      key={item.id}
                      href={item.href}
                      className="rounded-lg px-3 py-2 font-medium text-[#0B0F1A]/80 transition-colors hover:bg-white hover:text-[#0B0F1A]"
                    >
                      {t(`Header.${item.id}`)}
                    </LocaleLink>
                  ))}

                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 py-2">
                    <Globe className="h-4 w-4 text-[#0B0F1A]/70" />
                    <button type="button" onClick={() => switchLocale("en")} className="text-sm text-[#0B0F1A]">
                      {locale === "zh" ? "English" : "英文"}
                    </button>
                    <span className="text-[#0B0F1A]/40">/</span>
                    <button type="button" onClick={() => switchLocale("zh")} className="text-sm text-[#0B0F1A]">
                      中文
                    </button>
                  </div>
                </div>

                <div className="mt-4 border-t border-[#E5E7EB] pt-4">
                  {user ? (
                    <div className="flex flex-col gap-2">
                      <LocaleLink
                        href="/my-creations"
                        className="rounded-lg px-3 py-2 text-[#0B0F1A]/80 transition-colors hover:bg-white hover:text-[#0B0F1A]"
                      >
                        {t("Header.myCreations")}
                      </LocaleLink>
                      <LocaleLink
                        href="/credits"
                        className="rounded-lg px-3 py-2 text-[#0B0F1A]/80 transition-colors hover:bg-white hover:text-[#0B0F1A]"
                      >
                        {t("Header.credits")}
                      </LocaleLink>
                      <LocaleLink
                        href="/settings"
                        className="rounded-lg px-3 py-2 text-[#0B0F1A]/80 transition-colors hover:bg-white hover:text-[#0B0F1A]"
                      >
                        {t("Header.settings")}
                      </LocaleLink>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="rounded-lg px-3 py-2 text-left text-red-600 transition-colors hover:bg-red-50"
                      >
                        {t("Common.logout")}
                      </button>
                    </div>
                  ) : (
                    <Button
                      onClick={signInModal.onOpen}
                      disabled={isPending}
                      className="w-full rounded-full bg-[#1E2A78] text-white hover:bg-[#19235F]"
                    >
                      {t("Common.login")}
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function CreditsDisplay() {
  const { balance } = useCredits();
  return <span>{balance?.availableCredits ?? 0}</span>;
}
