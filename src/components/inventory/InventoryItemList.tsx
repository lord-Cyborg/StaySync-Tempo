import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Edit, Eye, Search, Trash2 } from "lucide-react";

// Define room data by property
const ROOMS_BY_PROPERTY = {
  "1": [
    // Ocean View Villa
    { id: "101", name: "Living Room" },
    { id: "102", name: "Kitchen" },
    { id: "103", name: "Master Bedroom" },
    { id: "104", name: "Guest Bedroom 1" },
    { id: "105", name: "Guest Bedroom 2" },
    { id: "106", name: "Bathroom 1" },
    { id: "107", name: "Bathroom 2" },
    { id: "108", name: "Patio" },
  ],
  "2": [
    // Mountain Retreat
    { id: "201", name: "Living Room" },
    { id: "202", name: "Kitchen" },
    { id: "203", name: "Master Bedroom" },
    { id: "204", name: "Guest Bedroom" },
    { id: "205", name: "Bathroom 1" },
    { id: "206", name: "Bathroom 2" },
    { id: "207", name: "Deck" },
  ],
  "3": [
    // Downtown Loft
    { id: "301", name: "Living Area" },
    { id: "302", name: "Kitchen" },
    { id: "303", name: "Bedroom" },
    { id: "304", name: "Bathroom" },
    { id: "305", name: "Office Nook" },
  ],
  "4": [
    // Lakeside Cottage
    { id: "401", name: "Living Room" },
    { id: "402", name: "Kitchen" },
    { id: "403", name: "Master Bedroom" },
    { id: "404", name: "Guest Bedroom" },
    { id: "405", name: "Bathroom 1" },
    { id: "406", name: "Bathroom 2" },
    { id: "407", name: "Dock" },
  ],
  "5": [
    // Desert Oasis
    { id: "501", name: "Living Room" },
    { id: "502", name: "Kitchen" },
    { id: "503", name: "Master Bedroom" },
    { id: "504", name: "Guest Bedroom 1" },
    { id: "505", name: "Guest Bedroom 2" },
    { id: "506", name: "Bathroom 1" },
    { id: "507", name: "Bathroom 2" },
    { id: "508", name: "Pool Area" },
  ],
  "6": [
    // Historic Brownstone
    { id: "601", name: "Living Room" },
    { id: "602", name: "Kitchen" },
    { id: "603", name: "Dining Room" },
    { id: "604", name: "Master Bedroom" },
    { id: "605", name: "Guest Bedroom 1" },
    { id: "606", name: "Guest Bedroom 2" },
    { id: "607", name: "Bathroom 1" },
    { id: "608", name: "Bathroom 2" },
    { id: "609", name: "Study" },
  ],
};

