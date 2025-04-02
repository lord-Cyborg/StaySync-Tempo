import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Calendar,
  Check,
  Wifi,
  Search,
} from "lucide-react";
import { db } from "@/lib/database";
import { Property } from "@/lib/database/schema";
import RoomGrid from "../inventory/RoomGrid";
import InventoryItemList from "../inventory/InventoryItemList";

// Sample properties data for fallback
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
];

// Sample rooms data for demo purposes
const SAMPLE_ROOMS = [
  { id: "101", name: "Living Room", propertyId: "1" },
  { id: "102", name: "Kitchen", propertyId: "1" },
  { id: "103", name: "Master Bedroom", propertyId: "1" },
  { id: "104", name: "Guest Bedroom 1", propertyId: "1" },
  { id: "105", name: "Guest Bedroom 2", propertyId: "1" },
  { id: "106", name: "Bathroom 1", propertyId: "1" },
  { id: "107", name: "Bathroom 2", propertyId: "1" },
  { id: "108", name: "Patio", propertyId: "1" },
  { id: "201", name: "Living Room", propertyId: "2" },
  { id: "202", name: "Kitchen", propertyId: "2" },
  { id: "203", name: "Master Bedroom", propertyId: "2" },
  { id: "204", name: "Guest Bedroom", propertyId: "2" },
  { id: "205", name: "Bathroom 1", propertyId: "2" },
  { id: "206", name: "Bathroom 2", propertyId: "2" },
  { id: "207", name: "Deck", propertyId: "2" },
  { id: "301", name: "Living Area", propertyId: "3" },
  { id: "302", name: "Kitchen", propertyId: "3" },
  { id: "303", name: "Bedroom", propertyId: "3" },
  { id: "304", name: "Bathroom", propertyId: "3" },
  { id: "305", name: "Office Nook", propertyId: "3" },
];

