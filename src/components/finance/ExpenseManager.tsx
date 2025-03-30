import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, Eye, Search, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const EXPENSES = [
  {
    id: "1",
    description: "AC Repair - Ocean View Villa",
    category: "maintenance",
    propertyId: "1",
    amount: 350,
    date: new Date(2023, 4, 10),
    paidBy: "company_card",
    hasReceipt: true,
  },
  {
    id: "2",
    description: "Cleaning Supplies",
    category: "supplies",
    propertyId: "all",
    amount: 120,
    date: new Date(2023, 4, 12),
    paidBy: "company_card",
    hasReceipt: true,
  },
  {
    id: "3",
    description: "Plumbing Repair - Mountain Retreat",
    category: "maintenance",
    propertyId: "2",
    amount: 275,
    date: new Date(2023, 4, 15),
    paidBy: "reimbursement",
    hasReceipt: true,
  },
  {
    id: "4",
    description: "New Furniture - Downtown Loft",
    category: "furniture",
    propertyId: "3",
    amount: 850,
    date: new Date(2023, 4, 18),
    paidBy: "company_card",
    hasReceipt: true,
  },
  {
    id: "5",
    description: "Internet Bill - All Properties",
    category: "utilities",
    propertyId: "all",
    amount: 180,
    date: new Date(2023, 4, 20),
    paidBy: "bank_transfer",
    hasReceipt: false,
  },
];

const PROPERTIES = [
  { id: "1", name: "Ocean View Villa" },
  { id: "2", name: "Mountain Retreat" },
  { id: "3", name: "Downtown Loft" },
  { id: "all", name: "All Properties" },
];

interface ExpenseManagerProps {
  isDialog?: boolean;
  onSubmit?: () => void;
  expense?: any;
}

function ExpenseManager({ isDialog, onSubmit, expense }: ExpenseManagerProps) {
  const [date, setDate] = useState<Date | undefined>(
    expense?.date || new Date(),
  );
  const [files, setFiles] = useState<FileList | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  // Filter expenses based on search term, category, and property
  const filteredExpenses = EXPENSES.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || expense.category === categoryFilter;
    const matchesProperty =
      propertyFilter === "all" ||
      expense.propertyId === propertyFilter ||
      expense.propertyId === "all";

    return matchesSearch && matchesCategory && matchesProperty;
  });

  // Calculate total expenses
  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  // If in dialog mode, show the form
  if (isDialog) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              defaultValue={expense?.description || ""}
              placeholder="Expense description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue={expense?.category || ""}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property">Property</Label>
            <Select defaultValue={expense?.propertyId || ""}>
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
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              defaultValue={expense?.amount || "0.00"}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
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
            <Label htmlFor="paidBy">Paid By</Label>
            <Select defaultValue={expense?.paidBy || "company_card"}>
              <SelectTrigger id="paidBy">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company_card">Company Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="reimbursement">Reimbursement</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              defaultValue={expense?.notes || ""}
              placeholder="Additional notes about the expense"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="documents">Receipt</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
              <input
                id="documents"
                type="file"
                className="hidden"
                onChange={(e) => setFiles(e.target.files)}
              />
              <label
                htmlFor="documents"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Upload receipt</p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, or PNG format
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
          <Button type="submit">Save Expense</Button>
        </div>
      </form>
    );
  }

  // Otherwise, show the regular view with search functionality
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search expenses..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="management">Management</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {PROPERTIES.filter((p) => p.id !== "all").map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  No expenses found. Try adjusting your search or filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map((expense) => {
                const property = PROPERTIES.find(
                  (p) => p.id === expense.propertyId,
                );
                return (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      {expense.description}
                    </TableCell>
                    <TableCell className="capitalize">
                      {expense.category}
                    </TableCell>
                    <TableCell>{property?.name || "All Properties"}</TableCell>
                    <TableCell>{format(expense.date, "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      ${expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {expense.hasReceipt ? (
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          None
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredExpenses.length} of {EXPENSES.length} expenses
          </p>
        </div>
        <div className="text-sm">
          <span className="font-medium">Total:</span>{" "}
          <span className="font-bold">${totalExpenses.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default ExpenseManager;
