import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import PropertyManagement from "./pages/PropertyManagement";
import BookingDashboard from "./components/booking/BookingDashboard";
import TaskManagement from "./components/tasks/TaskManagement";
import InventoryControl from "./components/inventory/InventoryControl";
import TeamManagement from "./components/teams/TeamManagement";
import FinancialModule from "./components/finance/FinancialModule";
import PropertyList from "./components/properties/PropertyList";
import PropertyDetail from "./components/properties/PropertyDetail";
import NotFound from "./components/NotFound";
import MainLayout from "./components/layout/MainLayout";

function App() {
  // Check for saved theme preference or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }

    // Add viewport meta tag for better mobile experience
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.getElementsByTagName("head")[0].appendChild(meta);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <p className="text-lg">Loading...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<PropertyManagement />}>
            <Route index element={<Home />} />
            <Route path="properties" element={<PropertyList />} />
            <Route path="property/:id" element={<PropertyDetail />} />
            <Route path="bookings" element={<BookingDashboard />} />
            <Route path="tasks" element={<TaskManagement />} />
            <Route path="inventory" element={<InventoryControl />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="finance" element={<FinancialModule />} />
          </Route>
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
