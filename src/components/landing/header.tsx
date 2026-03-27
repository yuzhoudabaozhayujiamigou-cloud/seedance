"use client";

import { useEffect, useState, useTransition } from "react";
import { Globe, Menu, Monitor, Moon, Sun, Gem } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

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
import { cn } from "@/components/ui";
import { LocaleLink } from "@/i18n/navigation";
import type { User } from "@/lib/auth/client";
import { authClient } from "@/lib/auth/client";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { useCredits } from "@/stores/credits-store";

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
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push(`/${locale}`);
    router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      let newPath = pathname;

      if (newPath.startsWith("/zh") || newPath.startsWith("/en")) {
        newPath = newPath.replace(/^\/(zh|en)/, "");
      }

      if (newPath === "") newPath = "/";

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
        scrolled
          ? "border-b border-white/30 bg-white/65 shadow-[0_6px_30px_rgba(30,42,120,0.07)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="hidden h-16 items-center justify-between lg:flex">
          <LocaleLink href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Image src="/logo.svg" alt="VideoFly" width={28} height={28} className="rounded-md" />
            VideoFly
          </LocaleLink>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <LocaleLink
                key={item.id}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/70 hover:text-foreground"
              >
                {t(`Header.${item.id}`)}
              </LocaleLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{locale.toUpperCase()}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[120px] border-border/50 bg-background/95 backdrop-blur-sm shadow-xl"
              >
                <DropdownMenuItem onClick={() => switchLocale("en")} className="cursor-pointer hover:bg-accent">
                  {locale === "zh" ? "English" : "英文"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("zh")} className="cursor-pointer hover:bg-accent">
                  {locale === "zh" ? "中文" : "中文"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Toggle theme"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[120px] border-border/50 bg-background/95 backdrop-blur-sm shadow-xl"
              >
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer hover:bg-accent">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer hover:bg-accent">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer hover:bg-accent">
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user && (
              <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/80 px-3 py-1.5 backdrop-blur-sm">
                <Gem className="h-4 w-4 text-amber-500" />
                <CreditsDisplay />
              </div>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-2 ring-background/20">
                      <span className="text-sm font-medium">
                        {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border-border/50 bg-background/95 backdrop-blur-sm shadow-xl"
                >
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent">
                    <LocaleLink href="/my-creations">{t("Header.myCreations")}</LocaleLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent">
                    <LocaleLink href="/credits">{t("Header.credits")}</LocaleLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent">
                    <LocaleLink href="/settings">{t("Header.settings")}</LocaleLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive hover:bg-destructive/10"
                    onClick={handleSignOut}
                  >
                    {t("Common.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" onClick={signInModal.onOpen} disabled={isPending}>
                {t("Common.login")}
              </Button>
            )}
          </div>
        </nav>

        <div className="flex h-16 items-center justify-between lg:hidden">
          <LocaleLink href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Image src="/logo.svg" alt="VideoFly" width={28} height={28} className="rounded-md" />
            VideoFly
          </LocaleLink>

          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-1">
                <Gem className="h-3 w-3 text-amber-500" />
                <span className="text-xs font-medium">
                  <CreditsDisplay />
                </span>
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <LocaleLink href="/" className="flex items-center gap-2">
                      <Image src="/logo.svg" alt="VideoFly" width={28} height={28} className="rounded-md" />
                      VideoFly
                    </LocaleLink>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-3">
                  {navItems.map((item) => (
                    <LocaleLink
                      key={item.id}
                      href={item.href}
                      className="rounded-md p-2 font-semibold transition-colors hover:bg-accent"
                    >
                      {t(`Header.${item.id}`)}
                    </LocaleLink>
                  ))}

                  <div className="flex items-center gap-3 p-2">
                    <Globe className="h-4 w-4" />
                    <button
                      onClick={() => switchLocale("en")}
                      className="text-sm transition-colors hover:text-foreground"
                    >
                      {locale === "zh" ? "English" : "英文"}
                    </button>
                    <span className="text-muted-foreground">/</span>
                    <button
                      onClick={() => switchLocale("zh")}
                      className="text-sm transition-colors hover:text-foreground"
                    >
                      {locale === "zh" ? "中文" : "中文"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 p-2">
                    <Sun className="h-4 w-4 shrink-0" />
                    <div className="flex items-center gap-1">
                      {(["light", "dark", "system"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setTheme(mode)}
                          className={cn(
                            "rounded-md px-2 py-1 text-sm transition-colors",
                            theme === mode
                              ? "bg-accent font-medium text-accent-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {mode === "light" ? "Light" : mode === "dark" ? "Dark" : "System"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  {user ? (
                    <div className="flex flex-col gap-2">
                      <LocaleLink href="/my-creations" className="rounded-md p-2 transition-colors hover:bg-accent">
                        {t("Header.myCreations")}
                      </LocaleLink>
                      <LocaleLink href="/credits" className="rounded-md p-2 transition-colors hover:bg-accent">
                        {t("Header.credits")}
                      </LocaleLink>
                      <LocaleLink href="/settings" className="rounded-md p-2 transition-colors hover:bg-accent">
                        {t("Header.settings")}
                      </LocaleLink>
                      <button
                        onClick={handleSignOut}
                        className="rounded-md p-2 text-left text-destructive transition-colors hover:bg-destructive/10"
                      >
                        {t("Common.logout")}
                      </button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={signInModal.onOpen} disabled={isPending}>
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
