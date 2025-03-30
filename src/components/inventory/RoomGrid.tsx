import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ROOMS_BY_PROPERTY = {
  "1": [
    // Ocean View Villa
    {
      id: "101",
      name: "Living Room",
      itemCount: 45,
      image:
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    },
    {
      id: "102",
      name: "Kitchen",
      itemCount: 62,
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
    },
    {
      id: "103",
      name: "Master Bedroom",
      itemCount: 28,
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    },
    {
      id: "104",
      name: "Guest Bedroom 1",
      itemCount: 22,
      image:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    },
    {
      id: "105",
      name: "Guest Bedroom 2",
      itemCount: 20,
      image:
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    },
    {
      id: "106",
      name: "Bathroom 1",
      itemCount: 15,
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    },
    {
      id: "107",
      name: "Bathroom 2",
      itemCount: 12,
      image:
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    },
    {
      id: "108",
      name: "Patio",
      itemCount: 18,
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    },
  ],
  "2": [
    // Mountain Retreat
    {
      id: "201",
      name: "Living Room",
      itemCount: 38,
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    },
    {
      id: "202",
      name: "Kitchen",
      itemCount: 55,
      image:
        "https://images.unsplash.com/photo-1570739904862-6bef051ce231?w=800&q=80",
    },
    {
      id: "203",
      name: "Master Bedroom",
      itemCount: 25,
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    },
    {
      id: "204",
      name: "Guest Bedroom",
      itemCount: 20,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    },
    {
      id: "205",
      name: "Bathroom 1",
      itemCount: 14,
      image:
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
    },
    {
      id: "206",
      name: "Bathroom 2",
      itemCount: 10,
      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    },
    {
      id: "207",
      name: "Deck",
      itemCount: 15,
      image:
        "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80",
    },
  ],
  "3": [
    // Downtown Loft
    {
      id: "301",
      name: "Living Area",
      itemCount: 32,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    },
    {
      id: "302",
      name: "Kitchen",
      itemCount: 48,
      image:
        "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=800&q=80",
    },
    {
      id: "303",
      name: "Bedroom",
      itemCount: 24,
      image:
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
    },
    {
      id: "304",
      name: "Bathroom",
      itemCount: 18,
      image:
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
    },
    {
      id: "305",
      name: "Office Nook",
      itemCount: 15,
      image:
        "https://images.unsplash.com/photo-1593476550610-87baa860004a?w=800&q=80",
    },
  ],
};

interface RoomGridProps {
  propertyId: string;
  selectedRoom: string | null;
  onSelectRoom: (roomId: string) => void;
}

interface Room {
  id: string;
  name: string;
  itemCount: number;
  image: string;
}

function RoomGrid({ propertyId, selectedRoom, onSelectRoom }: RoomGridProps) {
  const rooms =
    ROOMS_BY_PROPERTY[propertyId as keyof typeof ROOMS_BY_PROPERTY] || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {rooms.map((room) => (
        <Card
          key={room.id}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md overflow-hidden",
            selectedRoom === room.id ? "ring-2 ring-primary" : "",
          )}
          onClick={() => onSelectRoom(room.id)}
        >
          <div className="h-36 w-full">
            <img
              src={room.image}
              alt={room.name}
              className="h-full w-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h3 className="font-medium">{room.name}</h3>
              <p className="text-sm text-muted-foreground">
                {room.itemCount} items
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default RoomGrid;
