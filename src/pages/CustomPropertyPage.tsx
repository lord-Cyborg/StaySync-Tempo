import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CustomPropertyCard from "@/components/properties/CustomPropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RoomType {
  name: string;
  count: number;
}

function CustomPropertyPage() {
  const navigate = useNavigate();
  const [currentRoomType, setCurrentRoomType] = useState<string>("");
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(0);
  const [statusOption, setStatusOption] = useState<"EC" | "LT" | "Normal">(
    "Normal",
  );

  const propertyId = "13";
  const propertyName = "Villa Oceano";
  const propertyImage =
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80";

  const roomTypes: RoomType[] = [
    { name: "Master Suite", count: 1 },
    { name: "Guest Room", count: 2 },
    { name: "Living Room", count: 1 },
    { name: "Kitchen", count: 1 },
    { name: "Bathroom", count: 3 },
  ];

  useEffect(() => {
    // Set default room type on load
    if (roomTypes.length > 0 && !currentRoomType) {
      setCurrentRoomType(roomTypes[0].name);
    }
  }, []);

  const handleRoomTypeChange = (roomType: string) => {
    setCurrentRoomType(roomType);
    setCurrentRoomIndex(0); // Reset index when changing room type
  };

  const handleRoomIndexChange = (index: number) => {
    setCurrentRoomIndex(index);
  };

  const handleStatusOptionChange = (option: "EC" | "LT" | "Normal") => {
    setStatusOption(option);
  };

  const handleHomeClick = () => {
    navigate("/properties");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/properties")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Property Details</h1>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate("/property/edit/13")}
            >
              Edit Property
            </Button>
            <Button variant="default">Manage Bookings</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="h-[400px] w-full">
              <CustomPropertyCard
                id={propertyId}
                name={propertyName}
                image={propertyImage}
                status="B2B"
                showHomeButton={true}
                roomTypes={roomTypes}
                currentRoomType={currentRoomType}
                currentRoomIndex={currentRoomIndex}
                onHomeClick={handleHomeClick}
                onRoomTypeChange={handleRoomTypeChange}
                onRoomIndexChange={handleRoomIndexChange}
                onStatusOptionChange={handleStatusOptionChange}
              />
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4">
                Property Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Property ID</p>
                  <p className="font-medium">{propertyId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Property Name</p>
                  <p className="font-medium">{propertyName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">B2B ({statusOption})</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Rooms</p>
                  <p className="font-medium">
                    {roomTypes.reduce((acc, room) => acc + room.count, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4">Room Details</h2>
              {currentRoomType && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Room
                    </p>
                    <p className="font-medium">
                      {currentRoomType} {currentRoomIndex + 1}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Room Status</p>
                    <p className="font-medium">Available</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Last Cleaned
                    </p>
                    <p className="font-medium">Today, 10:30 AM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Next Booking
                    </p>
                    <p className="font-medium">None</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Schedule Cleaning
                </Button>
                <Button className="w-full" variant="outline">
                  Request Maintenance
                </Button>
                <Button className="w-full" variant="outline">
                  Update Inventory
                </Button>
                <Button className="w-full" variant="outline">
                  View Booking History
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CustomPropertyPage;
