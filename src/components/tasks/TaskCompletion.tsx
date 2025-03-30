import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Upload } from "lucide-react";

interface TaskCompletionProps {
  task?: any;
  onComplete?: () => void;
  onCancel?: () => void;
}

function TaskCompletion({
  task = {
    id: "1",
    title: "Replace AC filter",
    property: "Ocean View Villa",
    dueDate: new Date(),
    assignedTo: "John Doe",
    type: "maintenance",
    priority: "high",
  },
  onComplete,
  onCancel,
}: TaskCompletionProps) {
  const [completionNotes, setCompletionNotes] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onComplete) onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Task</CardTitle>
        <CardDescription>Mark this task as completed</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-medium">{task.title}</h3>
            <div className="text-sm text-muted-foreground">
              <p>{task.property}</p>
              <p>Due: {format(task.dueDate, "PPP")}</p>
              <p>Assigned to: {task.assignedTo}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="completionNotes">Completion Notes</Label>
            <Textarea
              id="completionNotes"
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              placeholder="Describe how the task was completed"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photos">Verification Photos</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
              <input
                id="photos"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setFiles(e.target.files)}
              />
              <label
                htmlFor="photos"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">
                  Upload verification photos
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Drag and drop or click to upload
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
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Mark as Completed</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default TaskCompletion;
