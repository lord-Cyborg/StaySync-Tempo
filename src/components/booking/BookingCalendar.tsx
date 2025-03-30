import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays, format } from "date-fns";

const PROPERTIES = [
  { id: "1", name: "Ocean View Villa" },
  { id: "2", name: "Mountain Retreat" },
  { id: "3", name: "Downtown Loft" },
];

const BOOKINGS = [
  {
    id: "1",
    propertyId: "1",
    guestName: "John Smith",
    startDate: new Date(),
    endDate: addDays(new Date(), 5),
    status: "confirmed",
  },
  {
    id: "2",
    propertyId: "2",
    guestName: "Sarah Johnson",
    startDate: addDays(new Date(), 3),
    endDate: addDays(new Date(), 10),
    status: "confirmed",
  },
  {
    id: "3",
    propertyId: "3",
    guestName: "Michael Brown",
    startDate: addDays(new Date(), 7),
    endDate: addDays(new Date(), 9),
    status: "pending",
  },
];

function BookingCalendar() {
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [date, setDate] = useState<Date>(new Date());

  // Filter bookings based on selected property
  const filteredBookings =
    selectedProperty === "all"
      ? BOOKINGS
      : BOOKINGS.filter((booking) => booking.propertyId === selectedProperty);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Booking Calendar</h2>
        <Select value={selectedProperty} onValueChange={setSelectedProperty}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            {PROPERTIES.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="md:col-span-5">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border w-full"
              modifiers={{
                booked: filteredBookings.flatMap((booking) => {
                  const dates = [];
                  let currentDate = new Date(booking.startDate);
                  while (currentDate <= booking.endDate) {
                    dates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                  }
                  return dates;
                }),
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                  fontWeight: "bold",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">
              Bookings for {format(date, "MMM d, yyyy")}
            </h3>
            <div className="space-y-2">
              {filteredBookings
                .filter(
                  (booking) =>
                    date >= booking.startDate && date <= booking.endDate,
                )
                .map((booking) => {
                  const property = PROPERTIES.find(
                    (p) => p.id === booking.propertyId,
                  );
                  return (
                    <div key={booking.id} className="p-2 border rounded-md">
                      <p className="font-medium">{property?.name}</p>
                      <p className="text-sm">{booking.guestName}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {format(booking.startDate, "MMM d")} -{" "}
                          {format(booking.endDate, "MMM d")}
                        </span>
                        <span
                          className={
                            booking.status === "confirmed"
                              ? "text-green-500"
                              : "text-amber-500"
                          }
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              {filteredBookings.filter(
                (booking) =>
                  date >= booking.startDate && date <= booking.endDate,
              ).length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No bookings for this date
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BookingCalendar;
