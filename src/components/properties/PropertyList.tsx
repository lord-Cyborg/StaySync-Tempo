import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Star, Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/database";
import { Property } from "@/lib/database/schema";

// Sample properties data to preserve existing properties
const SAMPLE_PROPERTIES = [
  {
    id: "1",
    name: "Ocean View Villa",
    location: "Malibu, CA",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    pricePerNight: 450,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    description:
      "Luxurious beachfront villa with stunning ocean views and private access to the beach.",
  },
  {
    id: "2",
    name: "Mountain Retreat",
    location: "Aspen, CO",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 350,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    description:
      "Cozy mountain cabin with panoramic views, hot tub, and easy access to hiking trails.",
  },
  {
    id: "3",
    name: "Downtown Loft",
    location: "New York, NY",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricePerNight: 300,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    description:
      "Modern loft in the heart of the city with high ceilings and contemporary furnishings.",
  },
  {
    id: "4",
    name: "Lakeside Cottage",
    location: "Lake Tahoe, NV",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 280,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80",
    description:
      "Charming cottage with lake views, private dock, and cozy fireplace for winter evenings.",
  },
  {
    id: "5",
    name: "Desert Oasis",
    location: "Scottsdale, AZ",
    bedrooms: 3,
    bathrooms: 2.5,
    maxGuests: 6,
    pricePerNight: 320,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    description:
      "Modern desert home with private pool, outdoor kitchen, and stunning mountain views.",
  },
  {
    id: "6",
    name: "Historic Brownstone",
    location: "Boston, MA",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 5,
    pricePerNight: 340,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    description:
      "Beautifully restored brownstone with original details and modern amenities in historic district.",
  },
  {
    id: "7",
    name: "Beachfront Bungalow",
    location: "Miami, FL",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    pricePerNight: 275,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
    description:
      "Cozy bungalow steps from the beach with tropical garden and outdoor shower.",
  },
  {
    id: "8",
    name: "Vineyard Estate",
    location: "Napa Valley, CA",
    bedrooms: 4,
    bathrooms: 3.5,
    maxGuests: 8,
    pricePerNight: 550,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80",
    description:
      "Elegant estate surrounded by vineyards with wine cellar, pool, and outdoor entertaining areas.",
  },
  {
    id: "9",
    name: "Urban Penthouse",
    location: "Chicago, IL",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 400,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    description:
      "Luxury penthouse with floor-to-ceiling windows offering panoramic city and lake views.",
  },
  {
    id: "10",
    name: "Ski Chalet",
    location: "Park City, UT",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    pricePerNight: 480,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=800&q=80",
    description:
      "Spacious ski-in/ski-out chalet with hot tub, game room, and stunning mountain views.",
  },
  {
    id: "11",
    name: "Tropical Villa",
    location: "Kauai, HI",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 420,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=800&q=80",
    description:
      "Open-air villa surrounded by lush tropical gardens with ocean views and infinity pool.",
  },
  {
    id: "12",
    name: "Rustic Farmhouse",
    location: "Hudson Valley, NY",
    bedrooms: 4,
    bathrooms: 2.5,
    maxGuests: 8,
    pricePerNight: 380,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    description:
      "Renovated farmhouse on 10 acres with barn, vegetable garden, and antique furnishings.",
  },
];

// Property form interface for adding/editing properties
interface PropertyFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  pricePerNight: number;
  cleaningFee: number;
  image: string;
  amenities: string;
  rating?: number;
  location?: string; // For backward compatibility
}

// Initial empty form data
const initialFormData: PropertyFormData = {
  name: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "USA",
  description: "",
  bedrooms: 1,
  bathrooms: 1,
  maxGuests: 2,
  pricePerNight: 100,
  cleaningFee: 50,
  image:
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  amenities: "WiFi, Air Conditioning",
  location: "",
};

function PropertyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [currentPropertyId, setCurrentPropertyId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  // Load properties from database and merge with sample properties
  useEffect(() => {
    const loadProperties = async () => {
      try {
        // Get properties from database
        const dbProperties = await db.getProperties();

        // Convert sample properties to match Property interface
        const samplePropertiesConverted = SAMPLE_PROPERTIES.map((prop) => {
          // Split location into city and state
          const [city, state] = (prop.location || "").split(", ");

          return {
            id: prop.id,
            name: prop.name,
            address: "123 Sample St", // Default address
            city: city || "",
            state: state || "",
            zipCode: "12345", // Default zip
            country: "USA", // Default country
            description: prop.description,
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            maxGuests: prop.maxGuests,
            pricePerNight: prop.pricePerNight,
            cleaningFee: Math.round(prop.pricePerNight * 0.2), // 20% of nightly rate
            images: [prop.image],
            amenities: ["WiFi", "Air Conditioning", "Kitchen", "Parking"],
            active: true,
            rating: prop.rating,
            location: prop.location, // Keep original location
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Property;
        });

        // Merge database properties with sample properties, avoiding duplicates by ID
        const dbIds = new Set(dbProperties.map((p) => p.id));
        const combinedProperties = [
          ...dbProperties,
          ...samplePropertiesConverted.filter((p) => !dbIds.has(p.id)),
        ];

        setProperties(combinedProperties);
      } catch (error) {
        console.error("Error loading properties:", error);
        // Fallback to sample properties if database fails
        const samplePropertiesConverted = SAMPLE_PROPERTIES.map((prop) => {
          const [city, state] = (prop.location || "").split(", ");
          return {
            id: prop.id,
            name: prop.name,
            address: "123 Sample St",
            city: city || "",
            state: state || "",
            zipCode: "12345",
            country: "USA",
            description: prop.description,
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            maxGuests: prop.maxGuests,
            pricePerNight: prop.pricePerNight,
            cleaningFee: Math.round(prop.pricePerNight * 0.2),
            images: [prop.image],
            amenities: ["WiFi", "Air Conditioning", "Kitchen", "Parking"],
            active: true,
            rating: prop.rating,
            location: prop.location,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Property;
        });
        setProperties(samplePropertiesConverted);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Filter properties based on search term
  const filteredProperties = properties.filter((property) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      property.name.toLowerCase().includes(searchLower) ||
      (property.city && property.city.toLowerCase().includes(searchLower)) ||
      (property.state && property.state.toLowerCase().includes(searchLower)) ||
      (property.location &&
        property.location.toLowerCase().includes(searchLower))
    );
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "bedrooms" ||
        name === "bathrooms" ||
        name === "maxGuests" ||
        name === "pricePerNight" ||
        name === "cleaningFee"
          ? Number(value)
          : value,
    }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentPropertyId(null);
  };

  // Open edit dialog with property data
  const handleEditProperty = (property: Property) => {
    setCurrentPropertyId(property.id);
    setFormData({
      name: property.name,
      address: property.address || "",
      city: property.city || "",
      state: property.state || "",
      zipCode: property.zipCode || "",
      country: property.country || "USA",
      description: property.description,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      maxGuests: property.maxGuests,
      pricePerNight: property.pricePerNight,
      cleaningFee:
        property.cleaningFee || Math.round(property.pricePerNight * 0.2),
      image: property.images?.[0] || "",
      amenities: Array.isArray(property.amenities)
        ? property.amenities.join(", ")
        : "WiFi, Air Conditioning",
      rating: property.rating || 4.5, // Use existing rating or default
      location: property.location || "",
    });
    setIsEditDialogOpen(true);
  };

  // Save new property
  const handleAddProperty = async () => {
    try {
      // Preserve location field for compatibility with existing data
      const location =
        formData.city && formData.state
          ? `${formData.city}, ${formData.state}`
          : formData.location || "";

      const newProperty: Omit<Property, "id" | "createdAt" | "updatedAt"> = {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        description: formData.description,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        maxGuests: formData.maxGuests,
        pricePerNight: formData.pricePerNight,
        cleaningFee: formData.cleaningFee,
        images: [formData.image],
        amenities: formData.amenities.split(",").map((item) => item.trim()),
        active: true,
        location: location, // Add location for backward compatibility
        rating: formData.rating || 4.7, // Default rating
      };

      const addedProperty = await db.createProperty(newProperty);
      setProperties((prev) => [...prev, addedProperty]);
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  // Update existing property
  const handleUpdateProperty = async () => {
    if (!currentPropertyId) return;

    try {
      // Preserve location field for compatibility with existing data
      const location =
        formData.city && formData.state
          ? `${formData.city}, ${formData.state}`
          : formData.location || "";

      const updatedProperty: Partial<Property> = {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        description: formData.description,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        maxGuests: formData.maxGuests,
        pricePerNight: formData.pricePerNight,
        cleaningFee: formData.cleaningFee,
        images: [formData.image],
        amenities: formData.amenities.split(",").map((item) => item.trim()),
        location: location, // Add location for backward compatibility
        rating: formData.rating,
      };

      const updated = await db.updateProperty(
        currentPropertyId,
        updatedProperty,
      );
      if (updated) {
        setProperties((prev) =>
          prev.map((p) => (p.id === currentPropertyId ? updated : p)),
        );
      }
      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  // Delete property
  const handleDeleteProperty = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        const success = await db.deleteProperty(id);
        if (success) {
          setProperties((prev) => prev.filter((p) => p.id !== id));
        }
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  // Handle view details click
  const handleViewDetails = (propertyId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    console.log(`Navigating to property ${propertyId}`);
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="p-6 space-y-6 bg-background w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" /> Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGuests">Max Guests</Label>
                  <Input
                    type="number"
                    id="maxGuests"
                    name="maxGuests"
                    value={formData.maxGuests}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pricePerNight">Price Per Night ($)</Label>
                  <Input
                    type="number"
                    id="pricePerNight"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cleaningFee">Cleaning Fee ($)</Label>
                  <Input
                    type="number"
                    id="cleaningFee"
                    name="cleaningFee"
                    value={formData.cleaningFee}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (comma separated)</Label>
                <Input
                  id="amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddProperty}>Save Property</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search properties..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Edit Property Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Property Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-city">City</Label>
                <Input
                  id="edit-city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-state">State</Label>
                <Input
                  id="edit-state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-zipCode">Zip Code</Label>
                <Input
                  id="edit-zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-country">Country</Label>
                <Input
                  id="edit-country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-bedrooms">Bedrooms</Label>
                <Input
                  type="number"
                  id="edit-bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-bathrooms">Bathrooms</Label>
                <Input
                  type="number"
                  id="edit-bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-maxGuests">Max Guests</Label>
                <Input
                  type="number"
                  id="edit-maxGuests"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-pricePerNight">Price Per Night ($)</Label>
                <Input
                  type="number"
                  id="edit-pricePerNight"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-cleaningFee">Cleaning Fee ($)</Label>
                <Input
                  type="number"
                  id="edit-cleaningFee"
                  name="cleaningFee"
                  value={formData.cleaningFee}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-amenities">
                Amenities (comma separated)
              </Label>
              <Input
                id="edit-amenities"
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateProperty}>Update Property</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading properties...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <img
                  src={
                    property.images?.[0] ||
                    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"
                  }
                  alt={property.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="ml-1 text-sm font-medium">
                      {property.rating || 4.7}
                    </span>
                  </div>
                </div>
                <div className="absolute top-2 left-2 flex space-x-1">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-white"
                    onClick={() => handleEditProperty(property)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-white"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{property.name}</h3>
                    <span className="font-medium text-primary">
                      ${property.pricePerNight}/night
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {property.location ||
                      `${property.city || ""}, ${property.state || ""}`}
                  </p>
                  <p className="text-sm">
                    {property.bedrooms} beds • {property.bathrooms} baths • Up
                    to {property.maxGuests} guests
                  </p>
                  <p className="text-sm line-clamp-2">{property.description}</p>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={(e) => handleViewDetails(property.id, e)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredProperties.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No properties found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default PropertyList;
