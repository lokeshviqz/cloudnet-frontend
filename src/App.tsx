import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { LandingPage } from "./pages/LandingPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/docs"
          element={
            <PlaceholderPage
              title="Docs"
              body="API and product documentation will live here — wire this to your Go OpenAPI later."
            />
          }
        />
        <Route
          path="/plans"
          element={
            <PlaceholderPage
              title="Plans"
              body="Pricing and plan tiers for CloudNetIQ will be defined here."
            />
          }
        />
        <Route
          path="/login"
          element={
            <PlaceholderPage
              title="Login"
              body="Connect this form to POST /tenant/login on cloudnet-backend."
            />
          }
        />
        <Route
          path="/register"
          element={
            <PlaceholderPage
              title="Register"
              body="Connect this form to POST /tenant/register on cloudnet-backend."
            />
          }
        />
      </Routes>
    </div>
  );
}
