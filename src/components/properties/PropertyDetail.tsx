import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  DollarSign,
  Calendar,
} from "lucide-react";
import RoomGrid from "../inventory/RoomGrid";
import InventoryItemList from "../inventory/InventoryItemList";
import PropertyCard from "./PropertyCard";
import InventoryCard from "../inventory/InventoryCard";

// Import the ROOMS_BY_PROPERTY and INVENTORY_ITEMS from InventoryItemList
import {
  ROOMS_BY_PROPERTY,
  INVENTORY_ITEMS,
} from "../inventory/InventoryItemList";

const PROPERTIES = [
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
      "Luxurious beachfront villa with stunning ocean views and private access to the beach. This spacious property features an open floor plan with floor-to-ceiling windows that showcase the breathtaking ocean views. The gourmet kitchen is equipped with high-end appliances and opens to a dining area that seats 8. The master suite includes a king-sized bed, en-suite bathroom with soaking tub, and private balcony. Three additional bedrooms provide comfortable accommodations for guests. Outside, enjoy the infinity pool, hot tub, and multiple lounging areas perfect for entertaining.",
    amenities: [
      "Beachfront",
      "Pool",
      "Hot tub",
      "Wifi",
      "Full kitchen",
      "Air conditioning",
      "Washer/dryer",
      "Parking",
      "Outdoor shower",
      "BBQ grill",
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
    ],
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
      "Cozy mountain cabin with panoramic views, hot tub, and easy access to hiking trails. This charming retreat is nestled among pine trees with stunning mountain vistas from every window. The great room features a stone fireplace, vaulted ceilings, and comfortable seating for the whole family. The well-appointed kitchen has everything needed to prepare meals after a day of outdoor adventures. The master bedroom includes a queen bed and en-suite bathroom, while two additional bedrooms provide flexible sleeping arrangements. The outdoor deck with hot tub is perfect for stargazing on clear mountain nights.",
    amenities: [
      "Mountain views",
      "Hot tub",
      "Fireplace",
      "Wifi",
      "Full kitchen",
      "Washer/dryer",
      "Parking",
      "Hiking trails",
      "Ski storage",
      "Wood-burning stove",
    ],
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=800&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
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
      "Modern loft in the heart of the city with high ceilings and contemporary furnishings. This stylish urban retreat features exposed brick walls, industrial-style windows, and polished concrete floors. The open concept living area includes a sleek kitchen with stainless steel appliances and a dining space that comfortably seats 6. The primary bedroom offers a queen bed and en-suite bathroom, while the second bedroom provides flexible sleeping arrangements. Located in a historic building with elevator access, this property is within walking distance to restaurants, shopping, and public transportation.",
    amenities: [
      "City views",
      "High ceilings",
      "Elevator",
      "Wifi",
      "Full kitchen",
      "Air conditioning",
      "Washer/dryer",
      "Smart TV",
      "Doorman",
      "Gym access",
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
    ],
  },
];

function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) {
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
              src={property.image}
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
                <span>{property.location}</span>
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
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="text-sm">
                    {amenity}
                  </div>
                ))}
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
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
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
                  {property.images.map((image, index) => (
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="mt-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <PropertyCard
                  id={property.id}
                  name={property.name}
                  location={property.location}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  maxGuests={property.maxGuests}
                  image={property.image}
                  amenities={property.amenities.slice(0, 5)}
                />
              </div>
              <div className="md:col-span-2">
                <RoomGrid
                  propertyId={property.id}
                  selectedRoom={selectedRoom}
                  onSelectRoom={setSelectedRoom}
                />
              </div>
            </div>

            {selectedRoom && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Items in Selected Room
                </h2>
                {/* Get the room name from the ROOMS_BY_PROPERTY data */}
                {(() => {
                  const rooms =
                    ROOMS_BY_PROPERTY[
                      property.id as keyof typeof ROOMS_BY_PROPERTY
                    ] || [];
                  const roomName =
                    rooms.find((r) => r.id === selectedRoom)?.name ||
                    "Selected Room";

                  // Convert the inventory items to the format expected by InventoryCard
                  const inventoryItems = INVENTORY_ITEMS.filter(
                    (item) =>
                      item.propertyId === property.id &&
                      item.roomId === selectedRoom,
                  ).map((item) => ({
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    condition: item.condition,
                    notes: item.notes,
                  }));

                  return (
                    <InventoryCard
                      roomName={roomName}
                      items={inventoryItems}
                      onEditItem={(itemId) =>
                        console.log(`Edit item ${itemId}`)
                      }
                    />
                  );
                })()}

                {/* Keep the original list view as an alternative */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Detailed Inventory List
                  </h3>
                  <InventoryItemList
                    propertyId={property.id}
                    roomId={selectedRoom}
                  />
                </div>
              </div>
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

        <TabsContent value="finances" className="mt-4">
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
      </Tabs>
    </div>
  );
}

export default PropertyDetail;
