import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Users } from "lucide-react";

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  image: string;
  amenities?: string[];
}

function PropertyCard({
  id,
  name,
  location,
  bedrooms,
  bathrooms,
  maxGuests,
  image,
  amenities = [],
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{maxGuests}</span>
            </div>
          </div>
        </div>

        {amenities.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-primary/10 rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                  +{amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PropertyCard;
