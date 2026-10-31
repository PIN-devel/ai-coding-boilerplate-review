import { App } from "@app/App.tsx";
import { AboutPage } from "@pages/about";
import { HomePage } from "@pages/home";
import { routes } from "@shared/routes";
import { BrowserRouter, Route, Routes } from "react-router";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.about} element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
