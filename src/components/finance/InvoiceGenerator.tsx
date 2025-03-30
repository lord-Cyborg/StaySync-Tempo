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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    amount: 1250,
  },
  {
    id: "2",
    propertyId: "2",
    guestName: "Sarah Johnson",
    guestEmail: "sarah@example.com",
    startDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    amount: 1680,
  },
];

interface InvoiceGeneratorProps {
  isDialog?: boolean;
  onSubmit?: () => void;
  invoice?: any;
}

function InvoiceGenerator({
  isDialog,
  onSubmit,
  invoice,
}: InvoiceGeneratorProps) {
  const [date, setDate] = useState<Date | undefined>(
    invoice?.date || new Date(),
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(
    invoice?.dueDate || new Date(new Date().setDate(new Date().getDate() + 14)),
  );
  const [selectedBooking, setSelectedBooking] = useState<string>(
    invoice?.bookingId || "",
  );
  const [lineItems, setLineItems] = useState<
    Array<{
      id: string;
      description: string;
      quantity: number;
      unitPrice: number;
    }>
  >(
    invoice?.lineItems || [
      { id: "1", description: "Accommodation", quantity: 1, unitPrice: 0 },
    ],
  );

  // Find the selected booking
  const booking = BOOKINGS.find((b) => b.id === selectedBooking);
  const property = booking
    ? PROPERTIES.find((p) => p.id === booking.propertyId)
    : null;

  // Calculate totals
  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const taxRate = 0.08; // 8%
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const handleLineItemChange = (
    id: string,
    field: "description" | "quantity" | "unitPrice",
    value: string | number,
  ) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleBookingSelect = (bookingId: string) => {
    setSelectedBooking(bookingId);
    const selectedBooking = BOOKINGS.find((b) => b.id === bookingId);
    if (selectedBooking) {
      // Update the first line item with booking details
      const updatedLineItems = [...lineItems];
      updatedLineItems[0] = {
        ...updatedLineItems[0],
        description: `Accommodation (${format(selectedBooking.startDate, "MMM d")} - ${format(
          selectedBooking.endDate,
          "MMM d, yyyy",
        )})`,
        unitPrice: selectedBooking.amount,
      };
      setLineItems(updatedLineItems);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isDialog && (
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Invoice Generator</h2>
          <Button type="submit">Generate Invoice</Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="booking">Select Booking</Label>
            <Select value={selectedBooking} onValueChange={handleBookingSelect}>
              <SelectTrigger id="booking">
                <SelectValue placeholder="Select a booking" />
              </SelectTrigger>
              <SelectContent>
                {BOOKINGS.map((booking) => {
                  const property = PROPERTIES.find(
                    (p) => p.id === booking.propertyId,
                  );
                  return (
                    <SelectItem key={booking.id} value={booking.id}>
                      {booking.guestName} - {property?.name} (
                      {format(booking.startDate, "MMM d")} -{" "}
                      {format(booking.endDate, "MMM d")})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {booking && (
            <div className="p-4 border rounded-md bg-muted/50 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Guest:</span>
                <span>{booking.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{booking.guestEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Property:</span>
                <span>{property?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Dates:</span>
                <span>
                  {format(booking.startDate, "MMM d")} -{" "}
                  {format(booking.endDate, "MMM d, yyyy")}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Invoice Date</Label>
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
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes for the invoice"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Line Items</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddLineItem}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px]">Qty</TableHead>
                  <TableHead className="w-[120px]">Price</TableHead>
                  <TableHead className="w-[120px]">Total</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) =>
                          handleLineItemChange(
                            item.id,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Item description"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleLineItemChange(
                            item.id,
                            "quantity",
                            parseInt(e.target.value) || 1,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) =>
                          handleLineItemChange(
                            item.id,
                            "unitPrice",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="text-right"
                      />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveLineItem(item.id)}
                        disabled={lineItems.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2 p-4 border rounded-md">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
              <span className="font-medium">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="h-[1px] bg-border my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {isDialog && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSubmit}>
            Cancel
          </Button>
          <Button type="submit">Generate Invoice</Button>
        </div>
      )}
    </form>
  );
}

export default InvoiceGenerator;
