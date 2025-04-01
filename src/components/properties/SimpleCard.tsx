import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Lock, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface SimpleCardProps {
  id: string;
  propertyId?: string;
  image: string;
  location: string;
  amenities?: string[];
  type?: "N/R" | "B2B" | "b2b";
}

export default function SimpleCard({
  id,
  propertyId,
  image,
  location,
  amenities = ["Gate", "Door", "WiFi"],
  type = "N/R",
}: SimpleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <img
          src={image}
          alt={location}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium">
          {propertyId || type}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-1">
            <Home className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground truncate">{location}</p>
          </div>

          <div className="flex gap-2 pt-2">
            {amenities.map((amenity, index) => (
              <Badge
                key={index}
                variant="outline"
                className="flex items-center gap-1"
              >
                {amenity === "Gate" && <Lock className="h-3 w-3" />}
                {amenity === "Door" && <Home className="h-3 w-3" />}
                {amenity === "WiFi" && <Wifi className="h-3 w-3" />}
                <span className="text-xs">{amenity}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
