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
import { addDays, format } from "date-fns";
import { Edit, Eye, Search, Trash2 } from "lucide-react";

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
    guestEmail: "john@example.com",
    guests: 4,
    startDate: new Date(),
    endDate: addDays(new Date(), 5),
    status: "confirmed",
    totalAmount: 1250,
  },
  {
    id: "2",
    propertyId: "2",
    guestName: "Sarah Johnson",
    guestEmail: "sarah@example.com",
    guests: 2,
    startDate: addDays(new Date(), 3),
    endDate: addDays(new Date(), 10),
    status: "confirmed",
    totalAmount: 1680,
  },
  {
    id: "3",
    propertyId: "3",
    guestName: "Michael Brown",
    guestEmail: "michael@example.com",
    guests: 3,
    startDate: addDays(new Date(), 7),
    endDate: addDays(new Date(), 9),
    status: "pending",
    totalAmount: 450,
  },
  {
    id: "4",
    propertyId: "1",
    guestName: "Emily Davis",
    guestEmail: "emily@example.com",
    guests: 2,
    startDate: addDays(new Date(), 14),
    endDate: addDays(new Date(), 21),
    status: "confirmed",
    totalAmount: 1750,
  },
  {
    id: "5",
    propertyId: "3",
    guestName: "David Wilson",
    guestEmail: "david@example.com",
    guests: 1,
    startDate: addDays(new Date(), 10),
    endDate: addDays(new Date(), 15),
    status: "confirmed",
    totalAmount: 1200,
  },
];

function BookingList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  // Filter bookings based on search term, status, and property
  const filteredBookings = BOOKINGS.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesProperty =
      propertyFilter === "all" || booking.propertyId === propertyFilter;

    return matchesSearch && matchesStatus && matchesProperty;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Property" />
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
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => {
                const property = PROPERTIES.find(
                  (p) => p.id === booking.propertyId,
                );
                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.guestName}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.guestEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{property?.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{format(booking.startDate, "MMM d, yyyy")} - </p>
                        <p>{format(booking.endDate, "MMM d, yyyy")}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.guests} guests
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      ${booking.totalAmount.toFixed(2)}
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
                  colSpan={6}
                  className="text-center py-4 text-muted-foreground"
                >
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default BookingList;