// Define inventory items data
const INVENTORY_ITEMS = [
  {
    id: "1",
    name: "Sofa",
    propertyId: "1",
    roomId: "101",
    category: "furniture",
    condition: "good",
    purchaseDate: new Date(2022, 3, 15),
    value: 1200,
    notes: "Gray sectional, 3 pieces",
  },
  {
    id: "2",
    name: "Coffee Table",
    propertyId: "1",
    roomId: "101",
    category: "furniture",
    condition: "excellent",
    purchaseDate: new Date(2022, 5, 10),
    value: 450,
    notes: "Solid wood with glass top",
  },
  {
    id: "3",
    name: "TV",
    propertyId: "1",
    roomId: "101",
    category: "electronics",
    condition: "good",
    purchaseDate: new Date(2021, 11, 5),
    value: 800,
    notes: "55-inch Samsung Smart TV",
  },
  {
    id: "4",
    name: "Refrigerator",
    propertyId: "1",
    roomId: "102",
    category: "appliances",
    condition: "fair",
    purchaseDate: new Date(2020, 7, 22),
    value: 1500,
    notes: "Stainless steel, needs maintenance",
  },
  {
    id: "5",
    name: "Microwave",
    propertyId: "1",
    roomId: "102",
    category: "appliances",
    condition: "good",
    purchaseDate: new Date(2021, 9, 14),
    value: 250,
    notes: "Countertop model",
  },
  {
    id: "6",
    name: "King Bed",
    propertyId: "1",
    roomId: "103",
    category: "furniture",
    condition: "excellent",
    purchaseDate: new Date(2022, 2, 8),
    value: 1800,
    notes: "Includes frame, mattress, and headboard",
  },
  {
    id: "7",
    name: "Dresser",
    propertyId: "1",
    roomId: "103",
    category: "furniture",
    condition: "good",
    purchaseDate: new Date(2022, 2, 8),
    value: 600,
    notes: "6-drawer wooden dresser",
  },
  {
    id: "8",
    name: "Nightstand",
    propertyId: "1",
    roomId: "103",
    category: "furniture",
    condition: "good",
    purchaseDate: new Date(2022, 2, 8),
    value: 200,
    notes: "Matching pair",
  },
  {
    id: "9",
    name: "Queen Bed",
    propertyId: "1",
    roomId: "104",
    category: "furniture",
    condition: "good",
    purchaseDate: new Date(2021, 5, 12),
    value: 1200,
    notes: "Includes frame, mattress, and headboard",
  },
  {
    id: "10",
    name: "Desk",
    propertyId: "1",
    roomId: "104",
    category: "furniture",
    condition: "fair",
    purchaseDate: new Date(2020, 3, 20),
    value: 350,
    notes: "Small writing desk, needs refinishing",
  },
  {
    id: "11",
    name: "Dining Table",
    propertyId: "2",
    roomId: "201",
    category: "furniture",
    condition: "excellent",
    purchaseDate: new Date(2022, 1, 15),
    value: 900,
    notes: "Seats 6, solid wood",
  },
  {
    id: "12",
    name: "Sofa",
    propertyId: "2",
    roomId: "201",
    category: "furniture",
    condition: "good",
    purchaseDate: new Date(2021, 8, 10),
    value: 1100,
    notes: "Leather, 3-seater",
  },
  {
    id: "13",
    name: "Armchair",
    propertyId: "3",
    roomId: "301",
    category: "furniture",
    condition: "excellent",
    purchaseDate: new Date(2022, 4, 5),
    value: 550,
    notes: "Modern design, gray fabric",
  },
  {
    id: "14",
    name: "Bookshelf",
    propertyId: "3",
    roomId: "301",
    category: "furniture",
    condition: "good",
    purchaseDate: new Date(2021, 11, 20),
    value: 320,
    notes: "5 shelves, white",
  },
  {
    id: "15",
    name: "Desk Lamp",
    propertyId: "3",
    roomId: "305",
    category: "lighting",
    condition: "good",
    purchaseDate: new Date(2022, 1, 8),
    value: 85,
    notes: "Adjustable LED lamp",
  },
  // Additional inventory items for other properties
  {
    id: "16",
    name: "Outdoor Dining Set",
    propertyId: "4",
    roomId: "407",
    category: "furniture",
    condition: "good",
    purchaseDate: new Date(2022, 4, 20),
    value: 750,
    notes: "Table with 6 chairs, weather-resistant",
  },
  {
    id: "17",
    name: "Kayak",
    propertyId: "4",
    roomId: "407",
    category: "recreation",
    condition: "excellent",
    purchaseDate: new Date(2022, 5, 15),
    value: 600,
    notes: "Two-person kayak with paddles",
  },
  {
    id: "18",
    name: "Outdoor Grill",
    propertyId: "5",
    roomId: "508",
    category: "appliances",
    condition: "good",
    purchaseDate: new Date(2021, 3, 10),
    value: 850,
    notes: "Propane grill with side burner",
  },
  {
    id: "19",
    name: "Pool Loungers",
    propertyId: "5",
    roomId: "508",
    category: "furniture",
    condition: "good",
    purchaseDate: new Date(2022, 2, 25),
    value: 400,
    notes: "Set of 4 adjustable loungers",
  },
  {
    id: "20",
    name: "Antique Chandelier",
    propertyId: "6",
    roomId: "603",
    category: "lighting",
    condition: "excellent",
    purchaseDate: new Date(2020, 9, 5),
    value: 1200,
    notes: "Crystal chandelier, restored",
  },
  {
    id: "21",
    name: "Fireplace Tools",
    propertyId: "6",
    roomId: "601",
    category: "accessories",
    condition: "good",
    purchaseDate: new Date(2021, 10, 12),
    value: 150,
    notes: "Wrought iron set with stand",
  },
  {
    id: "22",
    name: "Antique Writing Desk",
    propertyId: "6",
    roomId: "609",
    category: "furniture",
    condition: "good",
    purchaseDate: new Date(2019, 7, 15),
    value: 950,
    notes: "Mahogany with leather inlay",
  },
];

interface InventoryItemListProps {
  propertyId: string;
  roomId?: string;
}

function InventoryItemList({ propertyId, roomId }: InventoryItemListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [roomFilter, setRoomFilter] = useState(roomId || "all");

  // If roomId is provided as a prop, use it for filtering
  const effectiveRoomFilter = roomId || roomFilter;

  // Get rooms for the selected property
  const rooms =
    ROOMS_BY_PROPERTY[propertyId as keyof typeof ROOMS_BY_PROPERTY] || [];

  // Filter inventory items based on search term, category, condition, property, and room
  const filteredItems = INVENTORY_ITEMS.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesCondition =
      conditionFilter === "all" || item.condition === conditionFilter;
    const matchesProperty = item.propertyId === propertyId;
    const matchesRoom =
      effectiveRoomFilter === "all" || item.roomId === effectiveRoomFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesCondition &&
      matchesProperty &&
      matchesRoom
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          {searchTerm && (
            <p className="text-sm text-muted-foreground mt-1">
              Searching for: "{searchTerm}"
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {!roomId && (
            <Select value={roomFilter} onValueChange={setRoomFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rooms</SelectItem>
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="appliances">Appliances</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="lighting">Lighting</SelectItem>
              <SelectItem value="decor">Decor</SelectItem>
              <SelectItem value="linens">Linens</SelectItem>
              <SelectItem value="kitchenware">Kitchenware</SelectItem>
              <SelectItem value="recreation">Recreation</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
          <Select value={conditionFilter} onValueChange={setConditionFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              {!roomId && <TableHead>Room</TableHead>}
              <TableHead>Category</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const room = rooms.find((r) => r.id === item.roomId);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    {!roomId && <TableCell>{room?.name}</TableCell>}
                    <TableCell className="capitalize">
                      {item.category}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          item.condition === "excellent"
                            ? "bg-green-100 text-green-800"
                            : item.condition === "good"
                              ? "bg-blue-100 text-blue-800"
                              : item.condition === "fair"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.condition}
                      </span>
                    </TableCell>
                    <TableCell>
                      {format(item.purchaseDate, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.value.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={roomId ? 6 : 7}
                  className="text-center py-4 text-muted-foreground"
                >
                  {searchTerm ? (
                    <>No inventory items found matching "{searchTerm}"</>
                  ) : (
                    "No inventory items found"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default InventoryItemList;

// Export constants separately from the component
export { ROOMS_BY_PROPERTY, INVENTORY_ITEMS };
