import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";

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

function PropertyList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = PROPERTIES.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6 bg-background w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 w-full">
              <img
                src={property.image}
                alt={property.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="ml-1 text-sm font-medium">
                    {property.rating}
                  </span>
                </div>
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
                  {property.location}
                </p>
                <p className="text-sm">
                  {property.bedrooms} beds • {property.bathrooms} baths • Up to{" "}
                  {property.maxGuests} guests
                </p>
                <p className="text-sm line-clamp-2">{property.description}</p>
                <div className="pt-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/property/${property.id}`}>View Details</Link>
                  </Button>
                </div>
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
    </div>
  );
}

export default PropertyList;
