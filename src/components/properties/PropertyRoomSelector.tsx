import React from "react";
import { Button } from "@/components/ui/button";

interface RoomType {
  name: string;
  count?: number;
}

interface PropertyRoomSelectorProps {
  roomTypes: RoomType[];
  currentRoomType: string;
  onRoomTypeChange: (roomType: string) => void;
}

const PropertyRoomSelector: React.FC<PropertyRoomSelectorProps> = ({
  roomTypes = [],
  currentRoomType = "",
  onRoomTypeChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {roomTypes.map((roomType) => (
        <Button
          key={roomType.name}
          variant={currentRoomType === roomType.name ? "default" : "outline"}
          size="sm"
          className="text-xs"
          onClick={() => onRoomTypeChange && onRoomTypeChange(roomType.name)}
        >
          {roomType.name} {roomType.count && `(${roomType.count})`}
        </Button>
      ))}
    </div>
  );
};

export default PropertyRoomSelector;
