import { Suspense } from "react";
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

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
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
