import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TEAM_MEMBERS = [
  { id: "1", name: "John Doe", role: "maintenance" },
  { id: "2", name: "Jane Smith", role: "cleaning" },
  { id: "3", name: "Robert Johnson", role: "maintenance" },
  { id: "4", name: "Emily Davis", role: "cleaning" },
  { id: "5", name: "Michael Wilson", role: "maintenance" },
];

const PROPERTIES = [
  { id: "1", name: "Ocean View Villa" },
  { id: "2", name: "Mountain Retreat" },
  { id: "3", name: "Downtown Loft" },
];

const ASSIGNMENTS = [
  {
    id: "1",
    memberId: "1",
    propertyId: "1",
    date: new Date(),
    startTime: "09:00",
    endTime: "12:00",
    taskType: "maintenance",
    description: "Fix leaking faucet in master bathroom",
  },
  {
    id: "2",
    memberId: "2",
    propertyId: "1",
    date: new Date(),
    startTime: "13:00",
    endTime: "16:00",
    taskType: "cleaning",
    description: "Deep clean after guest checkout",
  },
  {
    id: "3",
    memberId: "3",
    propertyId: "2",
    date: addDays(new Date(), 1),
    startTime: "10:00",
    endTime: "14:00",
    taskType: "maintenance",
    description: "HVAC system maintenance",
  },
  {
    id: "4",
    memberId: "4",
    propertyId: "3",
    date: addDays(new Date(), 1),
    startTime: "09:00",
    endTime: "11:00",
    taskType: "cleaning",
    description: "Regular cleaning service",
  },
  {
    id: "5",
    memberId: "5",
    propertyId: "2",
    date: addDays(new Date(), 2),
    startTime: "13:00",
    endTime: "17:00",
    taskType: "maintenance",
    description: "Replace broken light fixtures",
  },
  {
    id: "6",
    memberId: "1",
    propertyId: "3",
    date: addDays(new Date(), 3),
    startTime: "10:00",
    endTime: "12:00",
    taskType: "maintenance",
    description: "Fix door lock",
  },
];

function TeamSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [roleFilter, setRoleFilter] = useState("all");
  const [memberFilter, setMemberFilter] = useState("all");

  // Filter team members based on role
  const filteredMembers = TEAM_MEMBERS.filter(
    (member) => roleFilter === "all" || member.role === roleFilter,
  );

  // Get assignments for the selected date and filters
  const dailyAssignments = ASSIGNMENTS.filter((assignment) => {
    const matchesDate = isSameDay(assignment.date, selectedDate);
    const matchesMember =
      memberFilter === "all" || assignment.memberId === memberFilter;
    const member = TEAM_MEMBERS.find((m) => m.id === assignment.memberId);
    const matchesRole =
      roleFilter === "all" || (member && member.role === roleFilter);

    return matchesDate && matchesMember && matchesRole;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedDate(addDays(selectedDate, -1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
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
          <Select value={memberFilter} onValueChange={setMemberFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Team Member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Team Members</SelectItem>
              {filteredMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="md:col-span-5">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border w-full"
              modifiers={{
                booked: ASSIGNMENTS.map((assignment) => assignment.date),
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                  fontWeight: "bold",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">
              Assignments for {format(selectedDate, "MMM d, yyyy")}
            </h3>
            <div className="space-y-3">
              {dailyAssignments.length > 0 ? (
                dailyAssignments.map((assignment) => {
                  const member = TEAM_MEMBERS.find(
                    (m) => m.id === assignment.memberId,
                  );
                  const property = PROPERTIES.find(
                    (p) => p.id === assignment.propertyId,
                  );
                  return (
                    <div key={assignment.id} className="p-2 border rounded-md">
                      <div className="flex justify-between">
                        <p className="font-medium">{member?.name}</p>
                        <span className="text-sm text-muted-foreground">
                          {assignment.startTime} - {assignment.endTime}
                        </span>
                      </div>
                      <p className="text-sm">{property?.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {assignment.description}
                      </p>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            assignment.taskType === "maintenance"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {assignment.taskType}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">
                  No assignments for this date
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TeamSchedule;
