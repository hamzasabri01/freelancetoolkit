import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { DesktopNavigation } from "@/components/DesktopNavigation";

export function Header() {
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Logo />
      <DesktopNavigation />
      <MobileMenu />
    </div>
  </header>;
}
