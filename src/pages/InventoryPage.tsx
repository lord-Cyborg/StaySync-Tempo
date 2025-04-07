import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import InventoryControl from "@/components/inventory/InventoryControl";
import PropertySelector from "@/components/inventory/PropertySelector";

function InventoryPage() {
  const [selectedProperty, setSelectedProperty] = useState("1");

  return (
    <MainLayout>
      <div className="space-y-4">
        <PropertySelector
          selectedProperty={selectedProperty}
          onSelectProperty={setSelectedProperty}
        />
        <InventoryControl propertyId={selectedProperty} />
      </div>
    </MainLayout>
  );
}

export default InventoryPage;
