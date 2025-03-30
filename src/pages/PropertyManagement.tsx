import { Outlet } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

function PropertyManagement() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default PropertyManagement;
