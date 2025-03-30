import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TEAM_MEMBERS = [
  {
    id: "1",
    name: "John Doe",
    role: "maintenance",
    metrics: {
      tasksCompleted: 45,
      tasksAssigned: 48,
      avgCompletionTime: 1.2,
      responseTime: 0.8,
      rating: 4.8,
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "cleaning",
    metrics: {
      tasksCompleted: 32,
      tasksAssigned: 35,
      avgCompletionTime: 1.5,
      responseTime: 0.5,
      rating: 4.9,
    },
  },
  {
    id: "3",
    name: "Robert Johnson",
    role: "maintenance",
    metrics: {
      tasksCompleted: 38,
      tasksAssigned: 42,
      avgCompletionTime: 1.8,
      responseTime: 1.2,
      rating: 4.6,
    },
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "cleaning",
    metrics: {
      tasksCompleted: 28,
      tasksAssigned: 30,
      avgCompletionTime: 1.3,
      responseTime: 0.7,
      rating: 4.7,
    },
  },
  {
    id: "5",
    name: "Michael Wilson",
    role: "maintenance",
    metrics: {
      tasksCompleted: 52,
      tasksAssigned: 55,
      avgCompletionTime: 1.4,
      responseTime: 0.9,
      rating: 4.9,
    },
  },
];

function PerformanceMetrics() {
  const [timeRange, setTimeRange] = useState("month");
  const [roleFilter, setRoleFilter] = useState("all");

  // Filter team members based on role
  const filteredMembers = TEAM_MEMBERS.filter(
    (member) => roleFilter === "all" || member.role === roleFilter,
  );

  // Calculate team averages
  const teamAverages = {
    completionRate:
      filteredMembers.reduce(
        (sum, member) =>
          sum +
          (member.metrics.tasksCompleted / member.metrics.tasksAssigned) * 100,
        0,
      ) / filteredMembers.length,
    avgCompletionTime:
      filteredMembers.reduce(
        (sum, member) => sum + member.metrics.avgCompletionTime,
        0,
      ) / filteredMembers.length,
    responseTime:
      filteredMembers.reduce(
        (sum, member) => sum + member.metrics.responseTime,
        0,
      ) / filteredMembers.length,
    rating:
      filteredMembers.reduce((sum, member) => sum + member.metrics.rating, 0) /
      filteredMembers.length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <h2 className="text-xl font-semibold">Performance Metrics</h2>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamAverages.completionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Tasks completed vs assigned
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Completion Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamAverages.avgCompletionTime.toFixed(1)} hours
            </div>
            <p className="text-xs text-muted-foreground">
              Average time to complete tasks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamAverages.responseTime.toFixed(1)} hours
            </div>
            <p className="text-xs text-muted-foreground">
              Average time to respond to tasks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamAverages.rating.toFixed(1)} / 5
            </div>
            <p className="text-xs text-muted-foreground">
              Based on task completion quality
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Individual Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Tasks Completed</TableHead>
                <TableHead className="text-right">Completion Rate</TableHead>
                <TableHead className="text-right">
                  Avg. Completion Time
                </TableHead>
                <TableHead className="text-right">Response Time</TableHead>
                <TableHead className="text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => {
                const completionRate =
                  (member.metrics.tasksCompleted /
                    member.metrics.tasksAssigned) *
                  100;
                return (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="capitalize">{member.role}</TableCell>
                    <TableCell className="text-right">
                      {member.metrics.tasksCompleted} /{" "}
                      {member.metrics.tasksAssigned}
                    </TableCell>
                    <TableCell className="text-right">
                      {completionRate.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-right">
                      {member.metrics.avgCompletionTime.toFixed(1)} hours
                    </TableCell>
                    <TableCell className="text-right">
                      {member.metrics.responseTime.toFixed(1)} hours
                    </TableCell>
                    <TableCell className="text-right">
                      {member.metrics.rating.toFixed(1)} / 5
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default PerformanceMetrics;
