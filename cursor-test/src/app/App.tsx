import { Container } from "@shared/ui";
import { Header } from "@widgets/header";
import { Outlet } from "react-router";

export function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="py-8">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
