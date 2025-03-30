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
import { Download, Eye, Search, FileText } from "lucide-react";

const PAYMENTS = [
  {
    id: "1",
    invoiceId: "INV-2023-001",
    guestName: "John Smith",
    propertyId: "1",
    amount: 1250,
    date: new Date(2023, 4, 15),
    method: "credit_card",
    status: "completed",
  },
  {
    id: "2",
    invoiceId: "INV-2023-002",
    guestName: "Sarah Johnson",
    propertyId: "2",
    amount: 1680,
    date: new Date(2023, 4, 18),
    method: "bank_transfer",
    status: "completed",
  },
  {
    id: "3",
    invoiceId: "INV-2023-003",
    guestName: "Michael Brown",
    propertyId: "3",
    amount: 450,
    date: new Date(2023, 4, 20),
    method: "paypal",
    status: "pending",
  },
  {
    id: "4",
    invoiceId: "INV-2023-004",
    guestName: "Emily Davis",
    propertyId: "1",
    amount: 1750,
    date: new Date(2023, 4, 22),
    method: "credit_card",
    status: "completed",
  },
  {
    id: "5",
    invoiceId: "INV-2023-005",
    guestName: "David Wilson",
    propertyId: "3",
    amount: 1200,
    date: new Date(2023, 4, 25),
    method: "bank_transfer",
    status: "failed",
  },
];

const PROPERTIES = [
  { id: "1", name: "Ocean View Villa" },
  { id: "2", name: "Mountain Retreat" },
  { id: "3", name: "Downtown Loft" },
];

function PaymentTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  // Filter payments based on search term, status, method, and property
  const filteredPayments = PAYMENTS.filter((payment) => {
    const matchesSearch =
      payment.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || payment.method === methodFilter;
    const matchesProperty =
      propertyFilter === "all" || payment.propertyId === propertyFilter;

    return matchesSearch && matchesStatus && matchesMethod && matchesProperty;
  });

  // Calculate totals
  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  const completedAmount = filteredPayments
    .filter((payment) => payment.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = filteredPayments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const failedAmount = filteredPayments
    .filter((payment) => payment.status === "failed")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Payment Tracker</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-md bg-card">
          <div className="text-sm text-muted-foreground">Total Payments</div>
          <div className="text-2xl font-bold mt-1">
            ${totalAmount.toFixed(2)}
          </div>
        </div>
        <div className="p-4 border rounded-md bg-card">
          <div className="text-sm text-muted-foreground">Completed</div>
          <div className="text-2xl font-bold mt-1 text-green-600">
            ${completedAmount.toFixed(2)}
          </div>
        </div>
        <div className="p-4 border rounded-md bg-card">
          <div className="text-sm text-muted-foreground">Pending</div>
          <div className="text-2xl font-bold mt-1 text-amber-600">
            ${pendingAmount.toFixed(2)}
          </div>
        </div>
        <div className="p-4 border rounded-md bg-card">
          <div className="text-sm text-muted-foreground">Failed</div>
          <div className="text-2xl font-bold mt-1 text-red-600">
            ${failedAmount.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
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
              <TableHead>Invoice</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => {
                const property = PROPERTIES.find(
                  (p) => p.id === payment.propertyId,
                );
                return (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {payment.invoiceId}
                      </div>
                    </TableCell>
                    <TableCell>{payment.guestName}</TableCell>
                    <TableCell>{property?.name}</TableCell>
                    <TableCell>{format(payment.date, "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <span className="capitalize">
                        {payment.method.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      ${payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-4 text-muted-foreground"
                >
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default PaymentTracker;
