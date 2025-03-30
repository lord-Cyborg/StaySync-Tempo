import { useState } from "react";
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
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">All tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">50% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">33% of all tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">4</div>
            <p className="text-xs text-muted-foreground">17% of all tasks</p>
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
          <TaskList filter="all" />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <TaskList filter="completed" />
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          <TaskList filter="in-progress" />
        </TabsContent>
        <TabsContent value="overdue" className="mt-4">
          <TaskList filter="overdue" />
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <TaskForm onSubmit={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TaskManagement;
