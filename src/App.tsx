import { Suspense, useEffect, useState } from "react";
import Splash from "./components/Splash";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
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
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";
import CustomPropertyPage from "./pages/CustomPropertyPage";
import ChatPage from "./pages/ChatPage";

function App() {
  // Start with false authentication state until we check localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Splash screen states (disabled for now)
  // const [showSplash, setShowSplash] = useState(true);
  // const [splashFinished, setSplashFinished] = useState(false);

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

    // Check if user is already authenticated
    const user = localStorage.getItem("user");
    if (user) {
      try {
        // Validate that the user data is properly formatted
        const userData = JSON.parse(user);
        if (userData && userData.email) {
          setIsAuthenticated(true);
        } else {
          // Invalid user data format
          localStorage.removeItem("user");
          setIsAuthenticated(false);
        }
      } catch (e) {
        // Invalid JSON in localStorage
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    } else {
      // Explicitly set to false if no user data found
      setIsAuthenticated(false);
    }
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    // Always check authentication regardless of splash state
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center bg-background">
            <p className="text-lg">Loading...</p>
          </div>
        }
      >
        <>
          {/* Tempo routes need to be rendered before the main Routes */}
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user" element={<UserPage />} />
            {/* Main application routes protected by authentication */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <PropertyManagement />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="properties" element={<PropertyList />} />
              <Route path="property/:id" element={<PropertyDetail />} />
              <Route
                path="property/custom/13"
                element={<CustomPropertyPage />}
              />
              <Route path="bookings" element={<BookingDashboard />} />
              <Route path="tasks" element={<TaskManagement />} />
              <Route path="inventory" element={<InventoryControl />} />
              <Route path="team" element={<TeamManagement />} />
              <Route path="finance" element={<FinancialModule />} />
              <Route path="chat" element={<ChatPage />} />
            </Route>
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" element={<div />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </Suspense>
    </>
  );
}

export default App;
