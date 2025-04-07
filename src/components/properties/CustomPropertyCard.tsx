import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

interface RoomType {
  name: string;
  count?: number;
}

interface CustomPropertyCardProps {
  id: string;
  name?: string;
  image: string;
  status?: "B2B" | "N/R" | "b2b";
  showHomeButton?: boolean;
  roomTypes?: RoomType[];
  currentRoomType?: string;
  currentRoomIndex?: number;
  onHomeClick?: () => void;
  onRoomTypeChange?: (roomType: string) => void;
  onRoomIndexChange?: (index: number) => void;
  onStatusOptionChange?: (option: "EC" | "LT" | "Normal") => void;
}

function CustomPropertyCard({
  id,
  name,
  image,
  status,
  showHomeButton = false,
  roomTypes = [],
  currentRoomType = "",
  currentRoomIndex = 0,
  onHomeClick,
  onRoomTypeChange,
  onRoomIndexChange,
  onStatusOptionChange,
}: CustomPropertyCardProps) {
  const [statusOption, setStatusOption] = useState<"EC" | "LT" | "Normal">(
    "Normal",
  );

  const handleStatusOptionChange = (option: "EC" | "LT" | "Normal") => {
    setStatusOption(option);
    if (onStatusOptionChange) {
      onStatusOptionChange(option);
    }
  };

  const getStatusBadgeVariant = () => {
    if (!status) return "outline";

    const upperStatus = status.toUpperCase();

    if (upperStatus === "B2B") return "default";
    if (upperStatus === "N/R") return "secondary";
    return "outline";
  };

  const getStatusOptionButtonClass = (option: "EC" | "LT" | "Normal") => {
    const baseClasses = "rounded-full w-8 h-8 flex items-center justify-center";

    if (statusOption === option) {
      switch (option) {
        case "EC":
          return `${baseClasses} bg-orange-500 text-white`;
        case "LT":
          return `${baseClasses} bg-violet-500 text-white`;
        case "Normal":
          return `${baseClasses} border-2 border-gray-400 bg-background`;
      }
    } else {
      switch (option) {
        case "EC":
          return `${baseClasses} border border-orange-500 text-orange-500 hover:bg-orange-100`;
        case "LT":
          return `${baseClasses} border border-violet-500 text-violet-500 hover:bg-violet-100`;
        case "Normal":
          return `${baseClasses} border border-gray-300 hover:border-gray-400`;
      }
    }
  };

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md bg-background">
      <div className="relative h-48 w-full">
        {/* Main Image */}
        <img
          src={image}
          alt={name || "Property"}
          className="w-full h-full object-cover"
        />

        {/* ID in top center */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full">
          <span className="text-white text-xs font-medium">{id}</span>
        </div>

        {/* Home button in top left (conditional) */}
        {showHomeButton && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 left-2 bg-white/80 hover:bg-white"
            onClick={onHomeClick}
          >
            <Home className="h-4 w-4" />
          </Button>
        )}

        {/* Status badge in bottom left */}
        {status && (
          <div className="absolute bottom-2 left-2">
            <Badge variant={getStatusBadgeVariant()}>{status}</Badge>
          </div>
        )}

        {/* B2B Status selection buttons in bottom center (conditional) */}
        {status &&
          (status.toUpperCase() === "B2B" ||
            status.toLowerCase() === "b2b") && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button
                className={getStatusOptionButtonClass("EC")}
                onClick={() => handleStatusOptionChange("EC")}
                title="Early Check-in"
              >
                EC
              </button>
              <button
                className={getStatusOptionButtonClass("LT")}
                onClick={() => handleStatusOptionChange("LT")}
                title="Late Check-out"
              >
                LT
              </button>
              <button
                className={getStatusOptionButtonClass("Normal")}
                onClick={() => handleStatusOptionChange("Normal")}
                title="Normal"
              >
                {statusOption === "Normal" ? "" : "N"}
              </button>
            </div>
          )}
      </div>

      {/* Room type navigation tabs */}
      {roomTypes.length > 0 && (
        <CardContent className="p-2 space-y-2">
          <div className="flex flex-wrap gap-1">
            {roomTypes.map((roomType) => (
              <Button
                key={roomType.name}
                variant={
                  currentRoomType === roomType.name ? "default" : "outline"
                }
                size="sm"
                className="text-xs"
                onClick={() =>
                  onRoomTypeChange && onRoomTypeChange(roomType.name)
                }
              >
                {roomType.name} {roomType.count && `(${roomType.count})`}
              </Button>
            ))}
          </div>

          {/* Room index navigation (if current room type has multiple units) */}
          {roomTypes.find((rt) => rt.name === currentRoomType)?.count &&
            roomTypes.find((rt) => rt.name === currentRoomType)?.count! > 1 && (
              <div className="flex justify-center items-center space-x-2 pt-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  disabled={currentRoomIndex <= 0}
                  onClick={() =>
                    onRoomIndexChange && onRoomIndexChange(currentRoomIndex - 1)
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs">
                  {currentRoomIndex + 1} /{" "}
                  {roomTypes.find((rt) => rt.name === currentRoomType)?.count}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  disabled={
                    currentRoomIndex >=
                    roomTypes.find((rt) => rt.name === currentRoomType)
                      ?.count! -
                      1
                  }
                  onClick={() =>
                    onRoomIndexChange && onRoomIndexChange(currentRoomIndex + 1)
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
        </CardContent>
      )}
    </Card>
  );
}

export default CustomPropertyCard;
