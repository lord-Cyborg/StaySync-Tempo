import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

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
};

interface InventoryItemFormProps {
  onSubmit?: () => void;
  item?: any;
  propertyId: string;
  roomId?: string;
}

function InventoryItemForm({
  onSubmit,
  item,
  propertyId,
  roomId,
}: InventoryItemFormProps) {
  const [date, setDate] = useState<Date | undefined>(
    item?.purchaseDate || new Date(),
  );
  const [files, setFiles] = useState<FileList | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    roomId || item?.roomId || "",
  );

  // Get rooms for the selected property
  const rooms =
    ROOMS_BY_PROPERTY[propertyId as keyof typeof ROOMS_BY_PROPERTY] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">Item Name</Label>
          <Input id="name" defaultValue={item?.name || ""} placeholder="Sofa" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="room">Room</Label>
          <Select
            value={selectedRoomId}
            onValueChange={setSelectedRoomId}
            disabled={!!roomId}
          >
            <SelectTrigger id="room">
              <SelectValue placeholder="Select room" />
            </SelectTrigger>
            <SelectContent>
              {rooms.map((room) => (
                <SelectItem key={room.id} value={room.id}>
                  {room.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select defaultValue={item?.category || ""}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="appliances">Appliances</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="lighting">Lighting</SelectItem>
              <SelectItem value="decor">Decor</SelectItem>
              <SelectItem value="linens">Linens</SelectItem>
              <SelectItem value="kitchenware">Kitchenware</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <Select defaultValue={item?.condition || "good"}>
            <SelectTrigger id="condition">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Purchase Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Value ($)</Label>
          <Input
            id="value"
            type="number"
            min="0"
            step="0.01"
            defaultValue={item?.value || "0.00"}
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            defaultValue={item?.notes || ""}
            placeholder="Additional details about the item"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="photos">Item Photos</Label>
          <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
            <input
              id="photos"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => setFiles(e.target.files)}
            />
            <label
              htmlFor="photos"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Upload item photos</p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag and drop or click to upload
              </p>
            </label>
          </div>
          {files && files.length > 0 && (
            <div className="text-sm mt-2">
              {Array.from(files).map((file, index) => (
                <p key={index} className="text-muted-foreground">
                  {file.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit">Save Item</Button>
      </div>
    </form>
  );
}

export default InventoryItemForm;
