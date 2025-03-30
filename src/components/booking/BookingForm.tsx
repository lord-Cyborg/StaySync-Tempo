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
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";

const PROPERTIES = [
  { id: "1", name: "Ocean View Villa" },
  { id: "2", name: "Mountain Retreat" },
  { id: "3", name: "Downtown Loft" },
];

interface BookingFormProps {
  onSubmit?: () => void;
  booking?: any;
}

function BookingForm({ onSubmit, booking }: BookingFormProps) {
  const [date, setDate] = useState({
    from: booking?.startDate || new Date(),
    to: booking?.endDate || addDays(new Date(), 5),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="property">Property</Label>
          <Select defaultValue={booking?.propertyId || ""}>
            <SelectTrigger id="property">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTIES.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={booking?.status || "confirmed"}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guestName">Guest Name</Label>
          <Input
            id="guestName"
            defaultValue={booking?.guestName || ""}
            placeholder="John Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guestEmail">Guest Email</Label>
          <Input
            id="guestEmail"
            defaultValue={booking?.guestEmail || ""}
            placeholder="john@example.com"
            type="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guestPhone">Guest Phone</Label>
          <Input
            id="guestPhone"
            defaultValue={booking?.guestPhone || ""}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <Input
            id="guests"
            defaultValue={booking?.guests || "2"}
            type="number"
            min="1"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Booking Dates</Label>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <Textarea
            id="specialRequests"
            defaultValue={booking?.specialRequests || ""}
            placeholder="Any special requests or notes for this booking"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit">Save Booking</Button>
      </div>
    </form>
  );
}

export default BookingForm;
