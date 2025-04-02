import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
} from "lucide-react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function TaskManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskFilter, setTaskFilter] = useState("all");
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    overdue: 0,
  });

  // Function to update task statistics
  const updateTaskStats = () => {
    // In a real app, this would fetch data from the database
    // For now, we'll just use some placeholder values
    setTaskStats({
      total: 24,
      completed: 12,
      inProgress: 8,
      overdue: 4,
    });
  };

  // Update stats when component mounts
  useEffect(() => {
    updateTaskStats();
  }, []);

  // Handle task form submission
  const handleTaskFormSubmit = () => {
    setIsDialogOpen(false);
    updateTaskStats(); // Update stats after adding a new task
  };

  // Handle task updates (complete, edit, delete)
  const handleTaskUpdate = () => {
    updateTaskStats(); // Update stats after task changes
  };

  return (
    <div className="p-6 space-y-6 bg-background w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.total}</div>
            <p className="text-xs text-muted-foreground">All tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {taskStats.completed}
            </div>
            <p className="text-xs text-muted-foreground">
              {taskStats.total > 0
                ? Math.round((taskStats.completed / taskStats.total) * 100)
                : 0}
              % completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {taskStats.inProgress}
            </div>
            <p className="text-xs text-muted-foreground">
              {taskStats.total > 0
                ? Math.round((taskStats.inProgress / taskStats.total) * 100)
                : 0}
              % of all tasks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {taskStats.overdue}
            </div>
            <p className="text-xs text-muted-foreground">
              {taskStats.total > 0
                ? Math.round((taskStats.overdue / taskStats.total) * 100)
                : 0}
              % of all tasks
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={taskFilter} onValueChange={setTaskFilter} className="w-full">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center">
            <ClipboardList className="mr-2 h-4 w-4" />
            All Tasks
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            Completed
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            In Progress
          </TabsTrigger>
          <TabsTrigger value="overdue" className="flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Overdue
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <TaskList filter="all" onTaskUpdate={handleTaskUpdate} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <TaskList filter="completed" onTaskUpdate={handleTaskUpdate} />
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          <TaskList filter="in-progress" onTaskUpdate={handleTaskUpdate} />
        </TabsContent>
        <TabsContent value="overdue" className="mt-4">
          <TaskList filter="overdue" onTaskUpdate={handleTaskUpdate} />
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <TaskForm onSubmit={handleTaskFormSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TaskManagement;
