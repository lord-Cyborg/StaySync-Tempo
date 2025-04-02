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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { addDays, format, isPast } from "date-fns";
import { CheckCircle2, Edit, Eye, Search, Trash2 } from "lucide-react";
import { db } from "@/lib/database";
import TaskForm from "./TaskForm";

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

// Initial tasks data - will be replaced with database calls
let TASKS = [
  {
    id: "1",
    title: "Replace AC filter",
    propertyId: "1",
    assignedTo: "1",
    dueDate: new Date(),
    priority: "high",
    status: "in-progress",
    type: "maintenance",
    description:
      "Replace the AC filter in the main unit. Filters are stored in the maintenance closet.",
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
    description:
      "Complete deep cleaning of all rooms including carpet shampooing and window washing.",
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
    description:
      "Restock bathroom supplies, kitchen essentials, and cleaning products.",
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
    description:
      "Repair the leaking faucet in the master bathroom. May need new washers.",
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
    description:
      "Replace the broken lamp in the living room. New lamp is in storage.",
    completedAt: new Date().toISOString(),
    completionNotes: "Replaced with new lamp from inventory.",
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
    description: "Test all smoke detectors and replace batteries if needed.",
    completedAt: new Date().toISOString(),
    completionNotes:
      "All detectors working properly. Replaced batteries in two units.",
  },
];

interface TaskListProps {
  filter?: string;
  onTaskUpdate?: () => void;
}

function TaskList({ filter = "all", onTaskUpdate }: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [localTasks, setLocalTasks] = useState(TASKS);

  // Filter tasks based on search term, type, property, and status
  const filteredTasks = localTasks.filter((task) => {
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

  // Handle marking a task as complete
  const handleMarkComplete = async (taskId: string) => {
    try {
      // In a real app, this would be a database call
      // await db.updateTask(taskId, { status: "completed", completedAt: new Date().toISOString() });

      // For now, update the local state
      const updatedTasks = localTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: "completed",
            completedAt: new Date().toISOString(),
          };
        }
        return task;
      });

      setLocalTasks(updatedTasks);
      TASKS = updatedTasks; // Update the global variable for demo purposes

      if (onTaskUpdate) {
        onTaskUpdate();
      }
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  // Handle viewing task details
  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setIsViewDialogOpen(true);
  };

  // Handle editing a task
  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  // Handle deleting a task
  const handleDeleteTask = (task: any) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  // Confirm task deletion
  const confirmDeleteTask = async () => {
    try {
      // In a real app, this would be a database call
      // await db.deleteTask(selectedTask.id);

      // For now, update the local state
      const updatedTasks = localTasks.filter(
        (task) => task.id !== selectedTask.id,
      );
      setLocalTasks(updatedTasks);
      TASKS = updatedTasks; // Update the global variable for demo purposes

      setIsDeleteDialogOpen(false);

      if (onTaskUpdate) {
        onTaskUpdate();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle task form submission (for editing)
  const handleTaskFormSubmit = () => {
    // In a real app, this would update the task in the database
    // For now, we'll just close the dialog
    setIsEditDialogOpen(false);

    // Refresh the task list
    if (onTaskUpdate) {
      onTaskUpdate();
    }
  };

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
                        {format(new Date(task.dueDate), "MMM d, yyyy")}
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
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMarkComplete(task.id)}
                            title="Mark as Complete"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewTask(task)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditTask(task)}
                          title="Edit Task"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTask(task)}
                          title="Delete Task"
                        >
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

      {/* View Task Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 font-medium">Property:</div>
              <div className="col-span-3">
                {
                  PROPERTIES.find((p) => p.id === selectedTask?.propertyId)
                    ?.name
                }
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 font-medium">Assigned To:</div>
              <div className="col-span-3">
                {
                  TEAM_MEMBERS.find((m) => m.id === selectedTask?.assignedTo)
                    ?.name
                }
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 font-medium">Due Date:</div>
              <div className="col-span-3">
                {selectedTask?.dueDate &&
                  format(new Date(selectedTask.dueDate), "PPP")}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 font-medium">Priority:</div>
              <div className="col-span-3 capitalize">
                {selectedTask?.priority}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 font-medium">Type:</div>
              <div className="col-span-3 capitalize">{selectedTask?.type}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 font-medium">Status:</div>
              <div className="col-span-3 capitalize">
                {selectedTask?.status}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 font-medium">Description:</div>
              <div className="col-span-3">{selectedTask?.description}</div>
            </div>
            {selectedTask?.status === "completed" && (
              <>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 font-medium">Completed:</div>
                  <div className="col-span-3">
                    {selectedTask?.completedAt &&
                      format(new Date(selectedTask.completedAt), "PPP")}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 font-medium">Notes:</div>
                  <div className="col-span-3">
                    {selectedTask?.completionNotes}
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <TaskForm onSubmit={handleTaskFormSubmit} task={selectedTask} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Task Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              task "{selectedTask?.title}" and remove it from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteTask}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default TaskList;
