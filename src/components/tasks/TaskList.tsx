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
import { addDays, format, isPast } from "date-fns";
import { CheckCircle2, Edit, Eye, Search, Trash2 } from "lucide-react";

const PROPERTIES = [
  { id: "1", name: "Ocean View Villa" },
  { id: "2", name: "Mountain Retreat" },
  { id: "3", name: "Downtown Loft" },
];

const TEAM_MEMBERS = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Robert Johnson" },
];

const TASKS = [
  {
    id: "1",
    title: "Replace AC filter",
    propertyId: "1",
    assignedTo: "1",
    dueDate: new Date(),
    priority: "high",
    status: "in-progress",
    type: "maintenance",
  },
  {
    id: "2",
    title: "Deep cleaning",
    propertyId: "2",
    assignedTo: "2",
    dueDate: addDays(new Date(), 1),
    priority: "medium",
    status: "in-progress",
    type: "cleaning",
  },
  {
    id: "3",
    title: "Restock supplies",
    propertyId: "3",
    assignedTo: "3",
    dueDate: addDays(new Date(), 3),
    priority: "low",
    status: "in-progress",
    type: "inventory",
  },
  {
    id: "4",
    title: "Fix leaking faucet",
    propertyId: "1",
    assignedTo: "1",
    dueDate: addDays(new Date(), -2),
    priority: "high",
    status: "in-progress",
    type: "maintenance",
  },
  {
    id: "5",
    title: "Replace broken lamp",
    propertyId: "2",
    assignedTo: "3",
    dueDate: addDays(new Date(), -1),
    priority: "medium",
    status: "completed",
    type: "maintenance",
  },
  {
    id: "6",
    title: "Check smoke detectors",
    propertyId: "3",
    assignedTo: "2",
    dueDate: addDays(new Date(), 5),
    priority: "high",
    status: "completed",
    type: "safety",
  },
];

interface TaskListProps {
  filter?: string;
}

function TaskList({ filter = "all" }: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  // Filter tasks based on search term, type, property, and status
  const filteredTasks = TASKS.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || task.type === typeFilter;
    const matchesProperty =
      propertyFilter === "all" || task.propertyId === propertyFilter;

    let matchesStatus = true;
    if (filter === "completed") {
      matchesStatus = task.status === "completed";
    } else if (filter === "in-progress") {
      matchesStatus = task.status === "in-progress";
    } else if (filter === "overdue") {
      matchesStatus = task.status === "in-progress" && isPast(task.dueDate);
    }

    return matchesSearch && matchesType && matchesProperty && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inventory">Inventory</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
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
              <TableHead>Task</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                const property = PROPERTIES.find(
                  (p) => p.id === task.propertyId,
                );
                const assignee = TEAM_MEMBERS.find(
                  (m) => m.id === task.assignedTo,
                );
                const isOverdue =
                  isPast(task.dueDate) && task.status !== "completed";

                return (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {task.type}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{property?.name}</TableCell>
                    <TableCell>{assignee?.name}</TableCell>
                    <TableCell>
                      <div
                        className={`text-sm ${isOverdue ? "text-red-500 font-medium" : ""}`}
                      >
                        {format(task.dueDate, "MMM d, yyyy")}
                        {isOverdue && <p className="text-xs">Overdue</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {task.status === "completed"
                          ? "Completed"
                          : "In Progress"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {task.status !== "completed" && (
                          <Button variant="ghost" size="icon">
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
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
                  colSpan={7}
                  className="text-center py-4 text-muted-foreground"
                >
                  No tasks found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TaskList;