// Import mock task list component since the real one might not be working
const TaskList = ({
  filter,
  propertyId,
}: {
  filter: string;
  propertyId: string;
}) => (
  <div className="p-4 border rounded-md">
    <h3 className="text-lg font-medium mb-4">
      Tasks for Property {propertyId} ({filter})
    </h3>
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-3 border rounded-md flex justify-between items-center"
        >
          <div>
            <p className="font-medium">Sample Task {i}</p>
            <p className="text-sm text-muted-foreground">
              Type:{" "}
              {i === 1 ? "Cleaning" : i === 2 ? "Maintenance" : "Inspection"}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">
              Due: {new Date().toLocaleDateString()}
            </p>
            <p className="text-xs text-blue-600">In Progress</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  // Load property data on mount
  useEffect(() => {
    const loadProperty = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Try to get property from database
        const dbProperty = await db.getPropertyById(id);

        if (dbProperty) {
          setProperty(dbProperty);
        } else {
          // Fallback to sample data
          const sampleProperty = SAMPLE_PROPERTIES.find((p) => p.id === id);
          if (sampleProperty) {
            // Convert sample property to match Property interface
            const [city, state] = (sampleProperty.location || "").split(", ");
            const convertedProperty = {
              id: sampleProperty.id,
              name: sampleProperty.name,
              address: "123 Sample St",
              city: city || "",
              state: state || "",
              zipCode: "12345",
              country: "USA",
              description: sampleProperty.description,
              bedrooms: sampleProperty.bedrooms,
              bathrooms: sampleProperty.bathrooms,
              maxGuests: sampleProperty.maxGuests,
              pricePerNight: sampleProperty.pricePerNight,
              cleaningFee: Math.round(sampleProperty.pricePerNight * 0.2),
              images: [sampleProperty.image],
              amenities: ["WiFi", "Air Conditioning", "Kitchen", "Parking"],
              active: true,
              rating: sampleProperty.rating,
              location: sampleProperty.location,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            } as Property;

            setProperty(convertedProperty);
          }
        }
      } catch (error) {
        console.error("Error loading property:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  // If no property found, show not found message
  if (!property && !loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/properties">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
          </Link>
        </Button>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-background w-full h-full">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Loading Property...</h1>
        </div>

        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Get rooms for this property
  const propertyRooms = SAMPLE_ROOMS.filter(
    (room) => room.propertyId === property.id,
  );

  return (
    <div className="p-6 space-y-6 bg-background w-full h-full">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/properties">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{property.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="rounded-lg overflow-hidden h-[400px]">
            <img
              src={property.images?.[0] || property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500 mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-muted-foreground ml-1">
                    (42 reviews)
                  </span>
                </div>
                <div className="text-xl font-bold">
                  ${property.pricePerNight}
                  <span className="text-sm font-normal">/night</span>
                </div>
              </div>

              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {property.location || `${property.city}, ${property.state}`}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <Bed className="h-5 w-5 mb-1 text-muted-foreground" />
                  <span className="text-sm">{property.bedrooms} Beds</span>
                </div>
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <Bath className="h-5 w-5 mb-1 text-muted-foreground" />
                  <span className="text-sm">{property.bathrooms} Baths</span>
                </div>
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <Users className="h-5 w-5 mb-1 text-muted-foreground" />
                  <span className="text-sm">{property.maxGuests} Guests</span>
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" /> Book Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {Array.isArray(property.amenities) ? (
                  property.amenities.map((amenity, index) => (
                    <div key={index} className="text-sm flex items-center">
                      <Check className="h-4 w-4 mr-1 text-primary" />
                      {amenity}
                    </div>
                  ))
                ) : (
                  <div className="text-sm">No amenities listed</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">About this property</h2>
          <p className="text-muted-foreground whitespace-pre-line">
            {property.description}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Property Manager</h2>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-muted-foreground">
                  admin@example.com
                </p>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="details">Property Details</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Property Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property ID</span>
                    <span>{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Type</span>
                    <span>Vacation Rental</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Built</span>
                    <span>2018</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Square Footage
                    </span>
                    <span>2,450 sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Parking Spaces
                    </span>
                    <span>2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Photos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Array.isArray(property.images) ? (
                    property.images.map((image, index) => (
                      <div
                        key={index}
                        className="rounded-md overflow-hidden h-24"
                      >
                        <img
                          src={image}
                          alt={`${property.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="rounded-md overflow-hidden h-24">
                      <img
                        src={property.images?.[0] || property.image}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rooms" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {propertyRooms.length > 0 ? (
              propertyRooms.map((room) => (
                <Card
                  key={room.id}
                  className={`cursor-pointer hover:shadow-md transition-all ${selectedRoom === room.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{room.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Room ID: {room.id}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-muted-foreground">
                  No rooms found for this property.
                </p>
                <Button className="mt-4">Add Room</Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="mt-4">
          <div className="space-y-4">
            {selectedRoom ? (
              <InventoryItemList
                propertyId={property.id}
                roomId={selectedRoom}
              />
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Select a Room</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {propertyRooms.length > 0 ? (
                      propertyRooms.map((room) => (
                        <Card
                          key={room.id}
                          className={`cursor-pointer hover:shadow-md transition-all ${selectedRoom === room.id ? "ring-2 ring-primary" : ""}`}
                          onClick={() => setSelectedRoom(room.id)}
                        >
                          <CardContent className="p-3">
                            <h3 className="font-medium">{room.name}</h3>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-4">
                        <p className="text-muted-foreground">
                          No rooms found for this property.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <InventoryItemList propertyId={property.id} />
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Upcoming Bookings</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-muted-foreground">
                      May 15 - May 20, 2023 • 4 guests
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$2,250</p>
                    <p className="text-xs text-green-600">Confirmed</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      June 3 - June 10, 2023 • 2 guests
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$3,150</p>
                    <p className="text-xs text-amber-600">Pending</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-medium">Michael Brown</p>
                    <p className="text-sm text-muted-foreground">
                      June 15 - June 18, 2023 • 6 guests
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$1,350</p>
                    <p className="text-xs text-green-600">Confirmed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <TaskList filter="all" propertyId={property.id} />
        </TabsContent>

        <TabsContent value="financial" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Financial Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monthly Revenue
                    </span>
                    <span className="font-medium">$6,750</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monthly Expenses
                    </span>
                    <span className="font-medium">$1,850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Profit</span>
                    <span className="font-medium text-green-600">$4,900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Occupancy Rate
                    </span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Average Nightly Rate
                    </span>
                    <span className="font-medium">$450</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Recent Expenses</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">AC Repair</p>
                      <p className="text-xs text-muted-foreground">
                        May 10, 2023
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$350</p>
                      <p className="text-xs">Maintenance</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Cleaning Service</p>
                      <p className="text-xs text-muted-foreground">
                        May 14, 2023
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$150</p>
                      <p className="text-xs">Cleaning</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Utility Bills</p>
                      <p className="text-xs text-muted-foreground">
                        May 20, 2023
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$220</p>
                      <p className="text-xs">Utilities</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Document management coming soon.
            </p>
            <Button className="mt-4">Upload Document</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PropertyDetail;
