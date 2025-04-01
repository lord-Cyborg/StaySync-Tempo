import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PropertyFormData } from "./AddProperty";

interface AddPropertyConfigureProps {
  formData: PropertyFormData;
  onUpdateFormData: (data: Partial<PropertyFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

function AddPropertyConfigure({
  formData,
  onUpdateFormData,
  onNext,
  onBack,
}: AddPropertyConfigureProps) {
  const [wifiStatus, setWifiStatus] = useState<"on" | "off" | "">(
    formData.wifiStatus || "",
  );

  const handleWifiChange = (value: "on" | "off" | "") => {
    setWifiStatus(value);
    onUpdateFormData({ wifiStatus: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateFormData({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Property Settings</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Enable
          </Button>
          <Button variant="outline" size="sm">
            Not disponível
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode || ""}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="doorCode">Door Code</Label>
          <Input
            id="doorCode"
            name="doorCode"
            value={formData.doorCode || ""}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="wifiPassword">WiFi Password</Label>
          <Input
            id="wifiPassword"
            name="wifiPassword"
            value={formData.wifiPassword || ""}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>WiFi</Label>
        <RadioGroup
          value={wifiStatus}
          onValueChange={handleWifiChange as (value: string) => void}
          className="flex space-x-8"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="on" id="wifi-on" />
            <Label htmlFor="wifi-on">ON</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="off" id="wifi-off" />
            <Label htmlFor="wifi-off">OFF</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Property Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ""}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
      </div>

      {formData.id && formData.image && (
        <div className="mt-6">
          <div className="relative h-80 w-full">
            <img
              src={formData.image}
              alt={formData.name || "Property"}
              className="h-full w-full object-cover rounded-md"
            />
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium">{formData.name || "Property"}</p>
            <p className="text-sm text-muted-foreground">
              ID: {formData.id}
              <br />
              {formData.bedrooms} bedrooms • {formData.bathrooms} bathrooms
              <br />
              Max guests: {formData.maxGuests}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack} className="w-32">
          Back
        </Button>
        <div className="flex space-x-2">
          <Button onClick={onNext} className="w-32">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddPropertyConfigure;
