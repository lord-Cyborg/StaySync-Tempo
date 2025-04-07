import { Badge } from "@/components/ui/badge";

interface PropertyRoomDetailsProps {
  roomType: string;
  roomIndex: number;
  status?: string;
  lastCleaned?: string;
  nextBooking?: string;
  amenities?: string[];
}

function PropertyRoomDetails({
  roomType,
  roomIndex,
  status = "Available",
  lastCleaned = "Today, 10:30 AM",
  nextBooking = "None",
  amenities = [],
}: PropertyRoomDetailsProps) {
  return (
    <div className="space-y-4 bg-card p-6 rounded-lg shadow-sm border border-border">
      <h2 className="text-xl font-semibold mb-4">Room Details</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Current Room</p>
          <p className="font-medium">
            {roomType} {roomIndex + 1}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Room Status</p>
          <p className="font-medium">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
            >
              {status}
            </Badge>
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Last Cleaned</p>
          <p className="font-medium">{lastCleaned}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Next Booking</p>
          <p className="font-medium">{nextBooking}</p>
        </div>

        {amenities.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Amenities</p>
            <div className="flex flex-wrap gap-1">
              {amenities.map((amenity, index) => (
                <Badge key={index} variant="outline" className="bg-primary/10">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyRoomDetails;
