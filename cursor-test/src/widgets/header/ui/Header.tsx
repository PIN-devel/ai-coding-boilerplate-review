import { appConfig } from "@shared/config";
import { routes } from "@shared/routes";
import { Container } from "@shared/ui";
import { NavLink } from "react-router";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "font-semibold text-slate-900" : "text-slate-500 hover:text-slate-800";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <p className="font-semibold">{appConfig.name}</p>
          <nav className="flex gap-4 text-sm">
            <NavLink to={routes.home} className={linkClass} end>
              홈
            </NavLink>
            <NavLink to={routes.about} className={linkClass}>
              소개
            </NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}
