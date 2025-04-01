import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { PropertyFormData } from "./AddProperty";

const SAMPLE_PROPERTIES = [
  {
    id: "10370",
    name: "Luxury Villa",
    location: "Piscina, Churrasqueira, Sala de Jogos",
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 12,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  },
  {
    id: "3009",
    name: "Casa/apto inteiro",
    location: "Piscina, Churrasqueira, Sala de Jogos",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    id: "3108",
    name: "Beachfront Condo",
    location: "Piscina, Churrasqueira, Sala de Jogos",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 11,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    id: "106-SL",
    name: "Downtown Apartment",
    location: "Piscina",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  },
  {
    id: "1304",
    name: "Mountain Retreat",
    location: "Piscina, Churrasqueira",
    bedrooms: 5,
    bathrooms: 3,
    maxGuests: 11,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    id: "16376-8",
    name: "Lakeside Cottage",
    location: "Piscina, Churrasqueira, Sala de Jogos",
    bedrooms: 8,
    bathrooms: 7,
    maxGuests: 18,
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80",
  },
];

interface AddPropertySelectProps {
  formData: PropertyFormData;
  onUpdateFormData: (data: Partial<PropertyFormData>) => void;
  onNext: () => void;
}

function AddPropertySelect({
  formData,
  onUpdateFormData,
  onNext,
}: AddPropertySelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(
    formData.id || null,
  );

  const filteredProperties = SAMPLE_PROPERTIES.filter(
    (property) =>
      property.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectProperty = (property: (typeof SAMPLE_PROPERTIES)[0]) => {
    setSelectedProperty(property.id);
    onUpdateFormData({
      id: property.id,
      name: property.name,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      maxGuests: property.maxGuests,
      image: property.image,
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative max-w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search property by ID or title"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card
            key={property.id}
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
              selectedProperty === property.id
                ? "ring-2 ring-primary"
                : "ring-0"
            }`}
            onClick={() => handleSelectProperty(property)}
          >
            <div className="relative h-48 w-full">
              <img
                src={property.image}
                alt={property.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">ID: {property.id}</h3>
                </div>
                <h4 className="font-medium">{property.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {property.location}
                </p>
                <p className="text-sm">
                  {property.bedrooms} bedrooms • {property.bathrooms} bathrooms
                  <br />
                  Max guests: {property.maxGuests}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No properties found matching your search.
          </p>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <Button onClick={onNext} disabled={!selectedProperty} className="w-32">
          Next
        </Button>
      </div>
    </div>
  );
}

export default AddPropertySelect;
