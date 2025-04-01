import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddPropertySelect from "./AddPropertySelect";
import AddPropertyConfigure from "./AddPropertyConfigure";
import AddPropertyInstallations from "./AddPropertyInstallations";

type Step = "select" | "configure" | "installations";

export interface PropertyFormData {
  id?: string;
  name?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  image?: string;
  description?: string;
  amenities?: string[];
  zipCode?: string;
  doorCode?: string;
  wifiPassword?: string;
  wifiStatus?: "on" | "off" | "";
  photos?: Array<{
    url: string;
    category: string;
    selected: boolean;
  }>;
}

function AddProperty() {
  const [currentStep, setCurrentStep] = useState<Step>("select");
  const [formData, setFormData] = useState<PropertyFormData>({});
  const navigate = useNavigate();

  const steps = [
    { id: "select", label: "Select Property", number: 1 },
    { id: "configure", label: "Configure Details", number: 2 },
    { id: "installations", label: "Manage Installations", number: 3 },
  ];

  const handleNext = (step: Step) => {
    setCurrentStep(step);
  };

  const handleUpdateFormData = (data: Partial<PropertyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSaveProperty = () => {
    // Here you would save the property data to your backend
    console.log("Saving property:", formData);
    // Navigate back to property list
    navigate("/properties");
  };

  return (
    <div className="p-6 space-y-6 bg-background w-full h-full">
      <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>

      <div className="flex justify-between items-center mb-8">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep === step.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.number}
            </div>
            <span className="ml-2 text-sm font-medium">{step.label}</span>
            {step.id !== "installations" && (
              <div className="w-24 h-0.5 mx-4 bg-muted"></div>
            )}
          </div>
        ))}
      </div>

      <Card className="p-6">
        {currentStep === "select" && (
          <AddPropertySelect
            formData={formData}
            onUpdateFormData={handleUpdateFormData}
            onNext={() => handleNext("configure")}
          />
        )}

        {currentStep === "configure" && (
          <AddPropertyConfigure
            formData={formData}
            onUpdateFormData={handleUpdateFormData}
            onNext={() => handleNext("installations")}
            onBack={() => handleNext("select")}
          />
        )}

        {currentStep === "installations" && (
          <AddPropertyInstallations
            formData={formData}
            onUpdateFormData={handleUpdateFormData}
            onSave={handleSaveProperty}
            onBack={() => handleNext("configure")}
          />
        )}
      </Card>
    </div>
  );
}

export default AddProperty;
